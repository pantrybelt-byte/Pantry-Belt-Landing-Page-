import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight, Play } from "lucide-react";

const PROOF = ["883 pantries mapped", "67 counties", "Free, no account"];

export default function Hero() {
  return (
    <section className="relative flex min-h-[calc(100svh-5rem)] flex-col items-center justify-center overflow-hidden px-6 pb-14 pt-10 text-center sm:pt-14">
      {/* Warm brand glow behind the headline */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[6%] h-[480px] w-[min(820px,90vw)] -translate-x-1/2 rounded-full bg-[#b52525]/[0.06] blur-[120px]" />
        <div className="absolute bottom-[2%] right-[6%] h-[340px] w-[440px] rounded-full bg-[#15803d]/[0.05] blur-[110px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
        className="relative z-10 mx-auto max-w-4xl"
      >
        <p className="mb-7 inline-flex items-center gap-2 rounded-full border border-black/[0.06] bg-white/80 px-4 py-1.5 text-[13px] font-semibold text-[#555558] shadow-sm backdrop-blur">
          <span aria-hidden="true" className="h-2 w-2 rounded-full bg-[#16a34a]" />
          Now in beta on iPhone and Android
        </p>

        <h1>
          Free food help,
          <span className="block text-[#b52525]">closer than you think.</span>
        </h1>

        <p className="mx-auto mt-7 max-w-2xl text-lg font-medium leading-relaxed text-[#555558] md:text-xl">
          Find a pantry near you, ask Pete what to bring, and get help with SNAP, WIC and 211. Free, private, and no
          account needed.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-5 sm:flex-row sm:gap-7">
          <a href="#waitlist" id="hero-get-notified" className="btn-floating !rounded-full px-8 py-4 text-[17px] !font-semibold">
            Get notified at launch
          </a>
          <Link
            to="/beta"
            id="hero-try-beta"
            className="group inline-flex items-center gap-1.5 rounded-full px-2 py-2 text-[17px] font-semibold text-[#b52525] transition-colors hover:text-[#9e1f1f]"
          >
            Try the beta now
            <ArrowRight aria-hidden="true" className="h-[18px] w-[18px] transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </div>

        <ul aria-label="AccessBelt at a glance" className="mt-10 flex flex-wrap items-center justify-center gap-2.5">
          {PROOF.map((item) => (
            <li
              key={item}
              className="rounded-full border border-black/[0.06] bg-white/75 px-4 py-2 text-[14px] font-semibold text-[#1d1d1f] backdrop-blur"
            >
              {item}
            </li>
          ))}
        </ul>
      </motion.div>

      <motion.a
        href="#see-it"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="group relative z-10 mt-12 inline-flex items-center gap-3 rounded-full py-1.5 pl-1.5 pr-4 text-[15px] font-semibold text-[#555558] transition-colors hover:text-[#b52525]"
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#b52525] shadow-[0_6px_16px_rgba(0,0,0,0.08)] transition-transform duration-200 group-hover:scale-105">
          <Play aria-hidden="true" className="ml-0.5 h-4 w-4" fill="currentColor" strokeWidth={0} />
        </span>
        Watch the 1-minute story
      </motion.a>
    </section>
  );
}
