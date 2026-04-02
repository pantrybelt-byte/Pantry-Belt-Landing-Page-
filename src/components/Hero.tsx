import { motion } from "motion/react";
import { ChevronRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-burgundy-900 text-cream-500 pt-20">
      {/* Subtle Background Element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full opacity-30 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-gold-500/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[10%] right-[-10%] w-[40%] h-[40%] bg-burgundy-700 blur-[120px] rounded-full" />
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
        className="relative z-10 text-center max-w-5xl px-6"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mb-6"
        >
          <h2>Pantry Belt</h2>
        </motion.div>
        
        <h1 className="mb-8 tracking-tight font-semibold text-cream-500">
          Be a part of the change. <br />
          <span className="text-cream-500/50">Join the pantry pioneers.</span>
        </h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-xl md:text-2xl text-cream-500/80 mb-12 max-w-2xl mx-auto font-medium"
        >
          Connecting rural communities with local food resources. <br className="hidden md:block" />
          Simple, essential, and life-changing.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <a href="#waitlist" className="btn-primary">
            Reserve My Spot
          </a>
          <button className="btn-secondary group">
            Learn how it works
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </motion.div>

      {/* Hero Image / Abstract Element */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
        className="mt-20 w-full max-w-6xl px-6"
      >
        <div className="relative aspect-[21/9] rounded-[32px] overflow-hidden shadow-2xl border border-white/20 bg-gray-200">
          <img 
            src="https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=2000&auto=format&fit=crop" 
            alt="Community Volunteers Stocking Pantry" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          <div className="absolute bottom-8 left-8 text-white">
            <p className="text-sm font-medium opacity-80">Supporting Rural Communities</p>
            <p className="text-xs opacity-60">Est. 2026</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
