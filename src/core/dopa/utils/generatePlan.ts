export const generatePlan = (data: any) => {
  const required: string[] = [];
  const optional: string[] = [];

  // 🔥 mandatory tasks (core dopamine control)
  required.push("No phone first 30 min after waking");
  required.push("No social media during meals");

  if (data.phoneHours > 5) {
    required.push("Reduce phone usage by 1h today");
  }

  // 🔥 optional tasks (optimization layer)
  optional.push("Go outside for 20 minutes");
  optional.push("No phone 1h before sleep");

  if (data.socialHours > 3) {
    optional.push("No social media after 20:00");
  }

  return { required, optional };
};