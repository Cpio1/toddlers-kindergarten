// Временный логотип: текстовая надпись + солнечная звёздочка.
// Когда появится официальный логотип, замените содержимое этого компонента.
export function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className={`logo ${light ? "logo--light" : ""}`}>
      <svg className="logo__mark" viewBox="0 0 44 44" aria-hidden="true" focusable="false">
        <circle cx="22" cy="22" r="20" fill="#2563EB" />
        <path
          d="M22 9l3.6 7.6 8.2 1-6 5.7 1.6 8.2L22 27.4l-7.4 4.1 1.6-8.2-6-5.7 8.2-1z"
          fill="#FFD43B"
          stroke="#FFD43B"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
      <span className="logo__text">
        Toddler<span className="logo__s">s</span>
      </span>
    </span>
  );
}
