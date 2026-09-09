import {
  useEffect,
  useRef,
  useState,
} from "react";

import ImageUploader from "./components/ImageUploader";
import ImagePreview from "./components/ImagePreview";
import PaletteDisplay from "./components/PaletteDisplay";
import ColorInfo from "./components/ColorInfo";
import ColorCountSlider from "./components/ColorCountSlider";
import LoadingState from "./components/LoadingState";
import ColorStrip from "./components/ColorStrip";
import ShadesTints from "./components/ShadesTints";
import ColorHarmony from "./components/ColorHarmony";
import AccessibilityChecker from "./components/AccessibilityChecker";
import ExportPanel from "./components/ExportPanel";
import PaletteQuality from "./components/PaletteQuality";
import MoodDetection from "./components/MoodDetection";
import ThemeGenerator from "./components/ThemeGenerator";
import PalettePreview from "./components/PalettePreview";
import GradientGenerator from "./components/GradientGenerator";
import HowItWorks from "./components/HowItWorks";
import CopyToast from "./components/CopyToast";

import PaletteHistory, {
  savePaletteHistory,
} from "./components/PaletteHistory";

import DemoImages from "./components/DemoImages";

import useColorExtractor from "./hooks/useColorExtractor";

import {
  sampleImagePixel,
} from "./utils/imageProcessor";

import {
  createColorFromRgb,
} from "./utils/colorUtils";

