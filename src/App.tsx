import Hero from "./components/Hero";
import ValueProps from "./components/ValueProps";
import BrandStory from "./components/BrandStory";
import WaitlistForm from "./components/WaitlistForm";

export default function App() {
  return (
    <main className="min-h-screen bg-white selection:bg-blue-100 selection:text-blue-900">
      {/* Navigation - Refined Apple-like Header */}
      <nav className="fixed top-0 w-full z-50 apple-blur border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-7 h-7 bg-[#1d1d1f] rounded-lg flex items-center justify-center transition-transform group-hover:scale-105">
              <div className="w-3 h-3 bg-white rounded-full" />
            </div>
            <span className="font-display font-semibold tracking-tight text-xl text-[#1d1d1f]">Pantry Belt</span>
          </div>
          <div className="hidden md:flex items-center gap-10 text-[11px] font-bold text-[#86868b] uppercase tracking-[0.15em]">
            <a href="#" className="hover:text-[#1d1d1f] transition-colors">Mission</a>
            <a href="#" className="hover:text-[#1d1d1f] transition-colors">Impact</a>
            <a href="#" className="hover:text-[#1d1d1f] transition-colors">Stories</a>
            <a href="#waitlist" className="px-5 py-2 bg-[#1d1d1f] text-white rounded-full hover:bg-black transition-all active:scale-95 shadow-lg shadow-gray-200">Join Now</a>
          </div>
        </div>
      </nav>

      <Hero />
      <ValueProps />
      <BrandStory />
      <WaitlistForm />

      <footer className="py-20 px-6 bg-[#f5f5f7] border-t border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
            <div className="space-y-4 max-w-sm">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-black rounded flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full" />
                </div>
                <span className="font-display font-bold text-xl">Pantry Belt</span>
              </div>
              <p className="text-[#86868b] font-medium">
                Bridging the gap between rural communities and essential food resources through technology and compassion.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-12">
              <div className="space-y-4">
                <p className="text-xs font-bold text-[#1d1d1f] uppercase tracking-widest">Product</p>
                <ul className="space-y-2 text-sm text-[#86868b] font-medium">
                  <li><a href="#" className="hover:text-black">Features</a></li>
                  <li><a href="#" className="hover:text-black">Waitlist</a></li>
                  <li><a href="#" className="hover:text-black">Roadmap</a></li>
                </ul>
              </div>
              <div className="space-y-4">
                <p className="text-xs font-bold text-[#1d1d1f] uppercase tracking-widest">Company</p>
                <ul className="space-y-2 text-sm text-[#86868b] font-medium">
                  <li><a href="#" className="hover:text-black">About Us</a></li>
                  <li><a href="#" className="hover:text-black">Careers</a></li>
                  <li><a href="#" className="hover:text-black">Press</a></li>
                </ul>
              </div>
              <div className="space-y-4">
                <p className="text-xs font-bold text-[#1d1d1f] uppercase tracking-widest">Legal</p>
                <ul className="space-y-2 text-sm text-[#86868b] font-medium">
                  <li><a href="#" className="hover:text-black">Privacy</a></li>
                  <li><a href="#" className="hover:text-black">Terms</a></li>
                  <li><a href="#" className="hover:text-black">Cookies</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs font-medium text-[#86868b]">© 2026 Pantry Belt. All rights reserved.</p>
            <div className="flex gap-6 text-xs font-medium text-[#86868b]">
              <a href="#" className="hover:text-black">Twitter</a>
              <a href="#" className="hover:text-black">LinkedIn</a>
              <a href="#" className="hover:text-black">Instagram</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
