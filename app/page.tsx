import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Groups } from "@/components/Groups";
import { Programs } from "@/components/Programs";
import { Nutrition } from "@/components/Nutrition";
import { Gallery } from "@/components/Gallery";
import { Documents } from "@/components/Documents";
import { Contacts } from "@/components/Contacts";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { RevealObserver } from "@/components/RevealObserver";
import { SkipLink } from "@/components/SkipLink";
import { AnchorScroll } from "@/components/AnchorScroll";
import { getAboutMedia, getGalleryPhotos, getGroupPhotos, getHeroImage, getLogo, getProgramPhotos } from "@/lib/media";

export default function Home() {
  // Файлы ищутся в /public при сборке; если их нет — показываются иллюстрации/заглушки.
  const logo = getLogo();
  return (
    <>
      <SkipLink />
      <Header logo={logo} />
      <main id="main">
        <Hero heroImage={getHeroImage()} />
        <About media={getAboutMedia()} />
        <Groups photos={getGroupPhotos()} />
        <Programs photos={getProgramPhotos()} />
        <Nutrition />
        <Gallery photos={getGalleryPhotos()} />
        <Documents />
        <Contacts />
      </main>
      <Footer logo={logo} />
      <WhatsAppFloat />
      <RevealObserver />
      <AnchorScroll />
    </>
  );
}
