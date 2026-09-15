import { lazy, Suspense } from "react";
import { Routes, Route, Link } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ScrollToTop from "./components/ScrollToTop";

const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const Cookies = lazy(() => import("./pages/Cookies"));
const NotFound = lazy(() => import("./pages/NotFound"));

export default function App() {
  return (
    <main className="min-h-screen bg-[#f5f5f7] selection:bg-[#0071e3]/20 selection:text-[#0071e3] relative isolate overflow-hidden">
      <ScrollToTop />
      {/* 3D Background Pattern */}
      <div className="bg-pattern animate-background-drift" />

      {/* Navigation - Refined Apple-like Header */}
      <nav className="fixed top-0 w-full z-50 apple-blur border-b border-black/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          {/* Left - Standalone Logo */}
          <Link to="/" className="flex items-center group cursor-pointer" aria-label="Access Belt Home">
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden bg-white shadow-sm flex items-center justify-center transition-transform group-hover:scale-105 border border-black/5">
              <img src="/logo.png" alt="Access Belt Logo" className="w-full h-full object-cover scale-[1.08]" />
            </div>
            <span className="ml-3 font-display font-semibold text-lg text-[#1d1d1f] hidden sm:inline-block tracking-tight">
              Access Belt
            </span>
          </Link>

          {/* Center - Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <a href="/#how-it-works" className="text-sm font-medium text-[#555558] hover:text-[#0071e3] transition-colors">
              How It Works
            </a>
            <a href="/#story" className="text-sm font-medium text-[#555558] hover:text-[#0071e3] transition-colors">
              Our Story
            </a>
            <a href="/#impact" className="text-sm font-medium text-[#555558] hover:text-[#0071e3] transition-colors">
              Impact
            </a>
          </div>

          {/* Right - Call to Action */}
          <div className="flex items-center">
            <a href="/#waitlist" className="btn-floating px-5 py-2 !rounded-full !text-sm !font-semibold">
              Join Now
            </a>
          </div>
        </div>
      </nav>

      {/* Page Routing */}
      <div className="relative z-10 pt-20">
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/cookies" element={<Cookies />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </div>

      <footer className="py-20 px-6 bg-[#f5f5f7] relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
            <div className="space-y-6 max-w-sm">
              <div className="flex items-center">
                <Link to="/" className="w-32 h-32 rounded-full overflow-hidden bg-[#f5f5f7] border border-black/5 shrink-0 flex items-center justify-center -ml-4 hover:scale-105 transition-transform">
                  <img src="/logo.png" alt="Access Belt Logo" className="w-full h-full object-cover scale-[1.08]" />
                </Link>
              </div>
              <p className="text-[#86868b] font-medium text-lg leading-relaxed">
                Bridging the gap between rural communities and essential food resources through technology and compassion.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <p className="text-xs font-bold text-[#1d1d1f] uppercase tracking-widest">Legal</p>
              <ul className="space-y-3 text-sm text-[#86868b] font-medium">
                <li><Link to="/privacy-policy" className="hover:text-[#0071e3] transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms-of-service" className="hover:text-[#0071e3] transition-colors">Terms of Service</Link></li>
                <li><Link to="/cookies" className="hover:text-[#0071e3] transition-colors">Cookies</Link></li>
              </ul>
            </div>

            <div className="flex flex-col gap-4">
              <p className="text-xs font-bold text-[#1d1d1f] uppercase tracking-widest">Contact Us</p>
              <ul className="space-y-3 text-sm text-[#86868b] font-medium">
                <li>
                  <a
                    href="mailto:getaccessbelt@gmail.com"
                    className="hover:text-[#0071e3] transition-colors"
                  >
                    getaccessbelt@gmail.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs font-medium text-[#86868b]">© 2026 Access Belt. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
