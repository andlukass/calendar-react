import { hourIndexes } from "./hourIndexes";
import { hourIndexesToHours } from "./hourIndexesToHours";

export const getIndexByHour = (hour) => {
  return hourIndexesToHours(hourIndexes).indexOf(hour);
}