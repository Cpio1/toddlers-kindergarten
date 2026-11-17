// Декоративные SVG-фигурки. Все скрыты от вспомогательных технологий
// и не перехватывают клики (класс .deco задаёт pointer-events: none).
import type { CSSProperties } from "react";

interface P {
  className?: string;
  style?: CSSProperties;
  color?: string;
  color2?: string;
}

const base = (cls?: string) => `deco ${cls ?? ""}`.trim();
const svgProps = { "aria-hidden": true, focusable: false } as const;

export function Cloud({ className, style, color = "#fff" }: P) {
  return (
    <svg {...svgProps} className={base(className)} style={style} viewBox="0 0 120 70">
      <path
        fill={color}
        d="M30 62c-14 0-24-9-24-21 0-11 9-20 21-21C31 9 42 2 55 2c15 0 27 10 29 23 2-1 5-1 7-1 13 0 23 9 23 19s-10 19-23 19H30z"
      />
    </svg>
  );
}

export function Star({ className, style, color = "#FFD43B" }: P) {
  return (
    <svg {...svgProps} className={base(className)} style={style} viewBox="0 0 48 48">
      <path
        fill={color}
        stroke={color}
        strokeWidth="3"
        strokeLinejoin="round"
        d="M24 4l5.6 12.4L43 18l-10 9.2 2.8 13.4L24 33.8 12.2 40.6 15 27.2 5 18l13.4-1.6z"
      />
    </svg>
  );
}

export function Sparkle({ className, style, color = "#FFD43B" }: P) {
  return (
    <svg {...svgProps} className={base(className)} style={style} viewBox="0 0 40 40">
      <path fill={color} d="M20 0c1.6 10 8.4 18 20 20-11.6 2-18.4 10-20 20-1.6-10-8.4-18-20-20C11.6 18 18.4 10 20 0z" />
    </svg>
  );
}

