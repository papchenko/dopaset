import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { uploadAvatar } from "../../lib/uploadAvatar";
import { db } from "../../firebase";
import { doc, updateDoc, getDoc, setDoc, collection, query, where, getDocs } from "firebase/firestore";
import { toast } from "react-toastify";
import PremiumCountdown from "../premium/PremiumCountdown";

export default function Profile() {
  const { profile, user, logout } = useAuth();
  const navigate = useNavigate();

  const [uploading, setUploading] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const handleAvatarChange = async (e: any) => {
    const file = e.target.files[0];
    if (!file || !user) return;

    const now = Date.now();
    const last = profile?.lastAvatarUpdate || 0;

    if (now - last < 7 * 24 * 60 * 60 * 1000) {
      toast.info("You can change avatar only once every 7 days");
      return;
    }

    setUploading(true);

    const url = await uploadAvatar(file);

    await setDoc(
  doc(db, "users", user.uid),
  {
    avatarUrl: url,
    lastAvatarUpdate: now,
    email: profile?.email || user.email,
    nickname: profile?.nickname || "User",
  },
  { merge: true }
);

    setUploading(false);
    window.location.reload();
  };

  const avatar = profile?.avatarUrl;


  return (
    <div className="pt-[80px]">
    <div className="min-h-screen bg-zinc-950 text-white p-10">

      <div className="bg-zinc-900 p-6 rounded border border-zinc-800">

        {/* AVATAR */}
        <div className="flex items-center gap-4 mb-6">
          {avatar ? (
            <img
              src={avatar}
              className="w-14 h-14 rounded-full object-cover"
            />
          ) : (
            <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center text-xl font-bold">
              {profile?.nickname?.[0]?.toUpperCase()}
            </div>
          )}

          <div>
            <p className="text-lg font-semibold">
              {profile?.nickname}
            </p>
            {/* <p className="text-sm text-zinc-400">{profile?.email}</p> */}
            {profile?.premium && (
              <div className="mt-3 px-3 py-2 rounded bg-purple-500/20 border border-purple-500/30 text-purple-300 text-sm">
                
                <p>
                  Premium: <b>{profile.plan}</b>
                </p>

                <p>Status: ACTIVE</p>

                <PremiumCountdown />

              </div>
            )}
          </div>
        </div>

        {/* UPLOAD */}
        <input
          type="file"
          accept="image/*"
          onChange={handleAvatarChange}
          className="mb-4"
        />

        {uploading && (
          <p className="text-sm text-zinc-400">Uploading...</p>
        )}

        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          className="mt-6 px-4 py-2 bg-red-600 rounded"
        >
          Logout
        </button>
      </div>
    </div>
    </div>
  );
}