"use client";

import { useCallback, useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n";
import { Cloud, Heart, Sparkle, Star } from "./Decor";
import { ChevronLeftIcon, ChevronRightIcon, CloseIcon } from "./Icons";
import { Modal } from "./Modal";

const INITIAL = 6;
const STEP = 6;

function EmptyGallery() {
  const { t } = useI18n();
  return (
    <div className="gallery-empty" data-reveal>
      <div className="gallery-empty__frames" aria-hidden="true">
        <span className="gallery-empty__frame gallery-empty__frame--1" />
        <span className="gallery-empty__frame gallery-empty__frame--2" />
        <span className="gallery-empty__frame gallery-empty__frame--3" />
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

export function Gallery({ photos }: { photos: string[] }) {
  const { t } = useI18n();
  const [visible, setVisible] = useState(INITIAL);
  const [index, setIndex] = useState<number | null>(null);
  const total = photos.length;

  const close = useCallback(() => setIndex(null), []);
  const go = useCallback(
    (dir: 1 | -1) => setIndex((i) => (i === null ? i : (i + dir + total) % total)),
    [total],
  );

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, go]);

  return (
    <section id="gallery" className="section gallery section-anchor">
      <div className="gallery__deco" aria-hidden="true">
        <Cloud className="gallery__cloud drift" color="#FFF3B0" />
        <Star className="gallery__star spin-slow" color="#2563EB" />
      </div>
      <div className="container">
        <header className="section-head section-head--center" data-reveal>
          <span className="eyebrow">{t.gallery.eyebrow}</span>
          <h2 className="section-title">{t.gallery.title}</h2>
          <p className="section-subtitle">{t.gallery.subtitle}</p>
        </header>

        {total === 0 ? (
          <EmptyGallery />
        ) : (
          <>
            <ul className="gallery-grid">
              {photos.slice(0, visible).map((src, i) => (
                <li key={src} className={`gallery-item gallery-item--p${i % 6}`}>
                  <button type="button" onClick={() => setIndex(i)} aria-label={t.gallery.open(i + 1)}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} alt={t.gallery.photoAlt(i + 1)} loading="lazy" decoding="async" />
                  </button>
                </li>
              ))}
            </ul>
            {visible < total && (
              <div className="gallery__more">
                <button type="button" className="btn btn--ghost" onClick={() => setVisible((v) => v + STEP)}>
                  {t.gallery.showMore}
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <Modal open={index !== null} onClose={close} label={t.gallery.title} className="lightbox">
        {index !== null && (
          <div className="lightbox__body">
            <button type="button" className="modal__close lightbox__close" onClick={close} aria-label={t.gallery.close}>
              <CloseIcon />
            </button>
            <figure className="lightbox__figure">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img key={photos[index]} src={photos[index]} alt={t.gallery.photoAlt(index + 1)} />
              <figcaption aria-live="polite">{t.gallery.counter(index + 1, total)}</figcaption>
            </figure>
            {total > 1 && (
              <>
                <button type="button" className="lightbox__nav lightbox__nav--prev" onClick={() => go(-1)} aria-label={t.gallery.prev}>
                  <ChevronLeftIcon size={26} />
                </button>
                <button type="button" className="lightbox__nav lightbox__nav--next" onClick={() => go(1)} aria-label={t.gallery.next}>
                  <ChevronRightIcon size={26} />
                </button>
              </>
            )}
          </div>
        )}
      </Modal>
    </section>
  );
}
