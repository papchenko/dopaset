import { useEffect, useState } from "react";

const STORAGE_KEY = "dopaset_cookie_consent";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) setVisible(true);
  }, []);

  const acceptAll = () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ analytics: true, essential: true })
    );
    setVisible(false);
  };

  const rejectAll = () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ analytics: false, essential: true })
    );
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-2xl">

      {/* glow */}
      <div className="absolute inset-0 opacity-30 -z-10">
        <div className="absolute -top-10 left-1/2 w-[300px] h-[300px] -translate-x-1/2 bg-purple-600 blur-[120px] rounded-full" />
      </div>

      <div className="bg-[#0B0F19]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-2xl">

        <p className="text-sm text-gray-300 mb-4">
          We use cookies to improve your experience, analyze usage, and help you
          stay in control of your digital habits. By continuing, you agree to our use of cookies.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-end">
          <button
            onClick={rejectAll}
            className="px-4 py-2 border border-white/20 rounded-xl text-sm hover:bg-white/10 transition"
          >
            Reject
          </button>

          <button
            onClick={acceptAll}
            className="px-4 py-2 rounded-xl text-sm bg-[#586ba4]"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}