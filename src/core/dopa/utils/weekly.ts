export const calculateWeekly = (history: any[]) => {
  const last7 = history.slice(-7);

  const total = last7.reduce((acc, d) => acc + d.score, 0);

  return {
    avg: last7.length ? total / last7.length : 0,
    total,
  };
};