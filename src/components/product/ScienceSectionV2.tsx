import { Reveal } from '@/components/Reveal';
import { Label } from '@/components/shared';

export const ScienceSectionV2 = () => (
  <section className="bg-background py-16 md:py-20 px-5 md:px-7">
    <div className="max-w-[1200px] mx-auto">
      <Reveal>
        <div className="text-center mb-10 md:mb-14">
          <Label>The Science</Label>
          <h2 className="font-display text-[clamp(26px,4vw,38px)] leading-[1.15] font-medium">
            Why Vibration Works <span className="text-gold">When Sound Fails.</span>
          </h2>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center max-w-[1000px] mx-auto">
        {/* Left — image placeholder */}
        <Reveal delay={0.05}>
          <div
            className="w-full aspect-square rounded-[16px] flex items-center justify-center"
            style={{
              background: 'hsl(252 18% 12.5%)',
              border: '2px dashed hsl(var(--gold) / 0.4)',
            }}
          >
            <p className="text-xs text-muted-foreground text-center px-6 max-w-[280px] leading-relaxed">
              [ IMAGE PLACEHOLDER — science diagram: ear → amygdala stress path (red) vs wrist → Pacinian corpuscles calm path (gold). Commission or illustrate and swap in. ]
            </p>
          </div>
        </Reveal>

        {/* Right — copy */}
        <Reveal delay={0.12}>
          <div>
            <p className="text-sm md:text-[15px] leading-7 text-muted-foreground mb-5">
              Sound alarms trigger your brain's threat response — flooding your system with cortisol before you've opened your eyes. That's not a wake-up. That's a micro panic attack, every morning.
            </p>
            <p className="text-sm md:text-[15px] leading-7 text-muted-foreground mb-5">
              SilentNudge uses a completely different neurological pathway. Deep-pressure vibration activates Pacinian corpuscles in your wrist — nerve receptors that communicate directly with your brain's arousal system, bypassing the stress response entirely.
            </p>
            <p className="text-sm md:text-[15px] leading-7 text-foreground font-medium">
              You wake up. Your body doesn't fight it.
            </p>

            {/* Credibility badge */}
            <div className="mt-6 inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-gold/[0.08] border border-gold/[0.15]">
              <span className="text-base">📖</span>
              <span className="text-[12px] text-gold leading-snug">
                Validated by Harvard Medical School — Tactile awakening pathway research published in <em>Cell</em> journal, December 2024.
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);
