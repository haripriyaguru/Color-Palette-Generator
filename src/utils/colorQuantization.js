import { rgbToHex } from "./colorUtils";
import { getSmartColorName } from "./colorNames";
import { assignPaletteRoles } from "./paletteRoles";

// Quantize a color into a bucket
function quantizeColor(r, g, b, levels = 16) {
  const quantize = (value) =>
    Math.floor(value / levels) * levels;

  return {
    r: quantize(r),
    g: quantize(g),
    b: quantize(b),
  };
}

// Calculate distance between two colors
function getColorDistance(colorA, colorB) {
  const r = colorA.r - colorB.r;
  const g = colorA.g - colorB.g;
  const b = colorA.b - colorB.b;

  return Math.sqrt(
    r * r +
      g * g +
      b * b
  );
}

// Remove colors that are too similar
function getDistinctColors(
  colors,
  colorCount,
  minimumDistance = 45
) {
  const selectedColors = [];

  for (const color of colors) {
    if (
      selectedColors.length >= colorCount
    ) {
      break;
    }

    const isTooSimilar =
      selectedColors.some(
        (selectedColor) =>
          getColorDistance(
            color,
            selectedColor
          ) < minimumDistance
      );

    if (!isTooSimilar) {
      selectedColors.push(color);
    }
  }

  return selectedColors;
}

// Extract dominant colors from pixel data
export function extractDominantColors(
  pixelData,
  colorCount = 6
) {
  const colorMap = new Map();

  let totalPixels = 0;

  // Read every pixel
  for (
    let i = 0;
    i < pixelData.length;
    i += 4
  ) {
    const r = pixelData[i];
    const g = pixelData[i + 1];
    const b = pixelData[i + 2];
    const a = pixelData[i + 3];

    // Ignore transparent pixels
    if (a < 128) {
      continue;
    }

    // Group similar RGB values
    const color = quantizeColor(
      r,
      g,
      b
    );

    const key = `${color.r},${color.g},${color.b}`;

    if (colorMap.has(key)) {
      colorMap.get(key).count += 1;
    } else {
      colorMap.set(key, {
        r: color.r,
        g: color.g,
        b: color.b,
        count: 1,
      });
    }

    totalPixels++;
  }

  // Convert Map into array
  const colors = Array.from(
    colorMap.values()
  );

  // Sort by frequency
  colors.sort(
    (a, b) => b.count - a.count
  );

  // Remove visually similar colors
  const distinctColors =
    getDistinctColors(
      colors,
      colorCount,
      45
    );

  // Create final palette
  const dominantColors =
    distinctColors.map((color) => ({
      r: color.r,
      g: color.g,
      b: color.b,

      hex: rgbToHex(
        color.r,
        color.g,
        color.b
      ),

      percentage: Number(
        (
          (color.count / totalPixels) *
          100
        ).toFixed(1)
      ),

      name: getSmartColorName(
        color.r,
        color.g,
        color.b
      ),
    }));

  // Assign design roles
  return assignPaletteRoles(
    dominantColors
  );
}