import { motion } from "motion/react";

export default function Cookies() {
  return (
    <section className="section-padding bg-transparent text-[#1d1d1f] min-h-[80vh]">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto bg-white/95 backdrop-blur-xl p-10 md:p-16 rounded-[32px] border border-black/5 shadow-3d"
      >
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-display font-semibold mb-4 tracking-tight">Cookie Policy</h1>
          <p className="text-[#86868b] text-lg font-medium">Last Updated: April 2026</p>
        </div>

        <div className="space-y-10">
          <section className="space-y-4">
            <h3 className="text-2xl font-display font-semibold text-[#1d1d1f]">1. What are Cookies?</h3>
            <p className="text-[#86868b] leading-relaxed">
              Cookies are small text files that are stored on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and to provide a better, more personalized user experience.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-2xl font-display font-semibold text-[#1d1d1f]">2. How We Use Cookies</h3>
            <p className="text-[#86868b] leading-relaxed">
              Pantry Belt uses a minimal, strictly necessary cookie footprint. We use cookies primarily for:
            </p>
            <ul className="list-disc pl-6 text-[#86868b] space-y-2">
              <li><strong>Session Management:</strong> Remembering if you have already joined our waitlist to prevent duplicate forms.</li>
              <li><strong>Security:</strong> Protecting against malicious activity and ensuring secure data transmission.</li>
              <li><strong>Performance:</strong> Ensuring our routing, animations, and mapping features load quickly and smoothly on your device.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h3 className="text-2xl font-display font-semibold text-[#1d1d1f]">3. Third-Party Tracking</h3>
            <p className="text-[#86868b] leading-relaxed">
              In alignment with our strict privacy focus, we do <strong>not</strong> utilize invasive third-party tracking cookies, advertising pixels, or cross-site fingerprinting technologies. Your browsing habits on Pantry Belt remain your own business.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-2xl font-display font-semibold text-[#1d1d1f]">4. Managing Your Preferences</h3>
            <p className="text-[#86868b] leading-relaxed">
              Most modern web browsers allow you to manage or delete cookies through browser settings. Please note that disabling strictly necessary cookies may impact the performance and functionality of the Pantry Belt application.
            </p>
          </section>
        </div>
      </motion.div>
    </section>
  );
}
