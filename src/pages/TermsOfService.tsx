import { motion } from "motion/react";
import { Link } from "react-router-dom";

export default function TermsOfService() {
  return (
    <section className="section-padding bg-transparent text-[#1d1d1f] min-h-[80vh]">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto bg-white/95 backdrop-blur-xl p-10 md:p-16 rounded-[32px] border border-black/5 shadow-3d"
      >
        <div className="mb-12 border-b border-black/10 pb-8">
          <h1 className="text-4xl md:text-5xl font-display font-semibold mb-4 tracking-tight">Terms of Service</h1>
          <p className="text-[#86868b] text-lg font-medium">Effective Date & Last Updated: August 2026</p>
        </div>

        <div className="space-y-10">
          <section className="space-y-4">
            <h3 className="text-2xl font-display font-semibold text-[#1d1d1f]">1. Acceptance of Terms</h3>
            <p className="text-[#86868b] leading-relaxed">
              Welcome to AccessBelt. By accessing or using the AccessBelt mobile application, website (accessbelt.com), software, or associated services (collectively, the "Service"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to all of these Terms, you must immediately cease accessing and using the Service.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-2xl font-display font-semibold text-[#1d1d1f]">2. Description of Service & Government Non-Affiliation</h3>
            <p className="text-[#86868b] leading-relaxed">
              AccessBelt is an independent informational directory and logistical resource platform designed to connect individuals and families to food pantries, emergency food programs, SNAP/EBT resources, and community aid. 
            </p>
            <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/60 text-sm text-amber-950 space-y-2">
              <p className="font-semibold">
                Government Non-Affiliation Notice:
              </p>
              <p>
                AccessBelt is a private, community-driven resource directory and is <strong>NOT affiliated with, endorsed by, authorized by, or representing any federal, state, county, or municipal government entity or agency</strong>. All government assistance program information (such as SNAP, WIC, and Free School Meals) is aggregated for public convenience from official government domains, including:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>USDA Food & Nutrition Service: <a href="https://www.fns.usda.gov" target="_blank" rel="noopener noreferrer" className="underline font-medium">fns.usda.gov</a></li>
                <li>Alabama Public Health (WIC): <a href="https://www.alabamapublichealth.gov" target="_blank" rel="noopener noreferrer" className="underline font-medium">alabamapublichealth.gov</a></li>
                <li>Benefits.gov: <a href="https://www.benefits.gov" target="_blank" rel="noopener noreferrer" className="underline font-medium">benefits.gov</a></li>
                <li>Alabama Department of Human Resources: <a href="https://dhr.alabama.gov" target="_blank" rel="noopener noreferrer" className="underline font-medium">dhr.alabama.gov</a></li>
              </ul>
            </div>
            <p className="text-[#86868b] leading-relaxed font-medium">
              AccessBelt does not operate, manage, control, stock, or guarantee any third-party food pantry, government assistance program, or distribution center. All listings are for general informational purposes only.
            </p>
          </section>

          <section id="liability" className="space-y-4 p-6 rounded-2xl bg-[#fff8f8] border border-[#b52525]/15">
            <h3 className="text-2xl font-display font-semibold text-[#b52525]">3. Disclaimer of Warranties & Limitation of Liability (Crowd-Sourced Data)</h3>
            <p className="text-[#1d1d1f] font-semibold leading-relaxed uppercase text-sm tracking-wide">
              Important Disclaimer regarding food pantry schedules, locations, and resource availability:
            </p>
            <p className="text-[#555] leading-relaxed">
              AccessBelt aggregates data from public registries, third-party partners, and community crowd-sourcing. <strong>THE SERVICE IS PROVIDED STRICTLY ON AN "AS IS" AND "AS AVAILABLE" BASIS.</strong> ACCESSBELT EXPRESSLY DISCLAIMS ALL WARRANTIES OF ANY KIND, WHETHER EXPRESS, IMPLIED, OR STATUTORY, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND ACCURACY.
            </p>
            <ul className="list-disc pl-6 text-[#555] space-y-2">
              <li><strong>No Guarantee of Availability:</strong> AccessBelt does not guarantee that any listed food pantry will be open, operational, reachable, or supplied with food items at any given time.</li>
              <li><strong>No Guarantee of Accuracy:</strong> Operating hours, addresses, phone numbers, distribution guidelines, and eligibility requirements may change without notice.</li>
              <li><strong>Limitation of Liability:</strong> TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL ACCESSBELT, ITS FOUNDERS, OPERATORS, EMPLOYEES, OR AFFILIATES BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES—INCLUDING BUT NOT LIMITED TO TRAVEL EXPENSES, FUEL COSTS, LOST TIME, MISSED DISTRIBUTIONS, PERSONAL INJURY, OR RELIANCE LOSSES—ARISING FROM OR RELATED TO YOUR USE OF OR INABILITY TO USE THE SERVICE, OR YOUR RELIANCE ON ANY INFORMATION PROVIDED THEREIN.</li>
            </ul>
          </section>

          <section id="ugc" className="space-y-4 p-6 rounded-2xl bg-[#f0f7ff] border border-[#0071e3]/15">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-display font-semibold text-[#0071e3]">4. User-Generated Content (UGC) & Content Moderation Policy</h3>
              <Link to="/ugc" className="text-xs font-bold text-[#0071e3] underline">View Full UGC Policy →</Link>
            </div>
            <p className="text-[#86868b] leading-relaxed">
              The Service permits users to submit crowd-sourced updates, pantry status reports, community edits, ratings, and feedback ("User-Generated Content" or "UGC").
            </p>
            <h4 className="text-lg font-semibold text-[#1d1d1f] mt-3">License Grant</h4>
            <p className="text-[#86868b] leading-relaxed">
              By submitting UGC, you grant AccessBelt a worldwide, perpetual, royalty-free, non-exclusive, transferable, sublicensable license to host, store, reproduce, modify, publish, translate, distribute, and display such content in connection with operating and promoting the Service.
            </p>
            <h4 className="text-lg font-semibold text-[#1d1d1f] mt-3">Content Moderation & Right of Removal</h4>
            <p className="text-[#86868b] leading-relaxed">
              AccessBelt enforces a strict zero-tolerance policy against inappropriate, illegal, false, or abusive submissions. AccessBelt reserves the unreserved, absolute right (but undertakes no obligation) to pre-screen, monitor, edit, refuse, disable access to, or remove any UGC at any time, for any reason, with or without prior notice. Grounds for removal include, but are not limited to:
            </p>
            <ul className="list-disc pl-6 text-[#86868b] space-y-1">
              <li>False, misleading, or fraudulent resource reports.</li>
              <li>Defamatory, harassing, threatening, abusive, or hateful language.</li>
              <li>Infringement of intellectual property or privacy rights.</li>
              <li>Commercial spam, unauthorized advertising, or malicious code.</li>
            </ul>
          </section>

          <section id="arbitration" className="space-y-4 p-6 rounded-2xl bg-[#f5f5f7] border border-black/5">
            <h3 className="text-2xl font-display font-semibold text-[#1d1d1f]">5. Binding Arbitration & Class Action Waiver</h3>
            <p className="text-[#86868b] leading-relaxed font-semibold text-sm uppercase tracking-wide">
              Please read this section carefully. It affects your legal rights.
            </p>
            <p className="text-[#86868b] leading-relaxed">
              <strong>Mandatory Binding Individual Arbitration:</strong> You and AccessBelt agree that any dispute, claim, or controversy arising out of or relating to these Terms, the Privacy Policy, or the Service shall be resolved through final and binding individual arbitration under standard commercial arbitration rules, rather than in court.
            </p>
            <p className="text-[#86868b] leading-relaxed">
              <strong>CLASS ACTION WAIVER:</strong> YOU AND ACCESSBELT AGREE THAT EACH PARTY MAY BRING CLAIMS AGAINST THE OTHER ONLY IN AN INDIVIDUAL CAPACITY, AND NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY PURPORTED CLASS, COLLECTIVE, CONSOLIDATED, OR REPRESENTATIVE PROCEEDING.
            </p>
            <p className="text-[#86868b] leading-relaxed">
              <strong>Small Claims Exception:</strong> Either party retains the right to bring an individual action in a small claims court of competent jurisdiction.
            </p>
          </section>

          <section id="dmca" className="space-y-4 p-6 rounded-2xl bg-[#f0f7ff] border border-[#0071e3]/15">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-display font-semibold text-[#0071e3]">6. DMCA Copyright Takedown Policy</h3>
              <Link to="/dmca" className="text-xs font-bold text-[#0071e3] underline">View Full DMCA Policy →</Link>
            </div>
            <p className="text-[#86868b] leading-relaxed">
              AccessBelt respects the intellectual property rights of others and complies with the Digital Millennium Copyright Act (17 U.S.C. § 512) ("DMCA"). If you believe that your copyrighted work has been copied or used in a way that constitutes copyright infringement, please send a written DMCA Takedown Notice to our Designated Contact.
            </p>
            <div className="p-5 rounded-xl bg-white border border-black/10 font-mono text-sm space-y-1 text-[#1d1d1f]">
              <p className="font-bold font-sans text-base mb-2 text-[#0071e3]">DMCA Designated Contact:</p>
              <p>Official Contact</p>
              <p>Email: <a href="mailto:getaccessbelt@gmail.com" className="text-[#0071e3] underline">getaccessbelt@gmail.com</a></p>
            </div>
            <p className="text-[#86868b] leading-relaxed mt-2">
              Your DMCA Notice must include: (a) physical or electronic signature of copyright owner or representative; (b) description of copyrighted work; (c) location of infringing material; (d) contact details; (e) good faith belief statement; and (f) perjury statement.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-2xl font-display font-semibold text-[#1d1d1f]">7. Governing Law</h3>
            <p className="text-[#86868b] leading-relaxed">
              These Terms shall be governed by and construed in accordance with the laws of the State of Alabama, without regard to its conflict of law principles.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-2xl font-display font-semibold text-[#1d1d1f]">8. Contact Information</h3>
            <p className="text-[#86868b] leading-relaxed">
              If you have any questions, legal notices, DMCA requests, or concerns regarding these Terms of Service, please contact us at <a href="mailto:getaccessbelt@gmail.com" className="text-[#0071e3] font-semibold hover:underline">getaccessbelt@gmail.com</a>.
            </p>
          </section>
        </div>
      </motion.div>
    </section>
  );
}
