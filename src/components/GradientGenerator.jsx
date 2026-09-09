import { useState } from "react";

export default function GradientGenerator({
  palette,
  onCopy,
}) {
  const [direction, setDirection] =
    useState("to right");

  if (!palette?.length) {
    return null;
  }

  const colors = palette
    .slice(0, 5)
    .map((color) => color.hex);

  const gradients = [
    {
      name: "Primary Blend",
      colors: colors.slice(0, 2),
    },
    {
      name: "Accent Blend",
      colors: [
        colors[0],
        colors[2] || colors[1],
      ],
    },
    {
      name: "Full Palette",
      colors: colors,
    },
    {
      name: "Soft Blend",
      colors: [
        colors[1] || colors[0],
        colors[0],
        colors[2] || colors[0],
      ],
    },
  ];

  const createGradient = (gradientColors) => {
    return `linear-gradient(${direction}, ${gradientColors.join(
      ", "
    )})`;
  };

  const copyGradient = (gradient) => {
    if (onCopy) {
      onCopy(gradient);
      return;
    }

    navigator.clipboard
      .writeText(gradient)
      .catch((error) => {
        console.error(
          "Failed to copy gradient:",
          error
        );
      });
  };

  return (
    <section className="gradient-section">

      {/* HEADER */}

      <div className="section-heading">
        <div>
          <span>COLOR GENERATION</span>

          <h2>
            Gradient Generator
          </h2>
        </div>
      </div>

      <p className="gradient-description">
        Generate smooth gradients using
        colors extracted from your image.
      </p>

      {/* DIRECTION */}

      <div className="gradient-controls">

        <span>
          Direction
        </span>

        <div className="gradient-directions">

          {[
            {
              label: "→",
              value: "to right",
            },
            {
              label: "↓",
              value: "to bottom",
            },
            {
              label: "↘",
              value: "135deg",
            },
            {
              label: "↗",
              value: "45deg",
            },
          ].map((item) => (
            <button
              key={item.value}
              type="button"
              className={
                direction === item.value
                  ? "active"
                  : ""
              }
              onClick={() =>
                setDirection(item.value)
              }
            >
              {item.label}
            </button>
          ))}

        </div>

      </div>

      {/* GRADIENT CARDS */}

      <div className="gradient-grid">

        {gradients.map(
          (item, index) => {
            const gradient =
              createGradient(
                item.colors
              );

            return (
              <div
                className="gradient-card"
                key={`${item.name}-${index}`}
              >

                <div
                  className="gradient-preview"
                  style={{
                    background:
                      gradient,
                  }}
                >

                  <span>
                    {item.name}
                  </span>

                </div>

                <div className="gradient-info">

                  <code>
                    {gradient}
                  </code>

                  <button
                    type="button"
                    onClick={() =>
                      copyGradient(
                        gradient
                      )
                    }
                  >
                    Copy CSS
                  </button>

                </div>

              </div>
            );
          }
        )}

      </div>

    </section>
  );
}