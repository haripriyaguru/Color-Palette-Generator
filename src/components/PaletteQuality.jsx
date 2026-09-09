import {
  calculatePaletteQuality,
} from "../utils/paletteQuality";

export default function PaletteQuality({
  palette,
}) {
  if (!palette?.length) {
    return null;
  }

  const quality =
    calculatePaletteQuality(
      palette
    );

  return (
    <section className="quality-section">
      <div className="section-heading">
        <div>
          <span>
            PALETTE ANALYSIS
          </span>

          <h2>
            Palette Quality
          </h2>
        </div>

        <div className="quality-score">
          {quality.score}
          <small>/100</small>
        </div>
      </div>

      <div className="quality-bar">
        <div
          className="quality-bar-fill"
          style={{
            width: `${quality.score}%`,
          }}
        />
      </div>

      <div className="quality-metrics">
        <div className="quality-metric">
          <strong>
            {quality.diversity}
          </strong>

          <span>
            Color Diversity
          </span>
        </div>

        <div className="quality-metric">
          <strong>
            {quality.balance}
          </strong>

          <span>
            Distribution
          </span>
        </div>

        <div className="quality-metric">
          <strong>
            {quality.contrast}
          </strong>

          <span>
            Contrast
          </span>
        </div>
      </div>

      <div className="quality-feedback">
        {quality.feedback.map(
          (message, index) => (
            <div
              key={`${message}-${index}`}
            >
              <span>✓</span>
              {message}
            </div>
          )
        )}
      </div>
    </section>
  );
}