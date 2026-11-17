"use client";

import { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n";
import { SECTION_IDS, SITE } from "@/lib/site";
import { Cloud, Sparkle, Star, Wave } from "./Decor";
import { ClockIcon, InstagramIcon, PhoneIcon, PinIcon } from "./Icons";
import { Logo } from "./Logo";

export function Footer() {
  const { t } = useI18n();
  const [year, setYear] = useState<number | null>(null);
  useEffect(() => setYear(new Date().getFullYear()), []);

  return (
    <footer className="site-footer">
      <Wave className="site-footer__wave" color="#173B82" />
      <div className="site-footer__deco" aria-hidden="true">
        <Star className="site-footer__star spin-slow" />
        <Sparkle className="site-footer__sparkle twinkle" color="#FFDF57" />
        <Cloud className="site-footer__cloud drift" color="rgba(255,255,255,.08)" />
      </div>
      <div className="container site-footer__grid">
        <div className="site-footer__brand">
          <a href="#home" aria-label={t.header.homeAria}>
            <Logo light />
          </a>
          <p>{t.footer.description}</p>
        </div>

        <nav aria-label={t.footer.navTitle} className="site-footer__nav">
          <h2 className="site-footer__title">{t.footer.navTitle}</h2>
          <ul>
            {SECTION_IDS.map((id) => (
              <li key={id}>
                <a href={`#${id}`}>{t.nav[id]}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="site-footer__contacts">
          <h2 className="site-footer__title">{t.footer.contactsTitle}</h2>
          <ul>
            <li>
              <PhoneIcon size={18} />
              <a href={SITE.phoneHref}>{SITE.phoneDisplay}</a>
            </li>
            <li>
              <PinIcon size={18} />
              <a href={SITE.twoGisUrl} target="_blank" rel="noopener noreferrer">
                {t.contacts.address}
              </a>
            </li>
            <li>
              <InstagramIcon size={18} />
              <a href={SITE.instagramUrl} target="_blank" rel="noopener noreferrer">
                {SITE.instagramHandle}
              </a>
            </li>
            <li>
              <ClockIcon size={18} />
              <span>
                {t.footer.hoursLabel}: {SITE.hours}
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div className="container site-footer__bottom">
        <p>
          © {year ?? ""} {t.footer.rights}
        </p>
        <p className="site-footer__legal">{SITE.legalName}</p>
      </div>
    </footer>
  );
}
