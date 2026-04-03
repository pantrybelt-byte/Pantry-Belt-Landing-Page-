import { motion } from "motion/react";

export default function BrandStory() {
  return (
    <section className="section-padding bg-transparent border-t border-black/5 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-[var(--radius-apple)] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.12)] bg-[#f5f5f7] border border-black/5">
              <img 
                src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=1000&auto=format&fit=crop" 
                alt="Fresh Market Fruits and Vegetables" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000 opacity-90"
                referrerPolicy="no-referrer"
                loading="eager"
              />
            </div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="absolute -bottom-10 -right-10 w-56 h-56 bg-white rounded-[32px] shadow-[0_20px_40px_rgba(0,0,0,0.08)] p-10 flex flex-col justify-center border border-black/5"
            >
              <p className="text-4xl font-display font-bold text-[#0071e3] mb-1">100%</p>
              <p className="text-xs font-bold text-[#86868b] uppercase tracking-widest leading-tight">Community <br />Focused</p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-10"
          >
            <div className="space-y-4">
              <h2 className="text-[#86868b]">Our Brand Story</h2>
              <h3 className="text-5xl md:text-6xl font-display font-semibold text-[#1d1d1f] leading-[1.1] tracking-tight">
                Born from a need <br /> to bridge the gap.
              </h3>
            </div>
            
            <div className="space-y-6">
              <p className="text-xl text-[#86868b] leading-relaxed font-medium">
                Pantry Belt started in a small rural town where the nearest food resource was over 30 miles away. We realized that information was just as scarce as the food itself. 
              </p>
              <p className="text-lg text-[#86868b]/80 leading-relaxed">
                Our mission is to ensure that no family in a rural area has to guess where their next meal is coming from. By leveraging modern technology, we bring professional-grade logistics to the heart of our communities.
              </p>
            </div>

            <div className="pt-8 border-t border-black/5">
              <div className="flex items-center gap-5">
                <div className="flex -space-x-4">
                  <div className="w-14 h-14 rounded-full bg-[#f5f5f7] overflow-hidden ring-4 ring-white shadow-sm relative z-10">
                    <img src="https://picsum.photos/seed/matthew/100/100" alt="Matthew Clarke" referrerPolicy="no-referrer" />
                  </div>
                  <div className="w-14 h-14 rounded-full bg-[#f5f5f7] overflow-hidden ring-4 ring-white shadow-sm relative z-0">
                    <img src="https://picsum.photos/seed/thaddaus/100/100" alt="Thaddaus Sneed" referrerPolicy="no-referrer" />
                  </div>
                </div>
                <div>
                  <p className="font-bold text-[#1d1d1f] text-lg">Matthew Clarke & Thaddaus Sneed</p>
                  <p className="text-[#86868b] text-sm font-medium uppercase tracking-wider">Founders, Pantry Belt</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
