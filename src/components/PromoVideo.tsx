import { useCallback, useEffect, useRef, useState, type CSSProperties, type PointerEvent, type ReactNode } from "react";
import { motion } from "motion/react";
import { Captions, CaptionsOff, Loader2, Pause, Play, RotateCcw, Volume2, VolumeX } from "lucide-react";

type Orientation = "landscape" | "portrait";
type Phase = "poster" | "starting" | "playing" | "paused" | "ended";

const MEDIA: Record<Orientation, { src: string; startPoster: string; endPoster: string; ratio: string }> = {
  landscape: {
    src: "/promo/accessbelt-promo-16x9.mp4",
    startPoster: "/promo/poster-start-16x9.jpg",
    endPoster: "/promo/poster-end-16x9.jpg",
    ratio: "16 / 9",
  },
  portrait: {
    src: "/promo/accessbelt-promo-9x16.mp4",
    startPoster: "/promo/poster-start-9x16.jpg",
    endPoster: "/promo/poster-end-9x16.jpg",
    ratio: "9 / 16",
  },
};
const CAPTIONS_SRC = "/promo/accessbelt-promo.en.vtt";

/** Phones get the vertical cut. Chosen once per load and never swapped while the video plays. */
const PORTRAIT_QUERY = "(max-width: 639px)";

/**
 * Where the CTA pill sits on each cut's end card, in percent of the video frame (measured from the
 * rendered final frame). Real buttons are laid exactly over it: "Watch the story" on the poster and
 * END_CTA once the video has finished, so the end card always has one clickable call to action.
 */
const CTA_SLOT: Record<Orientation, { left: number; top: number; width: number; height: number; font: string }> = {
  landscape: { left: 36.15, top: 67.04, width: 27.71, height: 8.89, font: "clamp(13px, 2.08cqw, 26px)" },
  portrait: { left: 25.0, top: 46.67, width: 50.0, height: 5.52, font: "clamp(13px, 3.7cqw, 22px)" },
};

/**
 * The video's own end card reads "Free on the App Store". Until the App Store launch, the real
 * button covering it uses the site's current call to action; on launch day point it at the listing.
 */
const END_CTA = { label: "Get notified", href: "#waitlist" };

/** Once a visitor pauses or finishes the video, later visits open on the poster instead of autoplaying. */
const SEEN_KEY = "accessbelt:heroPromoSeen:v1";

const VISIBLE_RATIO = 0.25; // muted playback only runs while at least this much of the player is on screen
const PRELOAD_MARGIN = "600px 0px"; // start buffering the autoplay file shortly before it scrolls into view
const CHROME_HIDE_MS = 2500;
const TOUCH_CHROME_MS = 3500;
const SOUND_HINT_MS = 7000;

function readSeen() {
  try {
    return localStorage.getItem(SEEN_KEY) === "1";
  } catch {
    return false; // storage blocked (private mode): treat as a first visit
  }
}

function markSeen() {
  try {
    localStorage.setItem(SEEN_KEY, "1");
  } catch {
    // storage blocked: the video simply autoplays again next visit
  }
}

function shouldAutoplay() {
  if (readSeen()) return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  return connection?.saveData !== true;
}

const pillClass =
  "flex h-full w-full items-center justify-center gap-[0.45em] rounded-full bg-[#b52525] font-bold " +
  "tracking-[-0.01em] text-white shadow-[0_0.9cqw_2.2cqw_rgba(181,37,37,0.32)] transition-[background-color,transform] " +
  "duration-200 hover:bg-[#9e1f1f] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-4 " +
  "focus-visible:ring-[#b52525]/35";

const glassClass =
  "border border-white/15 bg-black/45 text-white backdrop-blur-xl";

function ControlButton({
  label,
  pressed,
  onClick,
  children,
}: {
  label: string;
  pressed?: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={pressed}
      title={label}
      onClick={onClick}
      className="flex h-11 w-11 items-center justify-center rounded-full text-white transition-[background-color,transform] duration-200 hover:bg-white/15 active:scale-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/90"
    >
      {children}
    </button>
  );
}

