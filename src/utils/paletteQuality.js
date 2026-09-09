export function calculatePaletteQuality(
  palette
) {
  if (!palette || palette.length < 2) {
    return {
      score: 0,
      diversity: 0,
      balance: 0,
      contrast: 0,
      feedback: [],
    };
  }

  // --------------------------------
  // 1. COLOR DIVERSITY
  // --------------------------------

  let totalDistance = 0;
  let comparisons = 0;

  for (
    let i = 0;
    i < palette.length;
    i++
  ) {
    for (
      let j = i + 1;
      j < palette.length;
      j++
    ) {
      const r =
        palette[i].r - palette[j].r;

      const g =
        palette[i].g - palette[j].g;

      const b =
        palette[i].b - palette[j].b;

      const distance = Math.sqrt(
        r * r +
          g * g +
          b * b
      );

      totalDistance += distance;
      comparisons++;
    }
  }

  const averageDistance =
    totalDistance / comparisons;

  const diversity = Math.min(
    100,
    Math.round(
      (averageDistance / 220) * 100
    )
  );

  // --------------------------------
  // 2. DISTRIBUTION BALANCE
  // --------------------------------

  const percentages = palette.map(
    (color) => color.percentage
  );

  const largestPercentage =
    Math.max(...percentages);

  const smallestPercentage =
    Math.min(...percentages);

  const spread =
    largestPercentage -
    smallestPercentage;

  let balance;

  if (spread <= 10) {
    balance = 95;
  } else if (spread <= 20) {
    balance = 85;
  } else if (spread <= 35) {
    balance = 70;
  } else if (spread <= 50) {
    balance = 55;
  } else {
    balance = 40;
  }

  // --------------------------------
  // 3. LIGHT / DARK CONTRAST
  // --------------------------------

  const getLuminance = (color) => {
    const r = color.r / 255;
    const g = color.g / 255;
    const b = color.b / 255;

    return (
      0.2126 * r +
      0.7152 * g +
      0.0722 * b
    );
  };

  const luminances = palette.map(
    getLuminance
  );

  const brightest =
    Math.max(...luminances);

  const darkest =
    Math.min(...luminances);

  const luminanceDifference =
    brightest - darkest;

  const contrast = Math.min(
    100,
    Math.round(
      luminanceDifference * 120
    )
  );

  // --------------------------------
  // FINAL SCORE
  // --------------------------------

  const score = Math.round(
    diversity * 0.4 +
      balance * 0.3 +
      contrast * 0.3
  );

  // --------------------------------
  // FEEDBACK
  // --------------------------------

  const feedback = [];

  if (diversity >= 70) {
    feedback.push(
      "Good color diversity"
    );
  } else {
    feedback.push(
      "Colors are visually similar"
    );
  }

  if (balance >= 70) {
    feedback.push(
      "Balanced color distribution"
    );
  } else {
    feedback.push(
      "One or two colors dominate"
    );
  }

  if (contrast >= 60) {
    feedback.push(
      "Strong light-dark contrast"
    );
  } else {
    feedback.push(
      "Low light-dark contrast"
    );
  }

  return {
    score,
    diversity,
    balance,
    contrast,
    feedback,
  };
}