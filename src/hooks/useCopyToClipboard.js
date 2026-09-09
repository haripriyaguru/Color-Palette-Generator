import { useState } from "react";

export default function useCopyToClipboard() {
  const [copied, setCopied] = useState(false);

  const copy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1500);

      return true;
    } catch (error) {
      console.error("Copy failed:", error);
      return false;
    }
  };

  return {
    copied,
    copy,
  };
}