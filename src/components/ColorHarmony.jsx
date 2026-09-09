import {
  hslToRgb,
  rgbToHex,
} from "../utils/colorUtils";

export default function ColorHarmony({ color }) {
  if (!color) return null;

  const { h, s, l } = color.hsl;

  const createHarmony = (name, offsets) => {
    return {
      name,
      colors: offsets.map((offset) => {
        const nextHue = (h + offset + 360) % 360;

        const rgb = hslToRgb(
          nextHue,
          s,
          l
        );

        return {
          ...rgb,
          hex: rgbToHex(
            rgb.r,
            rgb.g,
            rgb.b
          ),
        };
      }),
    };
  };

  const harmonies = [
    createHarmony("Complementary", [0, 180]),
    createHarmony("Analogous", [-30, 0, 30]),
    createHarmony("Triadic", [0, 120, 240]),
    createHarmony("Split Complementary", [
      0,
      150,
      210,
    ]),
  ];

  return (
    <section className="harmony-section">
      <div className="section-heading">
        <div>
          <span>COLOR THEORY</span>
          <h2>Color Harmony</h2>
        </div>
      </div>

      <div className="harmony-grid">
        {harmonies.map((harmony) => (
          <div
            className="harmony-card"
            key={harmony.name}
          >
            <h3>{harmony.name}</h3>

            <div className="harmony-colors">
              {harmony.colors.map((item) => (
                <button
                  key={item.hex}
                  type="button"
                  style={{
                    backgroundColor: item.hex,
                  }}
                  title={item.hex}
                  onClick={() =>
                    navigator.clipboard.writeText(
                      item.hex
                    )
                  }
                />
              ))}
            </div>

            <div className="harmony-values">
              {harmony.colors.map((item) => (
                <span key={`${harmony.name}-${item.hex}`}>
                  {item.hex}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}