"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import { useI18n } from "@/lib/i18n";
import type { ImageAsset } from "@/lib/media";
import { GROUP_PHOTO_FOCUS } from "@/lib/photos";
import type { GroupKey } from "@/lib/site";
import type { GroupCopy } from "@/locales/types";
import { Book, Cloud, Flower, Heart, LetterBlock, Pencil, Sparkle, Star, Cube, Squiggle } from "./Decor";
import { CheckIcon, ChevronDownIcon, CloseIcon, ArrowRightIcon } from "./Icons";
import { SectionHead } from "./SectionHead";
import { Modal } from "./Modal";
import { Lightbox } from "./Lightbox";

const PREVIEW = 3;

function CardArt({ k }: { k: GroupKey }) {
  if (k === "kinders")
    return (
      <div className="group-card__art" aria-hidden="true">
        <Cloud className="gc-kinders__cloud drift" color="#D7ECFF" />
        <Cube className="gc-kinders__cube float" color="#2563EB" color2="#FFD43B" />
        <Heart className="gc-kinders__heart" color="#FFB870" />
        <Flower className="gc-kinders__flower" color="#FFD9E4" color2="#FFD43B" />
      </div>
    );
  if (k === "stars")
    return (
      <div className="group-card__art" aria-hidden="true">
        <Star className="gc-stars__star gc-stars__star--1 spin-slow" />
        <Star className="gc-stars__star gc-stars__star--2 spin-slow spin-slow--rev" color="#FFDF57" />
        <Sparkle className="gc-stars__sparkle twinkle" color="#FFF3B0" />
        <LetterBlock letter="A" color="#FFD43B" color2="#173B82" className="gc-stars__block gc-stars__block--a float" />
        <LetterBlock letter="1" color="#FFFFFF" color2="#2563EB" className="gc-stars__block gc-stars__block--1 float float--slow" />
      </div>
    );
  return (
    <div className="group-card__art" aria-hidden="true">
      <Book className="gc-pre__book float" />
      <Pencil className="gc-pre__pencil" />
      <Squiggle className="gc-pre__squiggle" color="#FFD43B" />
      <span className="gc-pre__digits">1 2 3</span>
    </div>
  );
}

/** Маленькая фигурка в углу карточки с фото (не перекрывает снимок и текст). */
function PhotoCardDecor({ k }: { k: GroupKey }) {
  if (k === "kinders") return <Heart className="group-card__corner float" color="#FFB870" />;
  if (k === "stars") return <Star className="group-card__corner spin-slow" color="#FFD43B" />;
  return <Pencil className="group-card__corner group-card__corner--pencil" />;
}

/** Фото интерьера: рамка во всю ширину карточки, кадрирование только интерьера (людей на этих снимках нет). */
function CardPhoto({ k, photo, age, onOpen }: { k: GroupKey; photo: ImageAsset; age: string; onOpen: () => void }) {
  const { t } = useI18n();
  return (
    <div className="group-card__photo">
      <button type="button" onClick={onOpen} aria-label={`${t.photos.open}: ${t.photos.interior}`}>
        <Image
          src={photo.src}
          alt={t.photos.interior}
          width={photo.width}
          height={photo.height}
          sizes="(min-width: 1200px) 400px, (min-width: 900px) 32vw, (min-width: 640px) 50vw, 100vw"
          className="group-card__img"
          style={{ objectPosition: GROUP_PHOTO_FOCUS[k] ?? "50% 50%" }}
        />
      </button>
      <span className="age-badge group-card__photo-badge">{age}</span>
    </div>
  );
}

function ProgramList({ items, id }: { items: string[]; id?: string }) {
  return (
    <ul className="program-list" id={id}>
      {items.map((p) => (
        <li key={p}>
          <span className="program-list__check" aria-hidden="true">
            <CheckIcon size={14} />
          </span>
          {p}
        </li>
      ))}
    </ul>
  );
}

