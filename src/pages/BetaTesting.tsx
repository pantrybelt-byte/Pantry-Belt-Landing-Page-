import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  ExternalLink,
  Copy,
  Check,
  ChevronDown,
  Info,
  Lock,
  Mail,
  AlertTriangle,
  ArrowRight,
  Download,
  HelpCircle,
} from "lucide-react";

// ─────────────────────────────────────────────────────────
// AccessBelt Beta Testing Portal
// Official build distribution links and verified workflows
// ─────────────────────────────────────────────────────────

const BETA_LINK_IOS = "https://testflight.apple.com/join/Bx7DmRYc";
const TESTFLIGHT_APP_STORE_LINK = "https://apps.apple.com/app/testflight/id899247664";
const BETA_LINK_ANDROID_GROUP = "https://groups.google.com/g/accessbelt-android-testers";
const PLAY_STORE_LINK = "https://play.google.com/store/apps/details?id=com.accessbelt.app";
const PLAY_STORE_WEB_OPTIN = "https://play.google.com/apps/testing/com.accessbelt.app";
const SUPPORT_EMAIL = "getaccessbelt@gmail.com";

interface Step {
  num: string;
  title: string;
  body: string;
  tip?: string;
  actionText?: string;
  actionUrl?: string;
}

const IOS_STEPS: Step[] = [
  {
    num: "01",
    title: "Download TestFlight (Apple App Store)",
    body: "Apple requires their official TestFlight app to run beta software on iOS. If you already have TestFlight on your device, you can jump straight to Step 2.",
    actionText: "Get TestFlight on App Store",
    actionUrl: TESTFLIGHT_APP_STORE_LINK,
  },
  {
    num: "02",
    title: "Tap the AccessBelt Invite Link",
    body: "Open this page on your iPhone or iPad and tap 'Start iOS Beta'. TestFlight will launch automatically and display the AccessBelt early-access build.",
  },
  {
    num: "03",
    title: "Accept Invitation & Install",
    body: "Tap 'Accept' and then 'Install'. AccessBelt will appear on your home screen with a small orange dot signifying it is an active beta build.",
    tip: "No redeem code required — tapping the invite link handles authentication automatically.",
  },
  {
    num: "04",
    title: "Test & Share Beta Feedback",
    body: "Use the app regularly across your routine. Anytime something feels slow or unexpected, simply take a screenshot or shake your phone to submit private feedback directly to our team.",
  },
];

const ANDROID_STEPS: Step[] = [
  {
    num: "01",
    title: "Verify Your Google Account",
    body: "Ensure you know which Gmail / Google account is currently active on your Android phone's Google Play Store app.",
    tip: "You must use the same Google account for both the tester group and the Play Store.",
  },
  {
    num: "02",
    title: "Join the Testers Group (Required Step 1)",
    body: "Google Play requires tester authorization before the listing is visible. Tap '1. Join Android Testers Group' below, sign in with your phone's Gmail, and tap 'Join group'. Access is approved instantly.",
    actionText: "1. Join Android Testers Group",
    actionUrl: BETA_LINK_ANDROID_GROUP,
  },
  {
    num: "03",
    title: "Install from Google Play Store (Step 2)",
    body: "After joining the group, tap '2. Install on Google Play'. The listing will unlock and allow you to tap 'Install' or 'Become a tester'.",
    actionText: "2. Open in Google Play Store",
    actionUrl: PLAY_STORE_LINK,
    tip: "Seeing 'Item not found'? Check that Play Store is switched to the same Gmail you used to join the group, or wait ~60s for Google permissions to sync.",
  },
  {
    num: "04",
    title: "Send Feedback & Bug Reports",
    body: "Test pantry locating, offline bookmarks, and directions. Send screenshots or notes to getaccessbelt@gmail.com or submit feedback directly through the Play Store listing.",
  },
];

