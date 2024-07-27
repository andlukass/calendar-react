export const changeGhostImg = async (e, imgRef, diffX, diffY) => {
  diffX = diffX || 0;
  diffY = diffY || 0;
  const offsetX = e.clientX - e.target.getBoundingClientRect().left;
  const offsetY = e.clientY - e.target.getBoundingClientRect().top;
  e.dataTransfer.setDragImage(imgRef.current, offsetX + diffX,offsetY + diffY);
}