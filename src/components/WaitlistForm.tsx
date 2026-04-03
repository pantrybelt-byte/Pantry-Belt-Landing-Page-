import React, { useState } from "react";
import { motion } from "motion/react";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../lib/firebase";

export default function WaitlistForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [error, setError] = useState<string | null>(null);
  
  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [consent, setConsent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Front-end Validation Logic
    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    const phoneRegex = /^\+[1-9]\d{1,14}$/;
    if (!phoneRegex.test(phone)) {
      setError("Please enter a valid phone number in E.164 format (e.g. +14155552671).");
      return;
    }

    if (!consent) {
      setError("You must agree to receive SMS updates to proceed.");
      return;
    }

    setStatus('submitting');
    
    try {
      await addDoc(collection(db, 'waitlist'), {
        name: name.trim(),
        email: email.trim(),
        phone_sms: phone.trim(),
        sms_consent: consent,
        created_at: serverTimestamp()
      });
      
      setStatus('success');
    } catch (err: any) {
      console.error("Firebase Error:", err);
      setError(err.message || 'Something went wrong connecting to the database.');
      setStatus('idle');
    }
  };

  if (status === 'success') {
    return (
      <section id="waitlist" className="section-padding bg-white text-center">
        <motion.div 
          initial={{ scale: 0.95, opacity: 0, filter: "blur(10px)" }}
          animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-md mx-auto p-16 rounded-[var(--radius-apple)] bg-white border border-black/5 shadow-[0_30px_60px_rgba(0,0,0,0.12)]"
        >
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 20 }}
            className="w-24 h-24 bg-[#0071e3]/10 rounded-full flex items-center justify-center mx-auto mb-8"
          >
            <CheckCircle2 className="w-12 h-12 text-[#0071e3]" />
          </motion.div>
          <h3 className="text-4xl font-display font-semibold text-[#1d1d1f] mb-4">You're on the list.</h3>
          <p className="text-[#86868b] text-lg font-medium leading-relaxed">
            Thank you for your interest. We will notify you as soon as Pantry Belt is ready for your community.
          </p>
        </motion.div>
      </section>
    );
  }

  return (
    <section id="waitlist" className="section-padding bg-white relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-[#0071e3]/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="mb-4">Ready to pioneer?</h2>
          <h3 className="text-5xl md:text-6xl font-display font-semibold text-[#1d1d1f] tracking-tight mb-6">
            Reserve Your Spot
          </h3>
          <p className="text-[#86868b] text-xl font-medium max-w-2xl mx-auto">
            Be the first to know when we launch in your area. Connect with essential food resources through technology.
          </p>
        </div>

        <motion.form 
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl mx-auto space-y-6 md:space-y-8 bg-white shadow-3d rounded-[var(--radius-apple)] border border-black/5 p-8 md:p-16"
        >
          {error && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl flex items-center gap-3 text-sm font-medium"
            >
              <AlertCircle className="w-5 h-5 shrink-0" />
              {error}
            </motion.div>
          )}

          <div className="space-y-3">
            <label className="text-xs font-bold text-[#86868b] uppercase tracking-widest ml-1">Full Name</label>
            <input 
              required
              type="text" 
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-6 py-4 rounded-[14px] bg-[#f5f5f7] border border-black/5 text-[#1d1d1f] focus:outline-none focus:ring-2 focus:ring-[#0071e3]/50 focus:border-[#0071e3] transition-all text-base font-medium placeholder:text-[#86868b]/70"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div className="space-y-3">
              <label className="text-xs font-bold text-[#86868b] uppercase tracking-widest ml-1">Email Address</label>
              <input 
                required
                type="email" 
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-6 py-4 rounded-[14px] bg-[#f5f5f7] border border-black/5 text-[#1d1d1f] focus:outline-none focus:ring-2 focus:ring-[#0071e3]/50 focus:border-[#0071e3] transition-all text-base font-medium placeholder:text-[#86868b]/70"
              />
            </div>
            <div className="space-y-3">
              <label className="text-xs font-bold text-[#86868b] uppercase tracking-widest ml-1">Phone Number</label>
              <input 
                required
                type="tel" 
                placeholder="+14155552671"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-6 py-4 rounded-[14px] bg-[#f5f5f7] border border-black/5 text-[#1d1d1f] focus:outline-none focus:ring-2 focus:ring-[#0071e3]/50 focus:border-[#0071e3] transition-all text-base font-medium placeholder:text-[#86868b]/70"
              />
            </div>
          </div>

          <label className="flex items-start gap-4 p-4 rounded-xl bg-[#f5f5f7] border border-black/5 cursor-pointer hover:bg-black/5 transition-colors">
            <div className="mt-1">
              <input 
                type="checkbox" 
                required
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="w-5 h-5 rounded-[6px] border-black/20 bg-white text-[#0071e3] focus:ring-[#0071e3]/50"
              />
            </div>
            <span className="text-xs leading-relaxed text-[#86868b] font-medium">
              By checking this box, you consent to receive recurring marketing text messages (e.g., updates, waitlist status) from Pantry Belt at the number provided. Consent is not a condition of obtaining any service. Reply STOP to cancel. Msg & data rates may apply.
            </span>
          </label>

          <button 
            disabled={status === 'submitting'}
            className="btn-floating w-full shadow-[#0071e3]/30 group disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
          >
            {status === 'submitting' ? 'Processing...' : 'Reserve My Spot'}
            <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform ml-2" />
          </button>
          
          <p className="text-xs text-[#86868b]/80 text-center font-medium">
            We respect your privacy and will never share your personal data.
          </p>
        </motion.form>
      </div>
    </section>
  );
}
