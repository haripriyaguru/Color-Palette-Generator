import {
  getContrastTextColor,
} from "../utils/colorUtils";

export default function ColorSwatch({
  color,
  onSelect,
  onCopy,
}) {
  if (!color) return null;

  const textColor =
    getContrastTextColor(
      color.r,
      color.g,
      color.b
    );

  const handleCopy = async (event) => {
    event.stopPropagation();

    if (onCopy) {
      onCopy(color.hex);
      return;
    }

    try {
      await navigator.clipboard.writeText(
        color.hex
      );
    } catch (error) {
      console.error(
        "Copy failed:",
        error
      );
    }
  };

  const handleSelect = () => {
    if (onSelect) {
      onSelect(color);
    }
  };

  return (
    <button
      type="button"
      className="color-swatch"
      style={{
        backgroundColor: color.hex,
        color: textColor,
      }}
      onClick={handleSelect}
    >
      <div className="color-swatch-content">

        <strong>
          {color.hex}
        </strong>

        {color.percentage !== undefined && (
          <span>
            {color.percentage}%
          </span>
        )}

        <span className="color-rgb">
          RGB {color.r}, {color.g}, {color.b}
        </span>

      </div>

      <span
        className="copy-color-button"
        onClick={handleCopy}
        title="Copy HEX"
        role="button"
        tabIndex={0}
        onKeyDown={(event) => {
          if (
            event.key === "Enter" ||
            event.key === " "
          ) {
            event.preventDefault();
            handleCopy(event);
          }
        }}
      >
        Copy
      </span>
    </button>
  );
}