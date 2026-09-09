export function processImage(file, maxSize = 1000) {
  return new Promise((resolve, reject) => {
    const image = new Image();

    const imageUrl = URL.createObjectURL(file);

    image.onload = () => {
      let width = image.width;
      let height = image.height;

      if (width > maxSize || height > maxSize) {
        const scale = Math.min(
          maxSize / width,
          maxSize / height
        );

        width = Math.round(width * scale);
        height = Math.round(height * scale);
      }

      const canvas = document.createElement("canvas");

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d", {
        willReadFrequently: true,
      });

      if (!ctx) {
        URL.revokeObjectURL(imageUrl);
        reject(new Error("Canvas is not supported."));
        return;
      }

      ctx.drawImage(image, 0, 0, width, height);

      const imageData = ctx.getImageData(
        0,
        0,
        width,
        height
      );

      URL.revokeObjectURL(imageUrl);

      resolve({
        pixelData: imageData.data,
        width,
        height,
      });
    };

    image.onerror = () => {
      URL.revokeObjectURL(imageUrl);
      reject(new Error("Failed to load image."));
    };

    image.src = imageUrl;
  });
}

export function sampleImagePixel(file, xRatio, yRatio) {
  return new Promise((resolve, reject) => {
    const image = new Image();

    const imageUrl = URL.createObjectURL(file);

    image.onload = () => {
      const canvas = document.createElement("canvas");

      canvas.width = 1;
      canvas.height = 1;

      const ctx = canvas.getContext("2d", {
        willReadFrequently: true,
      });

      const x = Math.min(
        image.width - 1,
        Math.max(0, Math.floor(xRatio * image.width))
      );

      const y = Math.min(
        image.height - 1,
        Math.max(0, Math.floor(yRatio * image.height))
      );

      ctx.drawImage(
        image,
        x,
        y,
        1,
        1,
        0,
        0,
        1,
        1
      );

      const pixel = ctx.getImageData(
        0,
        0,
        1,
        1
      ).data;

      URL.revokeObjectURL(imageUrl);

      resolve({
        r: pixel[0],
        g: pixel[1],
        b: pixel[2],
        a: pixel[3],
      });
    };

    image.onerror = () => {
      URL.revokeObjectURL(imageUrl);
      reject(new Error("Could not sample image."));
    };

    image.src = imageUrl;
  });
}