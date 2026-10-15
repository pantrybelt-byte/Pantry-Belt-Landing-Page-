import { useEffect, useRef, useState, type ReactNode } from "react";
import { Pause, Play } from "lucide-react";

type Tab = "home" | "map" | "pete" | "profile";

/**
 * Clean grabs of the real app (600 x 1297). The recorded status bar and tab bar are covered by
 * crisp redraws, exactly like the promo video's phone, so no recording artifacts show through.
 * `bar` is the status-bar colour sampled from each grab; `fade` softens the edge over maps.
 */
const SCREENS: { src: string; label: string; alt: string; tab: Tab; bar: string; fade?: boolean }[] = [
  {
    src: "/app-screens/02-statewide-map.webp",
    label: "Pantry map",
    alt: "AccessBelt map of Alabama covered in food pantry pins, with county filters",
    tab: "map",
    bar: "#aedf8d",
    fade: true,
  },
  {
    src: "/app-screens/04b-pantry-sheet.webp",
    label: "Pantry details",
    alt: "Pantry details for Selma Area Food Bank with Call and Directions buttons",
    tab: "map",
    bar: "#637b54",
    fade: true,
  },
  {
    src: "/app-screens/07-pete-pantries.webp",
    label: "Ask Pete",
    alt: "Pete, the in-app assistant, listing the pantries closest to you",
    tab: "pete",
    bar: "#fdfdfd",
  },
  {
    src: "/app-screens/06-home-programs.webp",
    label: "Benefits",
    alt: "Home screen shortcuts for SNAP, WIC and emergency food help",
    tab: "home",
    bar: "#fdfdfd",
  },
  {
    src: "/app-screens/05-home-stats.webp",
    label: "Home",
    alt: "AccessBelt home screen showing 883 pantries across 67 counties, 100% free",
    tab: "home",
    bar: "#efeef5",
  },
];

const ADVANCE_MS = 3400;

const TABS: { id: Tab; label: string; icon: ReactNode }[] = [
  { id: "home", label: "Home", icon: <path d="M3.5 10.5 12 3.5l8.5 7V20a1 1 0 0 1-1 1H15v-6H9v6H4.5a1 1 0 0 1-1-1z" /> },
  { id: "map", label: "Map", icon: <path d="M9 4 3.5 6v14L9 18l6 2 5.5-2V4L15 6zM9 4v14M15 6v14" /> },
  {
    id: "pete",
    label: "Pete",
    icon: (
      <>
        <path d="M4 5.5h16v11H9l-5 4z" />
        <circle cx="8.5" cy="11" r="0.6" fill="currentColor" />
        <circle cx="12" cy="11" r="0.6" fill="currentColor" />
        <circle cx="15.5" cy="11" r="0.6" fill="currentColor" />
      </>
    ),
  },
  {
    id: "profile",
    label: "Profile",
    icon: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4.5 20.5c0-4.1 3.4-6.5 7.5-6.5s7.5 2.4 7.5 6.5" />
      </>
    ),
  },
];

