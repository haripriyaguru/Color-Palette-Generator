import {
  mixColors,
  getContrastTextColor,
  rgbToHex,
} from "../utils/colorUtils";

export default function ShadesTints({
  color,
  onCopy,
}) {
  if (!color) return null;

  const white = {
    r: 255,
    g: 255,
    b: 255,
  };

  const black = {
    r: 0,
    g: 0,
    b: 0,
  };

  const tints = [0.8, 0.6, 0.4, 0.2].map(
    (amount) =>
      mixColors(color, white, amount)
  );

  const shades = [0.2, 0.4, 0.6, 0.8].map(
    (amount) =>
      mixColors(color, black, amount)
  );

  const renderColors = (colors) =>
    colors.map((item, index) => {
      const hex = rgbToHex(
        item.r,
        item.g,
        item.b
      );

      const handleColorCopy = () => {
        if (onCopy) {
          onCopy(hex);
          return;
        }

        navigator.clipboard
          .writeText(hex)
          .catch((error) => {
            console.error(
              "Copy failed:",
              error
            );
          });
      };

      return (
        <button
          key={`${hex}-${index}`}
          className="generated-color"
          style={{
            backgroundColor: hex,
            color: getContrastTextColor(
              item.r,
              item.g,
              item.b
            ),
          }}
          onClick={handleColorCopy}
          type="button"
        >
          {hex}
        </button>
      );
    });

  return (
    <section className="color-generation-section">

      <div className="section-heading">
        <div>
          <span>COLOR VARIATIONS</span>
          <h2>Shades & Tints</h2>
        </div>
      </div>

      <div className="variation-group">
        <h3>Tints</h3>

        <div className="variation-grid">
          {renderColors(tints)}
        </div>
      </div>

      <div className="variation-group">
        <h3>Base Color</h3>

        <div className="variation-grid base-grid">
          {renderColors([color])}
        </div>
      </div>

      <div className="variation-group">
        <h3>Shades</h3>

        <div className="variation-grid">
          {renderColors(shades)}
        </div>
      </div>

    </section>
  );
}