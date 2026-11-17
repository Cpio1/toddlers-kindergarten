"use client";

import Image from "next/image";
import { useCallback, useEffect } from "react";
import { useI18n } from "@/lib/i18n";
import type { ImageAsset } from "@/lib/media";
import { ChevronLeftIcon, ChevronRightIcon, CloseIcon } from "./Icons";
import { Modal } from "./Modal";

export interface LightboxPhoto {
  img: ImageAsset;
  alt: string;
}

/**
 * Полноэкранный просмотр фото целиком (object-fit: contain — без обрезки).
 * Несколько фото — стрелки на экране и клавиши ←/→; Escape и кнопка закрывают.
 */
export function Lightbox({
  photos,
  index,
  onIndex,
  label,
}: {
  photos: LightboxPhoto[];
  index: number | null;
  onIndex: (i: number | null) => void;
  label: string;
}) {
  const { t } = useI18n();
  const total = photos.length;
  const close = useCallback(() => onIndex(null), [onIndex]);
  const go = useCallback(
    (dir: 1 | -1) => {
      if (index !== null) onIndex((index + dir + total) % total);
    },
    [index, onIndex, total],
  );

  useEffect(() => {
    if (index === null || total < 2) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, go, total]);

  const current = index !== null ? photos[index] : null;

  return (
    <Modal open={current !== null} onClose={close} label={label} className="lightbox">
      {current && index !== null && (
        <div className="lightbox__body">
          <button type="button" className="modal__close lightbox__close" onClick={close} aria-label={t.gallery.close}>
            <CloseIcon />
          </button>
          <figure className="lightbox__figure">
            <Image
              key={current.img.src}
              src={current.img.src}
              alt={current.alt}
              width={current.img.width}
              height={current.img.height}
              sizes="100vw"
              className="lightbox__img"
            />
            {total > 1 && <figcaption aria-live="polite">{t.gallery.counter(index + 1, total)}</figcaption>}
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
  );
}
