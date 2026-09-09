import { useEffect, useState } from "react";

const STORAGE_KEY = "colorcraft-history";

/* ================================
   CREATE SMALL HISTORY THUMBNAIL
================================ */

const createThumbnail = async (
  imageSource,
  maxWidth = 500,
  maxHeight = 320
) => {
  if (!imageSource) {
    return null;
  }

  /* Already a permanent Data URL */
  if (imageSource.startsWith("data:image/")) {
    return imageSource;
  }

  try {
    const response =
      await fetch(imageSource);

    const blob =
      await response.blob();

    return new Promise((resolve, reject) => {
      const reader =
        new FileReader();

      reader.onload = () => {
        const img =
          new Image();

        img.onload = () => {
          let width =
            img.naturalWidth;

          let height =
            img.naturalHeight;

          /* Resize */

          const scale = Math.min(
            maxWidth / width,
            maxHeight / height,
            1
          );

          width = Math.round(
            width * scale
          );

          height = Math.round(
            height * scale
          );

          const canvas =
            document.createElement(
              "canvas"
            );

          canvas.width = width;
          canvas.height = height;

          const ctx =
            canvas.getContext("2d");

          if (!ctx) {
            resolve(null);
            return;
          }

          ctx.drawImage(
            img,
            0,
            0,
            width,
            height
          );

          /* Compressed JPEG */

          const thumbnail =
            canvas.toDataURL(
              "image/jpeg",
              0.75
            );

          resolve(thumbnail);
        };

        img.onerror = () => {
          reject(
            new Error(
              "Failed to load history image"
            )
          );
        };

        img.src = reader.result;
      };

      reader.onerror = () => {
        reject(
          new Error(
            "Failed to read image"
          )
        );
      };

      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error(
      "Thumbnail creation failed:",
      error
    );

    return null;
  }
};


/* ================================
   SAVE PALETTE HISTORY
================================ */

export async function savePaletteHistory(
  palette,
  imagePreview = null
) {
  if (!palette?.length) {
    return;
  }

  const existing = JSON.parse(
    localStorage.getItem(
      STORAGE_KEY
    ) || "[]"
  );

  /* Avoid saving exact same palette */

  const paletteKey = palette
    .map((color) => color.hex)
    .join("-");

  const alreadyExists =
    existing.some(
      (item) =>
        item.paletteKey ===
        paletteKey
    );

  if (alreadyExists) {
    return;
  }

  /* Create permanent thumbnail */

  let thumbnail = null;

  if (imagePreview) {
    thumbnail =
      await createThumbnail(
        imagePreview
      );
  }

  const item = {
    id: Date.now(),

    createdAt:
      new Date().toISOString(),

    paletteKey,

    imagePreview: thumbnail,

    colors: palette,
  };

  const updated = [
    item,
    ...existing,
  ].slice(0, 10);

  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(updated)
    );
  } catch (error) {
    console.error(
      "Could not save palette history:",
      error
    );

    /*
      If localStorage is full,
      remove oldest history items
      and try again.
    */

    try {
      const reducedHistory =
        updated.slice(0, 5);

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(
          reducedHistory
        )
      );
    } catch (storageError) {
      console.error(
        "History storage failed:",
        storageError
      );
    }
  }
}


/* ================================
   PALETTE HISTORY COMPONENT
================================ */

export default function PaletteHistory({
  onSelect,
}) {
  const [history, setHistory] =
    useState([]);

  /* ================================
     LOAD HISTORY
  ================================= */

  const loadHistory = () => {
    try {
      const stored = JSON.parse(
        localStorage.getItem(
          STORAGE_KEY
        ) || "[]"
      );

      /*
        Old blob URLs cannot work after
        page refresh.

        Remove those old broken entries.
      */

      const validHistory =
        stored.filter((item) => {
          if (
            !item.imagePreview
          ) {
            return true;
          }

          return !item.imagePreview.startsWith(
            "blob:"
          );
        });

      if (
        validHistory.length !==
        stored.length
      ) {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(
            validHistory
          )
        );
      }

      setHistory(
        validHistory
      );
    } catch (error) {
      console.error(
        "Failed to load history:",
        error
      );

      setHistory([]);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);


  /* ================================
     DELETE HISTORY ITEM
  ================================= */

  const deleteHistoryItem = (
    event,
    id
  ) => {
    event.stopPropagation();

    const updated =
      history.filter(
        (item) =>
          item.id !== id
      );

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(updated)
    );

    setHistory(updated);
  };


  /* ================================
     CLEAR HISTORY
  ================================= */

  const clearHistory = () => {
    localStorage.removeItem(
      STORAGE_KEY
    );

    setHistory([]);
  };


  /* ================================
     FORMAT DATE
  ================================= */

  const formatDate = (date) => {
    return new Date(
      date
    ).toLocaleDateString(
      "en-IN",
      {
        day: "numeric",
        month: "short",
        year: "numeric",
      }
    );
  };


  /* ================================
     EMPTY STATE
  ================================= */

  if (!history.length) {
    return null;
  }


  /* ================================
     UI
  ================================= */

  return (
    <section className="history-section">

      {/* HEADER */}

      <div className="section-heading">

        <div>

          <span>
            HISTORY
          </span>

          <h2>
            Recent palettes
          </h2>

        </div>

        <button
          type="button"
          className="clear-history-button"
          onClick={
            clearHistory
          }
        >
          Clear History
        </button>

      </div>


      {/* HISTORY GRID */}

      <div className="history-grid">

        {history.map(
          (item) => (

            <div
              className="history-card"
              key={item.id}
            >

              {/* IMAGE */}

              {item.imagePreview ? (

                <img
                  src={
                    item.imagePreview
                  }
                  alt="Palette source"
                  className="history-image"
                />

              ) : (

                <div className="history-image-placeholder">
                  ColorCraft
                </div>

              )}


              {/* INFO */}

              <div className="history-info">

                {/* META */}

                <div className="history-meta">

                  <strong>
                    {item.colors.length}{" "}
                    Colors
                  </strong>

                  <span>
                    {formatDate(
                      item.createdAt
                    )}
                  </span>

                </div>


                {/* COLOR STRIP */}

                <div className="history-strip">

                  {item.colors.map(
                    (
                      color,
                      index
                    ) => (

                      <span
                        key={`${item.id}-${index}`}
                        style={{
                          backgroundColor:
                            color.hex,

                          flex: Math.max(
                            color.percentage ||
                              1,
                            1
                          ),
                        }}
                        title={
                          color.hex
                        }
                      />

                    )
                  )}

                </div>


                {/* HEX VALUES */}

                <div className="history-colors">

                  {item.colors
                    .slice(0, 5)
                    .map(
                      (color) => (

                        <span
                          key={
                            color.hex
                          }
                        >
                          {color.hex}
                        </span>

                      )
                    )}

                </div>


                {/* ACTIONS */}

                <div className="history-actions">

                  <button
                    type="button"
                    onClick={() =>
                      onSelect(
                        item.colors
                      )
                    }
                  >
                    Restore Palette
                  </button>

                  <button
                    type="button"
                    className="delete-history"
                    onClick={(
                      event
                    ) =>
                      deleteHistoryItem(
                        event,
                        item.id
                      )
                    }
                  >
                    Delete
                  </button>

                </div>

              </div>

            </div>

          )
        )}

      </div>

    </section>
  );
}