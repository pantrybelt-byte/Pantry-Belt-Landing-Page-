import { motion } from "motion/react";

export default function TermsOfService() {
  return (
    <section className="section-padding bg-transparent text-[#1d1d1f] min-h-[80vh]">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto bg-white/95 backdrop-blur-xl p-10 md:p-16 rounded-[32px] border border-black/5 shadow-3d"
      >
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-display font-semibold mb-4 tracking-tight">Terms of Service</h1>
          <p className="text-[#86868b] text-lg font-medium">Last Updated: April 2026</p>
        </div>

        <div className="space-y-10">
          <section className="space-y-4">
            <h3 className="text-2xl font-display font-semibold text-[#1d1d1f]">1. Acceptance of Terms</h3>
            <p className="text-[#86868b] leading-relaxed">
              By accessing and using Pantry Belt, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you must not use our software or services.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-2xl font-display font-semibold text-[#1d1d1f]">2. Description of Service</h3>
            <p className="text-[#86868b] leading-relaxed">
              Pantry Belt is a technology platform designed to bridge the gap between rural communities and essential food resources. We provide logistical routing, real-time pantry status updates, and notifications for community support.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-2xl font-display font-semibold text-[#1d1d1f]">3. User Responsibilities</h3>
            <p className="text-[#86868b] leading-relaxed">
              You agree to use our platform strictly for legitimate informational and logistical purposes. Any abuse of the platform, including providing false information, scraping data, or attempting to compromise the security of other users, will result in immediate termination of access.
            </p>
          </section>
          
          <section className="space-y-4">
            <h3 className="text-2xl font-display font-semibold text-[#1d1d1f]">4. Limitation of Liability</h3>
            <p className="text-[#86868b] leading-relaxed">
              While we strive to provide accurate, real-time information regarding food resources, Pantry Belt operates as an intermediary informational service. We are not liable for the operational status of individual pantries, the availability of food items, or any damages arising from your physical travel to said locations.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-2xl font-display font-semibold text-[#1d1d1f]">5. Contact Us</h3>
            <p className="text-[#86868b] leading-relaxed">
              For any legal or service inquiries, please contact us at <a href="mailto:pantrybelt@gmail.com" className="text-[#0071e3] hover:underline">pantrybelt@gmail.com</a>.
            </p>
          </section>
        </div>
      </motion.div>
    </section>
  );
}
