import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  onAuthStateChanged,
  signOut,
  User,
} from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

type AuthType = {
  user: User | null;
  profile: any;
  loading: boolean;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthType>({
  user: null,
  profile: null,
  loading: true,
  logout: async () => {},
});

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u);

      if (u) {
        const snap = await getDoc(doc(db, "users", u.uid));


if (snap.exists()) {
  const data = snap.data();

  if (data.premiumExpires) {
    const now = new Date();
    const expire = data.premiumExpires.toDate();

    if (now > expire) {
      await updateDoc(doc(db, "users", u.uid), {
        premium: false,
        plan: null,
      });

      data.premium = false;
    }
  }

  setProfile(data);
} else {
          setProfile({
            email: u.email,
            nickname: "User",
            avatarUrl: null,
            lastAvatarUpdate: 0,
          });
        }
      } else {
        setProfile(null);
      }

      setLoading(false);
    });

    return () => unsub();
  }, []);

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);