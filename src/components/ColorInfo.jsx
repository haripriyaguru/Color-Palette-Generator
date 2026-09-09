import {
  rgbToHsl,
  rgbToString,
} from "../utils/colorUtils";

export default function ColorInfo({
  color,
  onCopy,
}) {
  if (!color) return null;

  const hsl = rgbToHsl(
    color.r,
    color.g,
    color.b
  );

  const rgb = rgbToString(
    color.r,
    color.g,
    color.b
  );

  const handleCopy = (value) => {
    if (onCopy) {
      onCopy(value);
      return;
    }

    navigator.clipboard
      .writeText(value)
      .catch((error) => {
        console.error(
          "Copy failed:",
          error
        );
      });
  };

  return (
    <div className="color-info">

      <div
        className="color-preview"
        style={{
          backgroundColor: color.hex,
        }}
      />

      <div className="color-info-content">

        <span className="section-label">
          SELECTED COLOR
        </span>

        <h3>{color.hex}</h3>

        {/* HEX */}

        <div className="color-detail-row">

          <span>HEX</span>

          <button
            type="button"
            onClick={() =>
              handleCopy(color.hex)
            }
          >
            {color.hex}
            <span className="copy-icon">
              ⧉
            </span>
          </button>

        </div>

        {/* RGB */}

        <div className="color-detail-row">

          <span>RGB</span>

          <button
            type="button"
            onClick={() =>
              handleCopy(rgb)
            }
          >
            {rgb}
            <span className="copy-icon">
              ⧉
            </span>
          </button>

        </div>

        {/* HSL */}

        <div className="color-detail-row">

          <span>HSL</span>

          <button
            type="button"
            onClick={() =>
              handleCopy(
                `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`
              )
            }
          >
            hsl(
            {hsl.h},{" "}
            {hsl.s}%,
            {" "}
            {hsl.l}%
            )

            <span className="copy-icon">
              ⧉
            </span>
          </button>

        </div>

        {/* COVERAGE */}

        <div className="color-detail-row">

          <span>Coverage</span>

          <strong>
            {color.percentage
              ? `${color.percentage}%`
              : "Sampled pixel"}
          </strong>

        </div>

      </div>
    </div>
  );
}