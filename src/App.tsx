import { lazy, Suspense } from "react";
import { Routes, Route, Link } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ScrollToTop from "./components/ScrollToTop";

const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const DmcaPolicy = lazy(() => import("./pages/DmcaPolicy"));
const UgcPolicy = lazy(() => import("./pages/UgcPolicy"));
const Cookies = lazy(() => import("./pages/Cookies"));
const NotFound = lazy(() => import("./pages/NotFound"));

export default function App() {
  return (
    <main className="min-h-screen bg-[#f5f5f7] selection:bg-[#0071e3]/20 selection:text-[#0071e3] relative isolate overflow-hidden">
      <ScrollToTop />
      {/* 3D Background Pattern */}
      <div className="bg-pattern animate-background-drift" />

      {/* Navigation - Clean Responsive Header */}
      <nav className="fixed top-0 w-full z-50 apple-blur border-b border-black/5">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
          {/* Left navigation links */}
          <div className="flex items-center gap-4 md:gap-6">
            <Link to="/terms" className="text-xs md:text-sm font-semibold text-[#1d1d1f] hover:text-[#0071e3] transition-colors">Terms</Link>
            <Link to="/privacy" className="text-xs md:text-sm font-semibold text-[#1d1d1f] hover:text-[#0071e3] transition-colors">Privacy</Link>
          </div>

          {/* Center - Standalone Logo */}
          <Link to="/" className="flex justify-center group cursor-pointer">
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden bg-white shadow-sm flex items-center justify-center transition-transform group-hover:scale-105 border border-black/5">
              <img src="/logo.png" alt="AccessBelt Logo" className="w-full h-full object-cover scale-[1.08]" />
            </div>
          </Link>

          {/* Right - Call to Action */}
          <div className="flex justify-end items-center">
            <Link to="/#waitlist" className="btn-floating px-4 py-2 md:px-5 md:py-2 !rounded-full !text-xs md:!text-sm !font-semibold">Join Now</Link>
          </div>
        </div>
      </nav>

      {/* Page Routing */}
      <div className="relative z-10 pt-20">
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<LandingPage />} />

            {/* Terms of Service & Aliases */}
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/terms/*" element={<TermsOfService />} />
            <Route path="/Terms" element={<TermsOfService />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/terms-of-service/*" element={<TermsOfService />} />
            <Route path="/terms-of-use" element={<TermsOfService />} />
            <Route path="/terms-of-use/*" element={<TermsOfService />} />
            <Route path="/tos" element={<TermsOfService />} />
            <Route path="/tos/*" element={<TermsOfService />} />
            <Route path="/legal" element={<TermsOfService />} />
            <Route path="/legal/*" element={<TermsOfService />} />
            <Route path="/disclaimer" element={<TermsOfService />} />
            <Route path="/terms.html" element={<TermsOfService />} />

            {/* DMCA Copyright Takedown Policy */}
            <Route path="/dmca" element={<DmcaPolicy />} />
            <Route path="/dmca/*" element={<DmcaPolicy />} />
            <Route path="/dmca-takedown" element={<DmcaPolicy />} />
            <Route path="/copyright" element={<DmcaPolicy />} />

            {/* UGC Content Moderation Policy */}
            <Route path="/ugc" element={<UgcPolicy />} />
            <Route path="/ugc/*" element={<UgcPolicy />} />
            <Route path="/ugc-policy" element={<UgcPolicy />} />
            <Route path="/community-guidelines" element={<UgcPolicy />} />

            {/* Privacy Policy & Aliases */}
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/privacy/*" element={<PrivacyPolicy />} />
            <Route path="/Privacy" element={<PrivacyPolicy />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/privacy-policy/*" element={<PrivacyPolicy />} />
            <Route path="/privacy-notice" element={<PrivacyPolicy />} />
            <Route path="/privacy.html" element={<PrivacyPolicy />} />

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
                  <img src="/logo.png" alt="AccessBelt Logo" className="w-full h-full object-cover scale-[1.08]" />
                </Link>
              </div>
              <p className="text-[#86868b] font-medium text-lg leading-relaxed">
                Bridging the gap between rural communities and essential food resources through technology and compassion.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <p className="text-xs font-bold text-[#1d1d1f] uppercase tracking-widest">Legal & Governance</p>
              <ul className="space-y-3 text-sm text-[#86868b] font-medium">
                <li><Link to="/terms" className="hover:text-[#0071e3] transition-colors">Terms of Service</Link></li>
                <li><Link to="/privacy" className="hover:text-[#0071e3] transition-colors">Privacy Policy</Link></li>
                <li><Link to="/dmca" className="hover:text-[#0071e3] transition-colors">DMCA Copyright Policy</Link></li>
                <li><Link to="/ugc" className="hover:text-[#0071e3] transition-colors">UGC & Moderation Policy</Link></li>
                <li><Link to="/cookies" className="hover:text-[#0071e3] transition-colors">Cookies Policy</Link></li>
              </ul>
            </div>

            <div className="flex flex-col gap-4">
              <p className="text-xs font-bold text-[#1d1d1f] uppercase tracking-widest">Contact Information</p>
              <ul className="space-y-3 text-sm text-[#86868b] font-medium">
                <li>
                  <a
                    href="mailto:getaccessbelt@gmail.com"
                    className="hover:text-[#0071e3] transition-colors"
                  >
                    getaccessbelt@gmail.com
                  </a>
                </li>
                <li className="text-xs text-[#86868b]">
                  Official Contact
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs font-medium text-[#86868b]">© 2026 AccessBelt. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
