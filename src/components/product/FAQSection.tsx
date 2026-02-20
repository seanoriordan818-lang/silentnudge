import { Reveal } from '@/components/Reveal';
import { Label, Gold } from '@/components/shared';
import { FAQAccordion } from './FAQAccordion';

const faqs = [
  { q: "Will it actually wake me? I'm an extremely deep sleeper.", a: "SilentNudge uses a purpose-built wake motor — not a repurposed phone notification buzzer. The 5-stage escalation starts gentle and builds to bed-shaker intensity, delivered directly to your wrist through a neurological pathway your brain cannot habituate to the way it habituates to sound. Stage 5 is engineered for the deepest 5% of sleepers. And if it doesn't work, the 100-night guarantee means you pay nothing." },
  { q: "What if the battery dies overnight?", a: "7+ days on a single charge. Low-battery warning at 20% gives you a full day to plug in. USB-C — the cable you already own. You'll never sleep with a dead alarm." },
  { q: "Is it comfortable enough to sleep in?", a: "22 grams total. Medical-grade silicone band. Slimmer than a fitness tracker. Most users forget they're wearing it by the third night." },
  { q: "Why not just use my Apple Watch or Fitbit?", a: "Smartwatches use the same gentle haptic motor for texts, calls, and alarms — designed to be unobtrusive. SilentNudge uses a purpose-built wake motor with 5 escalation stages specifically engineered to wake you from deep sleep. It also lasts 7+ days (vs daily charging), works fully standalone, and never breaks because of an OS update." },
  { q: "How is this different from FitSleeps or other vibrating bands?", a: "Three things: motor strength (purpose-built, not repurposed), 5-stage escalation (not 3 fixed levels), and the science. We're the only product in this category backed by the Harvard Cell 2024 research on the tactile awakening pathway." },
  { q: "I have ADHD. Will this stop working after a few weeks like everything else?", a: "ADHD brains habituate to repeated, predictable stimuli faster than neurotypical brains. SilentNudge's escalating pattern changes in intensity and rhythm across 5 stages — a varying tactile stimulus is significantly harder for the ADHD brain to categorise as 'known and ignorable.'" },
  { q: "Does it really not wake my partner?", a: "The vibration is delivered through direct skin contact on your wrist. Your partner sleeping inches away will feel nothing. No sound, no bed movement, no screen glow. This is the core problem SilentNudge was built to solve." },
  { q: "What's the return policy?", a: "100 nights. Wear it, test it, build trust in it. If it doesn't reliably wake you — and only you — return it for a full refund. No forms, no restocking fees, no friction." },
];

export const FAQSection = () => (
  <section id="faq" className="max-w-[720px] mx-auto py-20 px-7">
    <Reveal>
      <div className="text-center mb-10">
        <Label>FAQ</Label>
        <h2 className="font-display text-[clamp(24px,3vw,32px)] font-medium">
          Before you <Gold>decide.</Gold>
        </h2>
      </div>
    </Reveal>
    <Reveal delay={0.05}>
      {faqs.map((f, i) => (
        <FAQAccordion key={i} q={f.q} a={f.a} />
      ))}
    </Reveal>
  </section>
);
