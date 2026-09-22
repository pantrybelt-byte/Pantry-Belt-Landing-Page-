import { motion } from "motion/react";
import { Link } from "react-router-dom";

// ─────────────────────────────────────────────────────────
// BetaTesting page
// Separate step-by-step instructions for iOS (TestFlight)
// and Android (Google Play Open Testing / direct APK).
// Replace BETA_LINK_IOS and BETA_LINK_ANDROID with real
// distribution links when they are available.
// ─────────────────────────────────────────────────────────

const BETA_LINK_IOS = "#"; // ← Replace with your TestFlight invite link
const BETA_LINK_ANDROID_GROUP = "#"; // ← Replace with your Google Group join link
                                     //   e.g. https://groups.google.com/g/accessbelt-android-testers

const IOS_STEPS = [
  {
    num: "01",
    title: "Install TestFlight",
    body: "Open the App Store on your iPhone or iPad and download the free TestFlight app published by Apple. This is Apple's official beta distribution platform.",
  },
  {
    num: "02",
    title: "Open the Beta Invite Link",
    body: "Tap the iOS beta link below on your device. TestFlight will open automatically and show you the AccessBelt beta listing.",
  },
  {
    num: "03",
    title: "Accept & Install",
    body: 'Tap "Accept" then "Install". AccessBelt will appear on your home screen with a small orange dot indicating it is a beta build.',
  },
  {
    num: "04",
    title: "Send Us Your Feedback",
    body: "As you use the app, shake your device (or use the TestFlight feedback button) to submit screenshots and notes. Your feedback shapes the final release.",
  },
];

const ANDROID_STEPS = [
  {
    num: "01",
    title: "Have Your Gmail Ready",
    body: "Android requires your Gmail address to grant tester access. Make sure you are signed in to your Google account on your Android phone before continuing.",
  },
  {
    num: "02",
    title: "Join the AccessBelt Testers Group",
    body: "Tap the \"Join Android Testers\" button below. Google will open a page asking you to sign in and join the AccessBelt Testers group — this is a free, private Google Group we use to manage access.",
  },
  {
    num: "03",
    title: "You're Added Automatically",
    body: "Once you join the group, Google Play recognizes your Gmail as a trusted tester. No waiting, no manual approval — access is instant.",
  },
  {
    num: "04",
    title: "Check Your Email for the Install Link",
    body: "Within ~5 minutes you'll receive an email from Google Play with a direct link to install AccessBelt. Tap it, then tap \"Install\" on the Play Store page.",
  },
  {
    num: "05",
    title: "Share Your Feedback",
    body: "Use the app and send your thoughts to getaccessbelt@gmail.com — screenshots, bugs, or anything that felt off. Every report directly improves the final release.",
  },
];


interface Step { num: string; title: string; body: string; }
interface PlatformCardProps { platform: "ios" | "android"; link: string; steps: Step[]; }

