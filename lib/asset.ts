/** Префикс развёртывания: "" на Vercel, "/toddlers-kindergarten" на GitHub Pages (см. next.config.ts). */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/**
 * Публичный URL файла из /public с учётом basePath.
 * Принимает путь вида "/gallery/a.jpg" или "gallery/a.jpg"; префикс не добавляется дважды.
 * next/image и <video> не добавляют basePath к src сами — поэтому все URL ресурсов идут через эту функцию.
 */
export function assetUrl(p: string): string {
  if (/^(https?:|data:|blob:)/.test(p)) return p;
  const path = p.startsWith("/") ? p : `/${p}`;
  if (BASE_PATH && (path === BASE_PATH || path.startsWith(`${BASE_PATH}/`))) return path;
  return BASE_PATH + path;
}
