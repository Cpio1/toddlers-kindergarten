"use client";

import { useI18n } from "@/lib/i18n";
import { SITE } from "@/lib/site";
import { Cloud, Sparkle, Star, Wave } from "./Decor";
import { ArrowRightIcon } from "./Icons";

/** Папка с выглядывающими листами — декоративная иллюстрация (без выдуманных названий файлов). */
function FolderArt() {
  return (
    <svg className="docs-folder__svg" viewBox="0 0 200 160" aria-hidden="true" focusable="false">
      {/* задняя стенка папки */}
      <path d="M14 40a14 14 0 0 1 14-14h40c6 0 9 3 12 7l6 7h86a14 14 0 0 1 14 14v84a14 14 0 0 1-14 14H28a14 14 0 0 1-14-14z" fill="#1D4ED8" />
      {/* листы */}
      <g className="docs-folder__sheet docs-folder__sheet--1">
        <rect x="40" y="22" width="78" height="96" rx="10" fill="#fff" transform="rotate(-8 79 70)" />
        <g transform="rotate(-8 79 70)" stroke="#D7ECFF" strokeWidth="5" strokeLinecap="round">
          <path d="M52 42h40M52 56h54M52 70h46" />
        </g>
      </g>
      <g className="docs-folder__sheet docs-folder__sheet--2">
        <rect x="88" y="18" width="78" height="96" rx="10" fill="#FFF3B0" transform="rotate(7 127 66)" />
        <g transform="rotate(7 127 66)">
          <path d="M100 38h40M100 52h54M100 66h30" stroke="#FFD43B" strokeWidth="5" strokeLinecap="round" />
          <circle cx="148" cy="92" r="9" fill="#2563EB" />
          <path d="M144 92l3 3 5-6" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </g>
      </g>
      {/* передняя стенка папки */}
      <path d="M8 70a12 12 0 0 1 12-12h160a12 12 0 0 1 12 12l-8 66a14 14 0 0 1-14 12H30a14 14 0 0 1-14-12z" fill="#2563EB" />
      <path d="M20 66h160" stroke="#fff" strokeOpacity=".25" strokeWidth="3" strokeLinecap="round" />
      {/* «наклейка» со звездой */}
      <circle cx="100" cy="106" r="20" fill="#FFD43B" />
      <path d="M100 94l3.5 7.4 8 1-5.9 5.5 1.6 8L100 112l-7.2 3.9 1.6-8-5.9-5.5 8-1z" fill="#fff" />
    </svg>
  );
}

export function Documents() {
  const { t } = useI18n();
  const d = t.documents;

  return (
    <section id="documents" className="section documents section-anchor">
      <Wave className="section-wave section-wave--top" color="#FFFFFF" />
      <div className="documents__deco" aria-hidden="true">
        <Cloud className="documents__cloud documents__cloud--1 drift" color="#fff" />
        <Cloud className="documents__cloud documents__cloud--2 drift drift--rev" color="#fff" />
        <Star className="documents__star spin-slow" />
        <Sparkle className="documents__sparkle twinkle" color="#2563EB" />
      </div>

      <div className="wrap documents__grid" data-anchor>
        <header className="section-head" data-reveal>
          <span className="eyebrow">{d.eyebrow}</span>
          <h2 className="section-title">{d.title}</h2>
          <p className="section-subtitle">{d.subtitle}</p>
        </header>

        <div className="docs-card" data-reveal style={{ "--d": "120ms" } as React.CSSProperties}>
          <div className="docs-folder" aria-hidden="true">
            <span className="docs-folder__blob" />
            <FolderArt />
            <Sparkle className="docs-folder__spark twinkle" color="#FFD43B" />
          </div>
          <div className="docs-card__body">
            <h3 className="docs-card__title">{d.cardTitle}</h3>
            <p className="docs-card__text">{d.cardText}</p>
            <a
              className="btn btn--primary docs-card__btn"
              href={SITE.documentsUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={d.buttonAria}
            >
              {d.button}
              <ArrowRightIcon size={20} />
            </a>
            <p className="docs-card__note">
              <DriveMark />
              {d.note}
            </p>
          </div>
        </div>
      </div>
      <Wave className="section-wave section-wave--bottom" color="#EAF4FF" />
    </section>
  );
}

/** Нейтральный значок «облачная папка» — не логотип Google. */
function DriveMark() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" focusable="false">
      <path
        d="M7 18a4 4 0 0 1-.6-7.96A5.5 5.5 0 0 1 17 9.5a3.75 3.75 0 0 1 .5 7.47V18z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}
