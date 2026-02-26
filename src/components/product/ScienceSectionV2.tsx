import { Reveal } from '@/components/Reveal';
import { Label } from '@/components/shared';
import { PathwayDiagramCompact } from './PathwayDiagramCompact';
import { PathwayDiagramFull } from './PathwayDiagramFull';

export const ScienceSectionV2 = () =>
<section className="bg-background md:py-20 px-5 md:px-7 py-[30px]">
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
        {/* Left — diagram preview */}
        <Reveal delay={0.05}>
          <div className="flex flex-col gap-8">
            {/* OPTION A */}
            <div>
              <p className="text-[11px] tracking-[3px] uppercase font-semibold text-gold mb-3 text-center">⬇ Option A — Compact (4:3)</p>
              <PathwayDiagramCompact />
            </div>

            {/* OPTION B */}
            <div>
              <p className="text-[11px] tracking-[3px] uppercase font-semibold text-gold mb-3 text-center">⬇ Option B — Full (with icons)</p>
              <PathwayDiagramFull />
            </div>
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
            <p className="text-sm md:text-[15px] leading-7 text-foreground font-medium mt-2">
              No cortisol spike. No grogginess. No panic.
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
  </section>;