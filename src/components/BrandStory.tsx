import { useRef, useState } from "react";
import { motion } from "motion/react";

export default function BrandStory() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  return (
    <section className="section-padding bg-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative"
          >
            {/* Video container — matches original image card style */}
            <div className="relative aspect-[4/5] rounded-[var(--radius-apple)] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.12)] bg-[#1d1d1f] border border-black/5">
              <video
                ref={videoRef}
                src="/pantrybelt-vid.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              />

              {/* Tap to play/pause overlay */}
              <button
                onClick={togglePlay}
                className="absolute inset-0 z-10 w-full h-full cursor-pointer bg-transparent"
                aria-label={isPlaying ? "Pause video" : "Play video"}
                style={{ outline: "none", border: "none" }}
              >
                {!isPlaying && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                )}
              </button>

              {/* Bottom controls */}
              <div
                className="absolute bottom-0 left-0 right-0 z-20 flex items-center justify-between px-4 py-4"
                style={{ background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 100%)" }}
              >
                <button
                  onClick={toggleMute}
                  className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center cursor-pointer hover:bg-white/30 transition-colors"
                  aria-label={isMuted ? "Unmute video" : "Mute video"}
                  style={{ outline: "none", border: "none" }}
                >
                  {isMuted ? (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="white">
                      <path d="M16.5 12A4.5 4.5 0 0 0 14 7.97v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51A8.796 8.796 0 0 0 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06A8.99 8.99 0 0 0 17.73 18 8.9 8.9 0 0 0 19 17.73L20.73 19.5 22 18.23 4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
                    </svg>
                  ) : (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="white">
                      <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                    </svg>
                  )}
                </button>

                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-sm">
                  <div className="w-2 h-2 rounded-full bg-[#34c759] animate-pulse" />
                  <span className="text-white text-[11px] font-semibold tracking-wide">PantryBelt</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-10"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-4 mb-2">
                <h2 className="text-[#86868b] !mb-0">Our Brand Story</h2>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0071e3]/10 border border-[#0071e3]/20">
                  <span className="text-sm font-bold text-[#0071e3]">100%</span>
                  <span className="text-[10px] font-bold text-[#0071e3] uppercase tracking-widest">Community Focused</span>
                </div>
              </div>
              <h3 className="text-5xl md:text-6xl font-display font-semibold text-[#1d1d1f] leading-[1.1] tracking-tight">
                Born from a need <br /> to bridge the gap.
              </h3>
            </div>
            
            <div className="space-y-6">
              <p className="text-xl text-[#86868b] leading-relaxed font-medium">
                Pantry Belt was formed in Montgomery, Alabama, born from a shared passion to improve community awareness and uplift rural, overlooked areas.
              </p>
              <p className="text-lg text-[#86868b]/80 leading-relaxed">
                We believe that no family should have to guess where their next meal is coming from. By bridging the gap between local resources and the people who need them most, we are bringing hope and essential support directly to the heart of our communities.
              </p>
            </div>

            <div className="pt-8 border-t border-black/5">
              <div className="flex items-center gap-5">
                <div className="flex -space-x-4">
                  <div className="w-14 h-14 rounded-full bg-[#f5f5f7] overflow-hidden ring-4 ring-white shadow-sm relative z-10 flex items-center justify-center">
                    <img 
                      src="/m-clarke.jpg" 
                      alt="Matthew Clarke" 
                      className="w-full h-full object-cover object-[center_15%] scale-[1.35] translate-y-1"
                    />
                  </div>
                  <div className="w-14 h-14 rounded-full bg-[#f5f5f7] overflow-hidden ring-4 ring-white shadow-sm relative z-0 flex items-center justify-center">
                    <img 
                      src="/t-sneed.jpg" 
                      alt="Thaddaus Sneed" 
                      className="w-full h-full object-cover object-[center_15%] scale-[1.35] translate-y-1"
                    />
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
