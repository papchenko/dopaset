// import { useAuth } from "../../context/AuthContext";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { uploadAvatar } from "../../lib/uploadAvatar";
// import { db } from "../../firebase";
// import { doc, updateDoc, getDoc, setDoc, collection, query, where, getDocs } from "firebase/firestore";
// import { toast } from "react-toastify";
// import PremiumCountdown from "../premium/PremiumCountdown";

// export default function Profile() {
//   const { profile, user, logout } = useAuth();
//   const navigate = useNavigate();

//   const [uploading, setUploading] = useState(false);

//   const handleLogout = async () => {
//     await logout();
//     navigate("/");
//   };

//   const handleAvatarChange = async (e: any) => {
//     const file = e.target.files[0];
//     if (!file || !user) return;

//     const now = Date.now();
//     const last = profile?.lastAvatarUpdate || 0;

//     if (now - last < 7 * 24 * 60 * 60 * 1000) {
//       toast.info("You can change avatar only once every 7 days");
//       return;
//     }

//     setUploading(true);

//     const url = await uploadAvatar(file);

//     await setDoc(
//   doc(db, "users", user.uid),
//   {
//     avatarUrl: url,
//     lastAvatarUpdate: now,
//     email: profile?.email || user.email,
//     nickname: profile?.nickname || "User",
//   },
//   { merge: true }
// );

//     setUploading(false);
//     window.location.reload();
//   };

//   const avatar = profile?.avatarUrl;


//   return (
//     <div className="pt-[80px]">
//     <div className="min-h-screen bg-zinc-950 text-white p-10">

//       <div className="bg-zinc-900 p-6 rounded border border-zinc-800">

//         {/* AVATAR */}
//         <div className="flex items-center gap-4 mb-6">
//           {avatar ? (
//             <img
//               src={avatar}
//               className="w-14 h-14 rounded-full object-cover"
//             />
//           ) : (
//             <div className="w-14 h-14 rounded-full bg-[#586ba4] flex items-center justify-center text-xl font-bold">
//               {profile?.nickname?.[0]?.toUpperCase()}
//             </div>
//           )}

//           <div>
//             <p className="text-lg font-semibold">
//               {profile?.nickname}
//             </p>
//             {/* <p className="text-sm text-zinc-400">{profile?.email}</p> */}
//             {profile?.premium && (
//               <div className="mt-3 px-3 py-2 rounded bg-[#586ba4]/10 border border-[#586ba4]/100 text-[#586ba4] text-sm">
                
//                 <p>
//                   Premium: <b>{profile.plan}</b>
//                 </p>

//                 <p>Status: ACTIVE</p>

//                 <PremiumCountdown />

//               </div>
//             )}
//           </div>
//         </div>

//         {/* UPLOAD */}
//         <input
//           type="file"
//           accept="image/*"
//           onChange={handleAvatarChange}
//           className="mb-4"
//         />

//         {uploading && (
//           <p className="text-sm text-zinc-400">Uploading...</p>
//         )}

//         {/* LOGOUT */}
//         <button
//           onClick={handleLogout}
//           className="mt-6 px-4 py-2 bg-red-600 rounded"
//         >
//           Logout
//         </button>
//       </div>
//     </div>
//     </div>
//   );
// }

import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { uploadAvatar } from "../../lib/uploadAvatar";
import { db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
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
      toast.info("Avatar can be changed once every 7 days");
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
    <div className="pt-[90px] min-h-screen bg-zinc-950 text-white px-4 md:px-10">

      {/* BACKDROP GLOW */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-200px] left-[-200px] w-[600px] h-[600px] bg-[#586ba4]/20 blur-[160px] rounded-full" />
      </div>

      {/* CENTER */}
      <div className="relative max-w-4xl mx-auto">

        {/* HEADER CARD */}
        <div className="bg-zinc-900/40 backdrop-blur-2xl border border-white/5 rounded-3xl p-6 md:p-10 shadow-[0_0_80px_rgba(0,0,0,0.5)]">

          {/* TOP SECTION */}
          <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-10">

            {/* AVATAR */}
            <div className="relative shrink-0">
              {avatar ? (
                <img
                  src={avatar}
                  className="w-24 h-24 md:w-28 md:h-28 rounded-2xl object-cover border border-white/10 shadow-lg"
                />
              ) : (
                <div className="w-24 h-24 md:w-28 md:h-28 rounded-2xl bg-gradient-to-br from-[#586ba4] to-[#3b4b80] flex items-center justify-center text-3xl font-bold shadow-lg">
                  {profile?.nickname?.[0]?.toUpperCase()}
                </div>
              )}
            </div>

            {/* USER INFO */}
            <div className="flex-1 space-y-2">

              <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
                {profile?.nickname}
              </h1>

              <p className="text-sm text-zinc-400">
                {profile?.email}
              </p>

              {/* PREMIUM BADGE */}
              {profile?.premium && (
                <div className="mt-4 inline-flex flex-col gap-2 p-4 rounded-2xl bg-[#586ba4]/10 border border-[#586ba4]/20">

                  <div className="flex items-center gap-2 text-[#9fb0ff] text-sm">
                    <span className="w-2 h-2 rounded-full bg-[#586ba4] animate-pulse" />
                    Premium active
                  </div>

                  <p className="text-xs text-zinc-400">
                    Plan: <span className="text-white">{profile.plan}</span>
                  </p>

                  <div className="pt-1">
                    <PremiumCountdown />
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* DIVIDER */}
          <div className="my-8 h-px bg-white/5" />

          {/* ACTIONS */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

            {/* UPLOAD */}
            <div className="flex items-center gap-3">

              <label className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 transition cursor-pointer text-sm">
                Change avatar
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
              </label>

              {uploading && (
                <span className="text-sm text-zinc-400">
                  Uploading...
                </span>
              )}

              <span className="text-xs text-zinc-500 hidden md:block">
                Once every 7 days
              </span>

            </div>

            {/* LOGOUT */}
            <button
              onClick={handleLogout}
              className="px-5 py-2 rounded-xl bg-red-500/90 hover:bg-red-500 transition text-sm font-medium"
            >
              Logout
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}