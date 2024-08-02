export const getWeekDates = (currentDate) => {
  const startDate = new Date(
    currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - currentDate.getDay()
  );
  const weekDays = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    weekDays.push(date);
  }
  return weekDays;
}