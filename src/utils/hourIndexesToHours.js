import { getHourByIndex } from "./getHourByIndex";

export const hourIndexesToHours = (indexes) => {
  return indexes.map((index) => getHourByIndex(index));
}