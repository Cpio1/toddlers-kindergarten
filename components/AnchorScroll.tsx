"use client";

import { useEffect } from "react";

/** Зазор между нижним краем Header и заголовком раздела. */
const GAP = 24;

function headerHeight() {
  return parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--header-h")) || 0;
}

/** Куда прокручивать: к заголовку раздела (.section-head), а не к верхней границе секции. */
function targetTop(section: HTMLElement) {
  if (section.id === "home") return 0;
  const anchor = section.querySelector<HTMLElement>(".section-head") ?? section;
  // translate от анимации появления не влияет на layout, но влияет на getBoundingClientRect —
  // поэтому вычитаем его, чтобы позиция не «плыла».
  const shift = parseFloat(getComputedStyle(anchor).translate.split(" ")[1] ?? "0") || 0;
  const top = anchor.getBoundingClientRect().top - shift + window.scrollY - headerHeight() - GAP;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  return Math.max(0, Math.min(Math.round(top), max));
}

function scrollToSection(section: HTMLElement, smooth: boolean) {
  const behavior: ScrollBehavior =
    smooth && !window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "smooth" : "auto";
  window.scrollTo({ top: targetTop(section), behavior });

  // Мягкая докоррекция после окончания прокрутки (если за время анимации что-то
  // догрузилось и сдвинуло раскладку) — без резких скачков, только если промах > 2px.
  let done = false;
  const correct = () => {
    if (done) return;
    done = true;
    window.removeEventListener("scrollend", correct);
    const diff = targetTop(section) - window.scrollY;
    if (Math.abs(diff) > 2) window.scrollTo({ top: targetTop(section), behavior });
  };
  window.addEventListener("scrollend", correct, { once: true });
  window.setTimeout(correct, 1500); // браузеры без scrollend

  // Доступность: переносим фокус в раздел без повторной прокрутки.
  if (!section.hasAttribute("tabindex")) section.setAttribute("tabindex", "-1");
  section.focus({ preventScroll: true });
}

/**
 * Перехватывает клики по внутренним ссылкам (#about, #groups…) из любого места страницы:
 * Header, мобильное меню, Hero, Footer.
 */
export function AnchorScroll() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = (e.target as Element | null)?.closest<HTMLAnchorElement>('a[href^="#"]');
      if (!link) return;
      const id = decodeURIComponent(link.hash.slice(1));
      const section = id ? document.getElementById(id) : null;
      if (!section) return;
      e.preventDefault();
      scrollToSection(section, true);
      if (location.hash !== `#${id}`) history.pushState(null, "", `#${id}`);
    };

    // Прямой заход по ссылке вида /#groups и навигация «назад/вперёд».
    const fromHash = (smooth: boolean) => {
      const id = decodeURIComponent(location.hash.slice(1));
      const section = id ? document.getElementById(id) : null;
      if (section) scrollToSection(section, smooth);
    };
    const onPop = () => fromHash(true);

    document.addEventListener("click", onClick);
    window.addEventListener("popstate", onPop);
    if (location.hash) requestAnimationFrame(() => fromHash(false));
    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("popstate", onPop);
    };
  }, []);

  return null;
}
