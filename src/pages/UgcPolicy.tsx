import { motion } from "motion/react";

export default function UgcPolicy() {
  return (
    <section className="section-padding bg-transparent text-[#1d1d1f] min-h-[80vh]">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto bg-white/95 backdrop-blur-xl p-10 md:p-16 rounded-[32px] border border-black/5 shadow-3d"
      >
        <div className="mb-12 border-b border-black/10 pb-8">
          <h1 className="text-4xl md:text-5xl font-display font-semibold mb-4 tracking-tight">User-Generated Content (UGC) & Moderation Policy</h1>
          <p className="text-[#86868b] text-lg font-medium">Rules Governing Crowd-Sourced Reports, Pantry Updates & Community Feedback</p>
          <p className="text-[#86868b] text-sm mt-1">Effective Date: August 2026 · AccessBelt</p>
        </div>

        <div className="space-y-10">
          <section className="space-y-4">
            <h3 className="text-2xl font-display font-semibold text-[#1d1d1f]">1. User Submissions & Crowd-Sourcing</h3>
            <p className="text-[#86868b] leading-relaxed">
              AccessBelt allows users to submit food pantry operating status reports, crowd-sourced information edits, community reviews, ratings, and feedback ("User-Generated Content" or "UGC"). Community submissions help maintain resource connectivity across rural areas.
            </p>
          </section>

          <section className="space-y-4 p-6 rounded-2xl bg-[#fff8f8] border border-[#b52525]/15">
            <h3 className="text-2xl font-display font-semibold text-[#b52525]">2. Zero-Tolerance Content Guidelines</h3>
            <p className="text-[#1d1d1f] font-semibold leading-relaxed">
              AccessBelt maintains a strict zero-tolerance policy against improper, fraudulent, or harmful content. Prohibited content includes:
            </p>
            <ul className="list-disc pl-6 text-[#555] space-y-2">
              <li><strong>False or Misleading Reports:</strong> Intentionally posting false operating hours, incorrect pantry locations, or fake food availability numbers.</li>
              <li><strong>Abusive or Defamatory Language:</strong> Hate speech, harassment, profanity, threats, or personal attacks against pantry volunteers, staff, or community members.</li>
              <li><strong>Infringement & Spam:</strong> Commercial promotions, unauthorized advertising, links to external scams, or copyrighted materials without authorization.</li>
              <li><strong>Illegal Activity:</strong> Content promoting unlawful acts or violating personal privacy rights.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h3 className="text-2xl font-display font-semibold text-[#1d1d1f]">3. License Grant to AccessBelt</h3>
            <p className="text-[#86868b] leading-relaxed">
              By submitting any UGC, report, or feedback to AccessBelt, you grant AccessBelt a worldwide, perpetual, royalty-free, non-exclusive, irrevocable, transferable, sublicensable license to store, reproduce, modify, adapt, publish, translate, distribute, and display such content to operate and improve the Service.
            </p>
          </section>

          <section className="space-y-4 p-6 rounded-2xl bg-[#f5f5f7] border border-black/5">
            <h3 className="text-2xl font-display font-semibold text-[#1d1d1f]">4. Content Moderation & Unreserved Right of Removal</h3>
            <p className="text-[#86868b] leading-relaxed">
              AccessBelt reserves the absolute, unreserved right (but assumes no legal obligation) to pre-screen, monitor, edit, refuse, decline, disable access to, or permanently remove any UGC at any time, for any reason, with or without prior notice.
            </p>
            <p className="text-[#86868b] leading-relaxed">
              Submissions violating community guidelines will result in immediate content removal and permanent blocking of submission privileges.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-2xl font-display font-semibold text-[#1d1d1f]">5. Reporting Inappropriate Content</h3>
            <p className="text-[#86868b] leading-relaxed">
              If you discover false, abusive, or infringing content within the AccessBelt app or website, please report it immediately to our moderation team at <a href="mailto:getaccessbelt@gmail.com" className="text-[#0071e3] font-semibold underline">getaccessbelt@gmail.com</a>. Reports are reviewed within 24 hours.
            </p>
          </section>
        </div>
      </motion.div>
    </section>
  );
}
