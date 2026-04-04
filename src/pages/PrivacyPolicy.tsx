import { motion } from "motion/react";

export default function PrivacyPolicy() {
  return (
    <section className="section-padding bg-transparent text-[#1d1d1f] min-h-[80vh]">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto bg-white/95 backdrop-blur-xl p-10 md:p-16 rounded-[32px] border border-black/5 shadow-3d"
      >
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-display font-semibold mb-4 tracking-tight">Privacy Policy</h1>
          <p className="text-[#86868b] text-lg font-medium">Last Updated: April 2026</p>
        </div>

        <div className="space-y-10">
          <div className="p-8 rounded-2xl bg-[#f5f5f7] border border-[#0071e3]/10">
            <h2 className="text-[#0071e3] text-xl font-bold tracking-tight mb-4 normal-case">Our Promise to You</h2>
            <p className="text-lg leading-relaxed font-medium">
              At Pantry Belt, we believe trust is just as essential as the food resources we connect you with. 
              <strong> We will never share, sell, or distribute your personal data to any third party.</strong> 
            </p>
            <p className="mt-4 text-[#86868b] leading-relaxed">
              Any information you provide, including your name, email, and phone number, is strictly used to send you internal Pantry Belt emails, newsletters, and critical app updates. Your privacy is paramount.
            </p>
          </div>

          <section className="space-y-4">
            <h3 className="text-2xl font-display font-semibold text-[#1d1d1f]">1. Information We Collect</h3>
            <p className="text-[#86868b] leading-relaxed">
              We only collect information that you explicitly provide to us when you join our waitlist or sign up for our communication channels. This is limited to your name, email address, and mobile phone number.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-2xl font-display font-semibold text-[#1d1d1f]">2. How We Use Your Information</h3>
            <p className="text-[#86868b] leading-relaxed">
              The data we collect is utilized exclusively for direct communication from the Pantry Belt team. We use your contact information to:
            </p>
            <ul className="list-disc pl-6 text-[#86868b] space-y-2">
              <li>Send you updates on when Pantry Belt will launch in your area.</li>
              <li>Distribute our official newsletters containing community impact stories.</li>
              <li>Provide essential notifications about the application itself.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h3 className="text-2xl font-display font-semibold text-[#1d1d1f]">3. Data Security</h3>
            <p className="text-[#86868b] leading-relaxed">
              We implement industry-standard security protocols to protect your personal information. Our databases are encrypted, and access is strictly limited to authorized Pantry Belt personnel.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-2xl font-display font-semibold text-[#1d1d1f]">4. Contact Us</h3>
            <p className="text-[#86868b] leading-relaxed">
              If you have any questions or concerns regarding this Privacy Policy or how your data is handled, please reach out to us directly at <a href="mailto:hello@pantrybelt.com" className="text-[#0071e3] hover:underline">hello@pantrybelt.com</a>.
            </p>
          </section>
        </div>
      </motion.div>
    </section>
  );
}
