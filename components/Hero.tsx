"use client";

import { useI18n } from "@/lib/i18n";
import { whatsappLink } from "@/lib/site";
import { ArrowRightIcon, WhatsAppIcon } from "./Icons";
import { Cloud, Dots, Flower, Heart, LetterBlock, Rainbow, Ring, Sparkle, Squiggle, Star, Sun, Wave } from "./Decor";

interface HeroProps {
  /** Путь к main-page.png — передаётся только если файл реально существует в /public. */
  heroImage: string | null;
}

const BADGE_ICONS = [
  () => <Sparkle color="#E0A800" />,
  () => <Star color="#2563EB" />,
  () => <Flower color="#FF8FAE" color2="#FFD43B" />,
  () => <Heart color="#3FAF7E" />,
];

function Badges({ variant }: { variant: "desktop" | "mobile" }) {
  const { t } = useI18n();
  return (
    <ul className={`hero-badges hero-badges--${variant}`}>
      {t.hero.badges.map((b, i) => {
        const Icon = BADGE_ICONS[i];
        return (
        <li key={i} className={`hero-badge hero-badge--${i}`}>
          <span className="hero-badge__icon" aria-hidden="true">
            <Icon />
          </span>
          {b}
        </li>
        );
      })}
    </ul>
  );
}

function Ctas({ block = false }: { block?: boolean }) {
  const { t } = useI18n();
  return (
    <div className={`hero-ctas ${block ? "hero-ctas--block" : ""}`}>
      <a className="btn btn--primary btn--lg" href={whatsappLink(t.whatsappMessage)} target="_blank" rel="noopener noreferrer">
        <WhatsAppIcon size={20} />
        {t.hero.ctaPrimary}
      </a>
      <a className="btn btn--ghost btn--lg" href="#groups">
        {t.hero.ctaSecondary}
        <ArrowRightIcon size={18} />
      </a>
    </div>
  );
}

/** Иллюстрация без фотографии: радуга, солнце, кубики TOD, облака. */
function HeroIllustration({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`hero-illu ${compact ? "hero-illu--compact" : ""}`} aria-hidden="true">
      <Rainbow className="hero-illu__rainbow" />
      <Sun className="hero-illu__sun spin-slow" />
      <Cloud className="hero-illu__cloud hero-illu__cloud--1 drift" />
      <Cloud className="hero-illu__cloud hero-illu__cloud--2 drift drift--rev" color="#D7ECFF" />
      <div className="hero-illu__blocks">
        <LetterBlock letter="T" color="#FFD43B" color2="#1D4ED8" className="hero-illu__block hero-illu__block--1" />
        <LetterBlock letter="O" color="#FFFFFF" color2="#2563EB" className="hero-illu__block hero-illu__block--2" />
        <LetterBlock letter="D" color="#FFB870" color2="#173B82" className="hero-illu__block hero-illu__block--3" />
      </div>
      <div className="hero-illu__grass" />
      <Flower className="hero-illu__flower hero-illu__flower--1" />
      <Flower className="hero-illu__flower hero-illu__flower--2" color="#FFDF57" color2="#FFB870" />
      {!compact && <Sparkle className="hero-illu__sparkle twinkle" color="#FFDF57" />}
    </div>
  );
}

function HeroArt({ heroImage }: HeroProps) {
  const { t } = useI18n();
  return (
    <div className="hero-art">
      <div className="hero-art__halo" aria-hidden="true" />
      <div className="hero-art__blob">
        {heroImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={heroImage} alt={t.hero.photoAlt} className="hero-art__photo" fetchPriority="high" />
        ) : (
          <HeroIllustration />
        )}
      </div>
      <div className="hero-art__sticker" aria-hidden="true">
        <strong>2–6</strong>
        <span>{t.hero.ageUnit}</span>
      </div>
      <Star className="hero-art__star hero-art__star--1 spin-slow" />
      <Star className="hero-art__star hero-art__star--2 spin-slow spin-slow--rev" color="#2563EB" />
      <Sparkle className="hero-art__sparkle twinkle" color="#2563EB" />
      <Heart className="hero-art__heart float" color="#FFD9E4" />
      <Dots className="hero-art__dots" color="#FFD43B" />
      <Ring className="hero-art__ring" color="#2563EB" />
      <Cloud className="hero-art__cloud drift" />
    </div>
  );
}

function DesktopHero({ heroImage }: HeroProps) {
  const { t } = useI18n();
  return (
    <div className="hero-desktop container">
      <div className="hero-desktop__text">
        <h1 className="hero-title" data-reveal>
          {t.hero.titleStart} <span className="hl-underline">{t.hero.titleAccent}</span>
        </h1>
        <p className="hero-subtitle" data-reveal style={{ "--d": "80ms" } as React.CSSProperties}>
          {t.hero.subtitle}
        </p>
        <div data-reveal style={{ "--d": "160ms" } as React.CSSProperties}>
          <Ctas />
        </div>
        <div data-reveal style={{ "--d": "240ms" } as React.CSSProperties}>
          <Badges variant="desktop" />
        </div>
      </div>
      <HeroArt heroImage={heroImage} />
    </div>
  );
}

function MobileHero({ heroImage }: HeroProps) {
  const { t } = useI18n();
  return (
    <div className="hero-mobile container">
      <h1 className="hero-title" data-reveal>
        {t.hero.titleStart} <span className="hl-underline">{t.hero.titleAccent}</span>
      </h1>
      <p className="hero-subtitle" data-reveal>
        {t.hero.subtitle}
      </p>
      <div className="hero-mobile__card" data-reveal>
        {heroImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={heroImage} alt={t.hero.photoAlt} className="hero-mobile__photo" />
        ) : (
          <HeroIllustration compact />
        )}
        <div className="hero-mobile__sticker" aria-hidden="true">
          <strong>2–6</strong> {t.hero.ageUnit}
        </div>
      </div>
      <Ctas block />
      <Badges variant="mobile" />
    </div>
  );
}

export function Hero({ heroImage }: HeroProps) {
  return (
    <section id="home" className="hero section-anchor">
      <div className="hero__bg" aria-hidden="true">
        <Cloud className="hero__bg-cloud hero__bg-cloud--1 drift" />
        <Cloud className="hero__bg-cloud hero__bg-cloud--2 drift drift--rev" />
        <Squiggle className="hero__bg-squiggle" />
        <Sparkle className="hero__bg-sparkle twinkle" color="#FFD43B" />
      </div>
      <DesktopHero heroImage={heroImage} />
      <MobileHero heroImage={heroImage} />
      <Wave className="section-wave section-wave--bottom" color="#FFFBEA" />
    </section>
  );
}