const FAQ_ITEMS = [
  {
    question: "Why does Google Play say 'Item not found' or 'App unavailable'?",
    answer:
      "This happens when you haven't joined the Google Group first, or when your Google Play Store app is signed into a different Google account than the one you used to join the group. Make sure you join the AccessBelt Testers Group first with the same Gmail, wait ~60 seconds, and refresh the Play Store link.",
  },
  {
    question: "Do I need an invite code for Apple TestFlight?",
    answer:
      "No invite code is needed! When you tap our official TestFlight link on an iPhone or iPad with TestFlight installed, TestFlight opens immediately and presents an 'Accept' button.",
  },
  {
    question: "Is this beta safe to install on my primary phone?",
    answer:
      "Yes. All beta builds are official packages cryptographically signed and reviewed through Apple's App Store and Google's Play Console. AccessBelt will never ask for payment, credit cards, or passwords, and will never access personal files.",
  },
  {
    question: "What should I test as a beta tester?",
    answer:
      "We especially appreciate feedback on: 1) Searching for pantries in your county, 2) Calculating driving distances and directions, 3) Offline access when in low-cell rural areas, and 4) Accuracy of pantry hours and distribution schedules.",
  },
  {
    question: "How do I report bugs or suggest features?",
    answer:
      "On iOS, you can take a screenshot inside the app and tap 'Share Beta Feedback'. On Android or desktop, email us directly at getaccessbelt@gmail.com with your device model, screenshots, and what happened.",
  },
];

