import { getSmartColorName } from "./colorNames";
export function rgbToHex(r, g, b) {
  return (
    "#" +
    [r, g, b]
      .map((value) => Math.max(0, Math.min(255, Math.round(value))))
      .map((value) => value.toString(16).padStart(2, "0"))
      .join("")
      .toUpperCase()
  );
}

export function hexToRgb(hex) {
  const cleanHex = hex.replace("#", "");

  const value =
    cleanHex.length === 3
      ? cleanHex
          .split("")
          .map((char) => char + char)
          .join("")
      : cleanHex;

  return {
    r: parseInt(value.slice(0, 2), 16),
    g: parseInt(value.slice(2, 4), 16),
    b: parseInt(value.slice(4, 6), 16),
  };
}

export function rgbToHsl(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);

  let h = 0;
  let s = 0;

  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;

    s =
      l > 0.5
        ? d / (2 - max - min)
        : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;

      case g:
        h = (b - r) / d + 2;
        break;

      case b:
        h = (r - g) / d + 4;
        break;

      default:
        break;
    }

    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

export function hslToRgb(h, s, l) {
  h /= 360;
  s /= 100;
  l /= 100;

  if (s === 0) {
    const value = Math.round(l * 255);

    return {
      r: value,
      g: value,
      b: value,
    };
  }

  const hueToRgb = (p, q, t) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;

    if (t < 1 / 6) {
      return p + (q - p) * 6 * t;
    }

    if (t < 1 / 2) {
      return q;
    }

    if (t < 2 / 3) {
      return p + (q - p) * (2 / 3 - t) * 6;
    }

    return p;
  };

  const q =
    l < 0.5
      ? l * (1 + s)
      : l + s - l * s;

  const p = 2 * l - q;

  return {
    r: Math.round(hueToRgb(p, q, h + 1 / 3) * 255),
    g: Math.round(hueToRgb(p, q, h) * 255),
    b: Math.round(hueToRgb(p, q, h - 1 / 3) * 255),
  };
}

export function rgbToString(r, g, b) {
  return `rgb(${r}, ${g}, ${b})`;
}

export function getContrastTextColor(r, g, b) {
  const brightness =
    (r * 299 + g * 587 + b * 114) / 1000;

  return brightness > 145 ? "#111111" : "#FFFFFF";
}

export function getRelativeLuminance(r, g, b) {
  const values = [r, g, b].map((value) => {
    const channel = value / 255;

    return channel <= 0.03928
      ? channel / 12.92
      : Math.pow(
          (channel + 0.055) / 1.055,
          2.4
        );
  });

  return (
    0.2126 * values[0] +
    0.7152 * values[1] +
    0.0722 * values[2]
  );
}

export function getContrastRatio(colorA, colorB) {
  const luminanceA = getRelativeLuminance(
    colorA.r,
    colorA.g,
    colorA.b
  );

  const luminanceB = getRelativeLuminance(
    colorB.r,
    colorB.g,
    colorB.b
  );

  const lighter = Math.max(luminanceA, luminanceB);
  const darker = Math.min(luminanceA, luminanceB);

  return (lighter + 0.05) / (darker + 0.05);
}

export function mixColors(colorA, colorB, amount) {
  return {
    r: Math.round(
      colorA.r + (colorB.r - colorA.r) * amount
    ),
    g: Math.round(
      colorA.g + (colorB.g - colorA.g) * amount
    ),
    b: Math.round(
      colorA.b + (colorB.b - colorA.b) * amount
    ),
  };
}

export function createColorFromRgb(r, g, b) {
  const hsl = rgbToHsl(r, g, b);

  return {
    r,
    g,
    b,
    hex: rgbToHex(r, g, b),
    hsl,
    name: getSmartColorName(r, g, b),
  };
}