function App() {
  const [colorCount, setColorCount] =
    useState(6);

  const [selectedColor, setSelectedColor] =
    useState(null);

  const [showCopyToast, setShowCopyToast] =
    useState(false);

  const copyTimeoutRef =
    useRef(null);

  const {
    palette,
    imagePreview,
    currentFile,
    loading,
    error,
    extractColors,
    reset,
  } = useColorExtractor();

  /* =========================
     SAVE PALETTE HISTORY
  ========================= */

  useEffect(() => {
    if (
      palette.length &&
      imagePreview
    ) {
      savePaletteHistory(
        palette,
        imagePreview
      ).catch((error) => {
        console.error(
          "Failed to save palette history:",
          error
        );
      });
    }
  }, [palette, imagePreview]);

  /* =========================
     CLEAN COPY TIMEOUT
  ========================= */

  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) {
        clearTimeout(
          copyTimeoutRef.current
        );
      }
    };
  }, []);

  /* =========================
     IMAGE SELECTION
  ========================= */

  const handleImageSelect = async (
    file
  ) => {
    setSelectedColor(null);

    await extractColors(
      file,
      colorCount
    );
  };

  /* =========================
     COLOR COUNT CHANGE
  ========================= */

  const handleColorCountChange =
    async (count) => {
      setColorCount(count);

      if (currentFile) {
        setSelectedColor(null);

        await extractColors(
          currentFile,
          count
        );
      }
    };

  /* =========================
     IMAGE PIXEL SELECTION
  ========================= */

  const handlePixelSelect = async (
    xRatio,
    yRatio
  ) => {
    if (!currentFile) {
      return;
    }

    try {
      const pixel =
        await sampleImagePixel(
          currentFile,
          xRatio,
          yRatio
        );

      const color =
        createColorFromRgb(
          pixel.r,
          pixel.g,
          pixel.b
        );

      setSelectedColor({
        ...color,
        percentage: 0,
      });
    } catch (err) {
      console.error(
        "Pixel selection failed:",
        err
      );
    }
  };

  /* =========================
     COPY TO CLIPBOARD
  ========================= */

  const handleCopy = async (
    text
  ) => {
    try {
      await navigator.clipboard.writeText(
        text
      );

      setShowCopyToast(true);

      if (copyTimeoutRef.current) {
        clearTimeout(
          copyTimeoutRef.current
        );
      }

      copyTimeoutRef.current =
        setTimeout(() => {
          setShowCopyToast(false);
        }, 1500);
    } catch (err) {
      console.error(
        "Copy failed:",
        err
      );
    }
  };

  /* =========================
     RESET
  ========================= */

  const handleReset = () => {
    setSelectedColor(null);
    setShowCopyToast(false);

    if (copyTimeoutRef.current) {
      clearTimeout(
        copyTimeoutRef.current
      );
    }

    reset();
  };

  /* =========================
     HISTORY SELECTION
  ========================= */

  const handleHistorySelect = (
    colors
  ) => {
    if (colors?.length) {
      setSelectedColor(
        colors[0]
      );
    }
  };

  /* =========================
     DEMO IMAGE SELECTION
  ========================= */

  const handleDemoSelect =
    async (imageUrl) => {
      try {
        const response =
          await fetch(imageUrl);

        const blob =
          await response.blob();

        const extension =
          blob.type.split("/")[1] ||
          "jpg";

        const file = new File(
          [blob],
          `demo.${extension}`,
          {
            type: blob.type,
          }
        );

        await handleImageSelect(
          file
        );
      } catch (err) {
        console.error(
          "Demo image loading failed:",
          err
        );
      }
    };

  return (
    <div className="app">

      {/* =========================
          COPY TOAST
      ========================= */}

      <CopyToast
        visible={showCopyToast}
      />

      {/* =========================
          HEADER
      ========================= */}

      <header className="header">

        <div className="logo">

          <span className="logo-mark">
            C
          </span>

          <div>
            <h1>
              ColorCraft
            </h1>

            <p>
              Image Color Intelligence
            </p>
          </div>

        </div>

        <div className="header-badge">
          CLIENT-SIDE
        </div>

      </header>

      {/* =========================
          MAIN
      ========================= */}

      <main className="main-container">

        {/* =========================
            HOME PAGE
        ========================= */}

        {!imagePreview ? (
          <>

            {/* HERO */}

            <section className="hero">

              <span className="eyebrow">
                COLOR EXTRACTION TOOL
              </span>

              <h2>
                Turn any image
                <br />
                into a color system.
              </h2>

              <p>
                Extract dominant colors,
                discover harmonies, check
                accessibility and export
                your palette — directly in
                your browser.
              </p>

            </section>

            {/* IMAGE UPLOADER */}

            <ImageUploader
              onImageSelect={
                handleImageSelect
              }
              disabled={loading}
            />

            {/* COLOR COUNT */}

            <ColorCountSlider
              colorCount={
                colorCount
              }
              setColorCount={
                handleColorCountChange
              }
            />

            {/* DEMO IMAGES */}

            <DemoImages
              onSelect={
                handleDemoSelect
              }
            />

            {/* HISTORY */}

            <PaletteHistory
              onSelect={
                handleHistorySelect
              }
            />

            {/* ERROR */}

            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

          </>
        ) : (

          /* =========================
             RESULT PAGE
          ========================= */

          <>

            {/* RESULT HEADER */}

            <div className="result-header">

              <div>

                <span className="eyebrow">
                  PALETTE GENERATED
                </span>

                <h2>
                  Your Color System
                </h2>

              </div>

              <button
                type="button"
                className="reset-button"
                onClick={
                  handleReset
                }
                disabled={loading}
              >
                ← Try Another Image
              </button>

            </div>

            {/* =========================
                IMAGE + COLOR INFO
            ========================= */}

            <section className="result-layout">

              <ImagePreview
                src={imagePreview}
                onPixelSelect={
                  handlePixelSelect
                }
              />

              {selectedColor && (
                <ColorInfo
                  color={
                    selectedColor
                  }
                  onCopy={
                    handleCopy
                  }
                />
              )}

            </section>

            {/* =========================
                SELECTED COLOR ANALYSIS
            ========================= */}

            {selectedColor && (
              <>

                <ShadesTints
                  color={
                    selectedColor
                  }
                  onCopy={
                    handleCopy
                  }
                />

                <ColorHarmony
                  color={
                    selectedColor
                  }
                />

                <AccessibilityChecker
                  color={
                    selectedColor
                  }
                />

              </>
            )}

            {/* =========================
                LOADING
            ========================= */}

            {loading && (
              <LoadingState />
            )}

            {/* =========================
                PALETTE RESULTS
            ========================= */}

            {!loading &&
              palette.length > 0 && (
                <>

                  {/* COLOR STRIP */}

                  <ColorStrip
                    palette={
                      palette
                    }
                  />

                  {/* DOMINANT COLORS */}

                  <PaletteDisplay
                    palette={
                      palette
                    }
                    onSelect={
                      setSelectedColor
                    }
                    onCopy={
                      handleCopy
                    }
                  />

                  {/* QUALITY */}

                  <PaletteQuality
                    palette={
                      palette
                    }
                  />

                  {/* MOOD */}

                  <MoodDetection
                    palette={
                      palette
                    }
                  />

                  {/* DESIGN SYSTEM */}

                  <ThemeGenerator
                    palette={
                      palette
                    }
                    onCopy={
                      handleCopy
                    }
                  />

                  {/* UI PREVIEW */}

                  <PalettePreview
                    palette={
                      palette
                    }
                  />

                  {/* GRADIENT */}

                  <GradientGenerator
                    palette={
                      palette
                    }
                    onCopy={
                      handleCopy
                    }
                  />

                  {/* HOW IT WORKS */}

                  <HowItWorks />

                  {/* EXPORT */}

                  <ExportPanel
                    palette={
                      palette
                    }
                    onCopy={
                      handleCopy
                    }
                  />

                </>
              )}

            {/* =========================
                COLOR COUNT
            ========================= */}

            <ColorCountSlider
              colorCount={
                colorCount
              }
              setColorCount={
                handleColorCountChange
              }
            />

            {/* =========================
                ERROR
            ========================= */}

            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

          </>
        )}

      </main>

      {/* =========================
          FOOTER
      ========================= */}

      <footer className="footer">

        <p>
          ColorCraft · React · Canvas API ·
          Client-side image processing
        </p>

      </footer>

    </div>
  );
}

export default App;