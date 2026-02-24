import { Reveal } from '@/components/Reveal';
import { Label, Gold, Stars } from '@/components/shared';

const reviews = [
  { q: "My partner sleeps. I wake up. That's it. That's the whole review.", n: 'James D.', t: 'Couple · 5 AM riser', init: 'J' },
  { q: "I set one alarm now. One. After years of setting nine. That sentence changes everything about how I feel about myself.", n: 'Marcus T.', t: 'ADHD · Deep sleeper', init: 'M' },
  { q: "Every hotel room, every guest room, every morning — without asking anyone for help. The independence is worth ten times the price.", n: 'Rachel K.', t: 'D/HOH community', init: 'R' },
  { q: "The escalation is what makes it different. Starts gentle, builds until my brain has no choice. Three months in and it still works.", n: 'Alex P.', t: 'Heavy sleeper', init: 'A' },
  { q: "Game changer for my marriage. She's not angry in the morning anymore. We actually have coffee together now.", n: 'Sarah M.', t: 'Couple · Nurse', init: 'S' },
  { q: "My ADHD coach recommended trying vibration after sound alarms stopped working within weeks. This hasn't stopped working in four months.", n: 'Lauren W.', t: 'ADHD · Verified buyer', init: 'L' },
];

export const ReviewsSection = () => (
  <section id="reviews" className="max-w-[1200px] mx-auto py-14 px-5 md:px-7">
    <Reveal>
      <div className="text-center mb-8 md:mb-12">
        <Label>Reviews</Label>
        <h2 className="font-display text-[clamp(24px,3.5vw,34px)] font-medium">
          They tried everything. <Gold>Then this.</Gold>
        </h2>
        <div className="flex items-center justify-center gap-2 mt-4">
          <Stars />
          <span className="text-sm text-muted-foreground">4.8 average from 1,247 verified reviews</span>
        </div>
      </div>
    </Reveal>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {reviews.map((r, i) => (
        <Reveal key={i} delay={i * 0.06}>
          <div className="p-7 px-6 rounded-[18px] bg-raised border border-gold-subtle">
            <div className="mb-3.5"><Stars /></div>
            <p className="font-serif italic text-sm leading-7 text-foreground/70 mb-5">"{r.q}"</p>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-semibold text-gold font-display" style={{ background: 'linear-gradient(135deg, hsl(252 18% 14%), hsl(255 15% 20%))' }}>
                {r.init}
              </div>
              <div>
                <div className="text-[12px] font-semibold">{r.n}</div>
                <div className="text-[10px] text-faint">Verified · {r.t}</div>
              </div>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  </section>
);
