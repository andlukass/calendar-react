import html2canvas from "html2canvas";

export const getGhostImg = async (ref, imgRef) => {
  if (ref.current) {
    const canvas = await html2canvas(ref.current, {
      backgroundColor: null, // Define o fundo como transparente
    });
    const imgData = canvas.toDataURL('image/png');
    const img = new Image();
    img.src = imgData;
    img.onload = () => {
      const halfWidth = img.width / 2;
      const halfHeight = img.height / 2;

      const resizedCanvas = document.createElement('canvas');
      resizedCanvas.width = halfWidth;
      resizedCanvas.height = halfHeight;

      const ctx = resizedCanvas.getContext('2d');
      ctx.drawImage(img, 0, 0, halfWidth, halfHeight);

      const resizedImg = new Image();
      resizedImg.src = resizedCanvas.toDataURL('image/png');
      imgRef.current = (resizedImg);
    };
  }
};