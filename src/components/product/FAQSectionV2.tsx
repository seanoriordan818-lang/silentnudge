import { Reveal } from '@/components/Reveal';
import { Label } from '@/components/shared';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const faqs = [
  {
    q: 'Will it actually wake me if I\'m a very deep sleeper?',
    a: "Yes — that's exactly who it's designed for. The 5-stage escalation pattern starts gentle and builds in intensity, using a different neurological pathway to sound. It reaches your brain before habituation kicks in. If it doesn't wake you within 100 nights, full refund.",
  },
  {
    q: 'Why not just use my Apple Watch?',
    a: "Apple Watch haptics are designed for notifications, not waking deep sleepers. They're a single fixed pulse — your brain habituates to it within days. SilentNudge uses an escalating motor built specifically for sleep arousal. It's not comparable.",
  },
  {
    q: 'Will my partner feel the vibration?',
    a: 'No. The vibration is delivered directly to your wrist through skin contact. It is imperceptible to anyone not wearing the band — even a partner sleeping in contact with you.',
  },
  {
    q: 'Does it need my phone or an app?',
    a: 'Never. Set the alarm directly on the band display. It operates completely standalone — no Bluetooth, no Wi-Fi, no phone. It works whether your phone is on, off, or in another room.',
  },
  {
    q: 'How do I charge it?',
    a: 'Remove the display unit from the wristband and plug it directly into any standard USB port. No cable required. Takes around 1 hour to fully charge, lasts 14+ days.',
  },
  {
    q: 'What if it stops working or breaks?',
    a: 'We cover it. 100-night guarantee plus product warranty. Contact us and we sort it — no lengthy process.',
  },
];

export const FAQSectionV2 = () => (
  <section className="bg-white py-16 md:py-20 px-5 md:px-7">
    <div className="max-w-[700px] mx-auto">
      <Reveal>
        <div className="text-center mb-10 md:mb-12">
          <Label>FAQ</Label>
          <h2 className="font-display text-[clamp(24px,3.5vw,36px)] leading-[1.15] font-medium text-[#1a1a1a]">
            Questions We Get <span style={{ color: 'hsl(var(--gold))' }}>Every Day.</span>
          </h2>
        </div>
      </Reveal>

      <Reveal delay={0.05}>
        <Accordion type="single" collapsible defaultValue="item-0">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-b border-[hsl(var(--light-border))]">
              <AccordionTrigger className="text-[15px] text-[#1a1a1a] font-medium text-left py-5 hover:no-underline [&>svg]:text-gold">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-7 text-[#6b6b6b] pb-5">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>
    </div>
  </section>
);
