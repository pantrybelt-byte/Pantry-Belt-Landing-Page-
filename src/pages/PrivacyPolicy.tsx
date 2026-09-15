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
        <div className="mb-12 border-b border-black/10 pb-8">
          <h1 className="text-4xl md:text-5xl font-display font-semibold mb-4 tracking-tight">Privacy Policy</h1>
          <p className="text-[#86868b] text-lg font-medium">Effective Date & Last Updated: August 2026</p>
        </div>

        <div className="space-y-10">
          <div className="p-8 rounded-2xl bg-[#f5f5f7] border border-[#0071e3]/10">
            <h2 className="text-[#0071e3] text-xl font-bold tracking-tight mb-4 normal-case">Our Promise to You</h2>
            <p className="text-lg leading-relaxed font-medium text-[#1d1d1f]">
              At AccessBelt, we believe trust is just as essential as the food resources we connect you with.
              <strong> We will never sell your personal data, and we never share it with third parties for their own marketing purposes.</strong>
            </p>
            <p className="mt-4 text-[#86868b] leading-relaxed">
              This policy covers two things: this website (where you can join our waitlist or read updates) and the AccessBelt mobile app itself. The mobile app works without creating an account — you can find and contact food pantries fully anonymously.
            </p>
          </div>

          <section className="space-y-4">
            <h3 className="text-2xl font-display font-semibold text-[#1d1d1f]">1. Information We Collect</h3>

            <h4 className="text-lg font-semibold text-[#1d1d1f] mt-4">This Website (accessbelt.com)</h4>
            <p className="text-[#86868b] leading-relaxed">
              If you join our waitlist or sign up for updates, we collect only what you provide: your name, email address, and mobile phone number.
            </p>

            <h4 className="text-lg font-semibold text-[#1d1d1f] mt-4">The AccessBelt Mobile App</h4>
            <p className="text-[#86868b] leading-relaxed">
              The app uses anonymous authentication by default — no name, email, or phone number is required to search for pantries, view details, or contact a pantry directly. Depending on what you choose to use, the app may collect:
            </p>
            <ul className="list-disc pl-6 text-[#86868b] space-y-2">
              <li><strong>Coarse Location Data:</strong> With your permission, your device's location is used while in-app to show nearby pantries on the map. We record a coarse, rounded version of your location (accurate to roughly a mile) tied to a county — never your exact street address — to measure pantry coverage across regions.</li>
              <li><strong>User-Generated Content (UGC) & Feedback:</strong> If you submit crowd-sourced pantry updates, open/closed reports, or feedback, we collect the text and timestamp of your submission to maintain resource accuracy.</li>
              <li><strong>Optional Profile Details:</strong> If you choose to fill out "About You" in Profile, we store your age, family size, ZIP code, and — only if you choose to answer — race/ethnicity. All of these are optional and can be skipped entirely.</li>
              <li><strong>Pete AI Assistant Conversations:</strong> Messages you send to Pete, our in-app assistant, are processed to recommend relevant resources. Before anything is stored, we automatically strip obvious personal identifiers (like phone numbers or addresses) from message text.</li>
              <li><strong>Push Notification Tokens:</strong> Only if you turn on push notifications, so we can send you alerts about nearby pantries or emergency distributions.</li>
              <li><strong>Usage Analytics:</strong> Anonymous, device-level signals — which pantries get viewed, called, or navigated to; county browsed; time of day — used in aggregate to report program impact to food banks and grant partners. Reports are always aggregated by county or statewide; we do not report on individual users.</li>
              <li><strong>Optional Account Creation:</strong> If you choose to create a real email/password login, that email is used solely to let you sign back into the same profile from a new device.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h3 className="text-2xl font-display font-semibold text-[#1d1d1f]">2. How We Use Your Information</h3>
            <p className="text-[#86868b] leading-relaxed">
              Website contact information is used only to send you launch updates, newsletters, and essential product notifications.
            </p>
            <p className="text-[#86868b] leading-relaxed">
              In the mobile app, your information is used to: show pantries near you, enable Pete AI to recommend relevant assistance, review and moderate crowd-sourced pantry updates, measure community food connectivity (to report aggregate impact numbers to partner food banks), and send push notifications if opted in.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-2xl font-display font-semibold text-[#1d1d1f]">3. Location Data, Specifically</h3>
            <p className="text-[#86868b] leading-relaxed">
              Location access is requested only while you're actively using the app ("When In Use"), never in the background. You can decline location permissions at any time and still browse pantries manually by county. Turning off Location Services in the app's Profile settings or device settings opens the map to a statewide view.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-2xl font-display font-semibold text-[#1d1d1f]">4. Who We Share Data With</h3>
            <p className="text-[#86868b] leading-relaxed">
              We do not sell data, and we do not share it with advertisers or data brokers. We rely on standard infrastructure service providers who process data strictly under security obligations:
            </p>
            <ul className="list-disc pl-6 text-[#86868b] space-y-2">
              <li><strong>Google Firebase:</strong> Hosts database services, handles anonymous authentication, and stores opt-in user profiles.</li>
              <li><strong>Google Gemini API:</strong> Processes Pete AI assistant prompts. Prompts are transmitted to generate replies and are not used by Google to train public models on your personal data.</li>
            </ul>
            <p className="text-[#86868b] leading-relaxed">
              Aggregated, county-level impact statistics (e.g., "1,200 pantry views in Dallas County") are shared with regional food banks and public health grant providers. These reports never contain individual user identifiers.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-2xl font-display font-semibold text-[#1d1d1f]">5. Data Security & Retention</h3>
            <p className="text-[#86868b] leading-relaxed">
              We implement industry-standard security protocols to protect your information, including encrypted connections (HTTPS/TLS) and strict database security rules. Access is limited to authorized AccessBelt operational staff.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-2xl font-display font-semibold text-[#1d1d1f]">6. Children's Privacy</h3>
            <p className="text-[#86868b] leading-relaxed">
              The AccessBelt app is intended for users age 13 and older. We do not knowingly collect personal information from children under 13.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-2xl font-display font-semibold text-[#1d1d1f]">7. Your Choices & Data Deletion Rights</h3>
            <p className="text-[#86868b] leading-relaxed">
              Because the app operates anonymously by default, you can stop using it at any time without needing to delete an account. If you created an optional profile or account and wish to request data deletion, contact us at <a href="mailto:getaccessbelt@gmail.com" className="text-[#0071e3] hover:underline">getaccessbelt@gmail.com</a> and we will delete your record promptly.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-2xl font-display font-semibold text-[#1d1d1f]">8. Contact Us</h3>
            <p className="text-[#86868b] leading-relaxed">
              If you have any questions or concerns regarding this Privacy Policy or how your data is handled, please reach out to us directly at <a href="mailto:getaccessbelt@gmail.com" className="text-[#0071e3] font-semibold hover:underline">getaccessbelt@gmail.com</a>.
            </p>
          </section>
        </div>
      </motion.div>
    </section>
  );
}
