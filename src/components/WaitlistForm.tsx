import React, { useState } from "react";
import { motion } from "motion/react";
import { Send, CheckCircle2 } from "lucide-react";

export default function WaitlistForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    // Simulate API call
    setTimeout(() => setStatus('success'), 1500);
  };

  if (status === 'success') {
    return (
      <section id="waitlist" className="section-padding bg-white text-center">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-md mx-auto p-16 rounded-[48px] bg-[#f5f5f7] border border-gray-100 shadow-sm"
        >
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg shadow-green-200">
            <CheckCircle2 className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-3xl font-display font-semibold text-[#1d1d1f] mb-4">You're on the list!</h3>
          <p className="text-[#86868b] font-medium">We'll notify you as soon as Pantry Belt is ready for your community.</p>
        </motion.div>
      </section>
    );
  }

  return (
    <section id="waitlist" className="section-padding bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="mb-4">Join the Waitlist</h2>
          <h3 className="text-5xl md:text-6xl font-display font-semibold text-[#1d1d1f] tracking-tight mb-6">
            Ready to become <br className="hidden md:block" /> a pioneer?
          </h3>
          <p className="text-[#86868b] text-xl font-medium">Be the first to know when we launch in your area.</p>
        </div>

        <motion.form 
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto space-y-8 bg-[#f5f5f7] p-12 md:p-16 rounded-[48px] border border-gray-100"
        >
          <div className="space-y-3">
            <label className="text-xs font-bold text-apple-gray uppercase tracking-widest ml-1">Full Name</label>
            <input 
              required
              type="text" 
              placeholder="John Doe"
              className="w-full px-8 py-5 rounded-2xl bg-white border border-transparent focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-base font-medium placeholder:text-gray-300"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-xs font-bold text-apple-gray uppercase tracking-widest ml-1">Email Address</label>
              <input 
                required
                type="email" 
                placeholder="john@example.com"
                className="w-full px-8 py-5 rounded-2xl bg-white border border-transparent focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-base font-medium placeholder:text-gray-300"
              />
            </div>
            <div className="space-y-3">
              <label className="text-xs font-bold text-apple-gray uppercase tracking-widest ml-1">Phone Number</label>
              <input 
                required
                type="tel" 
                placeholder="(555) 000-0000"
                className="w-full px-8 py-5 rounded-2xl bg-white border border-transparent focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-base font-medium placeholder:text-gray-300"
              />
            </div>
          </div>

          <button 
            disabled={status === 'submitting'}
            className="btn-primary w-full py-5 text-lg shadow-xl shadow-blue-200 flex items-center justify-center gap-3 group disabled:opacity-50"
          >
            {status === 'submitting' ? 'Joining...' : 'Join Waitlist'}
            <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>
          
          <p className="text-xs text-apple-gray text-center font-medium">
            By joining, you agree to receive updates about Pantry Belt. <br className="hidden md:block" /> We respect your privacy and will never share your data.
          </p>
        </motion.form>
      </div>
    </section>
  );
}