export default function PhoneShowcase() {
  const frameRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(() => !window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const [inView, setInView] = useState(false);

  // Only advance while the phone is on screen.
  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.3 });
    observer.observe(frame);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!playing || !inView) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % SCREENS.length), ADVANCE_MS);
    return () => window.clearInterval(id);
  }, [playing, inView]);

  const screen = SCREENS[index];
  const darkBar = parseInt(screen.bar.slice(1, 3), 16) < 140;

  return (
    <div className="flex flex-col items-center">
      <div
        ref={frameRef}
        className="relative w-[272px] md:w-[312px]"
        style={{ filter: "drop-shadow(0 40px 80px rgba(0,0,0,0.22))" }}
      >
        <div
          className="relative rounded-[52px] bg-[#1c1c1e] p-[10px]"
          style={{ boxShadow: "0 0 0 1.5px #3a3a3c, inset 0 0 0 1px rgba(255,255,255,0.07)" }}
        >
          {/* Side buttons */}
          <div className="absolute left-[-3.5px] top-[110px] h-[32px] w-[3.5px] rounded-l-sm bg-[#48484a]" />
          <div className="absolute left-[-3.5px] top-[155px] h-[60px] w-[3.5px] rounded-l-sm bg-[#48484a]" />
          <div className="absolute left-[-3.5px] top-[228px] h-[60px] w-[3.5px] rounded-l-sm bg-[#48484a]" />
          <div className="absolute right-[-3.5px] top-[160px] h-[80px] w-[3.5px] rounded-r-sm bg-[#48484a]" />

          <div
            role="group"
            aria-roledescription="carousel"
            aria-label="AccessBelt app screens"
            className="@container relative overflow-hidden rounded-[42px] bg-[#f2f2f7]"
            style={{ aspectRatio: "600 / 1297" }}
          >
            {SCREENS.map((s, i) => (
              <img
                key={s.src}
                src={s.src}
                alt={s.alt}
                aria-hidden={i !== index}
                loading={i === 0 ? "eager" : "lazy"}
                decoding="async"
                draggable={false}
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out ${
                  i === index ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}

            {/* Status bar */}
            <div
              aria-hidden="true"
              className="absolute inset-x-0 top-0 transition-colors duration-700"
              style={{ height: "12.2cqw", backgroundColor: screen.bar, color: darkBar ? "#ffffff" : "#1d1d1f" }}
            >
              <span className="absolute font-bold leading-none" style={{ left: "9.7cqw", top: "4.1cqw", fontSize: "3.9cqw" }}>
                9:41
              </span>
              <span className="absolute rounded-full bg-black" style={{ left: "35.4cqw", top: "2.6cqw", width: "29.2cqw", height: "8.3cqw" }} />
              <svg
                viewBox="0 0 72 14"
                fill="currentColor"
                className="absolute"
                style={{ right: "7.3cqw", top: "4.1cqw", width: "17.5cqw", height: "3.4cqw" }}
              >
                <rect x="0" y="9" width="3.2" height="5" rx="1" />
                <rect x="4.9" y="6.5" width="3.2" height="7.5" rx="1" />
                <rect x="9.8" y="4" width="3.2" height="10" rx="1" />
                <rect x="14.7" y="1.5" width="3.2" height="12.5" rx="1" />
                <path d="M31 4.2a10.5 10.5 0 0 1 14 0l-1.5 1.6a8.3 8.3 0 0 0-11 0zM33.6 7a6.6 6.6 0 0 1 8.8 0l-1.5 1.6a4.4 4.4 0 0 0-5.8 0zM36.3 9.9a2.6 2.6 0 0 1 3.4 0L38 11.7z" />
                <rect x="47.5" y="1.5" width="21" height="11" rx="3.2" fill="none" stroke="currentColor" strokeOpacity="0.45" />
                <rect x="49.3" y="3.3" width="15" height="7.4" rx="1.8" />
                <rect x="69.5" y="5" width="1.8" height="4" rx="0.9" fillOpacity="0.45" />
              </svg>
            </div>
            {screen.fade ? (
              <div
                aria-hidden="true"
                className="absolute inset-x-0"
                style={{ top: "12.2cqw", height: "2.4cqw", background: `linear-gradient(${screen.bar}, ${screen.bar}00)` }}
              />
            ) : null}

            {/* Tab bar */}
            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 flex justify-around border-t border-black/[0.09] bg-[#fafafc]"
              style={{ height: "18.4cqw", padding: "1.7cqw 4.4cqw 0" }}
            >
              {TABS.map((t) => (
                <div
                  key={t.id}
                  className="flex flex-col items-center transition-colors duration-500"
                  style={{ gap: "0.7cqw", width: "17cqw", color: t.id === screen.tab ? "#b52525" : "#6a6a6f" }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.9"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    style={{ width: "6cqw", height: "6cqw" }}
                  >
                    {t.icon}
                  </svg>
                  <span className="font-semibold leading-none" style={{ fontSize: "2.55cqw" }}>
                    {t.label}
                  </span>
                </div>
              ))}
              <span
                className="absolute rounded-full bg-[#1d1d1f]"
                style={{ left: "33.7cqw", bottom: "1.7cqw", width: "32.6cqw", height: "1.2cqw" }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Tour controls: pick a screen or pause the auto-advance */}
      <div className="mt-8 flex items-center gap-3">
        <div className="flex items-center">
          {SCREENS.map((s, i) => (
            <button
              key={s.src}
              type="button"
              aria-label={`Show ${s.label}`}
              aria-current={i === index}
              onClick={() => setIndex(i)}
              className="flex h-8 w-6 items-center justify-center rounded-full"
            >
              <span
                className={`block h-2 rounded-full transition-all duration-300 ${
                  i === index ? "w-5 bg-[#b52525]" : "w-2 bg-[#6e6e73]/35 hover:bg-[#6e6e73]/60"
                }`}
              />
            </button>
          ))}
        </div>
        <span className="w-[7.5rem] text-sm font-semibold text-[#555558]" aria-live={playing ? "off" : "polite"}>
          {screen.label}
        </span>
        <button
          type="button"
          onClick={() => setPlaying((p) => !p)}
          aria-label={playing ? "Pause the app tour" : "Play the app tour"}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-black/[0.06] bg-white text-[#1d1d1f] shadow-[0_4px_12px_rgba(0,0,0,0.06)] transition-transform duration-200 active:scale-95"
        >
          {playing ? (
            <Pause aria-hidden="true" className="h-4 w-4" fill="currentColor" strokeWidth={0} />
          ) : (
            <Play aria-hidden="true" className="ml-0.5 h-4 w-4" fill="currentColor" strokeWidth={0} />
          )}
        </button>
      </div>
    </div>
  );
}
