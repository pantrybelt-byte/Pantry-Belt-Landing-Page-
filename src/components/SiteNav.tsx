import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X, Building2 } from "lucide-react";
import { getOperatorPortalUrl } from "../lib/portalUrl";

const LINKS: { label: string; href?: string; to?: string; external?: boolean }[] = [
  { label: "How it works", href: "/#how-it-works" },
  { label: "Our story", href: "/#story" },
  { label: "Impact", href: "/#impact" },
  { label: "Beta testing", to: "/beta" },
];

const ctaClass = "btn-floating !rounded-full px-3.5 py-1.5 !text-[12px] sm:!text-[13px] !font-semibold sm:px-5 sm:py-2";

export default function SiteNav({ isBetaPage }: { isBetaPage: boolean }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstItemRef = useRef<HTMLAnchorElement>(null);
  const portalUrl = getOperatorPortalUrl();

  const cta = isBetaPage
    ? { label: "Install Beta", href: "#builds", id: "nav-install-beta" }
    : { label: "Get notified", href: "/#waitlist", id: "nav-get-notified" };

  // Close the menu whenever the visitor navigates.
  useEffect(() => {
    setOpen(false);
  }, [location.pathname, location.hash]);

  // While open: focus the first link, and let Escape close it and return focus to the toggle.
  useEffect(() => {
    if (!open) return;
    firstItemRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      toggleRef.current?.focus();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <nav className="apple-blur fixed top-0 z-50 w-full border-b border-black/5 bg-[#f6f3ee]/85 backdrop-blur-md">
        <div className="mx-auto grid h-20 max-w-7xl grid-cols-3 items-center px-4 sm:px-6">
          {/* Left: Menu trigger */}
          <div className="flex items-center justify-start">
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="flex items-center gap-2 rounded-full border border-black/5 bg-white/70 px-3.5 py-2 text-xs font-semibold text-[#1d1d1f] shadow-sm transition hover:bg-white hover:border-black/15"
            >
              {open ? <X aria-hidden="true" className="h-4 w-4" /> : <Menu aria-hidden="true" className="h-4 w-4" />}
              <span className="hidden sm:inline">Menu</span>
            </button>
          </div>

          {/* Center: Perfectly Centered AccessBelt Brand */}
          <div className="flex items-center justify-center">
            <Link to="/" className="group flex cursor-pointer items-center justify-center" aria-label="AccessBelt Home">
              <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-black/5 bg-white shadow-sm transition-transform group-hover:scale-105 sm:h-12 sm:w-12">
                <img src="/img/logo-256.webp" alt="" width={48} height={48} className="h-full w-full scale-[1.08] object-cover" />
              </div>
              <span className="ml-2.5 font-display text-lg font-bold tracking-[-0.02em] text-[#1d1d1f] sm:text-xl">
                AccessBelt
              </span>
            </Link>
          </div>

          {/* Right: Operator Login + CTA Button */}
          <div className="flex items-center justify-end gap-2 sm:gap-3">
            <a
              href={portalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-full border border-[#b52525]/30 bg-[#b52525]/10 px-3 py-1.5 text-xs font-semibold text-[#b52525] shadow-xs transition-all hover:bg-[#b52525] hover:text-white sm:px-4 sm:py-2 sm:text-[13px]"
              title="Sign in to the AccessBelt Operator Portal"
            >
              <Building2 className="h-3.5 w-3.5 shrink-0" />
              <span>Login</span>
            </a>

            <a href={cta.href} id={cta.id} className={ctaClass}>
              {cta.label}
            </a>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="menu-scrim"
              aria-hidden="true"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-black/25 backdrop-blur-[2px]"
            />
            <motion.div
              key="menu-sheet"
              id="mobile-menu"
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
              className="fixed inset-x-4 top-24 z-50 max-w-sm rounded-3xl border border-black/10 bg-white/95 p-5 shadow-[0_24px_48px_rgba(0,0,0,0.18)] backdrop-blur-2xl sm:left-6 sm:right-auto"
            >
              <nav aria-label="Menu" className="space-y-4">
                {/* Featured Operator Portal Link */}
                <a
                  href={portalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between rounded-2xl border border-[#b52525]/25 bg-[#b52525]/10 p-3.5 transition hover:bg-[#b52525]/15"
                >
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-[#b52525] p-2 text-white shadow-xs">
                      <Building2 className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#b52525]">Operator Portal</p>
                      <p className="text-xs text-[#555558]">Pantry manager login & shifts</p>
                    </div>
                  </div>
                  <span className="rounded-full border border-[#b52525]/20 bg-white px-2.5 py-1 text-xs font-semibold text-[#b52525]">
                    Login →
                  </span>
                </a>

                <ul className="divide-y divide-black/[0.06]">
                  {LINKS.map((link, i) => (
                    <li key={link.label}>
                      {link.to ? (
                        <Link
                          ref={i === 0 ? firstItemRef : undefined}
                          to={link.to}
                          onClick={() => setOpen(false)}
                          className="block py-3 text-[15px] font-semibold text-[#1d1d1f] hover:text-[#b52525] transition-colors"
                        >
                          {link.label}
                        </Link>
                      ) : (
                        <a
                          ref={i === 0 ? firstItemRef : undefined}
                          href={link.href}
                          target={link.external ? "_blank" : undefined}
                          rel={link.external ? "noopener noreferrer" : undefined}
                          onClick={() => setOpen(false)}
                          className="block py-3 text-[15px] font-semibold text-[#1d1d1f] hover:text-[#b52525] transition-colors"
                        >
                          {link.label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>

                <a
                  href={cta.href}
                  onClick={() => setOpen(false)}
                  className="btn-floating block w-full !rounded-full py-3 text-center text-sm !font-semibold"
                >
                  {cta.label}
                </a>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
