import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth, db } from "../../firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function AuthModal({ open, onClose }: Props) {
  const [isLogin, setIsLogin] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");

  if (!open) return null;

  const register = async () => {
    const res = await createUserWithEmailAndPassword(auth, email, password);

    await setDoc(doc(db, "users", res.user.uid), {
      nickname,
      email,
      createdAt: serverTimestamp(),
    });

    onClose();
  };

  const login = async () => {
    await signInWithEmailAndPassword(auth, email, password);
    onClose();
  };

  const googleLogin = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl w-[360px] text-white">

        <h2 className="text-xl text-center mb-4">
          {isLogin ? "Sign In" : "Sign Up"}
        </h2>

        {!isLogin && (
          <input
            className="w-full p-2 mb-3 bg-zinc-800 rounded"
            placeholder="Nickname"
            onChange={(e) => setNickname(e.target.value)}
          />
        )}

        <input
          className="w-full p-2 mb-3 bg-zinc-800 rounded"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full p-2 mb-3 bg-zinc-800 rounded"
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={isLogin ? login : register}
          className="w-full bg-blue-600 py-2 rounded mb-2"
        >
          {isLogin ? "Sign In" : "Sign Up"}
        </button>

        <button
          onClick={googleLogin}
          className="w-full bg-red-500 py-2 rounded mb-3"
        >
          Google Login
        </button>

        <p
          onClick={() => setIsLogin(!isLogin)}
          className="text-sm text-center text-zinc-400 cursor-pointer"
        >
          {isLogin ? "Create account" : "I already have account"}
        </p>

        <button
          onClick={onClose}
          className="mt-4 w-full text-zinc-400"
        >
          Close
        </button>
      </div>
    </div>
  );
}