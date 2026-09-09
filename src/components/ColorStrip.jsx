export default function ColorStrip({ palette }) {
  if (!palette?.length) return null;

  return (
    <section className="color-strip-section">
      <div className="section-heading">
        <div>
          <span>COLOR STORY</span>
          <h2>Visual distribution</h2>
        </div>
      </div>

      <div className="color-strip">
        {palette.map((color, index) => (
          <div
            key={`${color.hex}-${index}`}
            className="strip-segment"
            style={{
              backgroundColor: color.hex,
              flex: Math.max(color.percentage, 2),
            }}
            title={`${color.hex} — ${color.percentage}%`}
          />
        ))}
      </div>

      <div className="strip-labels">
        {palette.map((color, index) => (
          <span key={`${color.hex}-label-${index}`}>
            {color.hex}
          </span>
        ))}
      </div>
    </section>
  );
}