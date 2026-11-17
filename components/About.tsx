"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { useI18n } from "@/lib/i18n";
import type { MediaAsset } from "@/lib/media";
import { Book, Cube, Flower, Pencil, Sparkle, Spiral, Star, Triangle } from "./Decor";
import { BallIcon, ChatIcon, PaletteIcon, SparkIcon } from "./Icons";
import { SectionHead } from "./SectionHead";

const BLOCK_ICONS = [ChatIcon, PaletteIcon, SparkIcon, BallIcon];

/** main-page2: видео (без звука, по кругу) или фото — в рамке с собственными пропорциями. */
function AboutMedia({ media }: { media: MediaAsset }) {
  const { t } = useI18n();
  const ref = useRef<HTMLVideoElement>(null);

  // Видео не запускаем при «уменьшении движения» и ставим на паузу вне экрана.
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause()), {
      threshold: 0.25,
    });
    io.observe(v);
    return () => io.disconnect();
  }, []);

  if (media.type === "video") {
    return (
      <div className="about-media">
        <video
          ref={ref}
          className="about-media__el"
          muted
          loop
          playsInline
          preload="metadata"
          poster={media.poster}
          aria-label={t.photos.about}
        >
          <source src={media.src} type={media.mime} />
        </video>
      </div>
    );
  }
  return (
    <div className="about-media" style={{ "--ratio": media.width / media.height } as React.CSSProperties}>
      <Image
        src={media.src}
        alt={t.photos.about}
        width={media.width}
        height={media.height}
        sizes="(min-width: 900px) 40vw, 100vw"
        className="about-media__el"
      />
    </div>
  );
}

export function About({ media }: { media: MediaAsset | null }) {
  const { t } = useI18n();
  const groups = [
    { name: "Kinders", age: "2–3" },
    { name: "Stars", age: "3–5" },
    { name: "Preschoolers", age: "5–6" },
  ];

  const ageSteps = (
    <div className="age-steps">
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
  );

  return (
    <section id="about" className="section about section-anchor">
      <div className="about__deco" aria-hidden="true">
        <Spiral className="about__spiral" />
        <Triangle className="about__triangle float" />
        <Sparkle className="about__sparkle twinkle" color="#2563EB" />
        <Flower className="about__flower" color="#DDD4FF" />
      </div>

      <div className="wrap">
        <SectionHead eyebrow={t.about.eyebrow} title={t.about.title} subtitle={t.about.subtitle} />

        <div className={`about__grid ${media ? "about__grid--media" : ""}`}>
          {/* Центральная композиция: текст + возрастные ступени */}
          <div className="about__story" data-reveal>
            <div className="about__story-card">
              <p className="about__lead">{t.about.lead}</p>
              <p className="about__body">{t.about.body}</p>

              {!media && ageSteps}
            </div>
            <Book className="about__book float" />
            <Pencil className="about__pencil" />
            <Cube className="about__cube float float--slow" />
          </div>

          {media && (
            <div className="about__media-col min-w-0" data-reveal>
              <AboutMedia media={media} />
              {ageSteps}
            </div>
          )}

          <div className="flex min-w-0 flex-col gap-4">
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
                    <div className="min-w-0">
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
      </div>
    </section>
  );
}
