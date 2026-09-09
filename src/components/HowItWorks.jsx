export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Upload Image",
      description:
        "Select or drag and drop an image. The browser creates a temporary image URL using the File API.",
      tech: "File API",
    },
    {
      number: "02",
      title: "Canvas Processing",
      description:
        "The image is drawn onto an HTML Canvas and pixel data is extracted using Canvas getImageData().",
      tech: "Canvas API",
    },
    {
      number: "03",
      title: "Color Quantization",
      description:
        "Millions of image pixels are grouped into smaller RGB buckets so similar colors can be analyzed efficiently.",
      tech: "RGB Bucketing",
    },
    {
      number: "04",
      title: "Dominant Colors",
      description:
        "Colors are ranked by how frequently they appear, allowing ColorCraft to identify the most important colors.",
      tech: "Color Frequency",
    },
    {
      number: "05",
      title: "Color Intelligence",
      description:
        "The palette is analyzed for color names, roles, diversity, contrast, mood and accessibility.",
      tech: "Color Analysis",
    },
    {
      number: "06",
      title: "Design System",
      description:
        "The extracted palette is converted into usable UI themes, gradients, previews and exportable design tokens.",
      tech: "CSS Variables",
    },
  ];

  return (
    <section className="how-it-works-section">
      <div className="section-heading">
        <div>
          <span>BEHIND THE TOOL</span>
          <h2>How ColorCraft Works</h2>
        </div>
      </div>

      <p className="how-it-works-description">
        From image pixels to a complete design system — everything
        happens directly inside your browser.
      </p>

      <div className="how-it-works-grid">
        {steps.map((step) => (
          <article
            className="how-it-works-card"
            key={step.number}
          >
            <div className="how-step-top">
              <span className="how-step-number">
                {step.number}
              </span>

              <span className="how-step-tech">
                {step.tech}
              </span>
            </div>

            <h3>{step.title}</h3>

            <p>{step.description}</p>
          </article>
        ))}
      </div>

      <div className="how-it-works-note">
        <strong>100% Client-Side</strong>

        <span>
          Your image is processed in the browser. No backend
          server or external color extraction API is required.
        </span>
      </div>
    </section>
  );
}