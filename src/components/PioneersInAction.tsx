import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    src: "/pioneer-1.jpg",
    alt: "Pantry Belt volunteers serving the community",
    caption: "Bringing resources directly to those who need them most.",
  },
  {
    src: "/pioneer-2.jpg",
    alt: "Pantry Belt team in action at a local food pantry",
    caption: "Building stronger communities, one family at a time.",
  },
  {
    src: "/pioneer-3.jpg",
    alt: "Pantry Belt pioneers making a difference",
    caption: "Driven by compassion. Powered by technology.",
  },
];

const AUTOPLAY_INTERVAL = 5000;

export default function PioneersInAction() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isPaused, setIsPaused] = useState(false);

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
    if (isPaused) return;
    const timer = setInterval(next, AUTOPLAY_INTERVAL);
    return () => clearInterval(timer);
  }, [isPaused, next]);

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
    <section className="section-padding bg-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="mb-4">Our Impact</h2>
          <h3 className="text-4xl md:text-5xl font-display font-semibold text-[#1d1d1f] tracking-tight">
            Pioneers in Action
          </h3>
          <p className="mt-6 text-xl text-[#86868b] font-medium max-w-2xl mx-auto leading-relaxed">
            See our team working tirelessly to connect communities with the
            resources they deserve.
          </p>
        </motion.div>

        {/* Slideshow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Main image frame */}
          <div className="relative aspect-[16/9] md:aspect-[21/9] rounded-[var(--radius-apple)] overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.14)] border border-black/5 bg-[#f5f5f7]">
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
                  className="w-full h-full object-cover"
                  draggable={false}
                />
                {/* Gradient overlay for caption */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                {/* Caption */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25, duration: 0.5 }}
                  className="absolute bottom-0 left-0 right-0 p-6 md:p-10"
                >
                  <p className="text-white/90 text-base md:text-lg font-medium tracking-wide drop-shadow-sm">
                    {slides[current].caption}
                  </p>
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* Prev / Next buttons */}
            <button
              onClick={prev}
              aria-label="Previous slide"
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-white/35 transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <ChevronLeft size={20} strokeWidth={2} />
            </button>
            <button
              onClick={next}
              aria-label="Next slide"
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-white/35 transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <ChevronRight size={20} strokeWidth={2} />
            </button>
          </div>

          {/* Dot indicators + progress bar */}
          <div className="mt-8 flex flex-col items-center gap-5">
            {/* Dots */}
            <div className="flex items-center gap-3">
              {slides.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => goTo(i, i > current ? 1 : -1)}
                  className={`rounded-full transition-all duration-400 ${
                    i === current
                      ? "w-6 h-2.5 bg-[#0071e3]"
                      : "w-2.5 h-2.5 bg-[#86868b]/30 hover:bg-[#86868b]/60"
                  }`}
                />
              ))}
            </div>

            {/* Auto-play progress bar */}
            {!isPaused && (
              <div className="w-full max-w-xs h-[2px] bg-black/5 rounded-full overflow-hidden">
                <motion.div
                  key={current}
                  className="h-full bg-[#0071e3] rounded-full"
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
