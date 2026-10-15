import { motion } from "motion/react";
import { Info, LifeBuoy, MapPin } from "lucide-react";
import type { ReactNode } from "react";

const FEATURES: { title: string; body: string; icon: ReactNode }[] = [
  {
    title: "Find a pantry near you",
    body: "See 883 food pantries on one map. Pick your county, find the closest one, and get directions or call ahead in one tap.",
    icon: (
      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#fbeceb] text-[#b52525]">
        <MapPin aria-hidden="true" className="h-6 w-6" strokeWidth={2} />
      </span>
    ),
  },
  {
    title: "Ask Pete anything",
    body: "Pete answers in plain words: which pantries are near you, what to bring, and what to do next. No forms, no jargon.",
    icon: (
      <img
        src="/img/pete.webp"
        alt=""
        width={48}
        height={48}
        loading="lazy"
        className="h-12 w-12 rounded-2xl object-cover ring-1 ring-black/5"
      />
    ),
  },
  {
    title: "Help beyond food",
    body: "SNAP and WIC are one tap away on the home screen, and the free 211 crisis line is there 24 hours a day, 7 days a week.",
    icon: (
      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e8f5ec] text-[#15803d]">
        <LifeBuoy aria-hidden="true" className="h-6 w-6" strokeWidth={2} />
      </span>
    ),
  },
];

export default function ValueProps() {
  return (
    <section id="how-it-works" className="section-padding bg-transparent">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center md:mb-16">
          <h2 className="mb-3 md:mb-4">How it works</h2>
          <h3 className="font-display text-3xl font-bold tracking-[-0.03em] text-[#1d1d1f] sm:text-4xl md:text-5xl">
            Everything you need to find food help.
          </h3>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
          {FEATURES.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.7 }}
              className="rounded-[24px] border border-black/[0.05] bg-white p-7 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_12px_32px_rgba(0,0,0,0.05)] transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_1px_2px_rgba(0,0,0,0.04),0_20px_44px_rgba(0,0,0,0.08)] sm:p-8 md:p-9"
            >
              {feature.icon}
              <h4 className="mb-3 mt-7 font-display text-[22px] font-bold tracking-[-0.02em] text-[#1d1d1f]">{feature.title}</h4>
              <p className="text-base font-medium leading-relaxed text-[#555558]">{feature.body}</p>
            </motion.div>
          ))}
        </div>

        <p className="mx-auto mt-10 flex max-w-2xl items-start justify-center gap-2.5 text-center text-[15px] font-medium leading-relaxed text-[#555558] md:mt-12">
          <Info aria-hidden="true" className="mt-[3px] h-[18px] w-[18px] shrink-0 text-[#6e6e73]" />
          <span>
            Every pin shows what we know. Pantries we haven't verified yet are marked, so the app reminds you to call ahead.
          </span>
        </p>
      </div>
    </section>
  );
}
