function getColorHsl(r, g, b) {
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

    if (max === r) {
      h = (g - b) / d + (g < b ? 6 : 0);
    } else if (max === g) {
      h = (b - r) / d + 2;
    } else {
      h = (r - g) / d + 4;
    }

    h /= 6;
  }

  return {
    h: h * 360,
    s: s * 100,
    l: l * 100,
  };
}

export function detectPaletteMood(palette) {
  if (!palette || palette.length === 0) {
    return {
      primaryMood: "Neutral",
      moods: [],
      description: "No palette available.",
    };
  }

  let warm = 0;
  let cool = 0;
  let green = 0;
  let blue = 0;
  let red = 0;
  let saturation = 0;
  let lightness = 0;

  palette.forEach((color) => {
    const { h, s, l } = getColorHsl(
      color.r,
      color.g,
      color.b
    );

    const weight =
      color.percentage || 1;

    saturation += s * weight;
    lightness += l * weight;

    // Warm colors
    if (
      h < 60 ||
      h >= 330
    ) {
      warm += weight;
    }

    // Cool colors
    if (
      h >= 160 &&
      h < 280
    ) {
      cool += weight;
    }

    // Green
    if (
      h >= 70 &&
      h < 160
    ) {
      green += weight;
    }

    // Blue
    if (
      h >= 190 &&
      h < 260
    ) {
      blue += weight;
    }

    // Red / pink
    if (
      h < 20 ||
      h >= 340
    ) {
      red += weight;
    }
  });

  const totalWeight = palette.reduce(
    (sum, color) =>
      sum + (color.percentage || 1),
    0
  );

  const averageSaturation =
    saturation / totalWeight;

  const averageLightness =
    lightness / totalWeight;

  const moods = [];

  // --------------------------------
  // DARK
  // --------------------------------

  if (averageLightness < 30) {
    moods.push("Dark");
  }

  // --------------------------------
  // LIGHT
  // --------------------------------

  if (averageLightness > 75) {
    moods.push("Light");
  }

  // --------------------------------
  // CALM
  // --------------------------------

  if (
    averageSaturation < 40 &&
    averageLightness > 35
  ) {
    moods.push("Calm");
  }

  // --------------------------------
  // ENERGETIC
  // --------------------------------

  if (averageSaturation > 65) {
    moods.push("Energetic");
  }

  // --------------------------------
  // WARM
  // --------------------------------

  if (warm > cool * 1.3) {
    moods.push("Warm");
  }

  // --------------------------------
  // COOL
  // --------------------------------

  if (cool > warm * 1.3) {
    moods.push("Cool");
  }

  // --------------------------------
  // NATURAL
  // --------------------------------

  if (
    green > 20 &&
    warm > 15
  ) {
    moods.push("Natural");
  }

  // --------------------------------
  // PROFESSIONAL
  // --------------------------------

  if (
    averageSaturation < 55 &&
    averageLightness > 25 &&
    averageLightness < 75
  ) {
    moods.push("Professional");
  }

  // --------------------------------
  // DEFAULT
  // --------------------------------

  if (moods.length === 0) {
    moods.push("Balanced");
  }

  // Remove duplicates
  const uniqueMoods = [
    ...new Set(moods),
  ];

  const primaryMood =
    uniqueMoods[0];

  const description =
    createMoodDescription(
      uniqueMoods,
      averageSaturation,
      averageLightness
    );

  return {
    primaryMood,
    moods: uniqueMoods,
    description,
  };
}

function createMoodDescription(
  moods,
  saturation,
  lightness
) {
  const moodText =
    moods.slice(0, 3).join(" + ");

  if (
    saturation > 65
  ) {
    return `A vibrant palette with strong, expressive colors.`;
  }

  if (
    lightness < 30
  ) {
    return `A deep palette with a dramatic and sophisticated character.`;
  }

  if (
    lightness > 75
  ) {
    return `A bright palette with a clean and airy character.`;
  }

  if (
    moods.includes("Cool")
  ) {
    return `Cool tones create a calm and modern visual atmosphere.`;
  }

  if (
    moods.includes("Warm")
  ) {
    return `Warm tones create a welcoming and energetic visual atmosphere.`;
  }

  return `${moodText} — a balanced visual character suitable for modern design.`;
}