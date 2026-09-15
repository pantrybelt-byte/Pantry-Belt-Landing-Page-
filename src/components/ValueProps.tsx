import { motion } from "motion/react";
import { Search, Navigation, Bell } from "lucide-react";

const props = [
  {
    id: 1,
    title: "Real-time Locating",
    description: "Find active pantries in even the most remote rural areas with our precision mapping technology.",
    icon: Search,
    color: "text-blue-500"
  },
  {
    id: 2,
    title: "Smart Navigation",
    description: "Get optimized routes that consider rural road conditions and pantry operating hours.",
    icon: Navigation,
    color: "text-green-500"
  },
  {
    id: 3,
    title: "Instant Notifications",
    description: "Receive alerts when local pantries receive fresh stock or change their distribution times.",
    icon: Bell,
    color: "text-orange-500"
  }
];

export default function ValueProps() {
  return (
    <section className="section-padding bg-transparent">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="mb-4">How it works</h2>
          <h3 className="text-4xl md:text-5xl font-display font-semibold text-[#1d1d1f] tracking-tight">
            Designed for impact. <br className="md:hidden" /> Built for community.
          </h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 perspective-[1000px]">
          {props.map((prop, index) => (
            <motion.div
              key={prop.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ 
                y: -12,
                rotateX: 4,
                rotateY: -4,
                scale: 1.02,
                transition: { duration: 0.4, ease: "easeOut" }
              }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              className="group p-10 rounded-[var(--radius-apple)] bg-[#f5f5f7] border border-transparent hover:bg-white shadow-3d hover:shadow-[0_40px_80px_rgba(0,0,0,0.1)] transition-all duration-500"
            >
              <div className={`${prop.color} mb-8 transition-transform duration-500 group-hover:scale-110 opacity-80 group-hover:opacity-100`}>
                <prop.icon size={40} strokeWidth={1.5} />
              </div>
              <h4 className="text-2xl font-display font-semibold mb-4 text-[#1d1d1f]">{prop.title}</h4>
              <p className="text-[#86868b] text-base leading-relaxed font-medium">
                {prop.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
