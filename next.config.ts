import type { NextConfig } from "next";

// GITHUB_PAGES=true → статический экспорт для https://cpio1.github.io/toddlers-kindergarten/
// Без переменной (Vercel, локальная разработка) → обычная сборка Next.js по корню "/".
const isGithubPages = process.env.GITHUB_PAGES === "true";
const basePath = isGithubPages ? "/toddlers-kindergarten" : "";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Доступно и на сервере (lib/media.ts), и в клиентском коде — для URL файлов из /public.
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  ...(isGithubPages && {
    output: "export",
    basePath,
    trailingSlash: true,
    // На GitHub Pages нет сервера оптимизации изображений.
    images: { unoptimized: true },
  }),
};

export default nextConfig;
