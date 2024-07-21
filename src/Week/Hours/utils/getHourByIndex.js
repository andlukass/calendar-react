export const getHourByIndex = (index) => {
  const hours = Math.floor(index / 2);
  const minutes = index % 2 === 0 ? "00" : "30";
  const period = hours < 12 ? "AM" : "PM";
  const formattedHour = hours === 0 ? "0" : (hours % 12 === 0 ? 12 : hours % 12);
  return `${formattedHour}:${minutes} ${period}`;
}