import { useCallback, useState } from "react";
import { processImage } from "../utils/imageProcessor";
import { extractDominantColors } from "../utils/colorQuantization";

export default function useColorExtractor() {
  const [palette, setPalette] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [currentFile, setCurrentFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const extractColors = useCallback(
    async (file, colorCount = 6) => {
      if (!file) {
        setError("Please select an image.");
        return [];
      }

      if (!file.type.startsWith("image/")) {
        setError("Only image files are allowed.");
        return [];
      }

      setError("");
      setLoading(true);

      try {
        const previewUrl = URL.createObjectURL(file);

        setImagePreview((previous) => {
          if (previous) {
            URL.revokeObjectURL(previous);
          }

          return previewUrl;
        });

        setCurrentFile(file);

        const { pixelData } = await processImage(file);

        const colors = extractDominantColors(
          pixelData,
          colorCount
        );

        if (!colors.length) {
          throw new Error(
            "Could not extract colors from this image."
          );
        }

        setPalette(colors);

        return colors;
      } catch (err) {
        console.error(err);

        setPalette([]);
        setError(
          err.message ||
            "Something went wrong while processing the image."
        );

        return [];
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const reset = useCallback(() => {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }

    setPalette([]);
    setImagePreview(null);
    setCurrentFile(null);
    setError("");
    setLoading(false);
  }, [imagePreview]);

  return {
    palette,
    imagePreview,
    currentFile,
    loading,
    error,
    extractColors,
    reset,
  };
}