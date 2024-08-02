import { users } from "../../../../data/users/users";

export const getColorByUser = (id) => {
  if (!id) return '#575656';
  return users.find((user) => user.id === id).color;
} 
