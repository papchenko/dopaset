import { useEffect, useState } from "react";
import { db } from "../../firebase";
import {
  doc,
  setDoc,
  getDoc,
  collection,
  getDocs,
} from "firebase/firestore";
import { useAuth } from "../../context/AuthContext";
import dayjs from "dayjs";
import { generatePlan } from "./utils/generatePlan";

export const useDopaset = () => {
  const { user } = useAuth();

  const [base, setBase] = useState<any>(null);
  const [userProfile, setUserProfile] = useState<any>(null);

  const [history, setHistory] = useState<any[]>([]);
  const [plan, setPlan] = useState<any>({ required: [], optional: [] });

  const [stats, setStats] = useState({
    streak: 0,
    xp: 0,
    level: 1,
  });

  // 📊 HISTORY
  const loadHistory = async () => {
    if (!user) return;

    const ref = collection(db, "dopaset_days", user.uid, "days");
    const snap = await getDocs(ref);

    const arr: any[] = [];
    snap.forEach(d => arr.push(d.data()));

    arr.sort((a, b) => a.timestamp - b.timestamp);
    setHistory(arr);
  };

  // 📊 STATS
  const loadStats = async () => {
    if (!user) return;

    const snap = await getDoc(doc(db, "dopaset_stats", user.uid));

    if (snap.exists()) {
      setStats(snap.data());
    }
  };

  // 👤 LOAD USER PROFILE (PLAN IS HERE)
  useEffect(() => {
    if (!user) return;

    (async () => {
      const baseSnap = await getDoc(doc(db, "dopaset", user.uid));

      if (baseSnap.exists()) {
        const data = baseSnap.data();
        setBase(data);
        setPlan(generatePlan(data));
      }

      const userSnap = await getDoc(doc(db, "users", user.uid));
      if (userSnap.exists()) {
        setUserProfile(userSnap.data());
      }

      await loadHistory();
      await loadStats();
    })();
  }, [user]);

  // 💾 SAVE BASE SETTINGS
  const saveBase = async (data: any) => {
    if (!user) return;

    await setDoc(doc(db, "dopaset", user.uid), data);
    setBase(data);
    setPlan(generatePlan(data));
  };

  // 💾 SAVE DAY + STATS ENGINE
  const saveDay = async (dayData: any) => {
    if (!user) return;

    const date = dayjs().format("YYYY-MM-DD");

    const statsRef = doc(db, "dopaset_stats", user.uid);
    const snap = await getDoc(statsRef);

    let current = {
      streak: 0,
      xp: 0,
      level: 1,
      lastDate: null,
    };

    if (snap.exists()) current = snap.data();

    const yesterday = dayjs().subtract(1, "day").format("YYYY-MM-DD");

    const streak =
      current.lastDate === yesterday ? current.streak + 1 : 1;

    const xp = current.xp + dayData.score * 10;
    const level = Math.floor(xp / 100) + 1;

    await setDoc(statsRef, {
      streak,
      xp,
      level,
      lastDate: date,
    });

    await setDoc(doc(db, "dopaset_days", user.uid, "days", date), {
      ...dayData,
      date,
      timestamp: Date.now(),
      completedRequired: dayData.completedRequired || [],
      completedOptional: dayData.completedOptional || [],
    });

    await loadHistory();
    await loadStats();
  };

  return {
    base,
    userProfile,
    history,
    plan,
    stats,
    saveBase,
    saveDay,
  };
};