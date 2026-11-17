// Какие реальные фото из /public/gallery показываются в разделах «Группы» и «Программы».
// Имена — без расширения. Фото, указанные здесь (и main-page / main-page2),
// не повторяются в галерее. Чтобы убрать фото из раздела — удалите строку,
// и снимок вернётся в галерею.
import type { GroupKey } from "./site";
import type { ProgramCategoryKey } from "@/locales/types";

/** Интерьеры без детей — в карточке можно аккуратно кадрировать (object-fit: cover). */
export const GROUP_PHOTOS: Partial<Record<GroupKey, string>> = {
  kinders: "image6", // комната с кроватками и игрушками
  stars: "image8", // комната со столами и мольбертом
  preschoolers: "image9", // класс с партами и картой мира
};

/** Фото к направлениям программ: показываются целиком, без обрезки. */
export const PROGRAM_PHOTOS: Partial<Record<ProgramCategoryKey, string>> = {
  intellect: "image3", // шахматы
  sport: "image1", // зал со шведской стенкой и матами
};

/** Положение кадра для cover, чтобы в узкой рамке осталась самая содержательная часть. */
export const GROUP_PHOTO_FOCUS: Partial<Record<GroupKey, string>> = {
  kinders: "45% 60%",
  stars: "50% 62%",
  preschoolers: "40% 55%",
};
