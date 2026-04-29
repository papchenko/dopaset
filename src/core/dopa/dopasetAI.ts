export const generatePlan = (data: any) => {
  const { phoneHours, socialHours, goal } = data;

  const plan = [];

  if (phoneHours > 5) {
    plan.push("Reduce phone usage by 30 minutes today");
  }

  if (socialHours > 3) {
    plan.push("No social media after 20:00");
  }

  if (goal < phoneHours) {
    plan.push(`Target today: ${goal}h total screen time`);
  }

  plan.push("No phone first 30 minutes after waking up");

  return plan;
};