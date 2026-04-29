export const getAIAdvice = (history: any[]) => {
  const last7 = history.slice(-7);

  if (!last7.length) return "Start tracking.";

  const avg =
    last7.reduce((a, b) => a + b.score, 0) / last7.length;

  if (avg < 2) return "Critical addiction pattern detected.";
  if (avg < 5) return "Unstable control. Reduce triggers.";
  return "Strong discipline. Optimize further.";
};