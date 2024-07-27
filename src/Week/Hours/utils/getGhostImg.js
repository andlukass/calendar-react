import html2canvas from "html2canvas";

export const getGhostImg = async (ref, imgRef) => {
  if (ref.current) {
    const width = ref.current.offsetWidth;
    const height = ref.current.offsetHeight;
    const canvas = await html2canvas(ref.current, {
      backgroundColor: null, // Define o fundo como transparente
      scale: 1,
      width: width,
      height: height,
    });
    const imgData = canvas.toDataURL('image/png');
    const img = new Image();
    img.src = imgData;
    img.onload = () => {
      imgRef.current = (img);
    };
  }
};