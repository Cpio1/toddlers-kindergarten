# Toddlers — лендинг детского сада

Next.js 16 (App Router) + TypeScript, без UI-библиотек. Только светлая тема.

```bash
npm install
npm run dev      # разработка: http://localhost:3000
npm run build && npm run start
```

## Где что лежит

| Что | Где |
| --- | --- |
| Реальные данные (телефон, Instagram, 2GIS, часы) | `lib/site.ts` |
| Тексты RU / KZ | `locales/ru.ts`, `locales/kk.ts` (типы — `locales/types.ts`) |
| Дизайн-система (цвета, отступы, радиусы, тени, анимации) | `:root` в `app/globals.css` |
| Секции | `components/*.tsx` |
| Декоративные SVG-фигурки | `components/Decor.tsx` |

## Фотографии

- **Галерея:** положите фото в `public/gallery/` и пересоберите сайт — они появятся автоматически
  (первые 6 + кнопка «Показать больше», просмотр в модальном окне). Пока папка пуста — заглушка.
- **Главный экран:** файл `public/main-page.png` заменит иллюстрацию в Hero (используется, только если существует).

## Язык

RU по умолчанию, выбор сохраняется в `localStorage`, `<html lang>` переключается между `ru` и `kk`.
