import Hero from "./components/Hero";
import ValueProps from "./components/ValueProps";
import BrandStory from "./components/BrandStory";
import WaitlistForm from "./components/WaitlistForm";

export default function App() {
  return (
    <main className="min-h-screen bg-white selection:bg-[#0071e3]/20 selection:text-[#0071e3]">
      {/* Navigation - Refined Apple-like Header */}
      <nav className="fixed top-0 w-full z-50 apple-blur border-b border-black/5">
        <div className="max-w-7xl mx-auto px-6 h-20 grid grid-cols-3 items-center">
          {/* Left spacer for perfect centering */}
          <div className="flex justify-start"></div>

          {/* Center - Standalone Logo */}
          <div className="flex justify-center group cursor-pointer">
            <div className="w-14 h-14 rounded-full overflow-hidden bg-white shadow-sm flex items-center justify-center transition-transform group-hover:scale-105 border border-black/5">
              <img src="/logo.png" alt="Pantry Belt" className="w-full h-full object-cover scale-[1.08]" />
            </div>
          </div>

          {/* Right - Call to Action */}
          <div className="flex justify-end items-center">
            <a href="#waitlist" className="btn-floating px-5 py-2 !rounded-full !text-sm !font-semibold">Join Now</a>
          </div>
        </div>
      </nav>

      <Hero />
      <ValueProps />
      <BrandStory />
      <WaitlistForm />

      <footer className="py-20 px-6 bg-[#f5f5f7] border-t border-black/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
            <div className="space-y-4 max-w-sm">
              <div className="flex items-center">
                <div className="w-14 h-14 rounded-full overflow-hidden bg-[#f5f5f7] border border-black/5 shrink-0 flex items-center justify-center">
                  <img src="/logo.png" alt="Pantry Belt Logo" className="w-full h-full object-cover scale-[1.08]" />
                </div>
              </div>
              <p className="text-[#86868b] font-medium">
                Bridging the gap between rural communities and essential food resources through technology and compassion.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-12">
              <div className="space-y-4">
                <p className="text-xs font-bold text-[#1d1d1f] uppercase tracking-widest">Product</p>
                <ul className="space-y-2 text-sm text-[#86868b] font-medium">
                  <li><a href="#" className="hover:text-[#0071e3] transition-colors">Features</a></li>
                  <li><a href="#" className="hover:text-[#0071e3] transition-colors">Waitlist</a></li>
                  <li><a href="#" className="hover:text-[#0071e3] transition-colors">Roadmap</a></li>
                </ul>
              </div>
              <div className="space-y-4">
                <p className="text-xs font-bold text-[#1d1d1f] uppercase tracking-widest">Company</p>
                <ul className="space-y-2 text-sm text-[#86868b] font-medium">
                  <li><a href="#" className="hover:text-[#0071e3] transition-colors">About Us</a></li>
                  <li><a href="#" className="hover:text-[#0071e3] transition-colors">Careers</a></li>
                  <li><a href="#" className="hover:text-[#0071e3] transition-colors">Press</a></li>
                </ul>
              </div>
              <div className="space-y-4">
                <p className="text-xs font-bold text-[#1d1d1f] uppercase tracking-widest">Legal</p>
                <ul className="space-y-2 text-sm text-[#86868b] font-medium">
                  <li><a href="/privacy-policy" className="hover:text-[#0071e3] transition-colors">Privacy Policy</a></li>
                  <li><a href="/terms-of-service" className="hover:text-[#0071e3] transition-colors">Terms of Service</a></li>
                  <li><a href="#" className="hover:text-[#0071e3] transition-colors">Cookies</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs font-medium text-[#86868b]">© 2026 Pantry Belt. All rights reserved.</p>
            <div className="flex gap-6 text-xs font-medium text-[#86868b]">
              <a href="#" className="hover:text-[#1d1d1f] transition-colors">Twitter</a>
              <a href="#" className="hover:text-[#1d1d1f] transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-[#1d1d1f] transition-colors">Instagram</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
