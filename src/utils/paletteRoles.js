export function assignPaletteRoles(palette) {
  if (!palette || palette.length === 0) {
    return [];
  }

  const getLightness = (color) => {
    const r = color.r / 255;
    const g = color.g / 255;
    const b = color.b / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);

    return ((max + min) / 2) * 100;
  };

  const getSaturation = (color) => {
    const r = color.r / 255;
    const g = color.g / 255;
    const b = color.b / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);

    const lightness = (max + min) / 2;

    if (max === min) {
      return 0;
    }

    const difference = max - min;

    return (
      (difference /
        (1 - Math.abs(2 * lightness - 1))) *
      100
    );
  };

  const colors = palette.map((color) => ({
    ...color,
    lightness: getLightness(color),
    saturation: getSaturation(color),
  }));

  const backgroundColor = [...colors].sort(
    (a, b) => b.lightness - a.lightness
  )[0];

  const textColor = [...colors].sort(
    (a, b) => a.lightness - b.lightness
  )[0];

  const accentColor = [...colors].sort(
    (a, b) => b.saturation - a.saturation
  )[0];

  const used = new Set();
  const roleMap = new Map();

  if (backgroundColor) {
    roleMap.set(
      backgroundColor.hex,
      "Background"
    );
    used.add(backgroundColor.hex);
  }

  if (textColor && !used.has(textColor.hex)) {
    roleMap.set(
      textColor.hex,
      "Text"
    );
    used.add(textColor.hex);
  }

  if (accentColor && !used.has(accentColor.hex)) {
    roleMap.set(
      accentColor.hex,
      "Accent"
    );
    used.add(accentColor.hex);
  }

  const remaining = colors
    .filter(
      (color) => !used.has(color.hex)
    )
    .sort(
      (a, b) =>
        b.percentage - a.percentage
    );

  if (remaining[0]) {
    roleMap.set(
      remaining[0].hex,
      "Primary"
    );
  }

  if (remaining[1]) {
    roleMap.set(
      remaining[1].hex,
      "Secondary"
    );
  }

  return colors.map((color) => ({
    ...color,
    role:
      roleMap.get(color.hex) ||
      "Supporting",
  }));
}