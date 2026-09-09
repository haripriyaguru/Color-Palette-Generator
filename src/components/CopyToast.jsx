export default function CopyToast({ visible }) {
  if (!visible) return null;

  return (
    <div className="copy-toast">
      <span className="copy-toast-icon">✓</span>
      <span>Copied to clipboard</span>
    </div>
  );
}