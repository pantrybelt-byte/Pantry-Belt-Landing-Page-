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
          <p className="text-[#86868b] text-lg font-medium">Last Updated: August 2026</p>
        </div>

        <div className="space-y-10">
          <div className="p-8 rounded-2xl bg-[#f5f5f7] border border-[#0071e3]/10">
            <h2 className="text-[#0071e3] text-xl font-bold tracking-tight mb-4 normal-case">Our Promise to You</h2>
            <p className="text-lg leading-relaxed font-medium">
              At Access Belt, we believe trust is just as essential as the food resources we connect you with.
              <strong> We will never sell your personal data, and we never share it with third parties for their own marketing purposes.</strong>
            </p>
            <p className="mt-4 text-[#86868b] leading-relaxed">
              This policy covers two things: this website (where you can join our waitlist or read updates) and the Access Belt mobile app itself. The mobile app works without creating an account — you can find and contact food pantries fully anonymously.
            </p>
          </div>

          <section className="space-y-4">
            <h3 className="text-2xl font-display font-semibold text-[#1d1d1f]">1. Information We Collect</h3>

            <h4 className="text-lg font-semibold text-[#1d1d1f] mt-4">This website</h4>
            <p className="text-[#86868b] leading-relaxed">
              If you join our waitlist or sign up for updates, we collect only what you provide: your name, email address, and mobile phone number.
            </p>

            <h4 className="text-lg font-semibold text-[#1d1d1f] mt-4">The Access Belt mobile app</h4>
            <p className="text-[#86868b] leading-relaxed">
              The app uses anonymous authentication by default — no name, email, or phone number is required to search for pantries, view details, or contact a pantry directly. Depending on what you choose to use, the app may collect:
            </p>
            <ul className="list-disc pl-6 text-[#86868b] space-y-2">
              <li><strong>Location:</strong> With your permission, your device's location is used to center the map on nearby pantries and to show your position on the map. We also record a coarse, rounded version of your location (accurate to roughly a mile) tied to a county — never your exact address — to measure pantry coverage across Alabama.</li>
              <li><strong>Optional profile details:</strong> If you choose to fill out "About You" in Profile, we store your age, family size, ZIP code, and — only if you choose to answer — race/ethnicity. All of these are optional and can be skipped entirely.</li>
              <li><strong>Pete AI conversations:</strong> Messages you send to Pete, our in-app assistant, are used to find relevant resources. Before anything is stored, we automatically strip obvious personal identifiers (like phone numbers or addresses) from the message text.</li>
              <li><strong>Push notification token:</strong> Only if you turn on push notifications, so we can send you alerts about nearby pantries.</li>
              <li><strong>Usage analytics:</strong> Anonymous, device-level signals — which pantries get viewed, called, or navigated to; which county you're browsing; time of day — used in aggregate to report program impact to the food banks and government partners who fund this work. These reports are always aggregated by county or statewide; we do not report on individual users.</li>
              <li><strong>Optional real account:</strong> If you choose to create a real email/password login (entirely optional — the app works without one), that email is used only to let you sign back into the same profile from a new device.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h3 className="text-2xl font-display font-semibold text-[#1d1d1f]">2. How We Use Your Information</h3>
            <p className="text-[#86868b] leading-relaxed">
              Website contact information is used only to send you launch updates, our newsletter, and essential product notifications.
            </p>
            <p className="text-[#86868b] leading-relaxed">
              In the app, your information is used to: show you pantries near you, let Pete recommend relevant resources, measure whether the app is actually connecting people to food (so we can report honest impact numbers to the food banks and agencies who partner with us), and — only if you opt in — send you push notifications.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-2xl font-display font-semibold text-[#1d1d1f]">3. Location Data, Specifically</h3>
            <p className="text-[#86868b] leading-relaxed">
              Location access is requested only while you're using the app ("When In Use"), never in the background. You can decline the permission and still browse pantries by county manually. Turning off Location Services in the app's Profile settings, or in your device's system settings, stops the app from requesting your location — the map simply opens to a statewide view instead.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-2xl font-display font-semibold text-[#1d1d1f]">4. Who We Share Data With</h3>
            <p className="text-[#86868b] leading-relaxed">
              We do not sell data, and we do not share it with advertisers or data brokers. We do use a small number of service providers to run the app, who process data on our behalf under their own security commitments:
            </p>
            <ul className="list-disc pl-6 text-[#86868b] space-y-2">
              <li><strong>Google Firebase</strong> — hosts our database and handles anonymous authentication.</li>
              <li><strong>Google Gemini API</strong> — powers Pete's responses. Messages are sent to Google to generate a reply; they are not used by Google to train models on our data.</li>
            </ul>
            <p className="text-[#86868b] leading-relaxed">
              Aggregated, county-level impact statistics (e.g. "1,200 pantry visits logged in Dallas County this month") are shared with the food banks and government agencies that help fund Access Belt. These reports never identify individual users.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-2xl font-display font-semibold text-[#1d1d1f]">5. Data Security</h3>
            <p className="text-[#86868b] leading-relaxed">
              We implement industry-standard security protocols to protect your information, including encrypted connections and database access rules that restrict who can read or write data. Access is limited to authorized Access Belt personnel.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-2xl font-display font-semibold text-[#1d1d1f]">6. Children's Privacy</h3>
            <p className="text-[#86868b] leading-relaxed">
              The Access Belt app is intended for users age 13 and older. The optional "About You" profile is not available to anyone reporting an age below 13. We do not knowingly collect personal information from children under 13.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-2xl font-display font-semibold text-[#1d1d1f]">7. Your Choices</h3>
            <p className="text-[#86868b] leading-relaxed">
              Because the app works anonymously by default, you can stop using it at any time without deleting an account. If you've filled out an optional profile or created a real account, email us at the address below and we'll delete your data. You can also turn off location access, push notifications, or clear your profile at any time from the app's Profile screen.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-2xl font-display font-semibold text-[#1d1d1f]">8. Contact Us</h3>
            <p className="text-[#86868b] leading-relaxed">
              If you have any questions or concerns regarding this Privacy Policy or how your data is handled, please reach out to us directly at <a href="mailto:getaccessbelt@gmail.com" className="text-[#0071e3] hover:underline">getaccessbelt@gmail.com</a>.
            </p>
          </section>
        </div>
      </motion.div>
    </section>
  );
}
