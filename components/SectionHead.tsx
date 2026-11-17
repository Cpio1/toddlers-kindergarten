/**
 * Заголовок секции. На десктопе — две колонки (заголовок слева, подзаголовок справа),
 * чтобы секция помещалась в высоту экрана ноутбука; на телефоне — обычный столбец.
 */
export function SectionHead({
  eyebrow,
  title,
  subtitle,
  split = true,
  center = false,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  split?: boolean;
  center?: boolean;
}) {
  return (
    <header
      data-reveal
      className={`section-head ${center ? "section-head--center" : ""} ${
        split ? "section-head--split desk:grid desk:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] desk:items-end desk:gap-x-12" : ""
      }`}
    >
      <div className="min-w-0">
        <span className="eyebrow">{eyebrow}</span>
        <h2 className="section-title">{title}</h2>
      </div>
      {subtitle && <p className="section-subtitle desk:mb-1.5">{subtitle}</p>}
    </header>
  );
}
