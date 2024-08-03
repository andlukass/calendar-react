import { types } from "../data/types/types";

export const getColorByType = (id) => {
  if (!id) return '#575656';
  return types.find((type) => type.id === id).color;
} 
