import { Reveal } from '@/components/Reveal';
import { Label } from '@/components/shared';
import pathwayDiagram from '@/assets/science-pathway-diagram.png';

export const ScienceSectionV2 = () =>
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
          <img
            src={pathwayDiagram}
            alt="Auditory vs Tactile pathway comparison — sound triggers cortisol stress response while wrist vibration activates calm arousal"
            className="w-full h-auto object-contain rounded-[16px] max-w-none"
          />
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
  </section>;