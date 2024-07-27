export const getEventHeight = (dragStart, dragEnd) => {
  if (dragStart === null || dragEnd === null) return 1;
  const start = dragStart < dragEnd ? dragStart : dragEnd;
  const end = dragStart < dragEnd ? dragEnd : dragStart;
  const diff = (end - start);

  const height = (30 * diff)-(diff*3.5);
  return height;
}