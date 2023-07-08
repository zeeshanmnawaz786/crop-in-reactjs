import React, { useRef, useState } from 'react';
import { Stage, Layer, Image, Rect, Transformer } from 'react-konva';

const ImageCrop = () => {
  const imageRef = useRef();
  const trRef = useRef();
  const [cropRect, setCropRect] = useState(null);

  const handleCrop = () => {
    if (!cropRect) return;

    // Create a canvas element
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    // Set the canvas size to the crop rectangle size
    canvas.width = cropRect.width();
    canvas.height = cropRect.height();

    // Draw the cropped image onto the canvas
    context.drawImage(
      imageRef.current.image(),
      cropRect.x(),
      cropRect.y(),
      cropRect.width(),
      cropRect.height(),
      0,
      0,
      canvas.width,
      canvas.height
    );

    // Get the cropped image data URL
    const croppedImageDataURL = canvas.toDataURL();

    // Use the cropped image data URL as needed
    console.log(croppedImageDataURL);
  };

  return (
    <div>
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          <Image
            image={imageRef.current}
            draggable
            onDragEnd={(e) => {
              setCropRect(null);
              e.target.to({
                duration: 0.5,
                easing: 'ease-in-out',
                scaleX: 1,
                scaleY: 1
              });
            }}
          />
          <Rect
            ref={trRef}
            visible={!!cropRect}
            {...cropRect}
            draggable
            onTransformEnd={() => {
              const node = trRef.current;
              const scaleX = node.scaleX();
              const scaleY = node.scaleY();

              // Update the crop rectangle size and position
              setCropRect({
                ...cropRect,
                x: node.x(),
                y: node.y(),
                width: node.width() * scaleX,
                height: node.height() * scaleY
              });

              // Reset the scale
              node.scaleX(1);
              node.scaleY(1);
            }}
          />
        </Layer>
      </Stage>
      <button onClick={handleCrop}>Crop Image</button>
    </div>
  );
};

export default ImageCrop;
