import {
  getContrastRatio,
  getContrastTextColor,
} from "../utils/colorUtils";

export default function AccessibilityChecker({
  color,
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

  const whiteRatio = getContrastRatio(
    color,
    white
  );

  const blackRatio = getContrastRatio(
    color,
    black
  );

  const getLevel = (ratio) => {
    if (ratio >= 7) return "AAA";
    if (ratio >= 4.5) return "AA";
    if (ratio >= 3) return "AA Large";
    return "Fail";
  };

  const preferredText =
    getContrastTextColor(
      color.r,
      color.g,
      color.b
    );

  return (
    <section className="accessibility-section">
      <div className="section-heading">
        <div>
          <span>ACCESSIBILITY</span>
          <h2>Contrast checker</h2>
        </div>
      </div>

      <div className="accessibility-grid">
        <div className="contrast-card">
          <div
            className="contrast-preview"
            style={{
              backgroundColor: color.hex,
              color: "#FFFFFF",
            }}
          >
            White Text
          </div>

          <div className="contrast-info">
            <strong>
              {whiteRatio.toFixed(2)} : 1
            </strong>

            <span>
              WCAG {getLevel(whiteRatio)}
            </span>
          </div>
        </div>

        <div className="contrast-card">
          <div
            className="contrast-preview"
            style={{
              backgroundColor: color.hex,
              color: "#000000",
            }}
          >
            Black Text
          </div>

          <div className="contrast-info">
            <strong>
              {blackRatio.toFixed(2)} : 1
            </strong>

            <span>
              WCAG {getLevel(blackRatio)}
            </span>
          </div>
        </div>
      </div>

      <div className="recommended-text">
        Recommended text:
        <strong>{preferredText}</strong>
      </div>
    </section>
  );
}