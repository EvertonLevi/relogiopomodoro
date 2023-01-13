// const addCacharecter = (obj: any) => {
//   obj.toString().length === 2 ? obj.toString() : `0${obj.toString()}`;
//   return;
// };

export const dispSecondsAsMins = (seconds: any) => {
  // 25:00
  console.log("seconds " + seconds);
  const mins = Math.floor(seconds / 60);
  const seconds_ = seconds % 60;
  console.log("### min e sec", mins, seconds_);
  console.log(
    "### min e sec 2",
    mins.toString().length,
    seconds_.toString().length
  );
  return mins.toString() + ":" + (seconds_ == 0 ? "00" : seconds_.toString());
};
