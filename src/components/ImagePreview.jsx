import { useState } from "react";

export default function ImagePreview({
  src,
  onPixelSelect,
}) {
  const [cursorPosition, setCursorPosition] = useState(null);

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();

    const x =
      (event.clientX - rect.left) / rect.width;

    const y =
      (event.clientY - rect.top) / rect.height;

    setCursorPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setCursorPosition(null);
  };

  const handleClick = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();

    const x =
      (event.clientX - rect.left) / rect.width;

    const y =
      (event.clientY - rect.top) / rect.height;

    onPixelSelect(x, y);
  };

  return (
    <div className="image-preview-wrapper">
      <img
        src={src}
        alt="Uploaded"
        className="interactive-image"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      />

      <div className="image-click-hint">
        Click anywhere on the image to sample a color
      </div>

      {cursorPosition && (
        <div
          className="image-cursor"
          style={{
            left: `${cursorPosition.x * 100}%`,
            top: `${cursorPosition.y * 100}%`,
          }}
        />
      )}
    </div>
  );
}