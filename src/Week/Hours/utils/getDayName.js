export const getDayName = (day) => {
  if (day < 0 || day > 6) {
    throw new Error("Índice fora do intervalo. Deve ser de 0 a 6.");
  }
  const date = new Date();
  date.setDate(date.getDate() - date.getDay() + day);
  let dayName = date.toLocaleDateString('pt-BR', { weekday: 'short' });
  dayName = dayName.replace('.', '');
  dayName = dayName.charAt(0).toUpperCase() + dayName.slice(1);
  return dayName;
}