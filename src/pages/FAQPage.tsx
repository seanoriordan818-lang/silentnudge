import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Reveal } from '@/components/Reveal';
import { Label, Heading, Gold, Section } from '@/components/shared';
import { ArrowRight, ChevronDown } from 'lucide-react';

const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

function Accordion({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b" style={{ borderColor: 'hsl(0 0% 100% / 0.06)' }}>
      <button onClick={() => setOpen(!open)} className="w-full flex justify-between items-center py-5 text-left text-foreground text-[15px] font-medium gap-4">
        {q}
        <ChevronDown size={18} className={`flex-shrink-0 transition-transform duration-300 text-muted-foreground ${open ? 'rotate-180' : ''}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-400 ${open ? 'max-h-[600px]' : 'max-h-0'}`} style={{ transition: 'max-height 0.4s cubic-bezier(.22,1,.36,1)' }}>
        <p className="text-sm leading-relaxed text-muted-foreground mb-5 pr-8">{a}</p>
      </div>
    </div>
  );
}

const faqs = [
  { q: "Will it actually wake me? I'm an extremely deep sleeper.", a: "SilentNudge uses a purpose-built wake motor with 5-stage escalation that builds to bed-shaker intensity on your wrist. Stage 5 is engineered for the deepest 5% of sleepers. And if it doesn't work, the 100-night guarantee means you pay nothing." },
  { q: "Is this just a smartwatch vibration alarm?", a: "Not even close. Smartwatches use a single gentle haptic motor designed for text notifications. SilentNudge uses a purpose-built wake motor with 5 escalation stages specifically engineered to wake you from deep sleep." },
  { q: "I have ADHD. Will this stop working after a few weeks?", a: "SilentNudge's escalating pattern changes in intensity and rhythm across 5 stages, creating a varying tactile stimulus that is significantly harder for the ADHD brain to categorise as 'known and ignorable.'" },
  { q: "Does it really not wake my partner?", a: "The vibration is delivered through direct skin contact on your wrist. Your partner sleeping inches away will feel nothing. No sound, no bed movement, no screen glow." },
  { q: "How is this different from other vibrating bands?", a: "Three things: motor strength (purpose-built, not repurposed), 5-stage escalation (not 3 fixed levels), and the science. We're the only product backed by the Harvard Cell 2024 research on the tactile awakening pathway." },
  { q: "$99 is expensive for an alarm.", a: "Pavlok costs $128 plus a subscription. An Apple Watch is $400+. SilentNudge is a one-time purchase with no subscription, a 100-night guarantee, and a 2-year warranty." },
  { q: "Is it comfortable to sleep in?", a: "22 grams total. Medical-grade silicone band. Slimmer than a fitness tracker. Most users forget they're wearing it by the third night." },
  { q: "What's your return policy?", a: "100 nights. Wear it, test it, build trust in it. If it doesn't reliably wake you, return it for a full refund. No forms, no restocking fees." },
  { q: "How do I set the alarm?", a: "One button. No phone required, no app, no Bluetooth. Set your wake time directly on the device in about 10 seconds." },
  { q: "What's the warranty?", a: "2-year full warranty. If anything goes wrong, we replace it. No hassle, no fine print." },
];

const FAQPage = () => {
  return (
    <>
      <Section className="pt-10 text-center">
        <Reveal>
          <Label>Frequently Asked Questions</Label>
          <Heading>Before you <Gold>decide.</Gold></Heading>
          <p className="text-[15px] text-muted-foreground mt-3.5 font-light">Everything you need to know about SilentNudge.</p>
        </Reveal>
      </Section>
      <Section className="pt-0 max-w-[720px]">
        <Reveal>
          {faqs.map((f, i) => <Accordion key={i} q={f.q} a={f.a} />)}
        </Reveal>

        {/* CTA after FAQs */}
        <Reveal delay={0.08}>
          <div className="mt-10 p-8 rounded-[18px] text-center" style={{ background: 'hsl(var(--gold) / 0.08)', border: '1px solid hsl(var(--gold) / 0.2)' }}>
            <h3 className="font-display text-[22px] font-medium text-foreground mb-3">Ready to try it?</h3>
            <Link
              to="/product"
              onClick={scrollTop}
              className="inline-flex items-center justify-center gap-2 font-bold text-[15px] px-10 py-4 rounded-full no-underline shadow-gold min-h-[52px]"
              style={{ background: 'hsl(var(--gold))', color: 'hsl(var(--background))' }}
            >
              Shop SilentNudge — $99
            </Link>
            <p className="text-[12px] text-muted-foreground mt-3">
              100-Night Guarantee · Free US Shipping
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="text-center mt-10 p-8 bg-raised rounded-[18px] border border-gold-subtle">
            <p className="text-[15px] text-muted-foreground mb-4">Still have questions?</p>
            <Link to="/contact" onClick={scrollTop} className="inline-flex items-center gap-2 text-sm font-semibold text-gold no-underline border-b pb-0.5" style={{ borderColor: 'hsl(var(--gold) / 0.25)' }}>
              Contact our team <ArrowRight size={14} />
            </Link>
          </div>
        </Reveal>
      </Section>
    </>
  );
};

export default FAQPage;
