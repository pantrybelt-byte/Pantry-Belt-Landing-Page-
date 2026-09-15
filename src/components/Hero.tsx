import { motion } from "motion/react";
import { ChevronRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-transparent text-[#1d1d1f] pt-20">
      {/* Subtle Background Element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full opacity-30 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#0071e3]/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[10%] right-[-10%] w-[40%] h-[40%] bg-black/5 blur-[120px] rounded-full" />
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
          className="mb-10"
        >
          {/* Logo was here, removed text as per request */}
        </motion.div>
        
        <h1 className="mb-8 tracking-tight font-semibold text-gradient-blue">
          Be a part of the change. <br />
          <span className="text-[#86868b]/80">Join the pantry pioneers.</span>
        </h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-xl md:text-2xl text-[#86868b] mb-12 max-w-2xl mx-auto font-medium"
        >
          Connecting rural communities with local food resources. <br className="hidden md:block" />
          Simple, essential, and life-changing.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex flex-col items-center justify-center gap-4"
        >
          <a href="#waitlist" className="btn-floating px-10 py-5 !rounded-full text-lg !font-bold">
            Reserve My Spot
          </a>
          <p className="text-xs md:text-sm font-medium text-[#555558] flex items-center gap-2 tracking-wide">
            <span>100% Free</span>
            <span>·</span>
            <span>No Account Required</span>
            <span>·</span>
            <span>Alabama's Black Belt</span>
          </p>
        </motion.div>
      </motion.div>

      {/* Hero Image / Abstract Element */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        className="mt-16 w-full max-w-6xl px-6"
      >
        <div className="relative aspect-[16/9] rounded-[32px] overflow-hidden shadow-3d border border-black/5 bg-white">
          <img
            src="/pioneers-hero.png"
            alt="The Pantry Pioneers - Founders Matthew Clarke and Thaddeus Sneed presenting Access Belt"
            className="w-full h-full object-cover"
            loading="eager"
            fetchPriority="high"
          />
        </div>
      </motion.div>
    </section>
  );
}