export default function BetaTesting() {
  const [activeTab, setActiveTab] = useState<"all" | "ios" | "android">("all");
  const [detectedPlatform, setDetectedPlatform] = useState<"ios" | "android" | null>(null);
  const [copiedLink, setCopiedLink] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Auto-detect visitor's platform
  useEffect(() => {
    if (typeof window === "undefined") return;
    const ua = navigator.userAgent || "";
    if (/iPhone|iPad|iPod/i.test(ua)) {
      setDetectedPlatform("ios");
      if (window.innerWidth < 768) {
        setActiveTab("ios");
      }
    } else if (/Android/i.test(ua)) {
      setDetectedPlatform("android");
      if (window.innerWidth < 768) {
        setActiveTab("android");
      }
    }
  }, []);

  const handleCopy = (text: string, label: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedLink(label);
      setTimeout(() => setCopiedLink(null), 2500);
    }
  };

  const toggleFaq = (index: number) => {
    setOpenFaq((prev) => (prev === index ? null : index));
  };

  return (
    <section className="pt-6 sm:pt-10 pb-20 px-3.5 sm:px-6 md:px-12 bg-transparent text-[#1d1d1f] min-h-[90vh] overflow-x-hidden">
      <div className="max-w-6xl mx-auto">

        {/* ─── Hero Header ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-8 sm:mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-[#0071e3]/10 border border-[#0071e3]/20 rounded-full px-3.5 py-1 sm:px-4 sm:py-1.5 mb-5 sm:mb-6">
            <span className="w-2 h-2 rounded-full bg-[#0071e3] animate-pulse" />
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.16em] text-[#0071e3]">
              Official Public Beta · v1.0.0
            </span>
          </div>

          <h1 className="mb-3 sm:mb-4 tracking-tight font-semibold text-gradient-blue text-2xl sm:text-4xl md:text-5xl lg:text-6xl">
            AccessBelt Beta Testing
          </h1>
          <p className="text-sm sm:text-lg md:text-xl text-[#6e6e73] max-w-2xl mx-auto font-medium leading-relaxed px-2">
            Help bring dependable food assistance to Alabama’s Black Belt. Follow the official setup steps below for your device.
          </p>

          {/* Platform Switcher Segmented Control */}
          <div className="mt-6 sm:mt-8 p-1 bg-black/[0.04] border border-black/5 rounded-2xl sm:rounded-full shadow-inner w-full max-w-md mx-auto grid grid-cols-3 gap-1">
            <button
              onClick={() => setActiveTab("all")}
              className={`py-2 px-1 sm:px-4 rounded-xl sm:rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 text-center flex items-center justify-center ${
                activeTab === "all"
                  ? "bg-white text-[#1d1d1f] shadow-sm"
                  : "text-[#6e6e73] hover:text-[#1d1d1f]"
              }`}
              aria-label="View instructions for all platforms"
            >
              <span className="sm:hidden">All</span>
              <span className="hidden sm:inline">Both Builds</span>
            </button>

            <button
              onClick={() => setActiveTab("ios")}
              className={`py-2 px-1 sm:px-4 rounded-xl sm:rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-1 sm:gap-1.5 ${
                activeTab === "ios"
                  ? "bg-[#0071e3] text-white shadow-[0_4px_12px_rgba(0,113,227,0.3)]"
                  : "text-[#6e6e73] hover:text-[#1d1d1f]"
              }`}
              aria-label="View iOS Apple TestFlight instructions"
            >
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              <span className="sm:hidden">iOS</span>
              <span className="hidden sm:inline">iPhone & iPad</span>
              {detectedPlatform === "ios" && (
                <span className="hidden md:inline-block text-[9px] uppercase tracking-wide bg-white/20 px-1.5 py-0.5 rounded-full font-bold">
                  Your Device
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab("android")}
              className={`py-2 px-1 sm:px-4 rounded-xl sm:rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-1 sm:gap-1.5 ${
                activeTab === "android"
                  ? "bg-[#34a853] text-white shadow-[0_4px_12px_rgba(52,168,83,0.3)]"
                  : "text-[#6e6e73] hover:text-[#1d1d1f]"
              }`}
              aria-label="View Android Google Play instructions"
            >
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current">
                <path d="M17.523 15.341c-.33 0-.602-.26-.602-.59 0-.33.271-.59.602-.59.33 0 .601.26.601.59 0 .33-.27.59-.601.59m-11.046 0c-.33 0-.601-.26-.601-.59 0-.33.271-.59.601-.59.331 0 .602.26.602.59 0 .33-.27.59-.602.59M17.7 10l1.508-2.766a.313.313 0 0 0-.115-.427.315.315 0 0 0-.429.115L17.14 9.715C15.91 9.12 14.491 8.75 13 8.75s-2.91.37-4.14.965L7.336 6.922a.315.315 0 0 0-.429-.115.313.313 0 0 0-.115.427L8.3 10C5.82 11.335 4.17 13.68 4 16.5h16c-.17-2.82-1.82-5.165-4.3-6.5z" />
              </svg>
              <span>Android</span>
              {detectedPlatform === "android" && (
                <span className="hidden md:inline-block text-[9px] uppercase tracking-wide bg-white/20 px-1.5 py-0.5 rounded-full font-bold">
                  Your Device
                </span>
              )}
            </button>
          </div>
        </motion.div>

        {/* ─── Security & Authenticity Banner ─── */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="bg-white/90 backdrop-blur-xl border border-black/5 rounded-2xl p-4 sm:p-6 mb-8 sm:mb-12 shadow-sm"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start gap-3 sm:gap-4 flex-1 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-[#0071e3]/10 text-[#0071e3] flex items-center justify-center shrink-0 mt-0.5">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-semibold text-[#1d1d1f] text-sm sm:text-base">
                    Official & Verified Distribution
                  </h3>
                  <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-semibold text-[#0071e3] bg-[#0071e3]/10 px-2 py-0.5 rounded-full">
                    <Lock className="w-3 h-3" /> Signed Builds Only
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#6e6e73] mt-1.5 leading-relaxed">
                  All AccessBelt builds are authenticated directly through Apple TestFlight and Google Play Store.
                  AccessBelt is <strong>100% free</strong> and will <strong>never</strong> ask for payment, credit cards, or passwords.
                  Never install unverified packages from third-party sites or direct messages.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-black/5">
              <button
                onClick={() => handleCopy(window.location.href, "page")}
                className="w-full md:w-auto px-4 py-2.5 text-xs font-semibold text-[#1d1d1f] bg-black/[0.04] hover:bg-black/[0.08] active:scale-95 rounded-xl transition-all flex items-center justify-center gap-1.5"
                title="Copy shareable link to this beta testing page"
              >
                {copiedLink === "page" ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">Link Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#6e6e73]" />
                    <span>Share Beta Page</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>

        {/* ─── Platform Cards Grid / Responsive Tabs ─── */}
        <div className={`grid gap-8 mb-14 ${activeTab === "all" ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-1 max-w-2xl mx-auto"}`}>

          {/* ══════════ iOS CARD ══════════ */}
          {(activeTab === "all" || activeTab === "ios") && (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4 }}
              className="bg-white/95 backdrop-blur-xl rounded-[28px] sm:rounded-[32px] border border-black/5 shadow-3d overflow-hidden flex flex-col"
            >
              {/* Card Header */}
              <div className="p-5 sm:p-7 md:p-8 bg-gradient-to-br from-[#0071e3]/5 via-white to-transparent border-b border-[#0071e3]/15">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5 sm:gap-4">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-[#0071e3]/10 text-[#0071e3] flex items-center justify-center shadow-inner shrink-0">
                      <svg viewBox="0 0 24 24" className="w-7 h-7 sm:w-8 sm:h-8 fill-current">
                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                      </svg>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.16em] text-[#0071e3] bg-[#0071e3]/10 px-2.5 py-0.5 rounded-full">
                          Apple TestFlight
                        </span>
                        <span className="text-[10px] sm:text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Live
                        </span>
                      </div>
                      <h2 className="text-lg sm:text-2xl font-display font-semibold tracking-tight normal-case text-[#1d1d1f] mt-1">
                        iPhone & iPad (iOS)
                      </h2>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-[#6e6e73] mt-3 font-medium">
                  Compatible with iOS 15.0 or later on iPhone and iPad. Distributed via Apple’s official TestFlight platform.
                </p>
              </div>

              {/* Steps List */}
              <div className="p-5 sm:p-7 md:p-8 space-y-6 flex-1">
                {IOS_STEPS.map((step) => (
                  <div key={step.num} className="flex items-start gap-3.5 sm:gap-4">
                    <div className="shrink-0 w-8 h-8 rounded-full bg-[#0071e3] text-white text-xs sm:text-sm font-bold flex items-center justify-center shadow-md shadow-[#0071e3]/20">
                      {step.num}
                    </div>
                    <div className="space-y-1.5 flex-1 min-w-0">
                      <p className="font-semibold text-sm sm:text-base text-[#1d1d1f]">
                        {step.title}
                      </p>
                      <p className="text-[#6e6e73] leading-relaxed text-xs sm:text-sm">
                        {step.body}
                      </p>
                      {step.actionUrl && (
                        <div className="pt-1">
                          <a
                            href={step.actionUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0071e3] hover:underline"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>{step.actionText} ↗</span>
                          </a>
                        </div>
                      )}
                      {step.tip && (
                        <div className="bg-[#0071e3]/5 border border-[#0071e3]/10 rounded-xl px-3 py-2 text-[11px] text-[#0071e3] flex items-center gap-1.5 mt-1">
                          <Info className="w-3.5 h-3.5 shrink-0" />
                          <span>{step.tip}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Card Actions */}
              <div className="p-5 sm:p-7 md:p-8 pt-0 space-y-3">
                <a
                  href={BETA_LINK_IOS}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full min-h-[50px] sm:min-h-[52px] flex items-center justify-center gap-2 py-3 px-5 rounded-2xl text-white font-bold text-sm sm:text-base bg-[#0071e3] hover:bg-[#0077ED] transition-all duration-300 active:scale-95 shadow-[0_12px_24px_rgba(0,113,227,0.3)] hover:shadow-[0_16px_32px_rgba(0,113,227,0.4)]"
                  id="beta-link-ios"
                >
                  <span>Start iOS Beta (TestFlight)</span>
                  <ExternalLink className="w-4 h-4" />
                </a>

                <div className="flex items-center justify-between gap-2.5 pt-1">
                  <a
                    href={TESTFLIGHT_APP_STORE_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 px-3 rounded-xl border border-black/10 hover:border-[#0071e3]/40 hover:bg-[#0071e3]/5 text-[#6e6e73] hover:text-[#0071e3] text-xs font-semibold text-center transition-all flex items-center justify-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Get TestFlight App</span>
                  </a>

                  <button
                    onClick={() => handleCopy(BETA_LINK_IOS, "ios")}
                    className="py-2.5 px-3 rounded-xl border border-black/10 hover:border-black/20 hover:bg-black/[0.03] text-[#6e6e73] text-xs font-semibold transition-all flex items-center justify-center gap-1.5"
                    title="Copy TestFlight Join URL"
                  >
                    {copiedLink === "ios" ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Link</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* ══════════ ANDROID CARD ══════════ */}
          {(activeTab === "all" || activeTab === "android") && (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4 }}
              className="bg-white/95 backdrop-blur-xl rounded-[28px] sm:rounded-[32px] border border-black/5 shadow-3d overflow-hidden flex flex-col"
            >
              {/* Card Header */}
              <div className="p-5 sm:p-7 md:p-8 bg-gradient-to-br from-[#34a853]/5 via-white to-transparent border-b border-[#34a853]/15">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5 sm:gap-4">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-[#34a853]/10 text-[#34a853] flex items-center justify-center shadow-inner shrink-0">
                      <svg viewBox="0 0 24 24" className="w-7 h-7 sm:w-8 sm:h-8 fill-current">
                        <path d="M17.523 15.341c-.33 0-.602-.26-.602-.59 0-.33.271-.59.602-.59.33 0 .601.26.601.59 0 .33-.27.59-.601.59m-11.046 0c-.33 0-.601-.26-.601-.59 0-.33.271-.59.601-.59.331 0 .602.26.602.59 0 .33-.27.59-.602.59M17.7 10l1.508-2.766a.313.313 0 0 0-.115-.427.315.315 0 0 0-.429.115L17.14 9.715C15.91 9.12 14.491 8.75 13 8.75s-2.91.37-4.14.965L7.336 6.922a.315.315 0 0 0-.429-.115.313.313 0 0 0-.115.427L8.3 10C5.82 11.335 4.17 13.68 4 16.5h16c-.17-2.82-1.82-5.165-4.3-6.5z" />
                      </svg>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.16em] text-[#34a853] bg-[#34a853]/10 px-2.5 py-0.5 rounded-full">
                          Google Play Beta
                        </span>
                        <span className="text-[10px] sm:text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Live
                        </span>
                      </div>
                      <h2 className="text-lg sm:text-2xl font-display font-semibold tracking-tight normal-case text-[#1d1d1f] mt-1">
                        Android Devices
                      </h2>
                    </div>
                  </div>
                </div>

                {/* Android Flow Indicator Notice */}
                <div className="mt-4 bg-[#34a853]/10 border border-[#34a853]/20 rounded-xl p-3 text-xs text-[#1e6e34] flex items-start gap-2.5">
                  <Info className="w-4 h-4 shrink-0 mt-0.5 text-[#34a853]" />
                  <div>
                    <strong className="font-semibold text-[#1d1d1f]">2-Step Play Store Flow: </strong>
                    Google requires you to join the tester group first. Once joined, Google Play instantly unlocks the app.
                  </div>
                </div>
              </div>

              {/* Steps List */}
              <div className="p-5 sm:p-7 md:p-8 space-y-6 flex-1">
                {ANDROID_STEPS.map((step) => (
                  <div key={step.num} className="flex items-start gap-3.5 sm:gap-4">
                    <div className="shrink-0 w-8 h-8 rounded-full bg-[#34a853] text-white text-xs sm:text-sm font-bold flex items-center justify-center shadow-md shadow-[#34a853]/20">
                      {step.num}
                    </div>
                    <div className="space-y-1.5 flex-1 min-w-0">
                      <p className="font-semibold text-sm sm:text-base text-[#1d1d1f]">
                        {step.title}
                      </p>
                      <p className="text-[#6e6e73] leading-relaxed text-xs sm:text-sm">
                        {step.body}
                      </p>
                      {step.actionUrl && (
                        <div className="pt-1">
                          <a
                            href={step.actionUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#34a853] hover:underline"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span>{step.actionText} ↗</span>
                          </a>
                        </div>
                      )}
                      {step.tip && (
                        <div className="bg-[#34a853]/5 border border-[#34a853]/10 rounded-xl px-3 py-2 text-[11px] text-[#2d9148] flex items-start gap-1.5 mt-1">
                          <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5 text-[#34a853]" />
                          <span>{step.tip}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Card Actions (Sequential 1 & 2) */}
              <div className="p-5 sm:p-7 md:p-8 pt-0 space-y-3">
                {/* Stage 1: Google Group */}
                <a
                  href={BETA_LINK_ANDROID_GROUP}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full min-h-[50px] sm:min-h-[52px] flex items-center justify-center gap-2 py-3 px-5 rounded-2xl text-white font-bold text-sm sm:text-base bg-[#34a853] hover:bg-[#2d9148] transition-all duration-300 active:scale-95 shadow-[0_12px_24px_rgba(52,168,83,0.3)] hover:shadow-[0_16px_32px_rgba(52,168,83,0.4)]"
                  id="beta-link-android-group"
                >
                  <span>Step 1: Join Android Testers Group</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                {/* Stage 2: Google Play Store */}
                <a
                  href={PLAY_STORE_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full min-h-[48px] flex items-center justify-center gap-2 py-3 px-5 rounded-2xl text-[#1d1d1f] font-semibold text-xs sm:text-sm border-2 border-black/10 hover:border-[#34a853] hover:bg-[#34a853]/5 transition-all duration-300 active:scale-95"
                  id="beta-link-play-store"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current text-[#34a853]">
                    <path d="M3.609 1.814L13.792 12 3.61 22.186c-.347-.31-.56-.757-.56-1.258V3.072c0-.501.213-.948.56-1.258zm11.306 11.31l2.427 2.428-11.758 6.784 9.331-9.212zm0-2.248L5.584 1.666l11.758 6.784-2.427 2.426zm1.59 1.59l3.327 1.919c.749.432.749 1.139 0 1.571l-3.327 1.919-2.122-2.122 2.122-2.122z" />
                  </svg>
                  <span>Step 2: Install on Google Play Store</span>
                  <ExternalLink className="w-4 h-4" />
                </a>

                {/* Helper row */}
                <div className="flex items-center justify-between gap-2.5 pt-1">
                  <a
                    href={PLAY_STORE_WEB_OPTIN}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 px-2.5 rounded-xl border border-black/10 hover:border-[#34a853]/40 hover:bg-[#34a853]/5 text-[#6e6e73] hover:text-[#34a853] text-[11px] sm:text-xs font-semibold text-center transition-all flex items-center justify-center gap-1.5"
                    title="Web Opt-in testing page for Google Play"
                  >
                    <span>Web Testing Opt-In ↗</span>
                  </a>

                  <button
                    onClick={() => handleCopy(BETA_LINK_ANDROID_GROUP, "android")}
                    className="py-2 px-2.5 rounded-xl border border-black/10 hover:border-black/20 hover:bg-black/[0.03] text-[#6e6e73] text-[11px] sm:text-xs font-semibold transition-all flex items-center justify-center gap-1.5"
                    title="Copy Google Group Link"
                  >
                    {copiedLink === "android" ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Group Link</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          )}

        </div>

        {/* ─── What to Test / Testing Focus ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-white/80 backdrop-blur-xl border border-black/5 rounded-[28px] p-6 sm:p-10 mb-14 shadow-sm"
        >
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#0071e3] bg-[#0071e3]/10 px-3 py-1 rounded-full">
              Testing Checklist
            </span>
            <h3 className="text-2xl font-display font-semibold tracking-tight text-[#1d1d1f] mt-2">
              What We Need Your Eyes On
            </h3>
            <p className="text-sm text-[#6e6e73] mt-2">
              As an early beta tester, you are directly shaping food access reliability for rural Alabama families.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-[#f5f5f7] border border-black/5 flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded-xl bg-[#0071e3]/10 text-[#0071e3] flex items-center justify-center mb-3">
                  📍
                </div>
                <h4 className="font-semibold text-sm text-[#1d1d1f] mb-1">GPS & Driving Distances</h4>
                <p className="text-xs text-[#6e6e73] leading-relaxed">
                  Verify accurate distance sorting and turn-by-turn routing to pantries in your county.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#f5f5f7] border border-black/5 flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded-xl bg-[#0071e3]/10 text-[#0071e3] flex items-center justify-center mb-3">
                  🔍
                </div>
                <h4 className="font-semibold text-sm text-[#1d1d1f] mb-1">County & Town Search</h4>
                <p className="text-xs text-[#6e6e73] leading-relaxed">
                  Test searching by county, city (Selma, Demopolis, Camden, etc.), or specific pantry names.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#f5f5f7] border border-black/5 flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded-xl bg-[#0071e3]/10 text-[#0071e3] flex items-center justify-center mb-3">
                  📶
                </div>
                <h4 className="font-semibold text-sm text-[#1d1d1f] mb-1">Offline Bookmarks</h4>
                <p className="text-xs text-[#6e6e73] leading-relaxed">
                  Bookmark pantries and verify they open properly even without an active cellular connection.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#f5f5f7] border border-black/5 flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded-xl bg-[#0071e3]/10 text-[#0071e3] flex items-center justify-center mb-3">
                  ⏱️
                </div>
                <h4 className="font-semibold text-sm text-[#1d1d1f] mb-1">Distribution Schedules</h4>
                <p className="text-xs text-[#6e6e73] leading-relaxed">
                  Confirm distribution times, dates, and requirements match local community reality.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ─── Frequently Asked Questions Accordion ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="bg-white/90 backdrop-blur-xl border border-black/5 rounded-[28px] p-6 sm:p-10 mb-14 shadow-sm"
        >
          <div className="text-center max-w-xl mx-auto mb-8">
            <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-[#6e6e73] bg-black/[0.04] px-3 py-1 rounded-full mb-2">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Beta FAQ</span>
            </div>
            <h3 className="text-2xl font-display font-semibold tracking-tight text-[#1d1d1f]">
              Frequently Asked Questions
            </h3>
          </div>

          <div className="space-y-3 max-w-3xl mx-auto">
            {FAQ_ITEMS.map((item, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="border border-black/5 rounded-2xl overflow-hidden bg-[#f5f5f7]/50 transition-colors"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-[#1d1d1f] hover:text-[#0071e3] transition-colors"
                    aria-expanded={isOpen}
                  >
                    <span>{item.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#6e6e73] shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-[#0071e3]" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="p-4 sm:p-5 pt-0 text-xs sm:text-sm text-[#6e6e73] leading-relaxed border-t border-black/5">
                          {item.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* ─── Feedback & Contact Footer ─── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-center space-y-4 pt-4 border-t border-black/5"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-3 bg-white border border-black/5 rounded-2xl px-5 py-3 shadow-sm">
            <span className="text-xs text-[#6e6e73] font-medium flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-[#0071e3]" />
              Dedicated Beta Feedback Channel:
            </span>
            <div className="flex items-center gap-2">
              <a
                href={`mailto:${SUPPORT_EMAIL}?subject=AccessBelt%20Beta%20Feedback`}
                className="text-sm text-[#0071e3] hover:underline font-semibold"
              >
                {SUPPORT_EMAIL}
              </a>
              <button
                onClick={() => handleCopy(SUPPORT_EMAIL, "email")}
                className="p-1.5 rounded-lg hover:bg-black/[0.05] text-[#6e6e73] hover:text-[#1d1d1f] transition-all"
                title="Copy email address"
              >
                {copiedLink === "email" ? (
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          </div>

          <p className="text-xs text-[#6e6e73] space-x-4">
            <Link to="/" className="hover:text-[#0071e3] transition-colors font-medium">
              ← Return to Home
            </Link>
            <span>•</span>
            <Link to="/privacy" className="hover:text-[#0071e3] transition-colors font-medium">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link to="/terms" className="hover:text-[#0071e3] transition-colors font-medium">
              Terms of Service
            </Link>
          </p>
        </motion.div>

      </div>
    </section>
  );
}

