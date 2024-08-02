export const getMonthName = (date) => {
  let monthName = date.toLocaleDateString('pt-BR', { month: 'long' });
  monthName = monthName.replace('.', '');
  monthName = monthName.charAt(0).toUpperCase() + monthName.slice(1);
  return monthName;
}