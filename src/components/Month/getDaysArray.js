import { addDaysToDate } from "../../utils/addDaysToDate";

export const getDaysArray = (date) => {
  const days = [];
  const firstDayMonth = new Date(
    date.getFullYear(), date.getMonth(), 1
  );
  const dayOfWeek = firstDayMonth.getDay();
  const firstDayPage = addDaysToDate(firstDayMonth, -dayOfWeek);
  for (let i = 0; i < 35; i++) {
    const temp = addDaysToDate(firstDayPage, i);
    days.push(temp);
  }
  return days;
}