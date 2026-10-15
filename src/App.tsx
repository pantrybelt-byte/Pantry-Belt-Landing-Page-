import { lazy, Suspense } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ScrollToTop from "./components/ScrollToTop";
import SiteNav from "./components/SiteNav";
import { getOperatorPortalUrl } from "./lib/portalUrl";

const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const DmcaPolicy = lazy(() => import("./pages/DmcaPolicy"));
const UgcPolicy = lazy(() => import("./pages/UgcPolicy"));
const Cookies = lazy(() => import("./pages/Cookies"));
const BetaTesting = lazy(() => import("./pages/BetaTesting"));
const NotFound = lazy(() => import("./pages/NotFound"));

export default function App() {
  const location = useLocation();
  const isBetaPage =
    location.pathname.startsWith("/beta") ||
    location.pathname === "/become-tester";

  return (
    <main className="min-h-screen bg-[#f6f3ee] selection:bg-[#b52525]/20 selection:text-[#b52525] relative isolate overflow-hidden">
      <ScrollToTop />
      {/* Food-doodle background (seamless vector tile) */}
      <div className="bg-pattern animate-background-drift" />

      <SiteNav isBetaPage={isBetaPage} />

      {/* Page Routing */}
      <div className="relative z-10 pt-20">
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<LandingPage />} />

            {/* Beta Testing */}
            <Route path="/beta" element={<BetaTesting />} />
            <Route path="/beta-testing" element={<BetaTesting />} />
            <Route path="/become-tester" element={<BetaTesting />} />

            {/* Terms of Service & Aliases */}
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/tos" element={<TermsOfService />} />
            <Route path="/legal" element={<TermsOfService />} />

            {/* Privacy Policy & Aliases */}
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/privacy-notice" element={<PrivacyPolicy />} />

            {/* DMCA Copyright Takedown Policy */}
            <Route path="/dmca" element={<DmcaPolicy />} />
            <Route path="/dmca-takedown" element={<DmcaPolicy />} />
            <Route path="/copyright" element={<DmcaPolicy />} />

            {/* UGC Content Moderation Policy */}
            <Route path="/ugc" element={<UgcPolicy />} />
            <Route path="/ugc-policy" element={<UgcPolicy />} />
            <Route path="/community-guidelines" element={<UgcPolicy />} />

            {/* Cookies & Fallback */}
            <Route path="/cookies" element={<Cookies />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </div>

      <footer className="py-20 px-6 bg-[#f6f3ee] relative z-10 border-t border-black/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
            <div className="space-y-6 max-w-sm">
              <div className="flex items-center">
                <Link to="/" aria-label="AccessBelt Home" className="w-28 h-28 rounded-full overflow-hidden bg-white border border-black/5 shrink-0 flex items-center justify-center hover:scale-105 transition-transform">
                  <img src="/img/logo-256.webp" alt="" width={112} height={112} loading="lazy" className="w-full h-full object-cover scale-[1.08]" />
                </Link>
              </div>
              <p className="text-[#555558] font-medium text-base leading-relaxed">
                Bridging the gap between rural communities and essential food resources through technology and compassion.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <p className="text-xs font-bold text-[#1d1d1f] uppercase tracking-widest">Pantry Partners</p>
              <ul className="space-y-3 text-sm text-[#555558] font-medium">
                <li>
                  <a
                    href={getOperatorPortalUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#b52525] transition-colors font-semibold text-[#1d1d1f] flex items-center gap-1.5"
                  >
                    Operator Portal →
                  </a>
                </li>
                <li><Link to="/beta" className="hover:text-[#b52525] transition-colors">Android Closed Beta</Link></li>
                <li><a href="mailto:admin@accessbelt.com" className="hover:text-[#b52525] transition-colors">Partner Verification</a></li>
              </ul>
            </div>

            <div className="flex flex-col gap-4">
              <p className="text-xs font-bold text-[#1d1d1f] uppercase tracking-widest">Legal & Governance</p>
              <ul className="space-y-3 text-sm text-[#555558] font-medium">
                <li><Link to="/terms" className="hover:text-[#b52525] transition-colors">Terms of Service</Link></li>
                <li><Link to="/privacy" className="hover:text-[#b52525] transition-colors">Privacy Policy</Link></li>
                <li><Link to="/dmca" className="hover:text-[#b52525] transition-colors">DMCA Copyright Policy</Link></li>
                <li><Link to="/ugc" className="hover:text-[#b52525] transition-colors">UGC & Moderation Policy</Link></li>
                <li><Link to="/cookies" className="hover:text-[#b52525] transition-colors">Cookies Policy</Link></li>
              </ul>
            </div>

            <div className="flex flex-col gap-4">
              <p className="text-xs font-bold text-[#1d1d1f] uppercase tracking-widest">Contact Information</p>
              <ul className="space-y-3 text-sm text-[#555558] font-medium">
                <li>
                  <a
                    href="mailto:getaccessbelt@gmail.com"
                    className="hover:text-[#b52525] transition-colors font-semibold text-[#1d1d1f]"
                  >
                    getaccessbelt@gmail.com
                  </a>
                </li>
                <li className="text-xs text-[#555558]">
                  Montgomery, Alabama
                </li>
                <li className="text-xs text-[#555558]">
                  Serving Alabama's Black Belt Region
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-black/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs text-[#555558]">
            <p className="font-medium">© 2026 AccessBelt. All rights reserved.</p>
            <p className="max-w-2xl text-[#555558]/80 leading-normal">
              AccessBelt is an independent community technology platform connecting Alabama families to publicly available food assistance programs. AccessBelt is not affiliated with, endorsed by, or operated by any government agency.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
