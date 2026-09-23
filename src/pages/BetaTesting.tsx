import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import {
  Compass,
  Search,
  Sparkles,
  PhoneCall,
  Check,
  Copy,
  ExternalLink,
  ChevronDown,
  Download,
  ShieldCheck,
  Lock,
  ArrowUpRight,
  Mail,
  AlertCircle,
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
  badge?: string;
  linkText?: string;
  linkUrl?: string;
}

const IOS_STEPS: Step[] = [
  {
    num: "1",
    title: "Download TestFlight",
    body: "TestFlight is Apple’s official sandbox for previewing pre-release software. Download it once from the App Store.",
    linkText: "Get TestFlight on App Store",
    linkUrl: TESTFLIGHT_APP_STORE_LINK,
  },
  {
    num: "2",
    title: "Accept the AccessBelt Invite",
    body: "Tap the iOS beta link on your iPhone or iPad. TestFlight launches directly and presents the AccessBelt early-access invitation.",
  },
  {
    num: "3",
    title: "Install the Beta Build",
    body: "Tap Accept, then Install. No redemption code is required. An orange dot appears next to AccessBelt on your home screen.",
    badge: "No redeem code needed",
  },
  {
    num: "4",
    title: "Share In-App Feedback",
    body: "Take a screenshot inside AccessBelt at any moment to highlight layout issues, bugs, or suggestions directly to the team.",
  },
];

const ANDROID_STEPS: Step[] = [
  {
    num: "1",
    title: "Join the Testers Group (Required First)",
    body: "Google Play requires your account to be on our authorized roster before the app unlocks. Tap to join our Google Group with your phone’s primary Gmail.",
    linkText: "Join Android Testers Group",
    linkUrl: BETA_LINK_ANDROID_GROUP,
    badge: "Step 1 of 3 · Instant access",
  },
  {
    num: "2",
    title: "Accept Invite & Opt In (Web)",
    body: "Open Google Play's testing opt-in page and tap the blue 'BECOME A TESTER' button. This officially grants your account download clearance.",
    linkText: "Open Web Opt-In Page",
    linkUrl: PLAY_STORE_WEB_OPTIN,
    badge: "Step 2 of 3 · Unlocks Play Store",
  },
  {
    num: "3",
    title: "Download Closed Testing Build",
    body: "On the closed beta testing page, tap 'download it on Google Play' to install the active closed testing build.",
    linkText: "Open Closed Testing Link",
    linkUrl: PLAY_STORE_WEB_OPTIN,
    badge: "Step 3 of 3 · Google Play Verified",
  },
  {
    num: "4",
    title: "Explore Core Features & Share Feedback",
    body: "Search local counties, view pantry pins on the live map, chat with Pete (AI), and test phone dialer connections. Send thoughts to getaccessbelt@gmail.com.",
  },
];

const TESTING_AREAS = [
  {
    title: "Map & GPS Navigation",
    description: "Location detection accuracy, map pin cluster loading, and launching driving directions in Apple Maps or Google Maps.",
    icon: Compass,
    color: "text-[#0071e3]",
    bg: "bg-[#0071e3]/10",
  },
  {
    title: "County Search & Filters",
    description: "Fast keyword search by Black Belt county or municipality (Selma, Demopolis, Camden, Marion, etc.).",
    icon: Search,
    color: "text-[#34a853]",
    bg: "bg-[#34a853]/10",
  },
  {
    title: "Pete AI Assistant",
    description: "Natural-language pantry guidance, eligibility explanations for SNAP/EBT, and pantry-staple recipe suggestions.",
    icon: Sparkles,
    color: "text-[#8e44ad]",
    bg: "bg-[#8e44ad]/10",
  },
  {
    title: "One-Tap Calling & 211",
    description: "Confirm telephone dialer links open cleanly for direct pantry contact and test the 24/7 Emergency Food (211) hotline trigger.",
    icon: PhoneCall,
    color: "text-[#e67e22]",
    bg: "bg-[#e67e22]/10",
  },
];

