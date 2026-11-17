// Серверные хелперы: находят реальные файлы в /public во время сборки.
// Ничего не подставляется, если файла нет.
import fs from "node:fs";
import path from "node:path";
import { imageSize } from "image-size";
import { GROUP_PHOTOS, PROGRAM_PHOTOS } from "./photos";
import type { GroupKey } from "./site";
import type { ProgramCategoryKey } from "@/locales/types";

const PUBLIC_DIR = path.join(process.cwd(), "public");
const IMAGE_EXT = [".png", ".jpg", ".jpeg", ".webp", ".avif"];
const VIDEO_EXT = [".mp4", ".webm", ".mov"];

export interface ImageAsset {
  type: "image";
  src: string;
  width: number;
  height: number;
}
export interface VideoAsset {
  type: "video";
  src: string;
  mime: string;
  poster?: string;
}
export type MediaAsset = ImageAsset | VideoAsset;

function readImage(rel: string): ImageAsset | null {
  const abs = path.join(PUBLIC_DIR, rel);
  if (!fs.existsSync(abs)) return null;
  try {
    const { width, height, orientation } = imageSize(fs.readFileSync(abs));
    if (!width || !height) return null;
    // EXIF-поворот (фото с телефона): меняем стороны местами, чтобы не исказить пропорции.
    const rotated = orientation !== undefined && orientation >= 5;
    return {
      type: "image",
      src: toSrc(rel),
      width: rotated ? height : width,
      height: rotated ? width : height,
    };
  } catch {
    return null; // повреждённый файл не показываем
  }
}

/** Папки, где ищутся именованные файлы (main-page, main-page2, logo): сначала /public, затем /public/gallery. */
const SEARCH_DIRS = ["", "gallery"];

/** Первый существующий файл base + одно из расширений (путь относительно /public). */
function findFile(base: string, exts: string[], dirs = SEARCH_DIRS) {
  for (const dir of dirs) {
    for (const ext of exts) {
      for (const e of [ext, ext.toUpperCase()]) {
        const rel = path.join(dir, base + e);
        if (fs.existsSync(path.join(PUBLIC_DIR, rel))) return rel;
      }
    }
  }
  return null;
}

const toSrc = (rel: string) => "/" + rel.split(path.sep).map(encodeURIComponent).join("/");

/** Фото главного экрана: main-page (png — приоритетный формат по ТЗ, затем jpg/jpeg/webp/avif). */
export function getHeroImage(): ImageAsset | null {
  const file = findFile("main-page", IMAGE_EXT);
  return file ? readImage(file) : null;
}

/** Медиа для раздела «О нас / Біз туралы»: main-page2 — видео или изображение. */
export function getAboutMedia(): MediaAsset | null {
  const video = findFile("main-page2", VIDEO_EXT);
  if (video) {
    const ext = path.extname(video).toLowerCase();
    const mime = ext === ".webm" ? "video/webm" : ext === ".mov" ? "video/quicktime" : "video/mp4";
    const poster = findFile("main-page2-poster", IMAGE_EXT);
    return { type: "video", src: toSrc(video), mime, poster: poster ? toSrc(poster) : undefined };
  }
  const img = findFile("main-page2", IMAGE_EXT);
  return img ? readImage(img) : null;
}

/** PNG/SVG/WebP-логотип, если заказчик его положил в /public. */
export function getLogo(): ImageAsset | null {
  const file = findFile("logo", [".png", ".webp", ".svg"]);
  if (!file) return null;
  if (file.toLowerCase().endsWith(".svg")) return { type: "image", src: toSrc(file), width: 160, height: 48 };
  return readImage(file);
}

/** Фото из /public/gallery по имени без расширения (для разделов «Группы» и «Программы»). */
function galleryPhoto(base: string): ImageAsset | null {
  const file = findFile(base, IMAGE_EXT, ["gallery"]);
  return file ? readImage(file) : null;
}

function pick<K extends string>(map: Partial<Record<K, string>>): Partial<Record<K, ImageAsset>> {
  const out: Partial<Record<K, ImageAsset>> = {};
  for (const [k, base] of Object.entries(map) as [K, string][]) {
    const img = galleryPhoto(base);
    if (img) out[k] = img;
  }
  return out;
}

export const getGroupPhotos = (): Partial<Record<GroupKey, ImageAsset>> => pick(GROUP_PHOTOS);
export const getProgramPhotos = (): Partial<Record<ProgramCategoryKey, ImageAsset>> => pick(PROGRAM_PHOTOS);

/** Имена файлов (без расширения), которые уже показаны в других разделах. */
const RESERVED = new Set(
  ["main-page", "main-page2", "main-page2-poster", "logo", ...Object.values(GROUP_PHOTOS), ...Object.values(PROGRAM_PHOTOS)].map(
    (n) => String(n).toLowerCase(),
  ),
);

/** Изображения из /public/gallery для раздела «Галерея»: по имени файла, без дублей и без снимков из других разделов. */
export function getGalleryPhotos(): ImageAsset[] {
  const dir = path.join(PUBLIC_DIR, "gallery");
  if (!fs.existsSync(dir)) return [];
  const seen = new Set<string>();
  return fs
    .readdirSync(dir)
    .filter((f) => !f.startsWith(".") && IMAGE_EXT.includes(path.extname(f).toLowerCase()))
    .filter((f) => !RESERVED.has(path.parse(f).name.toLowerCase()))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map((f) => readImage(path.join("gallery", f)))
    .filter((a): a is ImageAsset => {
      if (!a) return false;
      const key = `${a.width}x${a.height}:${fs.statSync(path.join(PUBLIC_DIR, decodeURIComponent(a.src))).size}`;
      if (seen.has(key)) return false; // одинаковые файлы под разными именами
      seen.add(key);
      return true;
    });
}
