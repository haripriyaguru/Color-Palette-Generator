const demos = [
  {
    name: "Sunset",
    url: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Ocean",
    url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Nature",
    url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=80",
  },
];

export default function DemoImages({
  onSelect,
}) {
  return (
    <section className="demo-section">
      <div className="section-heading centered">
        <span>QUICK START</span>
        <h2>Try a sample image</h2>
      </div>

      <div className="demo-grid">
        {demos.map((demo) => (
          <button
            key={demo.name}
            type="button"
            className="demo-card"
            onClick={() => onSelect(demo.url)}
          >
            <img
              src={demo.url}
              alt={demo.name}
            />

            <span>{demo.name}</span>
          </button>
        ))}
      </div>
    </section>
  );
}