function GroupCard({
  g,
  index,
  onOpen,
  photo,
  onPhoto,
}: {
  g: GroupCopy;
  index: number;
  onOpen: (k: GroupKey) => void;
  photo?: ImageAsset;
  onPhoto: (k: GroupKey) => void;
}) {
  const { t } = useI18n();
  const [expanded, setExpanded] = useState(false);
  const preview = g.programs.slice(0, PREVIEW);
  const rest = g.programs.length - PREVIEW;
  const listId = `group-${g.key}-programs`;
  const [name, ...titleRest] = g.title.split(" — ");

  return (
    <article
      className={`group-card group-card--${g.key} ${photo ? "group-card--photo" : ""}`}
      data-reveal
      style={{ "--d": `${index * 90}ms` } as React.CSSProperties}
      aria-labelledby={`group-${g.key}-title`}
    >
      {photo ? (
        <>
          <CardPhoto k={g.key} photo={photo} age={g.age} onOpen={() => onPhoto(g.key)} />
          <PhotoCardDecor k={g.key} />
        </>
      ) : (
        <>
          <CardArt k={g.key} />
          <div className="group-card__top">
            <span className="age-badge">{g.age}</span>
          </div>
        </>
      )}
      <h3 className="group-card__title" id={`group-${g.key}-title`}>
        <span className="group-card__name">{name}</span>
        <span className="group-card__tagline">{titleRest.join(" — ")}</span>
      </h3>
      <p className="group-card__lang">
        {t.groups.languageLabel}: <strong>{t.groups.language}</strong>
      </p>
      <p className="group-card__desc">{g.description}</p>

      <ul className="chip-row">
        {preview.map((p) => (
          <li key={p} className="chip">
            {p}
          </li>
        ))}
        {rest > 0 && <li className="chip chip--more">{t.groups.moreCount(rest)}</li>}
      </ul>

      {/* Мобильная версия: раскрывающийся список внутри карточки */}
      <div className="group-card__disclosure only-mobile">
        <button
          type="button"
          className="btn btn--card"
          aria-expanded={expanded}
          aria-controls={listId}
          onClick={() => setExpanded((v) => !v)}
        >
          {expanded ? t.groups.less : t.groups.more}
          <ChevronDownIcon size={18} className={`chev ${expanded ? "chev--up" : ""}`} />
        </button>
        <div className={`collapse ${expanded ? "is-open" : ""}`} inert={!expanded}>
          <div className="collapse__inner">
            <p className="collapse__title">{t.groups.fullProgram}</p>
            <ProgramList items={g.programs} id={listId} />
          </div>
        </div>
      </div>

      {/* Десктоп: полный перечень в модальном окне */}
      <button type="button" className="btn btn--card only-desktop" aria-haspopup="dialog" onClick={() => onOpen(g.key)}>
        {t.groups.more}
        <ArrowRightIcon size={18} />
      </button>
    </article>
  );
}

export function Groups({ photos = {} }: { photos?: Partial<Record<GroupKey, ImageAsset>> }) {
  const { t } = useI18n();
  const [openKey, setOpenKey] = useState<GroupKey | null>(null);
  const [photoIndex, setPhotoIndex] = useState<number | null>(null);
  const photoKeys = t.groups.items.map((g) => g.key).filter((k) => photos[k]);
  const lightboxPhotos = photoKeys.map((k) => ({ img: photos[k]!, alt: t.photos.interior }));
  const close = useCallback(() => setOpenKey(null), []);
  const current = t.groups.items.find((g) => g.key === openKey);

  return (
    <section id="groups" className="section groups section-anchor">
      <div className="groups__deco" aria-hidden="true">
        <Sparkle className="groups__sparkle twinkle" color="#FFD43B" />
        <Cloud className="groups__cloud drift" color="#fff" />
      </div>
      <div className="wrap">
        <SectionHead eyebrow={t.groups.eyebrow} title={t.groups.title} subtitle={t.groups.subtitle} />

        <div className="groups__grid">
          {t.groups.items.map((g, i) => (
            <GroupCard
              key={g.key}
              g={g}
              index={i}
              onOpen={setOpenKey}
              photo={photos[g.key]}
              onPhoto={(k) => setPhotoIndex(photoKeys.indexOf(k))}
            />
          ))}
        </div>
      </div>

      <Modal open={!!current} onClose={close} labelledBy="group-modal-title" className={`group-modal group-modal--${openKey ?? ""}`}>
        {current && (
          <div className="modal__body">
            <button type="button" className="modal__close" onClick={close} aria-label={t.groups.close}>
              <CloseIcon />
            </button>
            <div className="group-modal__head">
              <span className="age-badge">{current.age}</span>
              <h3 id="group-modal-title">{current.title}</h3>
              <p className="group-card__lang">
                {t.groups.languageLabel}: <strong>{t.groups.language}</strong>
              </p>
              <p>{current.description}</p>
            </div>
            <p className="collapse__title">{t.groups.fullProgram}</p>
            <ProgramList items={current.programs} />
            <Star className="group-modal__star spin-slow" />
          </div>
        )}
      </Modal>

      <Lightbox photos={lightboxPhotos} index={photoIndex} onIndex={setPhotoIndex} label={t.groups.title} />
    </section>
  );
}
