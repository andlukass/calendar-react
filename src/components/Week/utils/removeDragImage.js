export const removeDragImage = () => {
  const createTransparentImage = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    return canvas.toDataURL('image/png');
  };

  const img = new Image();
  img.src = createTransparentImage();
  
  img.onload = () => {
    const draggableItems = document
    .querySelectorAll('.draggable-item');
    draggableItems.forEach(item => {
      item.addEventListener('dragstart', (e) => {
        e.dataTransfer.setDragImage(img, 0, 0);
      });
    });
  };
}