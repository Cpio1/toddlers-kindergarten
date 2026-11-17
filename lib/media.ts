// Серверные хелперы: находят реальные файлы в /public во время сборки.
// Ничего не подставляется, если файла нет.
import fs from "node:fs";
import path from "node:path";
import { imageSize } from "image-size";

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
      src: "/" + rel.split(path.sep).map(encodeURIComponent).join("/"),
      width: rotated ? height : width,
      height: rotated ? width : height,
    };
  } catch {
    return null; // повреждённый файл не показываем
  }
}

/** Первый существующий файл base + одно из расширений. */
function findFile(base: string, exts: string[]) {
  for (const ext of exts) {
    for (const e of [ext, ext.toUpperCase()]) {
      if (fs.existsSync(path.join(PUBLIC_DIR, base + e))) return base + e;
    }
  }
  return null;
}

/** Фото главного экрана: только main-page.png (по ТЗ). */
export function getHeroImage(): ImageAsset | null {
  return readImage("main-page.png");
}

/** Медиа для раздела «О нас / Біз туралы»: main-page2 — видео или изображение. */
export function getAboutMedia(): MediaAsset | null {
  const video = findFile("main-page2", VIDEO_EXT);
  if (video) {
    const ext = path.extname(video).toLowerCase();
    const mime = ext === ".webm" ? "video/webm" : ext === ".mov" ? "video/quicktime" : "video/mp4";
    const poster = findFile("main-page2-poster", IMAGE_EXT);
    return { type: "video", src: "/" + encodeURIComponent(video), mime, poster: poster ? "/" + poster : undefined };
  }
  const img = findFile("main-page2", IMAGE_EXT);
  return img ? readImage(img) : null;
}

/** PNG/SVG/WebP-логотип, если заказчик его положил в /public. */
export function getLogo(): ImageAsset | null {
  const file = findFile("logo", [".png", ".webp", ".svg"]);
  if (!file) return null;
  if (file.toLowerCase().endsWith(".svg")) return { type: "image", src: "/" + file, width: 160, height: 48 };
  return readImage(file);
}

/** Все изображения из /public/gallery, по имени файла, без дублей. */
export function getGalleryPhotos(): ImageAsset[] {
  const dir = path.join(PUBLIC_DIR, "gallery");
  if (!fs.existsSync(dir)) return [];
  const seen = new Set<string>();
  return fs
    .readdirSync(dir)
    .filter((f) => !f.startsWith(".") && IMAGE_EXT.includes(path.extname(f).toLowerCase()))
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
