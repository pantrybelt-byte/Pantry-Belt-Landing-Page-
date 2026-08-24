import { motion } from "motion/react";

export default function DmcaPolicy() {
  return (
    <section className="section-padding bg-transparent text-[#1d1d1f] min-h-[80vh]">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto bg-white/95 backdrop-blur-xl p-10 md:p-16 rounded-[32px] border border-black/5 shadow-3d"
      >
        <div className="mb-12 border-b border-black/10 pb-8">
          <h1 className="text-4xl md:text-5xl font-display font-semibold mb-4 tracking-tight">DMCA Copyright Takedown Policy</h1>
          <p className="text-[#86868b] text-lg font-medium">Digital Millennium Copyright Act (17 U.S.C. § 512) Notice Procedures</p>
          <p className="text-[#86868b] text-sm mt-1">Effective Date: August 2026 · AccessBelt</p>
        </div>

        <div className="space-y-10">
          <section className="space-y-4">
            <h3 className="text-2xl font-display font-semibold text-[#1d1d1f]">1. Compliance Commitment</h3>
            <p className="text-[#86868b] leading-relaxed">
              AccessBelt respects the intellectual property rights of creators, authors, and copyright holders. In accordance with the Digital Millennium Copyright Act of 1998 (17 U.S.C. § 512) ("DMCA"), AccessBelt will respond expeditiously to claims of copyright infringement committed using the AccessBelt mobile app or website (accessbelt.com).
            </p>
          </section>

          <section className="space-y-4 p-6 rounded-2xl bg-[#f5f5f7] border border-black/5">
            <h3 className="text-2xl font-display font-semibold text-[#0071e3]">2. Designated DMCA Contact</h3>
            <p className="text-[#86868b] leading-relaxed">
              All formal DMCA Copyright Infringement Notices and Counter-Notifications must be submitted to our Official Contact Email at:
            </p>
            <div className="p-5 rounded-xl bg-white border border-black/10 font-mono text-sm space-y-1 text-[#1d1d1f] mt-3">
              <p className="font-bold font-sans text-base mb-1 text-[#1d1d1f]">Official Contact</p>
              <p>Email: <a href="mailto:getaccessbelt@gmail.com" className="text-[#0071e3] font-semibold underline">getaccessbelt@gmail.com</a></p>
              <p>Subject Line: <span className="text-[#86868b]">"DMCA Takedown Notice - AccessBelt"</span></p>
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="text-2xl font-display font-semibold text-[#1d1d1f]">3. Elements of a Valid DMCA Takedown Notice</h3>
            <p className="text-[#86868b] leading-relaxed">
              To file a copyright infringement notice with AccessBelt, you must provide a written communication containing all of the following elements:
            </p>
            <ul className="list-disc pl-6 text-[#86868b] space-y-3">
              <li><strong>Physical or Electronic Signature:</strong> A physical or electronic signature of a person authorized to act on behalf of the copyright owner.</li>
              <li><strong>Identification of Copyrighted Work:</strong> Clear identification of the copyrighted work claimed to have been infringed (or a representative list if multiple works are covered).</li>
              <li><strong>Identification of Infringing Material:</strong> Specific identification of the material claimed to be infringing or to be the subject of infringing activity, along with information reasonably sufficient to locate the material (such as exact URLs or app screen details).</li>
              <li><strong>Contact Information:</strong> Your full name, mailing address, telephone number, and email address.</li>
              <li><strong>Good Faith Statement:</strong> A statement that you have a good faith belief that use of the material in the manner complained of is not authorized by the copyright owner, its agent, or the law.</li>
              <li><strong>Accuracy & Perjury Statement:</strong> A statement that the information in the notification is accurate, and under penalty of perjury, that you are authorized to act on behalf of the copyright owner.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h3 className="text-2xl font-display font-semibold text-[#1d1d1f]">4. Counter-Notification Procedure</h3>
            <p className="text-[#86868b] leading-relaxed">
              If your content was removed due to a DMCA notice and you believe it was removed by mistake or misidentification, you may submit a written Counter-Notification to <a href="mailto:getaccessbelt@gmail.com" className="text-[#0071e3] font-semibold hover:underline">getaccessbelt@gmail.com</a> containing your signature, identification of removed material, statement under penalty of perjury, and consent to local federal district court jurisdiction.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-2xl font-display font-semibold text-[#1d1d1f]">5. Repeat Infringer Policy</h3>
            <p className="text-[#86868b] leading-relaxed">
              In accordance with 17 U.S.C. § 512(i), AccessBelt maintains a policy of terminating or disabling accounts and submission privileges of users who repeatedly infringe intellectual property rights.
            </p>
          </section>
        </div>
      </motion.div>
    </section>
  );
}
