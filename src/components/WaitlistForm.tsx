import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Bell, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

const inputClass =
  "w-full rounded-[14px] border border-black/[0.06] bg-[#f5f5f7] px-5 py-4 text-base font-medium text-[#1d1d1f] transition-all placeholder:text-[#a1a1a6] focus:border-[#b52525] focus:outline-none focus:ring-2 focus:ring-[#b52525]/40";
const labelClass = "ml-1 text-[13px] font-semibold text-[#555558]";

export default function WaitlistForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  // Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [smsOptIn, setSmsOptIn] = useState(false);
  const [phone, setPhone] = useState("");
  const [textingConfirmed, setTextingConfirmed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    // Texts are optional. A phone number is only collected (and stored) together with an opt-in.
    let phoneSms: string | null = null;
    if (smsOptIn) {
      const rawPhone = phone.replace(/\D/g, "");
      if (rawPhone.length !== 10) {
        setError("Please enter a 10-digit US phone number for text updates, or uncheck the text option.");
        return;
      }
      phoneSms = `+1${rawPhone}`;
    }

    setStatus("submitting");

    try {
      // Firebase only loads when someone actually signs up, keeping it off the initial page load.
      const { addWaitlistEntry } = await import("../lib/waitlist");
      await addWaitlistEntry({ name: name.trim(), email: email.trim(), smsConsent: smsOptIn, phoneSms });

      // Send automated welcome email via EmailJS
      try {
        const { sendWaitlistWelcomeEmail } = await import("../lib/email");
        await sendWaitlistWelcomeEmail(name.trim(), email.trim(), smsOptIn);
      } catch (emailErr) {
        console.warn("EmailJS waitlist email dispatch failed (non-blocking):", emailErr);
      }

      setTextingConfirmed(smsOptIn);
      setStatus("success");
      setShowModal(true);
    } catch (err: unknown) {
      console.error("Firestore write failed:", err);
      setError("Something went wrong saving your signup. Please try again in a moment.");
      setStatus("idle");
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setStatus("idle");
    setName("");
    setEmail("");
    setSmsOptIn(false);
    setPhone("");
    setError(null);
  };

  return (
    <>
      <section id="waitlist" className="section-padding bg-transparent relative overflow-hidden">
        <div className="relative z-10 mx-auto max-w-4xl">
          <div className="mb-12 text-center md:mb-14">
            <h2 className="mb-3 md:mb-4">Be the first to know</h2>
            <h3 className="mb-4 font-display text-3xl font-bold tracking-[-0.03em] text-[#1d1d1f] sm:text-4xl md:mb-6 md:text-5xl lg:text-6xl">
              Get notified at launch
            </h3>
            <p className="mx-auto max-w-2xl text-lg font-medium leading-relaxed text-[#555558] md:text-xl">
              We'll let you know the day AccessBelt is ready to download.{" "}
              <span className="whitespace-nowrap">
                Want it sooner?{" "}
                <Link to="/beta" className="font-semibold text-[#b52525] underline-offset-4 hover:underline">
                  Try the beta
                </Link>
                .
              </span>
            </p>
          </div>

          <motion.form
            onSubmit={handleSubmit}
            noValidate
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mx-auto max-w-2xl space-y-6 rounded-[24px] border border-black/5 bg-white p-6 shadow-3d sm:p-10 md:p-12"
          >
            {error && (
              <motion.div
                role="alert"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700"
              >
                <AlertCircle className="h-5 w-5 shrink-0" aria-hidden="true" />
                {error}
              </motion.div>
            )}

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="waitlist-name" className={labelClass}>
                  Name
                </label>
                <input
                  id="waitlist-name"
                  required
                  type="text"
                  autoComplete="name"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={inputClass}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="waitlist-email" className={labelClass}>
                  Email
                </label>
                <input
                  id="waitlist-email"
                  required
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>

            <div className="rounded-2xl border border-black/[0.06] bg-[#f5f5f7]">
              <label htmlFor="waitlist-sms" className="flex cursor-pointer items-center gap-3.5 p-4">
                <input
                  id="waitlist-sms"
                  type="checkbox"
                  checked={smsOptIn}
                  onChange={(e) => setSmsOptIn(e.target.checked)}
                  aria-controls="waitlist-sms-details"
                  aria-expanded={smsOptIn}
                  className="h-5 w-5 shrink-0 rounded-[6px] border-black/20 accent-[#b52525]"
                />
                <span className="text-[15px] font-semibold text-[#1d1d1f]">
                  Also text me launch updates <span className="font-medium text-[#6e6e73]">(optional)</span>
                </span>
              </label>
              <AnimatePresence initial={false}>
                {smsOptIn && (
                  <motion.div
                    id="waitlist-sms-details"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="overflow-hidden"
                  >
                    <div className="space-y-3 px-4 pb-4">
                      <label htmlFor="waitlist-phone" className="sr-only">
                        Mobile number
                      </label>
                      <input
                        id="waitlist-phone"
                        type="tel"
                        autoComplete="tel-national"
                        inputMode="tel"
                        placeholder="(334) 555-0123"
                        value={phone}
                        onChange={(e) => {
                          let val = e.target.value.replace(/\D/g, "");
                          if (val.length > 10) val = val.slice(0, 10);

                          let formatted = val;
                          if (val.length > 6) {
                            formatted = `(${val.slice(0, 3)}) ${val.slice(3, 6)}-${val.slice(6)}`;
                          } else if (val.length > 3) {
                            formatted = `(${val.slice(0, 3)}) ${val.slice(3)}`;
                          } else if (val.length > 0) {
                            formatted = `(${val}`;
                          }

                          // Allow clearing the input completely
                          if (e.target.value === "") formatted = "";

                          setPhone(formatted);
                        }}
                        className={`${inputClass} bg-white`}
                      />
                      <p className="text-xs font-medium leading-relaxed text-[#555558]">
                        By checking the box and entering your number, you consent to receive recurring text messages
                        (e.g., launch updates) from AccessBelt at the number provided. Consent is not a condition of
                        joining the list or of obtaining any service. Reply STOP to cancel. Msg & data rates may apply.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              disabled={status === "submitting"}
              className="btn-floating group flex w-full items-center justify-center !rounded-full disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:shadow-none"
            >
              {status === "submitting" ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" aria-hidden="true" />
                  Signing you up...
                </>
              ) : (
                <>
                  <Bell className="mr-2 h-5 w-5" aria-hidden="true" />
                  Notify me at launch
                </>
              )}
            </button>

            <p className="text-center text-xs font-medium text-[#6e6e73]">
              We respect your privacy and will never share your personal data.
            </p>
          </motion.form>
        </div>
      </section>

      {/* Success Modal Overlay */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            id="success-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
            style={{ backgroundColor: "rgba(0,0,0,0.45)", backdropFilter: "blur(12px)" }}
            onClick={(e) => {
              if (e.target === e.currentTarget) handleCloseModal();
            }}
          >
            <motion.div
              id="success-modal-card"
              role="dialog"
              aria-modal="true"
              aria-labelledby="success-modal-title"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-h-[95vh] w-full max-w-md overflow-y-auto rounded-[24px] border border-black/5 bg-white p-8 text-center shadow-3d sm:p-10 md:p-12"
            >
              {/* Animated checkmark */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 220, damping: 18 }}
                className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#e8f5ec] sm:mb-7 sm:h-20 sm:w-20"
              >
                <CheckCircle2 className="h-8 w-8 text-[#15803d] sm:h-10 sm:w-10" aria-hidden="true" />
              </motion.div>

              <motion.h3
                id="success-modal-title"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="mb-3 font-display text-2xl font-bold tracking-[-0.02em] text-[#1d1d1f] sm:text-3xl"
              >
                You're on the list.
              </motion.h3>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="mb-8 text-sm font-medium leading-relaxed text-[#555558] sm:mb-10 sm:text-base"
              >
                {textingConfirmed
                  ? "We'll email and text you the moment AccessBelt is ready to download."
                  : "We'll email you the moment AccessBelt is ready to download."}
              </motion.p>

              <motion.button
                id="success-modal-back-btn"
                autoFocus
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                onClick={handleCloseModal}
                className="inline-flex items-center gap-2 rounded-full bg-[#1d1d1f] px-7 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-black active:scale-95"
              >
                Done
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
