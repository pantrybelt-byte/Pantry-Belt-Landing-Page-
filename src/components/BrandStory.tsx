import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

const SLIDES = [
  { src: "/pioneer-1.webp", alt: "Community pioneers in action" },
  { src: "/pioneer-2.webp", alt: "Serving families in need" },
  { src: "/pioneer-3.webp", alt: "Building community together" },
];

const INTERVAL_MS = 3500;

export default function BrandStory() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  // Only start the slideshow when in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
        else setInView(false);
      },
      { threshold: 0.2 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, INTERVAL_MS);
    return () => clearInterval(timer);
  }, [inView]);

  const goTo = (index: number) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  };

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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* ── Phone mockup with slideshow ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative flex justify-center"
          >
            {/* Ambient glow */}
            <div
              className="absolute inset-0 blur-3xl opacity-15 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 60%, #0071e3 0%, #34c759 60%, transparent 100%)",
              }}
            />

            {/* iPhone frame */}
            <div
              ref={containerRef}
              className="relative w-[280px] md:w-[320px]"
              style={{ filter: "drop-shadow(0 40px 80px rgba(0,0,0,0.25))" }}
            >
              {/* Phone body */}
              <div
                className="relative rounded-[52px] bg-[#1c1c1e] p-[10px]"
                style={{
                  boxShadow:
                    "0 0 0 1.5px #3a3a3c, inset 0 0 0 1px rgba(255,255,255,0.07)",
                }}
              >
                {/* Volume buttons */}
                <div className="absolute left-[-3.5px] top-[110px] w-[3.5px] h-[32px] bg-[#48484a] rounded-l-sm" />
                <div className="absolute left-[-3.5px] top-[155px] w-[3.5px] h-[60px] bg-[#48484a] rounded-l-sm" />
                <div className="absolute left-[-3.5px] top-[228px] w-[3.5px] h-[60px] bg-[#48484a] rounded-l-sm" />
                {/* Power button */}
                <div className="absolute right-[-3.5px] top-[160px] w-[3.5px] h-[80px] bg-[#48484a] rounded-r-sm" />

                {/* Screen */}
                <div
                  className="relative rounded-[44px] overflow-hidden bg-black"
                  style={{ aspectRatio: "9/19.5" }}
                >
                  {/* Dynamic Island */}
                  <div
                    className="absolute top-3 left-1/2 -translate-x-1/2 z-30"
                    style={{
                      width: 120,
                      height: 34,
                      background: "#000",
                      borderRadius: 20,
                    }}
                  />

                  {/* Slides */}
                  <AnimatePresence initial={false} custom={direction}>
                    <motion.img
                      key={current}
                      src={SLIDES[current].src}
                      alt={SLIDES[current].alt}
                      custom={direction}
                      variants={variants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.55, ease: [0.32, 0.72, 0, 1] }}
                      style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                      draggable={false}
                    />
                  </AnimatePresence>

                  {/* Bottom overlay: dots + badge */}
                  <div
                    className="absolute bottom-0 left-0 right-0 z-20 flex flex-col items-center gap-2 pb-4 pt-10"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 100%)",
                    }}
                  >
                    {/* Dot indicators */}
                    <div className="flex items-center gap-1.5">
                      {SLIDES.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => goTo(i)}
                          aria-label={`Go to slide ${i + 1}`}
                          style={{
                            width: i === current ? 18 : 6,
                            height: 6,
                            borderRadius: 3,
                            background:
                              i === current
                                ? "#fff"
                                : "rgba(255,255,255,0.4)",
                            border: "none",
                            padding: 0,
                            cursor: "pointer",
                            transition: "width 0.3s ease, background 0.3s ease",
                          }}
                        />
                      ))}
                    </div>

                    {/* PantryBelt badge */}
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#34c759] animate-pulse" />
                      <span className="text-white text-[10px] font-semibold tracking-wide">
                        PantryBelt
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── Text content ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-10"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-4 mb-2">
                <h2 className="text-[#86868b] !mb-0">Our Brand Story</h2>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0071e3]/10 border border-[#0071e3]/20">
                  <span className="text-sm font-bold text-[#0071e3]">100%</span>
                  <span className="text-[10px] font-bold text-[#0071e3] uppercase tracking-widest">
                    Community Focused
                  </span>
                </div>
              </div>
              <h3 className="text-5xl md:text-6xl font-display font-semibold text-[#1d1d1f] leading-[1.1] tracking-tight">
                Born from a need <br /> to bridge the gap.
              </h3>
            </div>

            <div className="space-y-6">
              <p className="text-xl text-[#86868b] leading-relaxed font-medium">
                Pantry Belt was formed in Montgomery, Alabama, born from a
                shared passion to improve community awareness and uplift rural,
                overlooked areas.
              </p>
              <p className="text-lg text-[#86868b]/80 leading-relaxed">
                We believe that no family should have to guess where their next
                meal is coming from. By bridging the gap between local resources
                and the people who need them most, we are bringing hope and
                essential support directly to the heart of our communities.
              </p>
            </div>

            <div className="pt-8 border-t border-black/5">
              <div className="flex items-center gap-5">
                <div className="flex -space-x-4">
                  <div className="w-14 h-14 rounded-full bg-[#f5f5f7] overflow-hidden ring-4 ring-white shadow-sm relative z-10 flex items-center justify-center">
                    <img
                      src="/m-clarke.jpg"
                      alt="Matthew Clarke"
                      className="w-full h-full object-cover object-[center_15%] scale-[1.35] translate-y-1"
                    />
                  </div>
                  <div className="w-14 h-14 rounded-full bg-[#f5f5f7] overflow-hidden ring-4 ring-white shadow-sm relative z-0 flex items-center justify-center">
                    <img
                      src="/t-sneed.jpg"
                      alt="Thaddaus Sneed"
                      className="w-full h-full object-cover object-[center_15%] scale-[1.35] translate-y-1"
                    />
                  </div>
                </div>
                <div>
                  <p className="font-bold text-[#1d1d1f] text-lg">
                    Matthew Clarke & Thaddaus Sneed
                  </p>
                  <p className="text-[#86868b] text-sm font-medium uppercase tracking-wider">
                    Founders, Pantry Belt
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