export function Sun({ className, style, color = "#FFD43B", color2 = "#FFB870" }: P) {
  const rays = Array.from({ length: 10 }, (_, i) => i * 36);
  return (
    <svg {...svgProps} className={base(className)} style={style} viewBox="0 0 100 100">
      <g stroke={color2} strokeWidth="6" strokeLinecap="round">
        {rays.map((r) => (
          <line key={r} x1="50" y1="6" x2="50" y2="16" transform={`rotate(${r} 50 50)`} />
        ))}
      </g>
      <circle cx="50" cy="50" r="26" fill={color} />
      <circle cx="42" cy="47" r="3" fill="#203354" />
      <circle cx="58" cy="47" r="3" fill="#203354" />
      <path d="M41 56c5 6 13 6 18 0" fill="none" stroke="#203354" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function Flower({ className, style, color = "#FFD9E4", color2 = "#FFD43B" }: P) {
  return (
    <svg {...svgProps} className={base(className)} style={style} viewBox="0 0 60 60">
      {[0, 72, 144, 216, 288].map((r) => (
        <ellipse key={r} cx="30" cy="15" rx="10" ry="13" fill={color} transform={`rotate(${r} 30 30)`} />
      ))}
      <circle cx="30" cy="30" r="9" fill={color2} />
    </svg>
  );
}

export function Heart({ className, style, color = "#FFB870" }: P) {
  return (
    <svg {...svgProps} className={base(className)} style={style} viewBox="0 0 48 44">
      <path fill={color} d="M24 42S2 29 2 14C2 6.8 7.6 2 14 2c4.4 0 8 2.4 10 6 2-3.6 5.6-6 10-6 6.4 0 12 4.8 12 12 0 15-22 28-22 28z" />
    </svg>
  );
}

export function Rainbow({ className, style }: P) {
  return (
    <svg {...svgProps} className={base(className)} style={style} viewBox="0 0 120 64">
      <g fill="none" strokeLinecap="round" strokeWidth="9">
        <path d="M8 60a52 52 0 0 1 104 0" stroke="#2563EB" />
        <path d="M20 60a40 40 0 0 1 80 0" stroke="#FFD43B" />
        <path d="M32 60a28 28 0 0 1 56 0" stroke="#FFB870" />
        <path d="M44 60a16 16 0 0 1 32 0" stroke="#C4EEDB" />
      </g>
    </svg>
  );
}

export function Pencil({ className, style }: P) {
  return (
    <svg {...svgProps} className={base(className)} style={style} viewBox="0 0 120 28">
      <rect x="18" y="4" width="80" height="20" rx="3" fill="#FFD43B" />
      <rect x="18" y="4" width="80" height="7" fill="#FFDF57" />
      <rect x="98" y="4" width="14" height="20" rx="4" fill="#FFB8C9" />
      <rect x="92" y="4" width="8" height="20" fill="#D7ECFF" />
      <path d="M18 4L2 14l16 10z" fill="#FBE3C2" />
      <path d="M8 10.3L2 14l6 3.7z" fill="#203354" />
    </svg>
  );
}

export function Cube({ className, style, color = "#2563EB", color2 = "#FFD43B" }: P & { letter?: string }) {
  return (
    <svg {...svgProps} className={base(className)} style={style} viewBox="0 0 60 60">
      <path d="M30 4l24 12v28L30 56 6 44V16z" fill={color} />
      <path d="M30 4l24 12-24 12L6 16z" fill="#fff" opacity=".35" />
      <path d="M30 28v28" stroke="#fff" strokeOpacity=".35" strokeWidth="2" />
      <circle cx="18" cy="36" r="5" fill={color2} />
      <circle cx="42" cy="36" r="5" fill={color2} />
    </svg>
  );
}

export function LetterBlock({
  className,
  style,
  letter,
  color = "#2563EB",
  color2 = "#FFD43B",
}: P & { letter: string }) {
  return (
    <svg {...svgProps} className={base(className)} style={style} viewBox="0 0 64 64">
      <rect x="4" y="8" width="54" height="52" rx="12" fill="#203354" opacity=".12" />
      <rect x="2" y="2" width="54" height="52" rx="12" fill={color} />
      <rect x="9" y="9" width="40" height="38" rx="8" fill="none" stroke={color2} strokeWidth="3" strokeDasharray="5 5" />
      <text
        x="29"
        y="39"
        textAnchor="middle"
        fontFamily="var(--font-heading), sans-serif"
        fontWeight="900"
        fontSize="28"
        fill={color2}
      >
        {letter}
      </text>
    </svg>
  );
}

export function Spiral({ className, style, color = "#2563EB" }: P) {
  return (
    <svg {...svgProps} className={base(className)} style={style} viewBox="0 0 60 60">
      <path
        d="M30 30c0-3 4-3 4 0 0 5-8 6-9 0-1-8 9-11 14-4 6 8-1 19-11 19-12 0-18-12-13-22 6-12 24-14 32-2"
        fill="none"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Squiggle({ className, style, color = "#FFD43B" }: P) {
  return (
    <svg {...svgProps} className={base(className)} style={style} viewBox="0 0 120 24">
      <path
        d="M4 12c8-10 16-10 24 0s16 10 24 0 16-10 24 0 16 10 24 0 12-8 16-4"
        fill="none"
        stroke={color}
        strokeWidth="6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Dots({ className, style, color = "#2563EB" }: P) {
  return (
    <svg {...svgProps} className={base(className)} style={style} viewBox="0 0 64 64">
      <g fill={color}>
        {Array.from({ length: 16 }, (_, i) => (
          <circle key={i} cx={8 + (i % 4) * 16} cy={8 + Math.floor(i / 4) * 16} r="3.5" />
        ))}
      </g>
    </svg>
  );
}

export function Ring({ className, style, color = "#FFD43B" }: P) {
  return (
    <svg {...svgProps} className={base(className)} style={style} viewBox="0 0 40 40">
      <circle cx="20" cy="20" r="14" fill="none" stroke={color} strokeWidth="6" />
    </svg>
  );
}

export function Triangle({ className, style, color = "#C4EEDB" }: P) {
  return (
    <svg {...svgProps} className={base(className)} style={style} viewBox="0 0 40 40">
      <path d="M20 5l16 28H4z" fill={color} stroke={color} strokeWidth="6" strokeLinejoin="round" />
    </svg>
  );
}

export function Book({ className, style }: P) {
  return (
    <svg {...svgProps} className={base(className)} style={style} viewBox="0 0 80 60">
      <path d="M40 12C30 4 14 4 4 8v46c10-4 26-4 36 4z" fill="#2563EB" />
      <path d="M40 12c10-8 26-8 36-4v46c-10-4-26-4-36 4z" fill="#1D4ED8" />
      <path d="M40 14C31 7 17 7 9 10v38c8-3 22-3 31 4z" fill="#fff" />
      <path d="M40 14c9-7 23-7 31-4v38c-8-3-22-3-31 4z" fill="#EAF4FF" />
      <g stroke="#D7ECFF" strokeWidth="2" strokeLinecap="round">
        <path d="M15 20c6-2 13-1 19 2M15 28c6-2 13-1 19 2M15 36c6-2 13-1 19 2" />
        <path d="M46 22c6-3 13-4 19-2M46 30c6-3 13-4 19-2M46 38c6-3 13-4 19-2" />
      </g>
    </svg>
  );
}

export function Wave({ className, style, color = "#fff" }: P) {
  return (
    <svg {...svgProps} className={base(className)} style={style} viewBox="0 0 1440 60" preserveAspectRatio="none">
      <path
        fill={color}
        d="M0 30c120-22 240-30 360-14s240 40 360 30 240-44 360-44 240 26 360 32V60H0z"
      />
    </svg>
  );
}
