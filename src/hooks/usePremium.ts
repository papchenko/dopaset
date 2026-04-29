import { useAuth } from "../context/AuthContext";

export const usePremium = () => {
  const { profile } = useAuth();

  const isPremium = !!profile?.premium;
  const plan = profile?.plan || null;
  const expires = profile?.premiumExpires?.toDate?.() || null;

  return {
    isPremium,
    plan,
    expires,
  };
};