const FAQ_ITEMS = [
  {
    question: "Why does Google Play show 'Item not found' or 'App unavailable'?",
    answer:
      "This happens if you haven't completed both preliminary steps: (1) Join the AccessBelt Testers Google Group with your phone's primary Gmail, and (2) Open the Web Opt-In page and tap 'BECOME A TESTER'. Once you tap 'BECOME A TESTER', Google instantly unlocks the download on your Google Play Store app. Also confirm your Play Store app is active under the same Gmail.",
  },
  {
    question: "Do I need an invitation code for Apple TestFlight?",
    answer:
      "No redemption code is required. Simply open our public TestFlight invite link on your iPhone or iPad, and TestFlight will automatically present an 'Accept & Install' prompt.",
  },
  {
    question: "Is this build safe to run on my personal phone?",
    answer:
      "Yes. Both builds are official distribution packages cryptographically signed and reviewed through Apple App Store Connect and Google Play Console. AccessBelt is 100% free, never asks for payment or credentials, and does not sell personal information.",
  },
  {
    question: "How do I report bugs or suggest improvements?",
    answer:
      "On iOS, take a screenshot inside the app and tap 'Share Beta Feedback'. On Android, email us directly at getaccessbelt@gmail.com with your device model and notes.",
  },
];

export default function BetaTesting() {
  const [activeTab, setActiveTab] = useState<"all" | "ios" | "android">("all");
  const [detectedPlatform, setDetectedPlatform] = useState<"ios" | "android" | null>(null);
  const [copiedLink, setCopiedLink] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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
    <section className="pt-6 sm:pt-12 pb-24 px-4 sm:px-6 md:px-12 bg-transparent text-[#1d1d1f] min-h-[90vh] overflow-x-hidden">
      <div className="max-w-5xl mx-auto">

        {/* ─── Hero Header ─── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-10 sm:mb-14"
        >
          <div className="inline-flex items-center gap-2 bg-black/[0.04] border border-black/[0.08] rounded-full px-3.5 py-1 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] font-semibold tracking-wider uppercase text-[#555558]">
              Public Beta Program · v1.0.0
            </span>
          </div>

          <h1 className="mb-4 font-display font-semibold tracking-tight text-[#1d1d1f] text-3xl sm:text-5xl md:text-6xl leading-[1.1]">
            Experience AccessBelt before launch.
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-[#6e6e73] max-w-2xl mx-auto font-normal leading-relaxed">
            Help refine rural food pantry discovery across Alabama’s Black Belt. Choose your device below to install the active beta.
          </p>

          {/* ─── Sleek Segmented Switcher ─── */}
          <div className="mt-8 inline-flex p-1 bg-black/[0.05] border border-black/[0.06] rounded-full shadow-inner max-w-sm sm:max-w-md w-full mx-auto grid grid-cols-3 gap-1">
            <button
              onClick={() => setActiveTab("all")}
              className={`py-2 px-2 sm:px-4 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 text-center ${
                activeTab === "all"
                  ? "bg-white text-[#1d1d1f] shadow-sm"
                  : "text-[#6e6e73] hover:text-[#1d1d1f]"
              }`}
            >
              <span className="sm:hidden">All</span>
              <span className="hidden sm:inline">Both Platforms</span>
            </button>

            <button
              onClick={() => setActiveTab("ios")}
              className={`py-2 px-2 sm:px-4 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-1.5 ${
                activeTab === "ios"
                  ? "bg-[#0071e3] text-white shadow-[0_4px_12px_rgba(0,113,227,0.25)]"
                  : "text-[#6e6e73] hover:text-[#1d1d1f]"
              }`}
            >
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              <span className="sm:hidden">iOS</span>
              <span className="hidden sm:inline">iPhone & iPad</span>
              {detectedPlatform === "ios" && (
                <span className="hidden md:inline-block w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              )}
            </button>

            <button
              onClick={() => setActiveTab("android")}
              className={`py-2 px-2 sm:px-4 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-1.5 ${
                activeTab === "android"
                  ? "bg-[#34a853] text-white shadow-[0_4px_12px_rgba(52,168,83,0.25)]"
                  : "text-[#6e6e73] hover:text-[#1d1d1f]"
              }`}
            >
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current">
                <path d="M17.523 15.341c-.33 0-.602-.26-.602-.59 0-.33.271-.59.602-.59.33 0 .601.26.601.59 0 .33-.27.59-.601.59m-11.046 0c-.33 0-.601-.26-.601-.59 0-.33.271-.59.601-.59.331 0 .602.26.602.59 0 .33-.27.59-.602.59M17.7 10l1.508-2.766a.313.313 0 0 0-.115-.427.315.315 0 0 0-.429.115L17.14 9.715C15.91 9.12 14.491 8.75 13 8.75s-2.91.37-4.14.965L7.336 6.922a.315.315 0 0 0-.429-.115.313.313 0 0 0-.115.427L8.3 10C5.82 11.335 4.17 13.68 4 16.5h16c-.17-2.82-1.82-5.165-4.3-6.5z" />
              </svg>
              <span>Android</span>
              {detectedPlatform === "android" && (
                <span className="hidden md:inline-block w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              )}
            </button>
          </div>

          {/* Minimalist Trust & Safety Indicator */}
          <div className="mt-5 flex items-center justify-center gap-4 text-xs text-[#86868b] flex-wrap">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Signed & Authenticated via Apple & Google
            </span>
            <span className="hidden sm:inline text-black/20">•</span>
            <span className="flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-[#0071e3]" />
              100% Free · No Payment Ever Requested
            </span>
          </div>
        </motion.div>

        {/* ─── Platform Cards ─── */}
        <div id="builds" className={`grid gap-8 mb-16 scroll-mt-28 ${activeTab === "all" ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-1 max-w-xl mx-auto"}`}>

          {/* ══════════ iOS CARD ══════════ */}
          {(activeTab === "all" || activeTab === "ios") && (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-[24px] border border-black/[0.08] shadow-[0_10px_30px_rgba(0,0,0,0.04)] overflow-hidden flex flex-col"
            >
              {/* Card Header */}
              <div className="p-6 sm:p-8 border-b border-black/[0.06]">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-2xl bg-black/[0.04] text-[#1d1d1f] flex items-center justify-center shrink-0 border border-black/[0.04]">
                      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                      </svg>
                    </div>
                    <div>
                      <h2 className="text-xl font-display font-semibold tracking-tight text-[#1d1d1f]">
                        Apple TestFlight
                      </h2>
                      <p className="text-xs text-[#86868b] font-medium mt-0.5">
                        iOS 15.0+ · iPhone & iPad
                      </p>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/50">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Live Beta
                  </span>
                </div>
              </div>

              {/* Steps Rail */}
              <div className="p-6 sm:p-8 space-y-6 flex-1">
                {IOS_STEPS.map((step) => (
                  <div key={step.num} className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-black/[0.05] border border-black/[0.08] text-[#1d1d1f] text-xs font-semibold flex items-center justify-center shrink-0 mt-0.5">
                      {step.num}
                    </div>
                    <div className="flex-1 min-w-0 space-y-1">
                      <p className="font-semibold text-sm text-[#1d1d1f]">
                        {step.title}
                      </p>
                      <p className="text-xs sm:text-sm text-[#6e6e73] leading-relaxed">
                        {step.body}
                      </p>
                      {step.linkUrl && (
                        <div className="pt-0.5">
                          <a
                            href={step.linkUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs font-semibold text-[#0071e3] hover:underline"
                          >
                            <span>{step.linkText}</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      )}
                      {step.badge && (
                        <span className="inline-block text-[11px] font-medium text-[#0071e3] bg-[#0071e3]/8 px-2 py-0.5 rounded-md mt-1">
                          {step.badge}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Area */}
              <div className="p-6 sm:p-8 pt-0 space-y-3">
                <a
                  href={BETA_LINK_IOS}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full min-h-[50px] flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl text-white font-semibold text-sm sm:text-base bg-[#0071e3] hover:bg-[#0077ED] active:scale-[0.98] transition-all shadow-[0_4px_16px_rgba(0,113,227,0.25)]"
                  id="beta-link-ios"
                >
                  <span>Open iOS Beta in TestFlight</span>
                  <ExternalLink className="w-4 h-4" />
                </a>

                <div className="flex items-center justify-between gap-3 pt-1">
                  <a
                    href={TESTFLIGHT_APP_STORE_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 px-3 rounded-lg border border-black/[0.08] hover:bg-black/[0.03] text-xs font-medium text-[#6e6e73] hover:text-[#1d1d1f] text-center transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Get TestFlight App</span>
                  </a>

                  <button
                    onClick={() => handleCopy(BETA_LINK_IOS, "ios")}
                    className="py-2 px-3 rounded-lg border border-black/[0.08] hover:bg-black/[0.03] text-xs font-medium text-[#6e6e73] hover:text-[#1d1d1f] transition-colors flex items-center justify-center gap-1.5"
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
              transition={{ duration: 0.3 }}
              className="bg-white rounded-[24px] border border-black/[0.08] shadow-[0_10px_30px_rgba(0,0,0,0.04)] overflow-hidden flex flex-col"
            >
              {/* Card Header */}
              <div className="p-6 sm:p-8 border-b border-black/[0.06]">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-2xl bg-[#34a853]/10 text-[#34a853] flex items-center justify-center shrink-0 border border-[#34a853]/15">
                      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                        <path d="M17.523 15.341c-.33 0-.602-.26-.602-.59 0-.33.271-.59.602-.59.33 0 .601.26.601.59 0 .33-.27.59-.601.59m-11.046 0c-.33 0-.601-.26-.601-.59 0-.33.271-.59.601-.59.331 0 .602.26.602.59 0 .33-.27.59-.602.59M17.7 10l1.508-2.766a.313.313 0 0 0-.115-.427.315.315 0 0 0-.429.115L17.14 9.715C15.91 9.12 14.491 8.75 13 8.75s-2.91.37-4.14.965L7.336 6.922a.315.315 0 0 0-.429-.115.313.313 0 0 0-.115.427L8.3 10C5.82 11.335 4.17 13.68 4 16.5h16c-.17-2.82-1.82-5.165-4.3-6.5z" />
                      </svg>
                    </div>
                    <div>
                      <h2 className="text-xl font-display font-semibold tracking-tight text-[#1d1d1f]">
                        Google Play Closed Beta
                      </h2>
                      <p className="text-xs text-[#86868b] font-medium mt-0.5">
                        Android 8.0+ · Direct via Google Play
                      </p>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/50">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Live Beta
                  </span>
                </div>
              </div>

              {/* Steps Rail */}
              <div className="p-6 sm:p-8 space-y-6 flex-1">
                {ANDROID_STEPS.map((step) => (
                  <div key={step.num} className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-black/[0.05] border border-black/[0.08] text-[#1d1d1f] text-xs font-semibold flex items-center justify-center shrink-0 mt-0.5">
                      {step.num}
                    </div>
                    <div className="flex-1 min-w-0 space-y-1">
                      <p className="font-semibold text-sm text-[#1d1d1f]">
                        {step.title}
                      </p>
                      <p className="text-xs sm:text-sm text-[#6e6e73] leading-relaxed">
                        {step.body}
                      </p>
                      {step.linkUrl && (
                        <div className="pt-0.5">
                          <a
                            href={step.linkUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs font-semibold text-[#34a853] hover:underline"
                          >
                            <span>{step.linkText}</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      )}
                      {step.badge && (
                        <span className="inline-block text-[11px] font-medium text-[#2d9148] bg-[#34a853]/8 px-2 py-0.5 rounded-md mt-1">
                          {step.badge}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Area (Sequential 1-2-3 Flow) */}
              <div className="p-6 sm:p-8 pt-0 space-y-2.5">
                <a
                  href={BETA_LINK_ANDROID_GROUP}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full min-h-[48px] flex items-center justify-center gap-2 py-3 px-5 rounded-xl text-white font-semibold text-sm sm:text-base bg-[#34a853] hover:bg-[#2d9148] active:scale-[0.98] transition-all shadow-[0_4px_16px_rgba(52,168,83,0.25)]"
                  id="beta-link-android-group"
                >
                  <span>1. Join Testers Group (Required)</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>

                <a
                  href={PLAY_STORE_WEB_OPTIN}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full min-h-[46px] flex items-center justify-center gap-2 py-2.5 px-5 rounded-xl text-[#1d1d1f] font-semibold text-sm border border-emerald-600/30 bg-emerald-500/[0.06] hover:bg-emerald-500/[0.12] active:scale-[0.98] transition-all"
                  id="beta-link-android-optin"
                >
                  <ShieldCheck className="w-4 h-4 text-[#34a853]" />
                  <span>2. Accept Invite & Opt In (Web)</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#34a853]" />
                </a>

                <a
                  href={PLAY_STORE_WEB_OPTIN}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full min-h-[46px] flex items-center justify-center gap-2 py-2.5 px-5 rounded-xl text-[#1d1d1f] font-semibold text-sm border border-black/[0.12] hover:border-[#34a853] hover:bg-[#34a853]/5 active:scale-[0.98] transition-all"
                  id="beta-link-play-store"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current text-[#34a853]">
                    <path d="M3.609 1.814L13.792 12 3.61 22.186c-.347-.31-.56-.757-.56-1.258V3.072c0-.501.213-.948.56-1.258zm11.306 11.31l2.427 2.428-11.758 6.784 9.331-9.212zm0-2.248L5.584 1.666l11.758 6.784-2.427 2.426zm1.59 1.59l3.327 1.919c.749.432.749 1.139 0 1.571l-3.327 1.919-2.122-2.122 2.122-2.122z" />
                  </svg>
                  <span>3. Download Closed Testing Build</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <div className="flex items-center justify-between gap-3 pt-1">
                  <button
                    onClick={() => handleCopy(PLAY_STORE_WEB_OPTIN, "optin")}
                    className="flex-1 py-2 px-2.5 rounded-lg border border-black/[0.08] hover:bg-black/[0.03] text-xs font-medium text-[#6e6e73] hover:text-[#1d1d1f] text-center transition-colors flex items-center justify-center gap-1.5"
                  >
                    {copiedLink === "optin" ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied Testing Link</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Testing Link</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => handleCopy(BETA_LINK_ANDROID_GROUP, "android")}
                    className="py-2 px-3 rounded-lg border border-black/[0.08] hover:bg-black/[0.03] text-xs font-medium text-[#6e6e73] hover:text-[#1d1d1f] transition-colors flex items-center justify-center gap-1.5"
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

        {/* ─── Testing Focus Areas ─── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="mb-16"
        >
          <div className="text-center max-w-xl mx-auto mb-8">
            <h3 className="text-xl sm:text-2xl font-display font-semibold tracking-tight text-[#1d1d1f]">
              Core Features to Test
            </h3>
            <p className="text-sm text-[#6e6e73] mt-1.5">
              These are the primary workflows available in the current preview build.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {TESTING_AREAS.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl border border-black/[0.06] p-5 shadow-[0_4px_16px_rgba(0,0,0,0.02)] flex flex-col justify-between hover:border-black/[0.12] transition-colors"
                >
                  <div>
                    <div className={`w-9 h-9 rounded-xl ${item.bg} ${item.color} flex items-center justify-center mb-3.5`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <h4 className="font-semibold text-sm text-[#1d1d1f] mb-1.5">
                      {item.title}
                    </h4>
                    <p className="text-xs text-[#6e6e73] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* ─── Frequently Asked Questions ─── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.6 }}
          className="mb-16"
        >
          <div className="text-center max-w-xl mx-auto mb-8">
            <h3 className="text-xl sm:text-2xl font-display font-semibold tracking-tight text-[#1d1d1f]">
              Frequently Asked Questions
            </h3>
          </div>

          <div className="max-w-2xl mx-auto space-y-2.5">
            {FAQ_ITEMS.map((item, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="border border-black/[0.06] rounded-xl overflow-hidden bg-white/80 transition-colors"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full text-left p-4 sm:p-4.5 flex items-center justify-between gap-4 font-semibold text-sm text-[#1d1d1f] hover:text-[#0071e3] transition-colors"
                    aria-expanded={isOpen}
                  >
                    <span>{item.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#86868b] shrink-0 transition-transform duration-200 ${
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
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 sm:px-4.5 pb-4 pt-1 text-xs sm:text-sm text-[#6e6e73] leading-relaxed border-t border-black/[0.04]">
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
          transition={{ delay: 0.35, duration: 0.6 }}
          className="text-center space-y-4 pt-4 border-t border-black/[0.06]"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-3 bg-white border border-black/[0.08] rounded-2xl px-5 py-3 shadow-[0_2px_8px_rgba(0,0,0,0.03)]">
            <span className="text-xs text-[#6e6e73] font-medium flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-[#0071e3]" />
              Dedicated Beta Feedback:
            </span>
            <div className="flex items-center gap-2">
              <a
                href={`mailto:${SUPPORT_EMAIL}?subject=AccessBelt%20Beta%20Feedback`}
                className="text-xs sm:text-sm text-[#0071e3] hover:underline font-semibold"
              >
                {SUPPORT_EMAIL}
              </a>
              <button
                onClick={() => handleCopy(SUPPORT_EMAIL, "email")}
                className="p-1 rounded-md hover:bg-black/[0.05] text-[#86868b] hover:text-[#1d1d1f] transition-colors"
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

          <p className="text-xs text-[#86868b] space-x-3">
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


