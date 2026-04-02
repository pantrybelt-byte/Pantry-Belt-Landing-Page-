import Hero from "./components/Hero";
import ValueProps from "./components/ValueProps";
import BrandStory from "./components/BrandStory";
import WaitlistForm from "./components/WaitlistForm";

export default function App() {
  return (
    <main className="min-h-screen bg-burgundy-900 selection:bg-gold-500/20 selection:text-gold-500">
      {/* Navigation - Refined Apple-like Header */}
      <nav className="fixed top-0 w-full z-50 apple-blur border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-7 h-7 bg-gold-500 rounded-lg flex items-center justify-center transition-transform group-hover:scale-105">
              <div className="w-3 h-3 bg-burgundy-900 rounded-full" />
            </div>
            <span className="font-display font-semibold tracking-tight text-xl text-cream-500">Pantry Belt</span>
          </div>
          <div className="hidden md:flex items-center gap-10 text-[11px] font-bold text-cream-500/60 uppercase tracking-[0.15em]">
            <a href="#" className="hover:text-gold-500 transition-colors">Mission</a>
            <a href="#" className="hover:text-gold-500 transition-colors">Impact</a>
            <a href="#" className="hover:text-gold-500 transition-colors">Stories</a>
            <a href="#waitlist" className="px-5 py-2 bg-gold-500 text-burgundy-900 rounded-[18px] hover:bg-gold-400 transition-all active:scale-95 shadow-lg shadow-gold-500/20 font-semibold">Join Now</a>
          </div>
        </div>
      </nav>

      <Hero />
      <ValueProps />
      <BrandStory />
      <WaitlistForm />

      <footer className="py-20 px-6 bg-burgundy-800 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
            <div className="space-y-4 max-w-sm">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gold-500 rounded flex items-center justify-center">
                  <div className="w-2 h-2 bg-burgundy-900 rounded-full" />
                </div>
                <span className="font-display font-bold text-xl text-cream-500">Pantry Belt</span>
              </div>
              <p className="text-cream-500/60 font-medium">
                Bridging the gap between rural communities and essential food resources through technology and compassion.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-12">
              <div className="space-y-4">
                <p className="text-xs font-bold text-cream-500/40 uppercase tracking-widest">Product</p>
                <ul className="space-y-2 text-sm text-cream-500/60 font-medium">
                  <li><a href="#" className="hover:text-gold-500 transition-colors">Features</a></li>
                  <li><a href="#" className="hover:text-gold-500 transition-colors">Waitlist</a></li>
                  <li><a href="#" className="hover:text-gold-500 transition-colors">Roadmap</a></li>
                </ul>
              </div>
              <div className="space-y-4">
                <p className="text-xs font-bold text-cream-500/40 uppercase tracking-widest">Company</p>
                <ul className="space-y-2 text-sm text-cream-500/60 font-medium">
                  <li><a href="#" className="hover:text-gold-500 transition-colors">About Us</a></li>
                  <li><a href="#" className="hover:text-gold-500 transition-colors">Careers</a></li>
                  <li><a href="#" className="hover:text-gold-500 transition-colors">Press</a></li>
                </ul>
              </div>
              <div className="space-y-4">
                <p className="text-xs font-bold text-cream-500/40 uppercase tracking-widest">Legal</p>
                <ul className="space-y-2 text-sm text-cream-500/60 font-medium">
                  <li><a href="/privacy-policy" className="hover:text-gold-500 transition-colors">Privacy Policy</a></li>
                  <li><a href="/terms-of-service" className="hover:text-gold-500 transition-colors">Terms of Service</a></li>
                  <li><a href="#" className="hover:text-gold-500 transition-colors">Cookies</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs font-medium text-cream-500/40">© 2026 Pantry Belt. All rights reserved.</p>
            <div className="flex gap-6 text-xs font-medium text-cream-500/60">
              <a href="#" className="hover:text-gold-500 transition-colors">Twitter</a>
              <a href="#" className="hover:text-gold-500 transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-gold-500 transition-colors">Instagram</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
