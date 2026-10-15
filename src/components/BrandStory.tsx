import { motion } from "motion/react";
import PhoneShowcase from "./PhoneShowcase";

export default function BrandStory() {
  return (
    <section id="story" className="section-padding bg-transparent overflow-hidden">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative flex justify-center"
          >
            {/* Subtle ambient glow */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-15 blur-3xl"
              style={{ background: "radial-gradient(ellipse at 50% 55%, #b52525 0%, #16a34a 60%, transparent 100%)" }}
            />
            <PhoneShowcase />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-10"
          >
            <div className="space-y-4">
              <div className="mb-2 flex flex-wrap items-center gap-x-4 gap-y-3">
                <h2 className="!mb-0">Our story</h2>
                <div className="inline-flex items-center gap-2 rounded-full border border-[#b52525]/20 bg-[#b52525]/10 px-3 py-1">
                  <span className="text-sm font-bold text-[#b52525]">100%</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#b52525]">Community Focused</span>
                </div>
              </div>
              <h3 className="font-display text-3xl font-bold leading-[1.12] tracking-[-0.03em] text-[#1d1d1f] sm:text-4xl md:text-5xl lg:text-6xl">
                Born from a need <br /> to bridge the gap.
              </h3>
            </div>

            <div className="space-y-6">
              <p className="text-xl font-medium leading-relaxed text-[#555558]">
                AccessBelt was formed in Montgomery, Alabama, born from a shared passion to improve community awareness and
                uplift rural, overlooked areas.
              </p>
              <p className="text-lg leading-relaxed text-[#555558]">
                We believe that no family should have to guess where their next meal is coming from. By bridging the gap
                between local resources and the people who need them most, we are bringing hope and essential support
                directly to the heart of our communities.
              </p>
            </div>

            <div className="border-t border-black/5 pt-8">
              <div className="flex items-center gap-5">
                <div className="flex -space-x-4">
                  <div className="relative z-10 flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-[#f5f5f7] shadow-sm ring-4 ring-white">
                    <img
                      src="/img/m-clarke.webp"
                      alt="Matthew Clarke"
                      width={56}
                      height={56}
                      loading="lazy"
                      className="h-full w-full translate-y-1 scale-[1.35] object-cover object-[center_15%]"
                    />
                  </div>
                  <div className="relative z-0 flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-[#f5f5f7] shadow-sm ring-4 ring-white">
                    <img
                      src="/img/t-sneed.webp"
                      alt="Thaddaus Sneed"
                      width={56}
                      height={56}
                      loading="lazy"
                      className="h-full w-full translate-y-1 scale-[1.35] object-cover object-[center_15%]"
                    />
                  </div>
                </div>
                <div>
                  <p className="text-lg font-bold text-[#1d1d1f]">Matthew Clarke & Thaddaus Sneed</p>
                  <p className="text-sm font-medium uppercase tracking-wider text-[#555558]">Founders, AccessBelt</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mx-auto mt-16 max-w-5xl md:mt-24"
        >
          <div className="relative aspect-[1024/578] overflow-hidden rounded-[28px] border border-black/5 bg-white shadow-3d sm:rounded-[32px]">
            <img
              src="/img/pioneers-hero.webp"
              alt="The Pantry Pioneers - Founders Matthew Clarke and Thaddaus Sneed presenting AccessBelt"
              width={1024}
              height={578}
              className="h-full w-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
