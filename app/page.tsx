import fs from "node:fs";
import path from "node:path";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Groups } from "@/components/Groups";
import { Programs } from "@/components/Programs";
import { Nutrition } from "@/components/Nutrition";
import { Gallery } from "@/components/Gallery";
import { Contacts } from "@/components/Contacts";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { RevealObserver } from "@/components/RevealObserver";
import { SkipLink } from "@/components/SkipLink";
import { AnchorScroll } from "@/components/AnchorScroll";

const PUBLIC_DIR = path.join(process.cwd(), "public");
const IMAGE_RE = /\.(jpe?g|png|webp|avif)$/i;

/** main-page.png используется только если файл реально лежит в /public. */
function getHeroImage(): string | null {
  return fs.existsSync(path.join(PUBLIC_DIR, "main-page.png")) ? "/main-page.png" : null;
}

/** Фотографии галереи — все изображения из /public/gallery (по имени файла). */
function getGalleryPhotos(): string[] {
  const dir = path.join(PUBLIC_DIR, "gallery");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => IMAGE_RE.test(f) && !f.startsWith("."))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map((f) => `/gallery/${encodeURIComponent(f)}`);
}

export default function Home() {
  return (
    <>
      <SkipLink />
      <Header />
      <main id="main">
        <Hero heroImage={getHeroImage()} />
        <About />
        <Groups />
        <Programs />
        <Nutrition />
        <Gallery photos={getGalleryPhotos()} />
        <Contacts />
      </main>
      <Footer />
      <WhatsAppFloat />
      <RevealObserver />
      <AnchorScroll />
    </>
  );
}
