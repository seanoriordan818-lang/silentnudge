import { useState, useCallback } from 'react';
import { Reveal } from '@/components/Reveal';
import { Label } from '@/components/shared';
import { X } from 'lucide-react';
import pathwayDiagram from '@/assets/science-pathway-diagram.png';

export const ScienceSectionV2 = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const openLightbox = useCallback(() => setLightboxOpen(true), []);
  const closeLightbox = useCallback(() => setLightboxOpen(false), []);

  return (
    <>
      <section className="bg-background md:py-20 py-[20px] md:py-[30px]">
        <div className="max-w-[1200px] w-[90%] mx-auto">
          <Reveal>
            <div className="text-center mb-7 md:mb-14">
              <Label>The Science</Label>
              <h2 className="font-display text-[clamp(26px,4vw,38px)] leading-[1.15] font-medium">
                Why Vibration Works <span className="text-gold">When Sound Fails.</span>
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-12 items-center md:max-w-[1000px] mx-auto">
            {/* Left — image */}
            <Reveal delay={0.05}>
              <div className="md:px-0 -mx-[calc(5vw-8px)] md:mx-0">
                <img
                  src={pathwayDiagram}
                  alt="Auditory vs Tactile pathway comparison — sound triggers cortisol stress response while wrist vibration activates calm arousal"
                  className="w-full h-auto object-contain rounded-none md:rounded-[16px] max-w-none cursor-pointer md:cursor-default"
                  onClick={openLightbox}
                />
                <p className="text-[11px] text-muted-foreground text-center mt-2 md:hidden">
                  Tap image to zoom
                </p>
              </div>
            </Reveal>

            {/* Right — copy */}
            <Reveal delay={0.12}>
              <div>
                <p className="text-[15px] md:text-[17px] leading-7 text-muted-foreground mb-5">
                  Sound alarms trigger your brain's threat response — flooding your system with cortisol before you've opened your eyes. That's not a wake-up. That's a micro panic attack, every morning.
                </p>
                <p className="text-[15px] md:text-[17px] leading-7 text-muted-foreground mb-5">
                  SilentNudge uses a completely different neurological pathway. Deep-pressure vibration activates Pacinian corpuscles in your wrist — nerve receptors that communicate directly with your brain's arousal system, bypassing the stress response entirely.
                </p>
                <p className="text-[15px] md:text-[17px] leading-7 text-foreground font-medium">
                  You wake up. Your body doesn't fight it.
                </p>
                <p className="text-[15px] md:text-[17px] leading-7 text-foreground font-medium mt-2">
                  No cortisol spike. No grogginess. No panic.
                </p>

                {/* Credibility badge */}
                <div className="mt-6 inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-gold/[0.08] border border-gold/[0.15]">
                  <span className="text-base">📖</span>
                  <span className="text-[13px] text-gold leading-snug">
                    Validated by Harvard Medical School — Tactile awakening pathway research published in <em>Cell</em> journal, December 2024.
                  </span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 backdrop-blur flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
          <img
            src={pathwayDiagram}
            alt="Auditory vs Tactile pathway comparison"
            className="max-w-full max-h-[90vh] object-contain touch-pinch-zoom"
            onClick={(e) => e.stopPropagation()}
            style={{ touchAction: 'pinch-zoom' }}
          />
        </div>
      )}
    </>
  );
};
