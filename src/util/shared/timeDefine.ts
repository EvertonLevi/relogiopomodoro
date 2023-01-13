export const timeDefine = (obj: any) => {
  // 25 minutes -- 1500 - 15 minutes -- 900 - 5 minutes -- 300
  if (obj === "pomodoro") return 1500;
  if (obj === "short break") return 300;
  if (obj === "long break") return 900;
};
