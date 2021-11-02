export const getTimeSincePosted = {
  inHours: function (nowDate, postDate) {
    const nowTime = nowDate.getTime();
    const postTIme = postDate.getTime();
    let diff = (nowTime - postTIme) / 1000;
    return parseInt((diff /= 60 * 60)).toString();
  },
  inDays: function (nowDate, postDate) {
    const nowTime = nowDate.getTime();
    const postTIme = postDate.getTime();
    return parseInt((nowTime - postTIme).toString() / (24 * 3600 * 1000));
  },
  inWeeks: function (nowDate, postDate) {
    const nowTime = nowDate.getTime();
    const postTIme = postDate.getTime();
    return parseInt((nowTime - postTIme).toString() / (24 * 3600 * 1000 * 7));
  },
  inMonths: function (nowDate, postDate) {
    const nowYear = nowDate.getFullYear();
    const postYear = nowDate.getFullYear();
    const nowMonth = nowDate.getMonth();
    const postMonth = postDate.getMonth();

    const nowDates = nowMonth + 12 * nowYear;
    const postDates = postMonth + 12 * postYear;
    return (nowDates - postDates).toString();
  },
};
