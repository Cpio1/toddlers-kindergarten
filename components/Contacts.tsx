"use client";

import { useI18n } from "@/lib/i18n";
import { SITE, whatsappLink } from "@/lib/site";
import { Cloud, Sparkle, Star } from "./Decor";
import { ClockIcon, InstagramIcon, PhoneIcon, PinIcon, RouteIcon, WhatsAppIcon } from "./Icons";

export function Contacts() {
  const { t } = useI18n();
  const c = t.contacts;

  const items = [
    { icon: PinIcon, label: c.addressLabel, value: c.address, href: SITE.twoGisUrl, external: true, cls: "addr" },
    { icon: PhoneIcon, label: c.phoneLabel, value: SITE.phoneDisplay, href: SITE.phoneHref, cls: "phone" },
    { icon: InstagramIcon, label: c.instagramLabel, value: SITE.instagramHandle, href: SITE.instagramUrl, external: true, cls: "insta" },
    { icon: ClockIcon, label: c.hoursLabel, value: SITE.hours, cls: "hours" },
  ];

  return (
    <section id="contacts" className="section contacts section-anchor">
      <div className="contacts__deco" aria-hidden="true">
        <Cloud className="contacts__cloud drift" color="#fff" />
      </div>
      <div className="wrap contacts__grid">
        <div className="contacts__main">
          <header className="section-head" data-reveal>
            <span className="eyebrow">{c.eyebrow}</span>
            <h2 className="section-title">{c.title}</h2>
            <p className="section-subtitle">{c.text}</p>
          </header>

          <ul className="contact-cards" data-reveal>
            {items.map(({ icon: Icon, label, value, href, external, cls }) => {
              const content = (
                <>
                  <span className="contact-card__icon">
                    <Icon size={22} />
                  </span>
                  <span className="contact-card__text">
                    <span className="contact-card__label">{label}</span>
                    <span className="contact-card__value">{value}</span>
                  </span>
                </>
              );
              return (
                <li key={cls} className={`contact-card contact-card--${cls}`}>
                  {href ? (
                    <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                      {content}
                    </a>
                  ) : (
                    <div>{content}</div>
                  )}
                </li>
              );
            })}
          </ul>

          <div className="contacts__ctas" data-reveal>
            <a className="btn btn--primary" href={SITE.phoneHref}>
              <PhoneIcon size={18} />
              {c.call}
            </a>
            <a className="btn btn--whatsapp" href={whatsappLink(t.whatsappMessage)} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon size={20} />
              {c.whatsapp}
            </a>
            <a className="btn btn--ghost" href={SITE.instagramUrl} target="_blank" rel="noopener noreferrer">
              <InstagramIcon size={18} />
              {c.instagram}
            </a>
          </div>
        </div>

        {/* Карточка-карта: без выдуманных координат, переход к поиску адреса в 2GIS */}
        <div className="map-card" data-reveal>
          <div className="map-card__art" aria-hidden="true">
            <svg className="map-card__map" viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice">
              <rect width="400" height="260" fill="#EAF4FF" />
              <path d="M0 70h400M0 170h400M90 0v260M250 0v260M330 0v260" stroke="#fff" strokeWidth="18" />
              <path d="M0 70h400M0 170h400M90 0v260M250 0v260M330 0v260" stroke="#D7ECFF" strokeWidth="2" strokeDasharray="8 10" />
              <rect x="110" y="88" width="120" height="64" rx="14" fill="#C4EEDB" />
              <rect x="270" y="88" width="44" height="64" rx="10" fill="#FFF3B0" />
              <rect x="10" y="190" width="60" height="52" rx="10" fill="#DDD4FF" />
              <rect x="110" y="190" width="120" height="52" rx="10" fill="#FFD9E4" opacity=".7" />
              <rect x="10" y="10" width="60" height="42" rx="10" fill="#FFF3B0" />
              <path d="M40 240 C 90 200, 140 210, 170 150 S 220 100, 250 120" stroke="#2563EB" strokeWidth="4" strokeDasharray="2 10" strokeLinecap="round" fill="none" />
            </svg>
            <div className="map-card__pin">
              <PinIcon size={30} />
            </div>
            <Star className="map-card__star spin-slow" />
            <Sparkle className="map-card__sparkle twinkle" color="#2563EB" />
          </div>
          <div className="map-card__info">
            <h3>{c.mapTitle}</h3>
            <p>{c.mapText}</p>
            <a className="btn btn--yellow btn--block" href={SITE.twoGisUrl} target="_blank" rel="noopener noreferrer">
              <RouteIcon size={20} />
              {c.route}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