export default function PromoVideo() {
  const frameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const trackRef = useRef<HTMLTrackElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const hideTimer = useRef<number | undefined>(undefined);
  const hintTimer = useRef<number | undefined>(undefined);
  const hintShown = useRef(false);
  const autoPaused = useRef(false); // paused by us because it scrolled away, not by the visitor
  const captionsChosen = useRef(false); // visitor set captions themselves; stop following sound

  const [autoplay] = useState(shouldAutoplay);
  const pendingAutoplay = useRef(autoplay);
  const [orientation, setOrientation] = useState<Orientation>(() =>
    window.matchMedia(PORTRAIT_QUERY).matches ? "portrait" : "landscape",
  );
  const [phase, setPhase] = useState<Phase>(autoplay ? "starting" : "poster");
  const [poster, setPoster] = useState<"start" | "end">(autoplay ? "start" : "end");
  const [muted, setMuted] = useState(true);
  const [captionsOn, setCaptionsOn] = useState(true);
  const [cue, setCue] = useState("");
  const [chrome, setChrome] = useState(true);
  const [focusWithin, setFocusWithin] = useState(false);
  const [soundHint, setSoundHint] = useState(false);

  const phaseRef = useRef(phase);
  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  const media = MEDIA[orientation];
  const slot = CTA_SLOT[orientation];
  // 16:9: controls sit top-left, which stays clear in every scene and is above the fold on laptops.
  // 9:16: the copy runs across the top of every scene, so controls sit bottom-left instead.
  const barPosition = orientation === "landscape" ? "left-3 top-3 sm:left-4 sm:top-4" : "bottom-3 left-3";
  const hintPosition = orientation === "landscape" ? "right-3 top-3 sm:right-4 sm:top-4" : "bottom-3 right-3";
  const playing = phase === "playing";
  const active = phase === "playing" || phase === "paused";
  const chromeVisible = !playing || chrome || focusWithin;
  const captionBottom = orientation === "landscape" ? 12 : 68;

  const showChrome = useCallback((ms: number = CHROME_HIDE_MS) => {
    setChrome(true);
    window.clearTimeout(hideTimer.current);
    hideTimer.current = window.setTimeout(() => setChrome(false), ms);
  }, []);

  const fallBackToPoster = useCallback(() => {
    // Autoplay refused (e.g. iOS Low Power Mode): show the still with a play button instead.
    setPoster("end");
    setPhase("poster");
  }, []);

  // The player sits below the fold: start buffering the autoplay file only as the visitor approaches it.
  useEffect(() => {
    const frame = frameRef.current;
    const video = videoRef.current;
    if (!autoplay || !frame || !video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        video.preload = "auto";
        observer.disconnect();
      },
      { rootMargin: PRELOAD_MARGIN },
    );
    observer.observe(frame);
    return () => observer.disconnect();
  }, [autoplay]);

  // Autoplay only once the player is actually on screen; pause muted playback when it scrolls away.
  useEffect(() => {
    const frame = frameRef.current;
    const video = videoRef.current;
    if (!frame || !video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.intersectionRatio >= VISIBLE_RATIO;
        if (visible && pendingAutoplay.current) {
          pendingAutoplay.current = false;
          video.muted = true;
          video.play().catch(fallBackToPoster);
        } else if (visible && autoPaused.current) {
          autoPaused.current = false;
          video.play().catch(() => {});
        } else if (!visible && !video.paused && video.muted) {
          autoPaused.current = true;
          video.pause();
        }
      },
      { threshold: [0, VISIBLE_RATIO, 0.5, 1] },
    );
    observer.observe(frame);
    return () => observer.disconnect();
  }, [fallBackToPoster]);

  // Captions come from the <track>; we draw them ourselves so they match the site's style.
  useEffect(() => {
    const track = trackRef.current?.track;
    if (!track) return;
    track.mode = "hidden";
    const onCueChange = () => {
      const cues = track.activeCues;
      setCue(cues && cues.length ? Array.from(cues, (c) => (c as VTTCue).text).join("\n") : "");
    };
    track.addEventListener("cuechange", onCueChange);
    return () => track.removeEventListener("cuechange", onCueChange);
  }, []);

  // Smooth progress line without re-rendering every frame.
  useEffect(() => {
    if (!playing) return;
    let raf = 0;
    const tick = () => {
      const video = videoRef.current;
      const bar = progressRef.current;
      if (video && bar && video.duration) bar.style.transform = `scaleX(${video.currentTime / video.duration})`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing]);

  // Swap between the 16:9 and 9:16 cut on resize/rotation, but never mid-play.
  useEffect(() => {
    const query = window.matchMedia(PORTRAIT_QUERY);
    const onChange = () => {
      const video = videoRef.current;
      if (video && !video.paused) return;
      setOrientation(query.matches ? "portrait" : "landscape");
      // A new file starts from the beginning, so a paused or finished video goes back to its poster.
      if (phaseRef.current === "paused" || phaseRef.current === "ended") {
        autoPaused.current = false;
        setPoster("end");
        setPhase("poster");
      }
    };
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  useEffect(
    () => () => {
      window.clearTimeout(hideTimer.current);
      window.clearTimeout(hintTimer.current);
    },
    [],
  );

  const handlePlaying = () => {
    const video = videoRef.current;
    setPhase("playing");
    showChrome();
    if (video?.muted && !hintShown.current) {
      hintShown.current = true;
      setSoundHint(true);
      hintTimer.current = window.setTimeout(() => setSoundHint(false), SOUND_HINT_MS);
    }
  };

  const handlePause = () => {
    if (videoRef.current?.ended) return;
    setPhase("paused");
  };

  const handleEnded = () => {
    setPhase("ended");
    setSoundHint(false);
    markSeen();
  };

  const syncProgress = () => {
    const video = videoRef.current;
    const bar = progressRef.current;
    if (video && bar && video.duration) bar.style.transform = `scaleX(${video.currentTime / video.duration})`;
  };

  const startFromPoster = () => {
    const video = videoRef.current;
    if (!video) return;
    pendingAutoplay.current = false;
    // A click is a user gesture, so play with the narration; captions follow sound until chosen.
    video.muted = false;
    setMuted(false);
    if (!captionsChosen.current) setCaptionsOn(false);
    setPhase("starting");
    video.play().catch(fallBackToPoster);
  };

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      autoPaused.current = false;
      video.play().catch(() => {});
    } else {
      video.pause();
      markSeen();
    }
  };

  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;
    const nextMuted = !video.muted;
    video.muted = nextMuted;
    setMuted(nextMuted);
    setSoundHint(false);
    if (!captionsChosen.current) setCaptionsOn(nextMuted);
  };

  const toggleCaptions = () => {
    captionsChosen.current = true;
    setCaptionsOn((on) => !on);
  };

  const replay = () => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    video.play().catch(() => {});
  };

  const onSurfacePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (phase === "poster") {
      startFromPoster();
      return;
    }
    if (!active) return;
    if (event.pointerType === "mouse") {
      togglePlay();
    } else if (playing && chromeVisible) {
      window.clearTimeout(hideTimer.current);
      setChrome(false);
    } else {
      showChrome(TOUCH_CHROME_MS);
    }
  };

  const slotStyle: CSSProperties = {
    left: `${slot.left + slot.width / 2}%`,
    top: `${slot.top + slot.height / 2}%`,
    width: `calc(${slot.width}% + 1.2cqw)`,
    height: `max(calc(${slot.height}% + 0.8cqw), 44px)`,
    fontSize: slot.font,
    fontFamily: '"Inter", system-ui, sans-serif', // the video's typeface, so the real button matches the end card
  };

  return (
    <figure className="relative">
      <div
        ref={frameRef}
        className={`@container relative overflow-hidden rounded-[28px] border border-black/5 bg-[#f4ede0] shadow-3d select-none sm:rounded-[32px] ${
          playing && !chromeVisible ? "cursor-none" : ""
        }`}
        style={{ aspectRatio: media.ratio }}
        onPointerMove={(event) => {
          if (event.pointerType === "mouse" && active) showChrome();
        }}
        onPointerLeave={(event) => {
          if (event.pointerType === "mouse" && playing) setChrome(false);
        }}
      >
        <video
          ref={videoRef}
          src={media.src}
          className="absolute inset-0 h-full w-full object-cover"
          playsInline
          preload="none"
          aria-label="AccessBelt in one minute"
          aria-describedby="promo-video-summary"
          onPlaying={handlePlaying}
          onPause={handlePause}
          onEnded={handleEnded}
          onSeeked={syncProgress}
          onError={fallBackToPoster}
        >
          <track ref={trackRef} kind="captions" src={CAPTIONS_SRC} srcLang="en" label="English" />
        </video>

        <img
          src={poster === "start" ? media.startPoster : media.endPoster}
          alt=""
          aria-hidden="true"
          draggable={false}
          fetchPriority="high"
          className={`pointer-events-none absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
            phase === "poster" || phase === "starting" ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Click to pause/play with a mouse, tap to show controls on touch; buttons below cover keyboard use. */}
        <div aria-hidden="true" className="absolute inset-0" onPointerUp={onSurfacePointerUp} />

        {captionsOn && cue && active ? (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 flex justify-center px-[5%] transition-[bottom] duration-300 ease-out"
            style={{ bottom: captionBottom }}
          >
            <p
              className="max-w-[90%] whitespace-pre-line rounded-[10px] bg-black/75 px-[0.7em] py-[0.3em] text-center font-semibold leading-[1.3] text-white [text-wrap:balance]"
              style={{ fontSize: orientation === "portrait" ? "clamp(13px, 4cqw, 18px)" : "clamp(13px, 1.5cqw, 21px)" }}
            >
              {cue}
            </p>
          </div>
        ) : null}

        {phase === "poster" || (phase === "starting" && poster === "end") ? (
          <div className="absolute -translate-x-1/2 -translate-y-1/2" style={slotStyle}>
            {/* The file only downloads once asked for, so show progress until the first frame arrives. */}
            <button
              type="button"
              onClick={startFromPoster}
              disabled={phase === "starting"}
              aria-busy={phase === "starting"}
              aria-label="Watch the one-minute AccessBelt story"
              className={`${pillClass} disabled:cursor-progress`}
            >
              {phase === "starting" ? (
                <>
                  <Loader2 aria-hidden="true" className="h-[1em] w-[1em] animate-spin" />
                  Loading
                </>
              ) : (
                <>
                  <Play aria-hidden="true" className="h-[0.95em] w-[0.95em]" fill="currentColor" strokeWidth={0} />
                  Watch the story
                </>
              )}
            </button>
          </div>
        ) : null}

        {phase === "ended" ? (
          <div className="absolute -translate-x-1/2 -translate-y-1/2" style={slotStyle}>
            <motion.a
              href={END_CTA.href}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
              className={pillClass}
            >
              {END_CTA.label}
            </motion.a>
          </div>
        ) : null}

        {soundHint && muted && playing ? (
          <button
            type="button"
            onClick={toggleSound}
            className={`absolute ${hintPosition} inline-flex h-11 items-center gap-2 rounded-full px-4 text-[13px] font-semibold transition-transform duration-200 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/90 sm:text-sm ${glassClass}`}
          >
            <VolumeX aria-hidden="true" className="h-4 w-4" />
            Turn on sound
          </button>
        ) : null}

        {active ? (
          // While playing untouched, the bar collapses to just the pause button (never hidden: the
          // visitor can always stop the video); hover, tap or keyboard focus expands it.
          <div
            className={`absolute ${barPosition} flex items-center rounded-full p-1 transition-opacity duration-300 ${glassClass} ${
              chromeVisible ? "opacity-100" : "opacity-80"
            }`}
            onFocus={() => setFocusWithin(true)}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocusWithin(false);
            }}
          >
            <ControlButton label={playing ? "Pause video" : "Play video"} onClick={togglePlay}>
              {playing ? (
                <Pause aria-hidden="true" className="h-5 w-5" fill="currentColor" strokeWidth={0} />
              ) : (
                <Play aria-hidden="true" className="h-5 w-5 translate-x-px" fill="currentColor" strokeWidth={0} />
              )}
            </ControlButton>
            <div
              className={`flex items-center gap-0.5 overflow-hidden transition-[max-width,opacity] duration-300 ease-out ${
                chromeVisible ? "max-w-[100px] pl-0.5 opacity-100" : "max-w-0 opacity-0"
              }`}
            >
              <ControlButton label="Sound" pressed={!muted} onClick={toggleSound}>
                {muted ? <VolumeX aria-hidden="true" className="h-5 w-5" /> : <Volume2 aria-hidden="true" className="h-5 w-5" />}
              </ControlButton>
              <ControlButton label="Captions" pressed={captionsOn} onClick={toggleCaptions}>
                {captionsOn ? <Captions aria-hidden="true" className="h-5 w-5" /> : <CaptionsOff aria-hidden="true" className="h-5 w-5" />}
              </ControlButton>
            </div>
          </div>
        ) : null}

        {phase === "ended" ? (
          <button
            type="button"
            onClick={replay}
            className={`absolute ${barPosition} inline-flex h-11 items-center gap-2 rounded-full px-4 text-[15px] font-semibold transition-transform duration-200 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/90 ${glassClass}`}
          >
            <RotateCcw aria-hidden="true" className="h-[18px] w-[18px]" />
            Replay
          </button>
        ) : null}

        {active ? (
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-[3px] bg-black/10">
            <div ref={progressRef} className="h-full origin-left bg-[#b52525]" style={{ transform: "scaleX(0)" }} />
          </div>
        ) : null}
      </div>
      <figcaption id="promo-video-summary" className="sr-only">
        A one-minute look at AccessBelt: a mom in Wilcox County finds the closest pantry on the map, a grandfather
        asks Pete for pantries near him and what to bring, and families find SNAP, WIC and 211 crisis help. Free, private,
        and no account needed.
      </figcaption>
    </figure>
  );
}
