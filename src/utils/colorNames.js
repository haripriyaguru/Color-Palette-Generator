function rgbToHslLocal(r, g, b) {
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

export function getSmartColorName(r, g, b) {
  const { h, s, l } = rgbToHslLocal(r, g, b);

  // --------------------------------
  // BLACK / WHITE / GRAY
  // --------------------------------

  if (l <= 6) {
    return "Pure Black";
  }

  if (l <= 15 && s <= 15) {
    return "Near Black";
  }

  if (l <= 28 && s <= 15) {
    return "Charcoal";
  }

  if (l >= 97 && s <= 10) {
    return "Pure White";
  }

  if (l >= 92 && s <= 12) {
    return "Soft White";
  }

  if (l >= 78 && s <= 15) {
    return "Light Gray";
  }

  if (s <= 10) {
    if (l < 40) {
      return "Dark Gray";
    }

    if (l < 70) {
      return "Classic Gray";
    }

    return "Silver Gray";
  }

  // --------------------------------
  // RED
  // --------------------------------

  if (h < 15 || h >= 345) {
    if (l < 25) {
      return "Deep Crimson";
    }

    if (l < 45) {
      return "Ruby Red";
    }

    if (l < 65) {
      return "Classic Red";
    }

    if (s < 45) {
      return "Dusty Rose";
    }

    return "Soft Rose";
  }

  // --------------------------------
  // ORANGE
  // --------------------------------

  if (h >= 15 && h < 45) {
    if (l < 30) {
      return "Burnt Orange";
    }

    if (l < 50) {
      return "Terracotta";
    }

    if (l < 70) {
      return "Warm Orange";
    }

    if (s < 45) {
      return "Peach Beige";
    }

    return "Peach";
  }

  // --------------------------------
  // YELLOW / GOLD
  // --------------------------------

  if (h >= 45 && h < 75) {
    if (l < 30) {
      return "Dark Olive";
    }

    if (l < 45 && s < 60) {
      return "Muted Gold";
    }

    if (s < 40) {
      return "Warm Beige";
    }

    if (l > 75) {
      return "Pale Yellow";
    }

    return "Golden Yellow";
  }

  // --------------------------------
  // GREEN
  // --------------------------------

  if (h >= 75 && h < 165) {
    if (l < 25) {
      return "Deep Forest";
    }

    if (l < 45) {
      return "Forest Green";
    }

    if (s < 35) {
      return "Sage Green";
    }

    if (l > 75) {
      return "Light Mint";
    }

    return "Fresh Green";
  }

  // --------------------------------
  // CYAN / TEAL
  // --------------------------------

  if (h >= 165 && h < 200) {
    if (l < 25) {
      return "Deep Teal";
    }

    if (l < 45) {
      return "Dark Teal";
    }

    if (s < 40) {
      return "Muted Aqua";
    }

    if (l > 75) {
      return "Light Aqua";
    }

    return "Turquoise";
  }

  // --------------------------------
  // BLUE
  // --------------------------------

  if (h >= 200 && h < 255) {
    if (l <= 20) {
      return "Midnight Blue";
    }

    if (l <= 35) {
      return "Deep Navy";
    }

    if (l <= 50) {
      return "Ocean Blue";
    }

    if (s < 40) {
      return "Slate Blue";
    }

    if (l >= 75) {
      return "Sky Blue";
    }

    return "Classic Blue";
  }

  // --------------------------------
  // PURPLE / VIOLET
  // --------------------------------

  if (h >= 255 && h < 290) {
    if (l < 25) {
      return "Deep Purple";
    }

    if (l < 45) {
      return "Royal Purple";
    }

    if (l > 75) {
      return "Lavender";
    }

    return "Violet";
  }

  // --------------------------------
  // MAGENTA / PINK
  // --------------------------------

  if (h >= 290 && h < 345) {
    if (l < 25) {
      return "Deep Plum";
    }

    if (l < 45) {
      return "Berry";
    }

    if (l < 70) {
      return "Magenta";
    }

    return "Rose Pink";
  }

  return "Custom Color";
}