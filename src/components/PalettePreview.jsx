import { useState } from "react";

export default function PalettePreview({
  palette,
}) {
  const [layout, setLayout] =
    useState("landing");

  if (!palette?.length) {
    return null;
  }

  const getColor = (
    role,
    fallbackIndex
  ) => {
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
  const background = getColor(
    "background",
    0
  );
  const text = getColor("text", 3);

  return (
    <section className="palette-preview-section">

      {/* HEADER */}

      <div className="section-heading">
        <div>
          <span>VISUAL PREVIEW</span>

          <h2>
            See your palette in different interfaces.
          </h2>
        </div>
      </div>

      {/* LAYOUT SWITCHER */}

      <div className="preview-switcher">

        <button
          type="button"
          className={
            layout === "landing"
              ? "active"
              : ""
          }
          onClick={() =>
            setLayout("landing")
          }
        >
          Landing Page
        </button>

        <button
          type="button"
          className={
            layout === "dashboard"
              ? "active"
              : ""
          }
          onClick={() =>
            setLayout("dashboard")
          }
        >
          Dashboard
        </button>

        <button
          type="button"
          className={
            layout === "mobile"
              ? "active"
              : ""
          }
          onClick={() =>
            setLayout("mobile")
          }
        >
          Mobile App
        </button>

      </div>

      {/* PREVIEW */}

      <div
        className={`palette-preview ${
          layout
        }`}
        style={{
          "--preview-primary":
            primary,
          "--preview-secondary":
            secondary,
          "--preview-accent":
            accent,
          "--preview-background":
            background,
          "--preview-text": text,
        }}
      >

        {layout === "landing" && (
          <LandingPreview
            primary={primary}
            secondary={secondary}
            accent={accent}
            background={background}
            text={text}
          />
        )}

        {layout === "dashboard" && (
          <DashboardPreview
            primary={primary}
            secondary={secondary}
            accent={accent}
            background={background}
            text={text}
          />
        )}

        {layout === "mobile" && (
          <MobilePreview
            primary={primary}
            secondary={secondary}
            accent={accent}
            background={background}
            text={text}
          />
        )}

      </div>

    </section>
  );
}


/* =================================
   LANDING PAGE
================================= */

function LandingPreview({
  primary,
  secondary,
  accent,
  background,
  text,
}) {
  return (
    <div
      className="landing-ui"
      style={{
        backgroundColor:
          background,
        color: text,
      }}
    >

      <nav className="preview-nav">

        <strong>
          Brand.
        </strong>

        <div>
          <span>Features</span>
          <span>About</span>
          <span>Contact</span>
        </div>

        <button
          type="button"
          style={{
            backgroundColor:
              primary,
          }}
        >
          Start
        </button>

      </nav>

      <div className="landing-content">

        <div>

          <span
            className="preview-eyebrow"
            style={{
              color: accent,
            }}
          >
            CREATIVE STUDIO
          </span>

          <h3>
            Design that
            <br />
            feels different.
          </h3>

          <p>
            A landing page automatically
            styled using your extracted
            image palette.
          </p>

          <button
            type="button"
            className="preview-main-button"
            style={{
              backgroundColor:
                primary,
            }}
          >
            Explore
          </button>

        </div>

        <div
          className="landing-art"
          style={{
            backgroundColor:
              secondary,
          }}
        >

          <div
            style={{
              backgroundColor:
                accent,
            }}
          />

          <div
            style={{
              backgroundColor:
                primary,
            }}
          />

        </div>

      </div>

      <div className="landing-stats">

        <div>
          <strong>24K</strong>
          <span>Users</span>
        </div>

        <div>
          <strong>98%</strong>
          <span>Satisfaction</span>
        </div>

        <div>
          <strong>4.9</strong>
          <span>Rating</span>
        </div>

      </div>

    </div>
  );
}


/* =================================
   DASHBOARD
================================= */

function DashboardPreview({
  primary,
  secondary,
  accent,
  background,
  text,
}) {
  return (
    <div
      className="dashboard-ui"
      style={{
        backgroundColor:
          background,
        color: text,
      }}
    >

      <aside
        className="dashboard-sidebar"
        style={{
          backgroundColor:
            primary,
        }}
      >

        <strong>
          Dashboard
        </strong>

        <div>
          <span>Overview</span>
          <span>Analytics</span>
          <span>Projects</span>
          <span>Settings</span>
        </div>

      </aside>

      <main className="dashboard-main">

        <div className="dashboard-top">

          <div>
            <span className="preview-eyebrow">
              OVERVIEW
            </span>

            <h3>
              Good morning
            </h3>
          </div>

          <span
            className="dashboard-badge"
            style={{
              backgroundColor:
                accent,
            }}
          >
            Live
          </span>

        </div>

        <div className="dashboard-cards">

          <MetricCard
            title="Revenue"
            value="$24,680"
            color={primary}
          />

          <MetricCard
            title="Customers"
            value="8,492"
            color={secondary}
          />

          <MetricCard
            title="Growth"
            value="+24.8%"
            color={accent}
          />

        </div>

        <div
          className="dashboard-chart"
          style={{
            borderColor:
              secondary,
          }}
        >

          <div className="chart-header">
            <strong>
              Performance
            </strong>

            <span>
              Last 30 days
            </span>
          </div>

          <div className="chart-bars">

            {[45, 70, 55, 85, 65, 92, 75].map(
              (height, index) => (
                <span
                  key={index}
                  style={{
                    height: `${height}%`,
                    backgroundColor:
                      index === 5
                        ? accent
                        : primary,
                  }}
                />
              )
            )}

          </div>

        </div>

      </main>

    </div>
  );
}


/* =================================
   METRIC CARD
================================= */

function MetricCard({
  title,
  value,
  color,
}) {
  return (
    <div
      className="metric-card"
      style={{
        borderTopColor:
          color,
      }}
    >
      <span>{title}</span>

      <strong>{value}</strong>

      <small>
        +12.4% from last month
      </small>
    </div>
  );
}


/* =================================
   MOBILE APP
================================= */

function MobilePreview({
  primary,
  secondary,
  accent,
  background,
  text,
}) {
  return (
    <div className="mobile-stage">

      <div
        className="mobile-phone"
        style={{
          backgroundColor:
            background,
          color: text,
        }}
      >

        <div className="mobile-status">
          <span>9:41</span>
          <span>● ●</span>
        </div>

        <div className="mobile-header">

          <div>
            <span>
              Welcome back
            </span>

            <strong>
              Alex
            </strong>
          </div>

          <div
            className="mobile-avatar"
            style={{
              backgroundColor:
                accent,
            }}
          >
            A
          </div>

        </div>

        <div
          className="mobile-highlight"
          style={{
            backgroundColor:
              primary,
          }}
        >

          <span>
            Your balance
          </span>

          <strong>
            $12,840.50
          </strong>

          <small>
            +8.2% this month
          </small>

        </div>

        <div className="mobile-actions">

          <div
            style={{
              backgroundColor:
                secondary,
            }}
          >
            <strong>+</strong>
            <span>Add</span>
          </div>

          <div
            style={{
              backgroundColor:
                accent,
            }}
          >
            <strong>↗</strong>
            <span>Send</span>
          </div>

          <div
            style={{
              backgroundColor:
                primary,
            }}
          >
            <strong>↓</strong>
            <span>Pay</span>
          </div>

        </div>

        <div className="mobile-section-title">
          <strong>
            Recent Activity
          </strong>

          <span>
            View all
          </span>
        </div>

        <div className="mobile-list">

          <Activity
            title="Coffee Shop"
            amount="- $6.40"
          />

          <Activity
            title="Salary"
            amount="+ $2,400"
          />

          <Activity
            title="Shopping"
            amount="- $84.20"
          />

        </div>

        <div
          className="mobile-bottom"
          style={{
            borderTopColor:
              secondary,
          }}
        >
          <span>⌂</span>
          <span>⌕</span>
          <span>♡</span>
          <span>☰</span>
        </div>

      </div>

    </div>
  );
}


/* =================================
   ACTIVITY
================================= */

function Activity({
  title,
  amount,
}) {
  return (
    <div className="activity-row">
      <div className="activity-icon">
        •
      </div>

      <span>{title}</span>

      <strong>{amount}</strong>
    </div>
  );
}