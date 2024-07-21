export const getHourByIndex = (index, upper) => {
  const hours = Math.floor(index / 2);
  const minutes = index % 2 === 0 ? "" : ":30";
  let period = hours < 12 ? "am" : "pm";
  if (upper) period = period.toUpperCase();
  const formattedHour = hours === 0 ? "0" : (hours % 12 === 0 ? 12 : hours % 12);
  return `${formattedHour}${minutes}${period}`;
}