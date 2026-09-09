import { detectPaletteMood } from "../utils/colorMood";

export default function MoodDetection({
  palette,
}) {
  if (!palette?.length) {
    return null;
  }

  const mood =
    detectPaletteMood(palette);

  return (
    <section className="mood-section">
      <div className="section-heading">
        <div>
          <span>
            COLOR PSYCHOLOGY
          </span>

          <h2>
            Palette Mood
          </h2>
        </div>

        <div className="primary-mood">
          {mood.primaryMood}
        </div>
      </div>

      <div className="mood-content">
        <div className="mood-description">
          <h3>
            {mood.primaryMood}
          </h3>

          <p>
            {mood.description}
          </p>
        </div>

        <div className="mood-tags">
          {mood.moods.map(
            (item) => (
              <span
                key={item}
                className="mood-tag"
              >
                {item}
              </span>
            )
          )}
        </div>
      </div>
    </section>
  );
}