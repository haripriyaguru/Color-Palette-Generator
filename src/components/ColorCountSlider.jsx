export default function ColorCountSlider({
  colorCount,
  setColorCount,
}) {
  return (
    <div className="color-count-control">
      <div className="color-count-header">
        <label htmlFor="color-count">
          Number of Colors
        </label>

        <span>{colorCount}</span>
      </div>

      <input
        id="color-count"
        type="range"
        min="3"
        max="10"
        step="1"
        value={colorCount}
        onChange={(event) =>
          setColorCount(
            Number(event.target.value)
          )
        }
      />

      <div className="slider-labels">
        <span>3</span>
        <span>10</span>
      </div>
    </div>
  );
}