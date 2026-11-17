"use client";

import { useI18n } from "@/lib/i18n";
import { Book, Cloud, Cube, Flower, Pencil, Sparkle, Spiral, Star, Triangle } from "./Decor";
import { BallIcon, ChatIcon, PaletteIcon, SparkIcon } from "./Icons";

const BLOCK_ICONS = [ChatIcon, PaletteIcon, SparkIcon, BallIcon];

export function About() {
  const { t } = useI18n();
  const groups = [
    { name: "Kinders", age: "2–3" },
    { name: "Stars", age: "3–5" },
    { name: "Preschoolers", age: "5–6" },
  ];

  return (
    <section id="about" className="section about section-anchor">
      <div className="about__deco" aria-hidden="true">
        <Spiral className="about__spiral" />
        <Triangle className="about__triangle float" />
        <Sparkle className="about__sparkle twinkle" color="#2563EB" />
        <Flower className="about__flower" color="#DDD4FF" />
      </div>

      <div className="container">
        <header className="section-head" data-reveal>
          <span className="eyebrow">{t.about.eyebrow}</span>
          <h2 className="section-title">{t.about.title}</h2>
          <p className="section-subtitle">{t.about.subtitle}</p>
        </header>

        <div className="about__grid">
          {/* Центральная композиция */}
          <div className="about__story" data-reveal>
            <div className="about__story-card">
              <Cloud className="about__story-cloud" color="#FFF3B0" />
              <p className="about__lead">{t.about.lead}</p>
              <p className="about__body">{t.about.body}</p>

              <div className="age-steps" aria-label={t.about.agesCaption}>
                <span className="age-steps__caption">{t.about.agesCaption}</span>
                <ol>
                  {groups.map((g, i) => (
                    <li key={g.name} className={`age-step age-step--${i}`}>
                      <span className="age-step__age">{g.age}</span>
                      <span className="age-step__name">{g.name}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
            <Book className="about__book float" />
            <Pencil className="about__pencil" />
            <Cube className="about__cube float float--slow" />
          </div>

          {/* Тематические блоки разной формы */}
          <ul className="about__blocks">
            {t.about.blocks.map((b, i) => {
              const Icon = BLOCK_ICONS[i];
              return (
                <li
                  key={i}
                  className={`about-chip about-chip--${i}`}
                  data-reveal
                  style={{ "--d": `${i * 70}ms` } as React.CSSProperties}
                >
                  <span className="about-chip__icon">
                    <Icon size={22} />
                  </span>
                  <div>
                    <h3>{b.title}</h3>
                    <p>{b.text}</p>
                  </div>
                  {i === 1 && <Star className="about-chip__star spin-slow" />}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
