import { motion } from "motion/react";
import PromoVideo from "./PromoVideo";

export default function PromoSection() {
  return (
    <section id="see-it" className="section-padding bg-transparent">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-10 text-center md:mb-14"
        >
          <h2 className="mb-3 md:mb-4">See it in action</h2>
          <h3 className="font-display text-3xl font-bold tracking-[-0.03em] text-[#1d1d1f] sm:text-4xl md:text-5xl">
            AccessBelt in one minute.
          </h3>
        </motion.div>
        <PromoVideo />
      </div>
    </section>
  );
}
