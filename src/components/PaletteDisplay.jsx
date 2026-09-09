import ColorSwatch from "./ColorSwatch";

export default function PaletteDisplay({
  palette,
  onSelect,
  onCopy,
}) {
  if (!palette?.length) return null;

  return (
    <section className="palette-section">
      <div className="section-heading">
        <div>
          <span>EXTRACTED PALETTE</span>
          <h2>Dominant Colors</h2>
        </div>

        <span className="palette-count">
          {palette.length} colors
        </span>
      </div>

      <div className="palette-grid">
        {palette.map((color, index) => (
          <ColorSwatch
            key={`${color.hex}-${index}`}
            color={color}
            onSelect={onSelect}
            onCopy={onCopy}
          />
        ))}
      </div>
    </section>
  );
}