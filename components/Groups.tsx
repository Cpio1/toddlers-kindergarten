"use client";

import { useCallback, useState } from "react";
import { useI18n } from "@/lib/i18n";
import type { GroupKey } from "@/lib/site";
import type { GroupCopy } from "@/locales/types";
import { Book, Cloud, Flower, Heart, LetterBlock, Pencil, Sparkle, Star, Cube, Squiggle } from "./Decor";
import { CheckIcon, ChevronDownIcon, CloseIcon, ArrowRightIcon } from "./Icons";
import { SectionHead } from "./SectionHead";
import { Modal } from "./Modal";

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

function GroupCard({ g, index, onOpen }: { g: GroupCopy; index: number; onOpen: (k: GroupKey) => void }) {
  const { t } = useI18n();
  const [expanded, setExpanded] = useState(false);
  const preview = g.programs.slice(0, PREVIEW);
  const rest = g.programs.length - PREVIEW;
  const listId = `group-${g.key}-programs`;
  const [name, ...titleRest] = g.title.split(" — ");

  return (
    <article
      className={`group-card group-card--${g.key}`}
      data-reveal
      style={{ "--d": `${index * 90}ms` } as React.CSSProperties}
      aria-labelledby={`group-${g.key}-title`}
    >
      <CardArt k={g.key} />
      <div className="group-card__top">
        <span className="age-badge">{g.age}</span>
      </div>
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

export function Groups() {
  const { t } = useI18n();
  const [openKey, setOpenKey] = useState<GroupKey | null>(null);
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
            <GroupCard key={g.key} g={g} index={i} onOpen={setOpenKey} />
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
    </section>
  );
}
