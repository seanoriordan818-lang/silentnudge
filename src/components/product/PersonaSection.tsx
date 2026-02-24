import { Reveal } from '@/components/Reveal';
import { Label, Gold } from '@/components/shared';

const personas = [
  { emoji: '💑', title: 'Couples', desc: "Your alarm wakes your partner. SilentNudge vibrates only your wrist — they'll never know it happened." },
  { emoji: '😴', title: 'Deep Sleepers', desc: "Your brain habituates to sound. Our 5-stage escalation uses a pathway it can't learn to ignore." },
  { emoji: '🤟', title: 'Deaf / HOH', desc: 'Body-worn, self-contained, travels everywhere. No bed shaker, no front desk, no dependence.' },
  { emoji: '⚡', title: 'ADHD', desc: "ADHD brains habituate faster than anyone's. Escalating vibration resists the habituation loop by design." },
];

export const PersonaSection = () => (
  <section className="max-w-[1200px] mx-auto py-14 px-7">
    <Reveal>
      <div className="text-center mb-12">
        <Label>Perfect For</Label>
        <h2 className="font-display text-[clamp(24px,3.5vw,34px)] font-medium">
          Designed for the people <Gold>the alarm industry forgot.</Gold>
        </h2>
      </div>
    </Reveal>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {personas.map((a, i) => (
        <Reveal key={i} delay={i * 0.06}>
          <div className="p-7 px-6 rounded-[18px] bg-raised border border-gold-subtle h-full transition-colors hover:border-gold/15">
            <div className="text-[28px] mb-3">{a.emoji}</div>
            <div className="text-[12px] tracking-[2px] uppercase text-gold-dim font-semibold mb-2">{a.title}</div>
            <p className="text-[13px] leading-relaxed text-muted-foreground font-light">{a.desc}</p>
          </div>
        </Reveal>
      ))}
    </div>
  </section>
);
