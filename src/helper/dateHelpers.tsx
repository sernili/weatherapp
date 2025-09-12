export function getDayDifference(date1: Date, date2: Date) {
  const oneDay = 1000 * 60 * 60 * 24; // ms in a day
  const diffInTime = date2.getTime() - date1.getTime();
  return Math.round(diffInTime / oneDay);
}
