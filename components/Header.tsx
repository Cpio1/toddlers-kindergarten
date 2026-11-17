"use client";

import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/lib/i18n";
import { NAV_IDS, SECTION_IDS, whatsappLink, type SectionId } from "@/lib/site";
import type { ImageAsset } from "@/lib/media";
import { LOCALE_LABELS, type Locale } from "@/locales";
import { CloseIcon, MenuIcon, WhatsAppIcon } from "./Icons";
import { Logo } from "./Logo";

function LangSwitch({ className = "" }: { className?: string }) {
  const { locale, setLocale, t } = useI18n();
  const options: Locale[] = ["ru", "kk"];
  return (
    <div className={`lang-switch ${className}`} role="group" aria-label={t.header.langSwitch}>
      {options.map((l) => (
        <button
          key={l}
          type="button"
          lang={l}
          className={l === locale ? "is-active" : ""}
          aria-pressed={l === locale}
          onClick={() => setLocale(l)}
        >
          {LOCALE_LABELS[l]}
        </button>
      ))}
      <span className="lang-switch__thumb" data-pos={locale} aria-hidden="true" />
    </div>
  );
}

export function Header({ logo }: { logo: ImageAsset | null }) {
  const { t } = useI18n();
  const ref = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<SectionId>("home");

  // Фактическая высота шапки в «прокрученном» состоянии (в нём она находится после перехода
  // к разделу) → CSS-переменная --header-h. Пересчитывается при смене брейкпоинта/шрифтов.
  useEffect(() => {
    const el = ref.current;
    const bar = el?.querySelector<HTMLElement>(".site-header__bar");
    if (!el || !bar) return;
    const update = () => {
      const pad = parseFloat(getComputedStyle(el).getPropertyValue("--header-pad-scrolled")) || 0;
      document.documentElement.style.setProperty("--header-h", `${Math.ceil(bar.offsetHeight + pad)}px`);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(bar);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Подсветка активного раздела.
  useEffect(() => {
    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id as SectionId);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  // Мобильное меню: Escape и переход на десктоп закрывают его.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const mq = window.matchMedia("(min-width: 1100px)");
    const onMq = () => mq.matches && setOpen(false);
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onMq);
    return () => {
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
    };
  }, [open]);

  const navLinks = (onClick?: () => void) =>
    NAV_IDS.map((id) => (
      <li key={id}>
        <a
          href={`#${id}`}
          className={active === id ? "is-active" : undefined}
          aria-current={active === id ? "true" : undefined}
          onClick={onClick}
        >
          {t.nav[id]}
        </a>
      </li>
    ));

  return (
    <header ref={ref} className={`site-header ${scrolled ? "is-scrolled" : ""} ${open ? "is-open" : ""}`}>
      <div className="site-header__bar wrap">
        <a href="#home" className="site-header__logo" aria-label={t.header.homeAria} onClick={() => setOpen(false)}>
          <Logo asset={logo} />
        </a>

        <nav className="site-nav" aria-label={t.header.mainNav}>
          <ul>{navLinks()}</ul>
        </nav>

        <div className="site-header__actions">
          <LangSwitch />
          <a
            className="btn btn--primary btn--sm site-header__cta"
            href={whatsappLink(t.whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t.header.enroll}
          </a>
          <button
            type="button"
            className="burger"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t.header.closeMenu : t.header.openMenu}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      <div id="mobile-menu" className="mobile-menu" inert={!open}>
        <nav aria-label={t.header.mainNav} className="wrap">
          <ul className="mobile-menu__list">{navLinks(() => setOpen(false))}</ul>
          <a
            className="btn btn--primary btn--block"
            href={whatsappLink(t.whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
          >
            <WhatsAppIcon size={20} />
            {t.hero.ctaPrimary}
          </a>
        </nav>
      </div>
      <button
        type="button"
        className="mobile-menu__backdrop"
        tabIndex={-1}
        aria-hidden="true"
        onClick={() => setOpen(false)}
      />
    </header>
  );
}
