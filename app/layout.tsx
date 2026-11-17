import type { Metadata, Viewport } from "next";
import { Nunito, Nunito_Sans } from "next/font/google";
import { I18nProvider } from "@/lib/i18n";
import ru from "@/locales/ru";
import "./globals.css";

// Обе гарнитуры поддерживают кириллицу, включая казахские буквы (cyrillic-ext).
const heading = Nunito({
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  weight: ["700", "800", "900"],
  variable: "--font-heading",
  display: "swap",
});
const body = Nunito_Sans({
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  weight: ["400", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: ru.meta.title,
  description: ru.meta.description,
  openGraph: { title: ru.meta.title, description: ru.meta.description, locale: "ru_KZ", type: "website" },
  formatDetection: { telephone: false },
};

// Сайт работает только в светлой теме.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FFFFFF",
  colorScheme: "only light",
};

// До гидрации: класс .js для анимаций появления и сохранённый язык в <html lang>.
const bootScript = `(function(){var d=document.documentElement;d.classList.add('js');try{var l=localStorage.getItem('toddlers-lang');if(l==='kk'||l==='ru')d.lang=l;}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${heading.variable} ${body.variable}`} suppressHydrationWarning>
      <head>
        <meta name="color-scheme" content="only light" />
        <meta name="supported-color-schemes" content="light" />
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body>
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