function PlatformCard({ platform, link, steps }: PlatformCardProps) {
  const isIOS = platform === "ios";
  const accentColor = isIOS ? "#0071e3" : "#34a853";
  const accentBg   = isIOS ? "bg-[#0071e3]" : "bg-[#34a853]";
  const accentHover= isIOS ? "hover:bg-[#0077ED]" : "hover:bg-[#2d9148]";
  const accentShadow = isIOS
    ? "shadow-[0_20px_40px_rgba(0,113,227,0.3)] hover:shadow-[0_25px_50px_rgba(0,113,227,0.4)]"
    : "shadow-[0_20px_40px_rgba(52,168,83,0.25)] hover:shadow-[0_25px_50px_rgba(52,168,83,0.35)]";
  const iconBg = isIOS ? "bg-[#0071e3]/10" : "bg-[#34a853]/10";

  const AppleIcon = () => (
    <svg viewBox="0 0 24 24" className="w-9 h-9" fill={accentColor}>
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );

  const AndroidIcon = () => (
    <svg viewBox="0 0 24 24" className="w-9 h-9" fill={accentColor}>
      <path d="M17.523 15.341c-.33 0-.602-.26-.602-.59 0-.33.271-.59.602-.59.33 0 .601.26.601.59 0 .33-.27.59-.601.59m-11.046 0c-.33 0-.601-.26-.601-.59 0-.33.271-.59.601-.59.331 0 .602.26.602.59 0 .33-.27.59-.602.59M17.7 10l1.508-2.766a.313.313 0 0 0-.115-.427.315.315 0 0 0-.429.115L17.14 9.715C15.91 9.12 14.491 8.75 13 8.75s-2.91.37-4.14.965L7.336 6.922a.315.315 0 0 0-.429-.115.313.313 0 0 0-.115.427L8.3 10C5.82 11.335 4.17 13.68 4 16.5h16c-.17-2.82-1.82-5.165-4.3-6.5z" />
    </svg>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
      className="bg-white/95 backdrop-blur-xl rounded-[32px] border border-black/5 shadow-3d overflow-hidden flex flex-col"
    >
      {/* Header */}
      <div className="px-10 py-8 flex items-center gap-5" style={{ borderBottom: `2px solid ${accentColor}20` }}>
        <div className={`w-16 h-16 rounded-2xl ${iconBg} flex items-center justify-center`}>
          {isIOS ? <AppleIcon /> : <AndroidIcon />}
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#86868b] mb-1">Beta Instructions</p>
          <h2 className="text-2xl font-display font-semibold tracking-tight normal-case text-[#1d1d1f]">
            {isIOS ? "iPhone & iPad (iOS)" : "Android"}
          </h2>
        </div>
      </div>

      {/* Steps */}
      <div className="px-10 py-8 space-y-6 flex-1">
        {steps.map((step) => (
          <div key={step.num} className="flex gap-5">
            <div
              className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold"
              style={{ backgroundColor: accentColor }}
            >
              {step.num}
            </div>
            <div>
              <p className="font-semibold text-[#1d1d1f] mb-1">{step.title}</p>
              <p className="text-[#86868b] leading-relaxed text-sm">{step.body}</p>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="px-10 pb-10">
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className={`w-full flex items-center justify-center gap-2 py-4 px-8 rounded-full text-white font-bold text-base transition-all duration-300 active:scale-95 hover:-translate-y-1 ${accentBg} ${accentHover} ${accentShadow}`}
          id={isIOS ? "beta-link-ios" : "beta-link-android"}
        >
          {isIOS ? "Open iOS Beta Link →" : "Join Android Testers (via Google) →"}
        </a>
        {link === "#" && (
          <p className="text-center text-xs text-[#86868b] mt-3 font-medium">
            Link coming soon — check back shortly.
          </p>
        )}
      </div>
    </motion.div>
  );
}

export default function BetaTesting() {
  return (
    <section className="section-padding bg-transparent text-[#1d1d1f] min-h-[80vh]">
      <div className="max-w-6xl mx-auto">

        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-[#0071e3]/10 border border-[#0071e3]/20 rounded-full px-5 py-2 mb-8">
            <span className="w-2 h-2 rounded-full bg-[#0071e3] animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#0071e3]">
              Early Access Beta
            </span>
          </div>

          <h1 className="mb-6 tracking-tight font-semibold text-gradient-blue">
            Become a Beta Tester
          </h1>
          <p className="text-xl md:text-2xl text-[#86868b] max-w-2xl mx-auto font-medium leading-relaxed">
            Help shape AccessBelt before public launch. Follow the steps below
            for your device and let us know what you find.
          </p>
        </motion.div>

        {/* Requirements callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.8 }}
          className="bg-white/80 backdrop-blur-xl border border-[#0071e3]/15 rounded-2xl px-8 py-6 mb-12 flex flex-col md:flex-row items-start md:items-center gap-4"
          style={{ boxShadow: "0 10px 30px rgba(0,0,0,0.05)" }}
        >
          <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[#0071e3]/10 flex items-center justify-center text-[#0071e3] font-bold text-lg">
            ℹ
          </div>
          <div>
            <p className="font-semibold text-[#1d1d1f] mb-1">Before you begin</p>
            <p className="text-[#86868b] text-sm leading-relaxed">
              This is a beta build — you may encounter minor issues, and that is completely expected. Your
              reports are invaluable in shaping the final release. For iOS you will need the free{" "}
              <strong className="text-[#1d1d1f]">TestFlight</strong> app from Apple. For Android, a standard
              Google account is all you need.
            </p>
          </div>
        </motion.div>

        {/* Platform cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <PlatformCard platform="ios"     link={BETA_LINK_IOS}           steps={IOS_STEPS}     />
          <PlatformCard platform="android" link={BETA_LINK_ANDROID_GROUP} steps={ANDROID_STEPS} />
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-center space-y-3"
        >
          <p className="text-[#86868b] font-medium">
            Questions or issues?{" "}
            <a href="mailto:getaccessbelt@gmail.com" className="text-[#0071e3] hover:underline font-semibold">
              getaccessbelt@gmail.com
            </a>
          </p>
          <p className="text-xs text-[#86868b]">
            <Link to="/" className="hover:text-[#0071e3] transition-colors">
              ← Back to home
            </Link>
          </p>
        </motion.div>

      </div>
    </section>
  );
}
