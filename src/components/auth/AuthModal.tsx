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
  const [isLogin, setIsLogin] = useState(true); // ✅ login по дефолту

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const register = async () => {
    try {
      setLoading(true);

      const res = await createUserWithEmailAndPassword(auth, email, password);

      await setDoc(doc(db, "users", res.user.uid), {
        nickname,
        email,
        createdAt: serverTimestamp(),
      });

      onClose();
    } finally {
      setLoading(false);
    }
  };

  const login = async () => {
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      onClose();
    } finally {
      setLoading(false);
    }
  };

  const googleLogin = async () => {
    try {
      setLoading(true);
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      onClose();
    } finally {
      setLoading(false);
    }
  };

  const isDisabled =
    !email || !password || (!isLogin && !nickname) || loading;

  return (
      <div
    onClick={onClose}
    className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 px-4"
  >
    <div
      onClick={(e) => e.stopPropagation()}
      className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-2xl"
    >

        {/* Title */}
        <h2 className="text-2xl font-semibold text-center mb-6 text-white">
          {isLogin ? "Sign In" : "Sign Up"}
        </h2>

        {/* Nickname */}
        {!isLogin && (
          <input
            className="w-full p-3 mb-4 bg-zinc-800 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
        )}

        {/* Email */}
        <input
          className="w-full p-3 mb-4 bg-zinc-800 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <input
          className="w-full p-3 mb-5 bg-zinc-800 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Main button */}
        <button
          onClick={isLogin ? login : register}
          disabled={isDisabled}
          className="w-full py-3 rounded-lg bg-[#586ba4] hover:opacity-90 transition font-medium disabled:opacity-50"
        >
          {loading
            ? "Loading..."
            : isLogin
            ? "Sign In"
            : "Create Account"}
        </button>

        {/* Divider */}
        <div className="flex items-center my-5">
          <div className="flex-1 h-px bg-zinc-700" />
          <span className="px-3 text-zinc-400 text-sm">or</span>
          <div className="flex-1 h-px bg-zinc-700" />
        </div>

        {/* Google */}
        <button
          onClick={googleLogin}
          className="w-full py-3 rounded-lg bg-white text-black font-medium hover:bg-zinc-200 transition"
        >
          Continue with Google
        </button>

        {/* Switch */}
        <p
          onClick={() => setIsLogin(!isLogin)}
          className="text-sm text-center text-zinc-400 mt-6 cursor-pointer hover:text-white transition"
        >
          {isLogin
            ? "Don't have an account? Sign up"
            : "Already have an account? Sign in"}
        </p>

        {/* Close */}
        <button
          onClick={onClose}
          className="mt-6 w-full text-sm text-zinc-500 hover:text-white transition"
        >
          Close
        </button>
      </div>
    </div>
  );
}