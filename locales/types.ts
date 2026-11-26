import type { GroupKey, SectionId } from "@/lib/site";

export type Locale = "ru" | "kk";

export type ProgramCategoryKey = "intellect" | "language" | "creative" | "sport" | "interactive";

export interface GroupCopy {
  key: GroupKey;
  name: string; // Kinders / Stars / Preschoolers — не переводится
  title: string;
  age: string;
  description: string;
  programs: string[];
}

export interface Dictionary {
  meta: { title: string; description: string };
  nav: Record<SectionId, string>;
  header: {
    enroll: string;
    homeAria: string;
    openMenu: string;
    closeMenu: string;
    langSwitch: string;
    mainNav: string;
    skip: string;
  };
  whatsappMessage: string;
  whatsappFloat: string;
  hero: {
    titleStart: string;
    titleAccent: string;
    subtitle: string;
    badges: [string, string, string, string];
    ctaPrimary: string;
    ctaSecondary: string;
    photoAlt: string;
    ageLabel: string;
    ageUnit: string;
  };
  about: {
    eyebrow: string;
    title: string;
    subtitle: string;
    lead: string;
    body: string;
    blocks: { title: string; text: string }[];
    agesCaption: string;
  };
  groups: {
    eyebrow: string;
    title: string;
    subtitle: string;
    languageLabel: string;
    language: string;
    more: string;
    less: string;
    fullProgram: string;
    moreCount: (n: number) => string;
    close: string;
    items: GroupCopy[];
  };
  programs: {
    eyebrow: string;
    title: string;
    subtitle: string;
    note: string;
    hub: string;
    hubSub: string;
    whereLabel: string;
    categories: Record<
      ProgramCategoryKey,
      { title: string; description: string; items: string[] }
    >;
  };
  nutrition: {
    eyebrow: string;
    title: string;
    subtitle: string;
    accent: string;
    text: string;
    facts: [string, string, string];
    plateLabel: string;
  };
  gallery: {
    eyebrow: string;
    title: string;
    subtitle: string;
    emptyTitle: string;
    emptyText: string;
    showMore: string;
    photoAlt: (n: number) => string;
    open: (n: number) => string;
    prev: string;
    next: string;
    close: string;
    counter: (i: number, total: number) => string;
  };
  documents: {
    eyebrow: string;
    title: string;
    subtitle: string;
    cardTitle: string;
    cardText: string;
    button: string;
    note: string;
    /** aria-label кнопки: сообщает, что ссылка откроется в новой вкладке. */
    buttonAria: string;
  };
  contacts: {
    eyebrow: string;
    title: string;
    text: string;
    addressLabel: string;
    address: string;
    phoneLabel: string;
    instagramLabel: string;
    hoursLabel: string;
    call: string;
    whatsapp: string;
    instagram: string;
    route: string;
    mapTitle: string;
    mapText: string;
    mapButton: string;
  };
  footer: {
    description: string;
    navTitle: string;
    contactsTitle: string;
    rights: string;
    hoursLabel: string;
  };
  /** Подписи (alt) к реальным фотографиям в разделах. */
  photos: {
    about: string;
    interior: string;
    intellect: string;
    sport: string;
    open: string;
  };
}
