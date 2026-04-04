import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="section-padding bg-transparent text-[#1d1d1f] min-h-[80vh] flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-xl mx-auto text-center"
      >
        <h1 className="text-8xl font-display font-bold text-[#0071e3] mb-6">404</h1>
        <h2 className="text-3xl md:text-4xl font-display font-semibold mb-6">Page not found.</h2>
        <p className="text-[#86868b] text-lg font-medium leading-relaxed mb-10">
          The page you are looking for doesn't exist, has been moved, or is temporarily unavailable. Let's get you back on track.
        </p>
        <Link to="/" className="btn-floating inline-flex items-center px-8 py-4 !rounded-full text-base !font-semibold">
          <ArrowLeft className="w-5 h-5 mr-3" />
          Back to Home
        </Link>
      </motion.div>
    </section>
  );
}
