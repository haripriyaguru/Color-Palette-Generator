import {
  rgbToHsl,
  getContrastTextColor,
} from "../utils/colorUtils";

import {
  calculatePaletteQuality,
} from "../utils/paletteQuality";

export default function ExportPanel({
  palette,
  onCopy,
}) {
  if (!palette?.length) {
    return null;
  }

  const downloadFile = (
    content,
    filename,
    type
  ) => {
    const blob = new Blob([content], {
      type,
    });

    const url =
      URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;
    link.download = filename;

    document.body.appendChild(link);

    link.click();

    link.remove();

    URL.revokeObjectURL(url);
  };

  /* ================================
     COPY HEX
  ================================= */

  const copyAll = () => {
    const values = palette
      .map((color) => color.hex)
      .join("\n");

    if (onCopy) {
      onCopy(values);
      return;
    }

    navigator.clipboard
      .writeText(values)
      .catch((error) => {
        console.error(
          "Copy failed:",
          error
        );
      });
  };

  /* ================================
     EXPORT CSS
  ================================= */

  const exportCSS = () => {
    const css = `:root {
${palette
  .map(
    (color, index) =>
      `  --color-${index + 1}: ${color.hex};`
  )
  .join("\n")}
}`;

    downloadFile(
      css,
      "colorcraft-palette.css",
      "text/css"
    );
  };

  /* ================================
     EXPORT JSON
  ================================= */

  const exportJSON = () => {
    const data = palette.map(
      (color) => ({
        name:
          color.name || "Color",

        role:
          color.role || "supporting",

        hex: color.hex,

        rgb: {
          r: color.r,
          g: color.g,
          b: color.b,
        },

        hsl: rgbToHsl(
          color.r,
          color.g,
          color.b
        ),

        percentage:
          color.percentage,
      })
    );

    downloadFile(
      JSON.stringify(
        data,
        null,
        2
      ),
      "colorcraft-palette.json",
      "application/json"
    );
  };

  /* ================================
     BEAUTIFUL PNG
  ================================= */

  const exportPNG = () => {
    const canvas =
      document.createElement(
        "canvas"
      );

    const width = 1600;
    const height = 1000;

    canvas.width = width;
    canvas.height = height;

    const ctx =
      canvas.getContext("2d");

    if (!ctx) return;

    /* Background */

    ctx.fillStyle = "#F7F7F5";

    ctx.fillRect(
      0,
      0,
      width,
      height
    );

    /* Header */

    ctx.fillStyle = "#111111";

    ctx.font =
      "bold 34px Arial";

    ctx.fillText(
      "COLORCRAFT",
      90,
      100
    );

    ctx.font =
      "20px Arial";

    ctx.fillStyle = "#777777";

    ctx.fillText(
      "Generated Color Palette",
      90,
      140
    );

    /* Quality */

    const quality =
      calculatePaletteQuality(
        palette
      );

    ctx.fillStyle = "#111111";

    ctx.font =
      "bold 22px Arial";

    ctx.fillText(
      `${palette.length} Colors`,
      1200,
      100
    );

    ctx.font =
      "18px Arial";

    ctx.fillStyle = "#777777";

    ctx.fillText(
      `Quality ${quality.score}/100`,
      1200,
      130
    );

    /* Main palette */

    const paletteX = 90;
    const paletteY = 200;

    const paletteWidth =
      width - 180;

    const paletteHeight = 330;

    const total =
      palette.reduce(
        (sum, color) =>
          sum +
          Math.max(
            color.percentage || 1,
            1
          ),
        0
      );

    let currentX =
      paletteX;

    palette.forEach(
      (color) => {
        const segmentWidth =
          (Math.max(
            color.percentage || 1,
            1
          ) /
            total) *
          paletteWidth;

        ctx.fillStyle =
          color.hex;

        ctx.fillRect(
          currentX,
          paletteY,
          segmentWidth,
          paletteHeight
        );

        /* HEX */

        ctx.fillStyle =
          getContrastTextColor(
            color.r,
            color.g,
            color.b
          );

        ctx.font =
          "bold 22px Arial";

        ctx.fillText(
          color.hex,
          currentX + 20,
          paletteY +
            paletteHeight -
            45
        );

        currentX +=
          segmentWidth;
      }
    );

    /* Color details */

    const startY = 590;

    const columnWidth =
      paletteWidth /
      palette.length;

    palette.forEach(
      (color, index) => {
        const x =
          paletteX +
          index *
            columnWidth;

        /* Color dot */

        ctx.fillStyle =
          color.hex;

        ctx.beginPath();

        ctx.arc(
          x + 12,
          startY,
          10,
          0,
          Math.PI * 2
        );

        ctx.fill();

        /* Name */

        ctx.fillStyle =
          "#111111";

        ctx.font =
          "bold 18px Arial";

        ctx.fillText(
          color.name ||
            "Color",
          x,
          startY + 50
        );

        /* Role */

        ctx.fillStyle =
          "#777777";

        ctx.font =
          "15px Arial";

        ctx.fillText(
          color.role ||
            "Supporting",
          x,
          startY + 75
        );

        /* HEX */

        ctx.fillStyle =
          "#111111";

        ctx.font =
          "bold 17px monospace";

        ctx.fillText(
          color.hex,
          x,
          startY + 105
        );

        /* Percentage */

        ctx.fillStyle =
          "#777777";

        ctx.font =
          "15px Arial";

        ctx.fillText(
          `${color.percentage || 0}% coverage`,
          x,
          startY + 130
        );
      }
    );

    /* Footer */

    ctx.fillStyle =
      "#AAAAAA";

    ctx.font =
      "14px Arial";

    ctx.fillText(
      "Generated with ColorCraft · Client-side color intelligence",
      90,
      930
    );

    /* Download */

    const link =
      document.createElement("a");

    link.download =
      "colorcraft-palette.png";

    link.href =
      canvas.toDataURL(
        "image/png"
      );

    link.click();
  };

  return (
    <section className="export-section">

      <div className="section-heading">

        <div>

          <span>
            EXPORT
          </span>

          <h2>
            Take your palette with you.
          </h2>

        </div>

      </div>

      <div className="export-buttons">

        {/* COPY HEX */}

        <button
          type="button"
          onClick={copyAll}
        >
          Copy HEX
        </button>

        {/* EXPORT CSS */}

        <button
          type="button"
          onClick={exportCSS}
        >
          Export CSS
        </button>

        {/* EXPORT JSON */}

        <button
          type="button"
          onClick={exportJSON}
        >
          Export JSON
        </button>

        {/* EXPORT PNG */}

        <button
          type="button"
          onClick={exportPNG}
          className="primary-export-button"
        >
          Export Beautiful PNG
        </button>

      </div>

    </section>
  );
}