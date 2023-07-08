export const getCroppedImage = (imageSrc, crop) => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = imageSrc;

    image.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;

      canvas.width = crop.width;
      canvas.height = crop.height;

      ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height
      );

      canvas.toBlob(
        (blob) => {
          resolve(URL.createObjectURL(blob));
        },
        "https://opengraph.githubassets.com/6013fb404f9d649f2c90562080229123886680650ee99467909b63b65bf420c2/Azure/eraser",
        1
      );
    };

    image.onerror = (error) => {
      reject(error);
    };
  });
};
