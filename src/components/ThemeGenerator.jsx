import { useState } from "react";

export default function ThemeGenerator({
  palette,
  onCopy,
}) {
  const [mode, setMode] = useState("light");

  if (!palette?.length) {
    return null;
  }

  const getColor = (role, fallbackIndex) => {
    const roleColor = palette.find(
      (color) =>
        color.role?.toLowerCase() ===
        role.toLowerCase()
    );

    return (
      roleColor?.hex ||
      palette[fallbackIndex]?.hex ||
      "#111111"
    );
  };

  const primary = getColor("primary", 0);
  const secondary = getColor("secondary", 1);
  const accent = getColor("accent", 2);
  const background = getColor("background", 0);
  const text = getColor("text", 3);

  const cssVariables = `:root {
  --primary: ${primary};
  --secondary: ${secondary};
  --accent: ${accent};
  --background: ${background};
  --text: ${text};
}`;

  const handleCopyCSS = () => {
    if (onCopy) {
      onCopy(cssVariables);
      return;
    }

    navigator.clipboard
      .writeText(cssVariables)
      .catch((error) => {
        console.error(
          "Copy failed:",
          error
        );
      });
  };

  const previewBackground =
    mode === "light"
      ? background
      : "#111111";

  const previewText =
    mode === "light"
      ? text
      : "#F5F5F5";

  return (
    <section className="theme-generator-section">

      {/* HEADER */}

      <div className="section-heading">
        <div>
          <span>DESIGN SYSTEM</span>

          <h2>
            Turn your palette into a design system.
          </h2>
        </div>

        <span className="theme-badge">
          LIVE
        </span>
      </div>

      {/* COLOR TOKENS */}

      <div className="theme-token-panel">

        <div className="theme-token-header">

          <div>
            <span className="token-label">
              COLOR TOKENS
            </span>

            <h3>
              Generated Design Tokens
            </h3>
          </div>

          <button
            type="button"
            className="copy-css-button"
            onClick={handleCopyCSS}
          >
            Copy CSS
          </button>

        </div>

        <div className="theme-tokens">

          <Token
            label="Primary"
            color={primary}
            onCopy={onCopy}
          />

          <Token
            label="Secondary"
            color={secondary}
            onCopy={onCopy}
          />

          <Token
            label="Accent"
            color={accent}
            onCopy={onCopy}
          />

          <Token
            label="Background"
            color={background}
            onCopy={onCopy}
          />

          <Token
            label="Text"
            color={text}
            onCopy={onCopy}
          />

        </div>
      </div>

      {/* GENERATED CSS */}

      <div className="generated-css-panel">

        <div className="generated-css-header">

          <div>
            <span className="token-label">
              DEVELOPER OUTPUT
            </span>

            <h3>
              Generated CSS Variables
            </h3>
          </div>

          <button
            type="button"
            onClick={handleCopyCSS}
          >
            Copy CSS
          </button>

        </div>

        <pre>
          <code>
            {cssVariables}
          </code>
        </pre>

      </div>

      {/* LIVE PREVIEW */}

      <div className="theme-preview-header">

        <div>
          <span className="token-label">
            LIVE PREVIEW
          </span>

          <h3>
            See your design system in action
          </h3>
        </div>

        <div className="theme-mode-switch">

          <button
            type="button"
            className={
              mode === "light"
                ? "active"
                : ""
            }
            onClick={() =>
              setMode("light")
            }
          >
            Light
          </button>

          <button
            type="button"
            className={
              mode === "dark"
                ? "active"
                : ""
            }
            onClick={() =>
              setMode("dark")
            }
          >
            Dark
          </button>

        </div>

      </div>

      <div
        className="theme-live-preview"
        style={{
          backgroundColor:
            previewBackground,
          color: previewText,
        }}
      >

        {/* NAVBAR */}

        <nav className="live-nav">

          <strong>
            Studio
          </strong>

          <div className="live-nav-links">
            <span>Home</span>
            <span>Projects</span>
            <span>About</span>
          </div>

          <button
            type="button"
            style={{
              backgroundColor:
                primary,
            }}
          >
            Contact
          </button>

        </nav>

        {/* HERO */}

        <div className="live-hero">

          <div className="live-hero-content">

            <span
              className="live-small-label"
              style={{
                color: accent,
              }}
            >
              GENERATED DESIGN SYSTEM
            </span>

            <h3>
              Create something
              <br />
              people remember.
            </h3>

            <p>
              This interface is automatically
              styled using the colors extracted
              from your image.
            </p>

            <div className="live-buttons">

              <button
                type="button"
                style={{
                  backgroundColor:
                    primary,
                }}
              >
                Get Started
              </button>

              <button
                type="button"
                style={{
                  color: previewText,
                  borderColor:
                    secondary,
                }}
              >
                Explore
              </button>

            </div>

          </div>

          <div
            className="live-visual"
            style={{
              backgroundColor:
                secondary,
            }}
          >

            <div
              className="live-accent-circle"
              style={{
                backgroundColor:
                  accent,
              }}
            />

            <div
              className="live-floating-card"
              style={{
                backgroundColor:
                  primary,
              }}
            >

              <span>
                PRIMARY TOKEN
              </span>

              <strong>
                {primary}
              </strong>

              <div className="live-color-dots">

                <span
                  style={{
                    backgroundColor:
                      primary,
                  }}
                />

                <span
                  style={{
                    backgroundColor:
                      secondary,
                  }}
                />

                <span
                  style={{
                    backgroundColor:
                      accent,
                  }}
                />

              </div>

            </div>

          </div>

        </div>

        {/* COMPONENTS */}

        <div className="live-components">

          <div
            className="live-component-card"
            style={{
              borderColor:
                secondary,
            }}
          >

            <span
              className="component-icon"
              style={{
                backgroundColor:
                  accent,
              }}
            >
              A
            </span>

            <h4>
              Primary Component
            </h4>

            <p>
              Main actions use your primary
              brand color.
            </p>

            <button
              type="button"
              style={{
                backgroundColor:
                  primary,
              }}
            >
              Action
            </button>

          </div>

          <div
            className="live-component-card"
            style={{
              borderColor:
                secondary,
            }}
          >

            <span
              className="component-icon"
              style={{
                backgroundColor:
                  secondary,
              }}
            >
              B
            </span>

            <h4>
              Supporting Component
            </h4>

            <p>
              Supporting elements use your
              secondary color.
            </p>

            <button
              type="button"
              style={{
                backgroundColor:
                  secondary,
              }}
            >
              View More
            </button>

          </div>

          <div
            className="live-component-card"
            style={{
              borderColor:
                secondary,
            }}
          >

            <span
              className="component-icon"
              style={{
                backgroundColor:
                  accent,
              }}
            >
              C
            </span>

            <h4>
              Accent Component
            </h4>

            <p>
              Accent colors highlight
              important information.
            </p>

            <span
              className="live-badge"
              style={{
                backgroundColor:
                  accent,
              }}
            >
              Featured
            </span>

          </div>

        </div>

      </div>

    </section>
  );
}


/* ================================
   COLOR TOKEN
================================ */

function Token({
  label,
  color,
  onCopy,
}) {
  const handleCopy = () => {
    if (onCopy) {
      onCopy(color);
      return;
    }

    navigator.clipboard
      .writeText(color)
      .catch((error) => {
        console.error(
          "Copy failed:",
          error
        );
      });
  };

  return (
    <button
      type="button"
      className="theme-token"
      onClick={handleCopy}
    >

      <span
        className="token-color"
        style={{
          backgroundColor:
            color,
        }}
      />

      <span className="token-details">

        <strong>
          {label}
        </strong>

        <small>
          {color}
        </small>

      </span>

      <span className="token-copy">
        Copy
      </span>

    </button>
  );
}