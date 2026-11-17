// Единый источник реальных данных о детском саде.
// Не добавляйте сюда сведения, которые не подтверждены заказчиком.

export const SITE = {
  legalName: "ТОО «Toddlers»",
  brand: "Toddlers",
  phoneDisplay: "+7 707 066 38 58",
  phoneHref: "tel:+77070663858",
  whatsappNumber: "77070663858",
  instagramHandle: "@toddler_preschool",
  instagramUrl: "https://www.instagram.com/toddler_preschool/",
  hours: "08:30–18:30",
  // Поиск адреса в 2GIS — без выдуманных координат и ID организации.
  twoGisUrl: `https://2gis.kz/almaty/search/${encodeURIComponent("Сатпаева 90/36")}`,
} as const;

export function whatsappLink(message: string) {
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const SECTION_IDS = [
  "home",
  "about",
  "groups",
  "programs",
  "nutrition",
  "gallery",
  "contacts",
] as const;

export type SectionId = (typeof SECTION_IDS)[number];

export type GroupKey = "kinders" | "stars" | "preschoolers";
