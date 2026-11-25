# Toddlers — лендинг детского сада

Next.js 16 (App Router) + TypeScript + Tailwind CSS v4. Только светлая тема.

```bash
npm install
npm run dev        # разработка: http://localhost:3000
npm run build      # продакшен-сборка (проверка TypeScript включена)
npm run start
```

## Публикация на Vercel

Импортируйте папку/репозиторий в Vercel — настройки по умолчанию (Framework: Next.js,
Build: `next build`) подходят, переменные окружения не нужны. Node.js ≥ 20.9.

## Публикация на GitHub Pages

Адрес: https://cpio1.github.io/toddlers-kindergarten/

Сайт собирается и публикуется автоматически (`.github/workflows/deploy.yml`) при каждом `git push` в `main`.
Один раз: **Settings → Pages → Build and deployment → Source: GitHub Actions**.

Локальная проверка статического экспорта:

```bash
GITHUB_PAGES=true npm run build   # результат — папка out/ (basePath /toddlers-kindergarten)
```

`GITHUB_PAGES=true` включает `output: "export"`, `basePath`, `trailingSlash` и `images.unoptimized`.
Без переменной (Vercel, `npm run dev`) сайт работает по корню `/`, как раньше.
URL файлов из `/public` формируются через `assetUrl()` в `lib/asset.ts` — используйте его для новых ресурсов.

## Где что лежит

| Что | Где |
| --- | --- |
| Реальные данные (телефон, WhatsApp, Instagram, 2GIS, часы) | `lib/site.ts` |
| Тексты RU / KZ | `locales/ru.ts`, `locales/kk.ts` (типы — `locales/types.ts`) |
| Поиск фото/видео/логотипа в `/public` при сборке | `lib/media.ts` |
| Токены дизайна (Tailwind `@theme`) и стили компонентов | `app/globals.css` |
| Секции | `components/*.tsx` |
| Декоративные SVG-фигурки | `components/Decor.tsx` |

## Фото, видео, логотип

Файлы подхватываются автоматически при сборке — ничего не нужно прописывать в коде.
Если файла нет, показывается иллюстрация или заглушка.

| Файл в `public/` | Где появится |
| --- | --- |
| `main-page.png` | Главный экран (рамка повторяет пропорции фото — без обрезки) |
| `main-page2.mp4` / `.webm` / `.mov` | Раздел «О нас / Біз туралы» как видео (без звука, по кругу) |
| `main-page2.png` / `.jpg` / `.webp` | Раздел «О нас / Біз туралы» как фото (если нет видео) |
| `main-page2-poster.jpg` (необязательно) | Обложка видео до загрузки |
| `logo.png` / `logo.webp` / `logo.svg` | Логотип в шапке и футере (PNG — с прозрачным фоном) |
| `gallery/*.jpg|png|webp|avif` | Галерея: по 6 фото + «Показать больше», просмотр в увеличенном виде |

После замены картинки **с тем же именем** локально удалите `.next/cache/images`.
Видео лучше заранее сжать (например, H.264, ширина ≤ 1280 px, без звука).

## Язык

RU по умолчанию, выбор сохраняется в `localStorage`, `<html lang>` переключается между `ru` и `kk`.
Чтобы сделать казахский языком по умолчанию — `DEFAULT_LOCALE` в `locales/index.ts`.
