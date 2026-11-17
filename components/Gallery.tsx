"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/lib/i18n";
import type { ImageAsset } from "@/lib/media";
import { Cloud, Heart, Sparkle, Star } from "./Decor";
import { Lightbox } from "./Lightbox";
import { SectionHead } from "./SectionHead";

const INITIAL = 6;
const STEP = 6;

function EmptyGallery() {
  const { t } = useI18n();
  return (
    <div className="gallery-empty" data-reveal>
      <div className="gallery-empty__frames" aria-hidden="true">
        <span className="gallery-empty__frame gallery-empty__frame--1" />
        <span className="gallery-empty__frame gallery-empty__frame--2" />
        <svg className="gallery-empty__camera float" viewBox="0 0 120 96">
          <rect x="8" y="22" width="104" height="68" rx="18" fill="#2563EB" />
          <path d="M38 22l8-14h28l8 14z" fill="#1D4ED8" />
          <circle cx="60" cy="56" r="24" fill="#FFD43B" />
          <circle cx="60" cy="56" r="15" fill="#173B82" />
          <circle cx="54" cy="50" r="5" fill="#fff" opacity=".7" />
          <rect x="88" y="32" width="14" height="8" rx="4" fill="#FFF3B0" />
          <circle cx="24" cy="36" r="4" fill="#FFB870" />
        </svg>
        <Star className="gallery-empty__star gallery-empty__star--1 spin-slow" />
        <Sparkle className="gallery-empty__star gallery-empty__star--2 twinkle" color="#2563EB" />
        <Heart className="gallery-empty__heart float float--slow" color="#FFD9E4" />
      </div>
      <h3>{t.gallery.emptyTitle}</h3>
      <p>{t.gallery.emptyText}</p>
    </div>
  );
}

/** Десктоп/планшет: ряды одинаковой высоты, ширина — по пропорциям фото (без обрезки). */
function JustifiedGrid({ photos, onOpen }: { photos: ImageAsset[]; onOpen: (i: number) => void }) {
  const { t } = useI18n();
  return (
    <ul className="gallery-rows">
      {photos.map((p, i) => {
        const ratio = p.width / p.height;
        return (
          <li
            key={p.src}
            className={`gallery-tile gallery-tile--${i % 4}`}
            style={{ "--ratio": ratio } as React.CSSProperties}
          >
            <button type="button" onClick={() => onOpen(i)} aria-label={t.gallery.open(i + 1)}>
              <Image
                src={p.src}
                alt={t.gallery.photoAlt(i + 1)}
                width={p.width}
                height={p.height}
                sizes="(min-width: 1200px) 400px, 40vw"
                className="h-full w-full object-contain"
              />
            </button>
          </li>
        );
      })}
    </ul>
  );
}

/** Телефон: горизонтальная лента со «щелчком» к фото и счётчиком. */
function MobileCarousel({
  photos,
  onOpen,
  more,
}: {
  photos: ImageAsset[];
  onOpen: (i: number) => void;
  more?: React.ReactNode;
}) {
  const { t } = useI18n();
  const track = useRef<HTMLUListElement>(null);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && setCurrent(Number((e.target as HTMLElement).dataset.index))),
      { root: el, threshold: 0.6 },
    );
    el.querySelectorAll("li").forEach((li) => io.observe(li));
    return () => io.disconnect();
  }, [photos.length]);

  return (
    <div>
      <ul ref={track} className="gallery-carousel" aria-label={t.gallery.title}>
        {photos.map((p, i) => (
          <li key={p.src} data-index={i} style={{ "--ratio": p.width / p.height } as React.CSSProperties}>
            <button type="button" onClick={() => onOpen(i)} aria-label={t.gallery.open(i + 1)}>
              <Image
                src={p.src}
                alt={t.gallery.photoAlt(i + 1)}
                width={p.width}
                height={p.height}
                sizes="86vw"
                className="h-full w-full object-contain"
              />
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-3 flex items-center justify-between gap-3">
        <p className="text-sm font-bold text-[var(--ink-muted)]" aria-live="polite">
          {t.gallery.counter(current + 1, photos.length)}
        </p>
        {more}
      </div>
    </div>
  );
}

export function Gallery({ photos }: { photos: ImageAsset[] }) {
  const { t } = useI18n();
  const [visible, setVisible] = useState(INITIAL);
  const [index, setIndex] = useState<number | null>(null);
  const total = photos.length;
  const shown = photos.slice(0, visible);

  return (
    <section id="gallery" className="section gallery section-anchor">
      <div className="gallery__deco" aria-hidden="true">
        <Cloud className="gallery__cloud drift" color="#FFF3B0" />
        <Star className="gallery__star spin-slow" color="#2563EB" />
      </div>
      <div className="wrap">
        <SectionHead eyebrow={t.gallery.eyebrow} title={t.gallery.title} subtitle={t.gallery.subtitle} />

        {total === 0 ? (
          <EmptyGallery />
        ) : (
          <>
            <div className="only-desktop-block" data-reveal>
              <JustifiedGrid photos={shown} onOpen={setIndex} />
            </div>
            <div className="only-mobile-block" data-reveal>
              <MobileCarousel
                photos={shown}
                onOpen={setIndex}
                more={
                  visible < total && (
                    <button type="button" className="btn btn--ghost btn--sm" onClick={() => setVisible((v) => v + STEP)}>
                      {t.gallery.showMore}
                    </button>
                  )
                }
              />
            </div>
            {visible < total && (
              <div className="mt-6 hidden justify-center desk:flex">
                <button type="button" className="btn btn--ghost" onClick={() => setVisible((v) => v + STEP)}>
                  {t.gallery.showMore}
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <Lightbox
        photos={photos.map((img, i) => ({ img, alt: t.gallery.photoAlt(i + 1) }))}
        index={index}
        onIndex={setIndex}
        label={t.gallery.title}
      />
    </section>
  );
}
