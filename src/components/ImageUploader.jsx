import { useCallback, useRef, useState } from "react";

export default function ImageUploader({ onImageSelect, disabled }) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleFile = useCallback(
    (file) => {
      if (!file) return;

      if (!file.type.startsWith("image/")) {
        alert("Please select a valid image file.");
        return;
      }

      onImageSelect(file);
    },
    [onImageSelect]
  );

  const handleInputChange = (event) => {
    const file = event.target.files?.[0];

    handleFile(file);

    // Allow selecting the same file again
    event.target.value = "";
  };

  const handleDragOver = (event) => {
    event.preventDefault();

    if (!disabled) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);

    if (disabled) return;

    const file = event.dataTransfer.files?.[0];

    handleFile(file);
  };

  const handleBrowseClick = () => {
    if (!disabled) {
      fileInputRef.current?.click();
    }
  };

  return (
    <div
      className={`upload-area ${isDragging ? "dragging" : ""} ${
        disabled ? "disabled" : ""
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleInputChange}
        hidden
      />

      <div className="upload-icon">🖼️</div>

      <h2>Drop your image here</h2>

      <p>or</p>

      <button
        type="button"
        onClick={handleBrowseClick}
        disabled={disabled}
        className="browse-button"
      >
        Browse Image
      </button>

      <span className="upload-hint">
        JPG, JPEG, PNG or WEBP
      </span>
    </div>
  );
}