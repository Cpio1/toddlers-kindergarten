import type { NextConfig } from "next";

// GITHUB_PAGES=true → статический экспорт для GitHub Pages.
// Без переменной (Vercel, локальная разработка) → обычная сборка Next.js по корню "/".
const isGithubPages = process.env.GITHUB_PAGES === "true";

/**
 * Базовый путь сайта на GitHub Pages.
 * PAGES_BASE_PATH передаёт workflow из actions/configure-pages (outputs.base_path):
 *   — собственный домен (toddlers.edu.kz) → "" (сайт в корне);
 *   — адрес cpio1.github.io/toddlers-kindergarten → "/toddlers-kindergarten".
 * Если переменная не задана (локальная сборка без неё) — запасной вариант "/toddlers-kindergarten".
 */
function resolveBasePath(): string {
  if (!isGithubPages) return "";
  const raw = process.env.PAGES_BASE_PATH ?? "/toddlers-kindergarten";
  const trimmed = raw.trim().replace(/\/+$/, ""); // "/" → "", "/x/" → "/x"
  if (!trimmed) return "";
  return trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
}

const basePath = resolveBasePath();

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Доступно и на сервере (lib/media.ts), и в клиентском коде — для URL файлов из /public.
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  ...(isGithubPages && {
    output: "export",
    ...(basePath && { basePath }),
    trailingSlash: true,
    // На GitHub Pages нет сервера оптимизации изображений.
    images: { unoptimized: true },
  }),
};

export default nextConfig;
