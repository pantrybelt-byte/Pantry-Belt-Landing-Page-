import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

const slides = [
  {
    src: "/img/pioneer-1.webp",
    alt: "AccessBelt volunteers serving the community",
    caption: "Bringing resources directly to those who need them most.",
  },
  {
    src: "/img/pioneer-2.webp",
    alt: "AccessBelt team in action at a local food pantry",
    caption: "Building stronger communities, one family at a time.",
  },
  {
    src: "/img/pioneer-3.webp",
    alt: "AccessBelt pioneers making a difference",
    caption: "Driven by compassion. Powered by technology.",
  },
];

/** Only verified figures: the app's own pantry data and the team's Heart of Alabama Food Bank volunteer day. */
const STATS = [
  { value: "883", label: "Food pantries mapped" },
  { value: "67", label: "Alabama counties covered" },
  { value: "2,000", label: "Meals packed with Heart of Alabama Food Bank" },
];

const AUTOPLAY_INTERVAL = 5000;

export default function PioneersInAction() {
  const frameRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  // The visitor's own choice (pause button); hover and scrolling away pause it temporarily.
  const [playing, setPlaying] = useState(() => !window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const [hovered, setHovered] = useState(false);
  const [inView, setInView] = useState(false);
  const advancing = playing && !hovered && inView;

  const goTo = useCallback((index: number, dir: 1 | -1) => {
    setDirection(dir);
    setCurrent(index);
  }, []);

  const next = useCallback(() => {
    goTo((current + 1) % slides.length, 1);
  }, [current, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + slides.length) % slides.length, -1);
  }, [current, goTo]);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.35 });
    observer.observe(frame);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!advancing) return;
    const timer = setInterval(next, AUTOPLAY_INTERVAL);
    return () => clearInterval(timer);
  }, [advancing, next]);

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? "-100%" : "100%",
      opacity: 0,
    }),
  };

  return (
    <section id="impact" className="section-padding bg-transparent overflow-hidden">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          className="mb-12 text-center md:mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="mb-3 md:mb-4">Our Impact</h2>
          <h3 className="font-display text-3xl font-bold tracking-[-0.03em] text-[#1d1d1f] sm:text-4xl md:text-5xl">
            Pioneers in Action
          </h3>
          <p className="mx-auto mt-4 max-w-2xl text-lg font-medium leading-relaxed text-[#555558] md:mt-6 md:text-xl">
            See our team working tirelessly to connect communities with the resources they deserve.
          </p>
        </motion.div>

        {/* Impact numbers */}
        <motion.dl
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mx-auto mb-12 grid max-w-4xl grid-cols-1 divide-y divide-black/[0.06] rounded-[24px] border border-black/[0.05] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04),0_12px_32px_rgba(0,0,0,0.05)] sm:grid-cols-3 sm:divide-x sm:divide-y-0 md:mb-16"
        >
          {STATS.map((stat) => (
            <div key={stat.label} className="flex flex-col-reverse items-center gap-1.5 px-6 py-6 text-center sm:py-8">
              <dt className="max-w-[16rem] text-sm font-semibold leading-snug text-[#555558] md:text-[15px]">{stat.label}</dt>
              <dd className="font-display text-4xl font-bold tracking-[-0.03em] text-[#b52525] md:text-5xl">{stat.value}</dd>
            </div>
          ))}
        </motion.dl>

        {/* Slideshow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* Main image frame */}
          <div
            ref={frameRef}
            role="group"
            aria-roledescription="carousel"
            aria-label="Photos of the AccessBelt team volunteering"
            className="relative aspect-[16/9] overflow-hidden rounded-[var(--radius-apple)] border border-black/5 bg-[#f5f5f7] shadow-[0_30px_80px_rgba(0,0,0,0.14)] md:aspect-[21/9]"
          >
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 260, damping: 35 },
                  opacity: { duration: 0.3 },
                }}
                className="absolute inset-0"
              >
                <img
                  src={slides[current].src}
                  alt={slides[current].alt}
                  className="h-full w-full object-cover"
                  draggable={false}
                  decoding="async"
                />
                {/* Gradient overlay for caption */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                {/* Caption */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25, duration: 0.5 }}
                  className="absolute bottom-0 left-0 right-0 p-6 md:p-10"
                >
                  <p className="text-base font-medium tracking-wide text-white drop-shadow-sm md:text-lg">
                    {slides[current].caption}
                  </p>
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* Prev / Next buttons */}
            <button
              onClick={prev}
              aria-label="Previous photo"
              className="absolute left-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-white/20 text-white backdrop-blur-md transition-all duration-200 hover:scale-105 hover:bg-white/35 active:scale-95 md:h-12 md:w-12"
            >
              <ChevronLeft size={20} strokeWidth={2} />
            </button>
            <button
              onClick={next}
              aria-label="Next photo"
              className="absolute right-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-white/20 text-white backdrop-blur-md transition-all duration-200 hover:scale-105 hover:bg-white/35 active:scale-95 md:h-12 md:w-12"
            >
              <ChevronRight size={20} strokeWidth={2} />
            </button>
          </div>

          {/* Dots, pause control and progress */}
          <div className="mt-8 flex flex-col items-center gap-5">
            <div className="flex items-center gap-3">
              <div className="flex items-center">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    aria-label={`Show photo ${i + 1}`}
                    aria-current={i === current}
                    onClick={() => goTo(i, i > current ? 1 : -1)}
                    className="flex h-8 w-7 items-center justify-center rounded-full"
                  >
                    <span
                      className={`block h-2.5 rounded-full transition-all duration-300 ${
                        i === current ? "w-6 bg-[#b52525]" : "w-2.5 bg-[#6e6e73]/30 hover:bg-[#6e6e73]/60"
                      }`}
                    />
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={() => setPlaying((p) => !p)}
                aria-label={playing ? "Pause the slideshow" : "Play the slideshow"}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-black/[0.06] bg-white text-[#1d1d1f] shadow-[0_4px_12px_rgba(0,0,0,0.06)] transition-transform duration-200 active:scale-95"
              >
                {playing ? (
                  <Pause aria-hidden="true" className="h-4 w-4" fill="currentColor" strokeWidth={0} />
                ) : (
                  <Play aria-hidden="true" className="ml-0.5 h-4 w-4" fill="currentColor" strokeWidth={0} />
                )}
              </button>
            </div>

            {/* Auto-play progress bar */}
            {advancing && (
              <div className="h-[2px] w-full max-w-xs overflow-hidden rounded-full bg-black/5">
                <motion.div
                  key={current}
                  className="h-full rounded-full bg-[#b52525]"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{
                    duration: AUTOPLAY_INTERVAL / 1000,
                    ease: "linear",
                  }}
                />
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
