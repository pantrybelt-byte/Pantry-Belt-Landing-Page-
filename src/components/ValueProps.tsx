import { motion } from "motion/react";
import { Search, Navigation, Bell } from "lucide-react";

const props = [
  {
    id: 1,
    title: "Community Directory",
    description: "Locate listed food pantries across rural areas with interactive mapping and crowd-sourced status updates.",
    icon: Search,
    color: "text-blue-500"
  },
  {
    id: 2,
    title: "Smart Navigation",
    description: "Get optimized directions and direct phone contacts for regional food assistance programs.",
    icon: Navigation,
    color: "text-green-500"
  },
  {
    id: 3,
    title: "Community Updates",
    description: "Receive notifications when local pantries share distribution schedule updates or community alerts.",
    icon: Bell,
    color: "text-orange-500"
  }
];

export default function ValueProps() {
  return (
    <section className="section-padding bg-transparent">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <p className="section-label mb-4">How it works</p>
          <h2 className="text-4xl md:text-5xl font-display font-semibold text-[#1d1d1f] tracking-tight">
            Designed for impact. <br className="md:hidden" /> Built for community.
          </h2>
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
                <prop.icon size={40} strokeWidth={1.5} aria-hidden="true" />
              </div>
              <h3 className="text-2xl font-display font-semibold mb-4 text-[#1d1d1f]">{prop.title}</h3>
              <p className="text-[#6e6e73] text-base leading-relaxed font-medium">
                {prop.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
