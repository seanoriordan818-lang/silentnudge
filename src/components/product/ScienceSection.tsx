import { Reveal } from '@/components/Reveal';
import { Label } from '@/components/shared';

export const ScienceSection = () => (
  <section className="max-w-[1200px] mx-auto py-14 px-5 md:px-7">
    <Reveal>
      <div className="text-center mb-10 md:mb-14">
        <Label>The Science Others Don't Have</Label>
        <h2 className="font-display text-[clamp(26px,4vw,38px)] leading-[1.15] font-medium">
          Your wrist is wired to wake you through a<br />
          <span className="text-gold">completely different neurological pathway.</span>
        </h2>
      </div>
    </Reveal>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Reveal delay={0.05}>
        <div className="rounded-[20px] p-9 h-full" style={{ background: 'rgba(180,60,60,0.04)', border: '1px solid rgba(180,60,60,0.12)' }}>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl">🔊</span>
            <span className="text-[12px] tracking-[2px] uppercase font-semibold" style={{ color: 'rgba(180,80,80,0.7)' }}>Sound Alarms</span>
          </div>
          <h3 className="font-display text-xl mb-3" style={{ color: 'rgba(180,80,80,0.8)' }}>Amygdala hijack</h3>
          <p className="text-sm leading-7 text-muted-foreground">
            Auditory alarms trigger your brain's threat detector. Cortisol floods your system before you're conscious. Your brain can also <em>habituate</em> to repeated sounds — categorising them as ignorable. That's why adding more alarms never works. The 6th alarm is just louder background noise.
          </p>
        </div>
      </Reveal>
      <Reveal delay={0.15}>
        <div className="rounded-[20px] p-9 h-full bg-gold/[0.04] border border-gold/10">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl">✋</span>
            <span className="text-[12px] tracking-[2px] uppercase text-gold-dim font-semibold">SilentNudge</span>
          </div>
          <h3 className="font-display text-xl text-gold mb-3">Tactile awakening pathway</h3>
          <p className="text-sm leading-7 text-muted-foreground">
            Vibration on the wrist engages Pacinian corpuscles — a direct route to arousal centres that bypasses the auditory habituation loop entirely. Your body wakes, your brain follows gently. No threat response, no cortisol spike, no partner disturbance. Harvard's December 2024 <em>Cell</em> study confirmed the pathway.
          </p>
        </div>
      </Reveal>
    </div>

    <Reveal delay={0.2}>
      <div className="mt-6 p-4 px-6 bg-raised rounded-[14px] border border-gold-subtle max-w-[700px] mx-auto">
        <p className="text-[12px] leading-relaxed text-faint text-center italic font-serif">
          Based on: Harvard Cell study, December 2024 — identifying the inferior colliculus / Pacinian corpuscle awakening pathway. Currently uncited by any competitor in this category.
        </p>
      </div>
    </Reveal>
  </section>
);
