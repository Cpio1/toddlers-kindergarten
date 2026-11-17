"use client";

import { useI18n } from "@/lib/i18n";
import { Cloud, Heart, Sparkle, Squiggle, Wave } from "./Decor";

// Декоративные продукты вокруг тарелки — без привязки к меню.
function Apple() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" focusable="false">
      <path d="M24 14c-4-4-16-4-16 10 0 10 7 18 12 18 2 0 3-1 4-1s2 1 4 1c5 0 12-8 12-18 0-14-12-14-16-10z" fill="#FF8A80" />
      <path d="M24 14c0-4 1-7 4-9" stroke="#7A5230" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M26 10c4-4 9-3 10-2-2 4-6 5-10 2z" fill="#6CCB9A" />
      <ellipse cx="16" cy="22" rx="3" ry="5" fill="#fff" opacity=".45" />
    </svg>
  );
}
function Carrot() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" focusable="false">
      <path d="M30 14L8 42c-1 1 0 2 1 1l28-22c3-3 0-10-7-7z" fill="#FFB870" />
      <path d="M14 34l4 1M19 28l4 1M24 22l3 1" stroke="#F08F3C" strokeWidth="2" strokeLinecap="round" />
      <path d="M32 14c0-5 2-9 5-10M34 16c4-2 8-2 11 0M33 15c3-4 7-6 10-5" stroke="#6CCB9A" strokeWidth="3" strokeLinecap="round" fill="none" />
    </svg>
  );
}
function Pear() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" focusable="false">
      <path d="M24 10c-4 0-5 5-6 9-1 3-8 6-8 13 0 7 6 12 14 12s14-5 14-12c0-7-7-10-8-13-1-4-2-9-6-9z" fill="#C4EEDB" />
      <path d="M24 10V4" stroke="#7A5230" strokeWidth="3" strokeLinecap="round" />
      <ellipse cx="18" cy="30" rx="3" ry="5" fill="#fff" opacity=".5" />
    </svg>
  );
}
function Milk() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" focusable="false">
      <path d="M16 6h16v6l4 6v24a2 2 0 0 1-2 2H14a2 2 0 0 1-2-2V18l4-6z" fill="#fff" stroke="#2563EB" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M12 26h24v8H12z" fill="#D7ECFF" />
      <path d="M16 12h16" stroke="#2563EB" strokeWidth="2.5" />
    </svg>
  );
}
function Berry() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" focusable="false">
      <path d="M24 16c-10 0-14 6-12 14 2 7 8 14 12 14s10-7 12-14c2-8-2-14-12-14z" fill="#FF9DB5" />
      <path d="M16 12c3 4 13 4 16 0-3-1-5-3-8-6-3 3-5 5-8 6z" fill="#6CCB9A" />
      <g fill="#FFF3B0">
        <circle cx="19" cy="24" r="1.4" /><circle cx="27" cy="23" r="1.4" /><circle cx="23" cy="30" r="1.4" />
        <circle cx="30" cy="31" r="1.4" /><circle cx="18" cy="32" r="1.4" /><circle cx="24" cy="37" r="1.4" />
      </g>
    </svg>
  );
}

const FOODS = [Apple, Carrot, Milk, Pear, Berry];

export function Nutrition() {
  const { t } = useI18n();
  return (
    <section id="nutrition" className="section nutrition section-anchor">
      <Wave className="section-wave section-wave--top" color="#EAF4FF" />
      <div className="nutrition__deco" aria-hidden="true">
        <Cloud className="nutrition__cloud nutrition__cloud--1 drift" color="#D7ECFF" />
        <Cloud className="nutrition__cloud nutrition__cloud--2 drift drift--rev" color="#EAF4FF" />
        <Heart className="nutrition__heart float" color="#FFD9E4" />
      </div>

      <div className="wrap nutrition__grid">
        <div className="nutrition__text">
          <header className="section-head" data-reveal>
            <span className="eyebrow">{t.nutrition.eyebrow}</span>
            <h2 className="section-title">{t.nutrition.title}</h2>
            <p className="section-subtitle">{t.nutrition.subtitle}</p>
          </header>
          <div className="nutrition__accent" data-reveal>
            <h3>{t.nutrition.accent}</h3>
            <p>{t.nutrition.text}</p>
          </div>
          <ul className="nutrition__facts" data-reveal>
            {t.nutrition.facts.map((f, i) => (
              <li key={i}>
                <span className={`nutrition__fact-dot nutrition__fact-dot--${i}`} aria-hidden="true" />
                {f}
              </li>
            ))}
          </ul>
        </div>

        <div className="plate-scene" data-reveal aria-hidden="true">
          <div className="plate-scene__sun" />
          <svg className="plate-scene__fork" viewBox="0 0 24 120">
            <path d="M5 4v26c0 5 3 8 7 8s7-3 7-8V4M12 4v24M12 38v76" stroke="#2563EB" strokeWidth="5" strokeLinecap="round" fill="none" />
          </svg>
          <div className="plate">
            <div className="plate__rim">
              <div className="plate__center">
                <span className="plate__five">5</span>
                <span className="plate__label">{t.nutrition.plateLabel}</span>
              </div>
            </div>
          </div>
          <svg className="plate-scene__spoon" viewBox="0 0 30 120">
            <ellipse cx="15" cy="20" rx="11" ry="16" fill="#2563EB" />
            <path d="M15 34v80" stroke="#2563EB" strokeWidth="5" strokeLinecap="round" />
          </svg>
          <ol className="plate-orbit">
            {FOODS.map((F, i) => (
              <li key={i} className={`plate-orbit__item plate-orbit__item--${i}`}>
                <span className="plate-orbit__num">{i + 1}</span>
                <F />
              </li>
            ))}
          </ol>
          <Sparkle className="plate-scene__sparkle twinkle" color="#2563EB" />
          <Squiggle className="plate-scene__squiggle" color="#FFD43B" />
        </div>
      </div>
      <Wave className="section-wave section-wave--bottom" color="#FFFFFF" />
    </section>
  );
}
