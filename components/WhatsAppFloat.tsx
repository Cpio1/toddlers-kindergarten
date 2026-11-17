"use client";

import { useI18n } from "@/lib/i18n";
import { whatsappLink } from "@/lib/site";
import { WhatsAppIcon } from "./Icons";

export function WhatsAppFloat() {
  const { t } = useI18n();
  return (
    <a
      className="wa-float"
      href={whatsappLink(t.whatsappMessage)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.whatsappFloat}
    >
      <WhatsAppIcon size={30} />
      <span className="wa-float__tip" aria-hidden="true">
        {t.whatsappFloat}
      </span>
    </a>
  );
}
