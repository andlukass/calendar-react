export const getEventHeight = (dragStart, dragEnd) => {
  if (dragStart === null || dragEnd === null) return 1;
  const start = dragStart < dragEnd ? dragStart : dragEnd;
  const end = dragStart < dragEnd ? dragEnd : dragStart;
  const diff = (end - start);

  let cells = (diff);
  const height = (35 * cells)-(cells*10);
  return height;
}