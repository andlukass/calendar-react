import { hourIndexes } from "../../../../utils/hourIndexes";
import { hourIndexesToHours } from "./hourIndexesToHours";

export const getIndexByHour = (hour) => {
  return hourIndexesToHours(hourIndexes).indexOf(hour);
}