/* role: admin */
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  Timestamp,
} from "firebase/firestore";

export default function AdminPanel() {
  const [subs, setSubs] = useState<any[]>([]);

  const load = async () => {
    const snap = await getDocs(collection(db, "subscriptions"));
    setSubs(snap.docs.map(d => ({ id: d.id, ...d.data() })));
  };

  useEffect(() => {
    load();
  }, []);

  const activate = async (sub: any) => {
    const now = new Date();
    const expire = new Date();
    expire.setDate(now.getDate() + 30);

    await updateDoc(doc(db, "subscriptions", sub.id), {
      status: "active",
      activatedAt: Timestamp.fromDate(now),
      expiresAt: Timestamp.fromDate(expire),
    });

    await updateDoc(doc(db, "users", sub.userId), {
      premium: true,
      plan: sub.plan,
      premiumExpires: Timestamp.fromDate(expire),
    });

    load();
  };

  return (
    <div className="p-10 text-white">
      <h2>Admin Panel</h2>

      {subs.map(s => (
        <div key={s.id} className="border p-4 mb-4">
          <p>{s.email}</p>
          <p>{s.plan}</p>
          <p>{s.status}</p>

          {s.status === "pending" && (
            <button onClick={() => activate(s)}>
              Activate
            </button>
          )}
        </div>
      ))}
    </div>
  );
}