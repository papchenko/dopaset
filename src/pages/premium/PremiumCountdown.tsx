import { useEffect, useState } from "react";
import { usePremium } from "../../hooks/usePremium";

export default function PremiumCountdown() {
  const { expires } = usePremium();
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    if (!expires) return;

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const diff = expires.getTime() - now;

      if (diff <= 0) {
        setTimeLeft("Expired");
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);

      setTimeLeft(`${days}d ${hours}h`);
    }, 1000);

    return () => clearInterval(interval);
  }, [expires]);

  if (!expires) return null;

  return (
    <div className="text-sm text-purple-400">
      Premium ends in: {timeLeft}
    </div>
  );
}