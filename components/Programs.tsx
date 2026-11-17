"use client";

import { useRef, useState } from "react";
import { useI18n } from "@/lib/i18n";
import type { ProgramCategoryKey } from "@/locales/types";
import { Cloud, Dots, Ring, Sparkle, Star } from "./Decor";
import { BallIcon, BrainIcon, ChatIcon, ChevronDownIcon, PaletteIcon, SparkIcon } from "./Icons";

const ORDER: ProgramCategoryKey[] = ["intellect", "language", "creative", "sport", "interactive"];

const ICONS: Record<ProgramCategoryKey, (p: { size?: number }) => React.ReactElement> = {
  intellect: BrainIcon,
  language: ChatIcon,
  creative: PaletteIcon,
  sport: BallIcon,
  interactive: SparkIcon,
};

/** В каких группах встречается направление — выведено из программ групп. */
const WHERE: Record<ProgramCategoryKey, string[]> = {
  intellect: ["Stars", "Preschoolers"],
  language: ["Kinders", "Stars", "Preschoolers"],
  creative: ["Kinders", "Stars", "Preschoolers"],
  sport: ["Stars", "Preschoolers"],
  interactive: ["Kinders", "Stars", "Preschoolers"],
};

function CategoryDetails({ k }: { k: ProgramCategoryKey }) {
  const { t } = useI18n();
  const c = t.programs.categories[k];
  return (
    <>
      <p className="prog-details__desc">{c.description}</p>
      <ul className="chip-row chip-row--loose">
        {c.items.map((it) => (
          <li key={it} className="chip chip--solid">
            {it}
          </li>
        ))}
      </ul>
      <p className="prog-details__where">
        <span>{t.programs.whereLabel}:</span>
        {WHERE[k].map((g) => (
          <span key={g} className={`group-tag group-tag--${g.toLowerCase()}`}>
            {g}
          </span>
        ))}
      </p>
    </>
  );
}

function DesktopPrograms() {
  const { t } = useI18n();
  const [active, setActive] = useState<ProgramCategoryKey>("intellect");
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const Icon = ICONS[active];

  const onKey = (e: React.KeyboardEvent, i: number) => {
    let next = -1;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (i + 1) % ORDER.length;
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (i - 1 + ORDER.length) % ORDER.length;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = ORDER.length - 1;
    if (next >= 0) {
      e.preventDefault();
      setActive(ORDER[next]);
      tabs.current[next]?.focus();
    }
  };

  return (
    <div className="programs-desktop">
      <div className="prog-map" data-reveal>
        <svg className="prog-map__lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          {[
            "M50 52 Q 50 30 50 12",
            "M50 52 Q 70 40 88 36",
            "M50 52 Q 66 70 76 86",
            "M50 52 Q 34 70 24 86",
            "M50 52 Q 30 40 12 36",
          ].map((d, i) => (
            <path key={i} d={d} className={ORDER[i] === active ? "is-active" : ""} vectorEffect="non-scaling-stroke" />
          ))}
        </svg>
        <div className="prog-map__hub" aria-hidden="true">
          <Star className="prog-map__hub-star spin-slow" />
          <strong>{t.programs.hub}</strong>
          <span>{t.programs.hubSub}</span>
        </div>
        <div role="tablist" aria-label={t.programs.title} aria-orientation="horizontal" className="prog-map__nodes">
          {ORDER.map((k, i) => {
            const I = ICONS[k];
            const selected = k === active;
            return (
              <button
                key={k}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`prog-tab-${k}`}
                aria-selected={selected}
                aria-controls="prog-panel"
                tabIndex={selected ? 0 : -1}
                className={`prog-node prog-node--${k} ${selected ? "is-active" : ""}`}
                onClick={() => setActive(k)}
                onKeyDown={(e) => onKey(e, i)}
              >
                <span className="prog-node__icon">
                  <I size={22} />
                </span>
                <span className="prog-node__title">{t.programs.categories[k].title}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div
        className={`prog-panel prog-panel--${active}`}
        role="tabpanel"
        id="prog-panel"
        aria-labelledby={`prog-tab-${active}`}
        tabIndex={0}
        data-reveal
      >
        <div key={active} className="prog-panel__inner">
          <span className="prog-panel__icon">
            <Icon size={28} />
          </span>
          <h3>{t.programs.categories[active].title}</h3>
          <CategoryDetails k={active} />
        </div>
        <Sparkle className="prog-panel__sparkle twinkle" color="#FFD43B" />
        <Dots className="prog-panel__dots" color="#D7ECFF" />
      </div>
    </div>
  );
}

function MobilePrograms() {
  const { t } = useI18n();
  const [open, setOpen] = useState<ProgramCategoryKey | null>("intellect");

  return (
    <ol className="programs-mobile">
      {ORDER.map((k) => {
        const I = ICONS[k];
        const isOpen = open === k;
        return (
          <li key={k} className={`prog-acc prog-acc--${k} ${isOpen ? "is-open" : ""}`} data-reveal>
            <h3>
              <button
                type="button"
                className="prog-acc__btn"
                aria-expanded={isOpen}
                aria-controls={`prog-acc-${k}`}
                onClick={() => setOpen(isOpen ? null : k)}
              >
                <span className="prog-node__icon">
                  <I size={20} />
                </span>
                <span className="prog-acc__title">{t.programs.categories[k].title}</span>
                <ChevronDownIcon size={20} className={`chev ${isOpen ? "chev--up" : ""}`} />
              </button>
            </h3>
            <div id={`prog-acc-${k}`} className={`collapse ${isOpen ? "is-open" : ""}`} inert={!isOpen}>
              <div className="collapse__inner prog-acc__body">
                <CategoryDetails k={k} />
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

export function Programs() {
  const { t } = useI18n();
  return (
    <section id="programs" className="section programs section-anchor">
      <div className="programs__deco" aria-hidden="true">
        <Cloud className="programs__cloud drift" color="#FFFFFF" />
        <Ring className="programs__ring" color="#FFD43B" />
        <Star className="programs__star spin-slow" color="#FFDF57" />
      </div>
      <div className="container">
        <header className="section-head" data-reveal>
          <span className="eyebrow">{t.programs.eyebrow}</span>
          <h2 className="section-title">{t.programs.title}</h2>
          <p className="section-subtitle">{t.programs.subtitle}</p>
        </header>
        <div className="only-desktop-block">
          <DesktopPrograms />
        </div>
        <div className="only-mobile-block">
          <MobilePrograms />
        </div>
        <p className="programs__note" data-reveal>
          <span aria-hidden="true">✦</span> {t.programs.note}
        </p>
      </div>
    </section>
  );
}
