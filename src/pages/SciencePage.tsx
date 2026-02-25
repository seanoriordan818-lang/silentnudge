import { Link } from 'react-router-dom';
import { Reveal } from '@/components/Reveal';
import { Divider, Label, Heading, HeadingSm, Gold, Section } from '@/components/shared';
import { ArrowRight } from 'lucide-react';

const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

const SciencePage = () => {
  return (
    <>
      <Section className="pt-24 text-center">
        <Reveal>
          <Label>The Science Behind SilentNudge</Label>
          <Heading>Why your wrist wakes you better than <Gold>any sound ever could.</Gold></Heading>
          <p className="text-[16px] text-muted-foreground max-w-[600px] mx-auto mt-5 font-light">
            Based on peer-reviewed research including the Harvard Cell study, December 2024 — currently uncited by any competitor in this category.
          </p>
        </Reveal>
      </Section>

      <Section className="pt-0">
        <Reveal>
          <div className="max-w-[720px] mx-auto">
            <h3 className="font-display text-2xl mb-4">The <Gold>100-year assumption</Gold> that was never tested</h3>
            <p className="text-[15px] leading-[1.85] text-muted-foreground font-light mb-4">
              For over a century, the alarm industry operated on a single premise: louder = more reliable. Nobody asked: is sound even the right sensory channel for waking a sleeping brain?
            </p>
            <p className="text-[15px] leading-[1.85] text-muted-foreground font-light">
              In December 2024, Harvard Medical School published research in <em>Cell</em> that identified a mechanism that changes the answer entirely.
            </p>
          </div>
        </Reveal>
      </Section>
      <Divider />

      <Section>
        <Reveal><div className="max-w-[720px] mx-auto"><h3 className="font-display text-2xl mb-4">Two pathways. <Gold>One works better.</Gold></h3></div></Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-[900px] mx-auto mt-6">
          <Reveal delay={0.05}>
            <div className="rounded-[20px] p-9 h-full" style={{ background: 'hsl(0 60% 30% / 0.04)', border: '1px solid hsl(0 60% 40% / 0.1)' }}>
              <div className="text-[11px] tracking-[2px] uppercase font-semibold mb-3.5" style={{ color: 'hsl(0 50% 50% / 0.6)' }}>🔊 Auditory Pathway</div>
              <h4 className="font-display text-xl mb-3" style={{ color: 'hsl(0 50% 50% / 0.7)' }}>Amygdala Hijack</h4>
              <p className="text-sm leading-relaxed text-muted-foreground">Sound triggers your amygdala — the brain's threat detector. Your nervous system floods with cortisol before you're even conscious.</p>
              <div className="mt-4 p-3 rounded-xl" style={{ background: 'hsl(0 60% 30% / 0.05)' }}>
                <p className="text-[12px]" style={{ color: 'hsl(0 50% 50% / 0.5)' }}><strong>The habituation problem:</strong> Your brain learns to ignore repeated sounds during sleep. More alarms ≠ better waking.</p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="bg-gold-faint rounded-[20px] p-9 h-full border border-gold-faint">
              <div className="text-[11px] tracking-[2px] uppercase text-gold-dim font-semibold mb-3.5">✋ Tactile Pathway (SilentNudge)</div>
              <h4 className="font-display text-xl text-gold mb-3">Pacinian Corpuscle Awakening</h4>
              <p className="text-sm leading-relaxed text-muted-foreground">Vibration activates Pacinian corpuscles — deep-pressure receptors that transmit signals through a separate pathway. No threat response, no cortisol spike.</p>
              <div className="mt-4 p-3 rounded-xl" style={{ background: 'hsl(var(--gold) / 0.05)' }}>
                <p className="text-[12px] text-gold-dim"><strong>Habituation resistant:</strong> Escalating vibration patterns are significantly harder for the brain to classify as "known and ignorable."</p>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>
      <Divider />

      <Section>
        <Reveal>
          <div className="max-w-[720px] mx-auto">
            <h3 className="font-display text-2xl mb-4">Why SilentNudge's <Gold>5-stage escalation</Gold> matters</h3>
            <p className="text-[15px] leading-[1.85] text-muted-foreground font-light mb-6">
              A single-intensity vibration can still be habituated to. SilentNudge's escalation varies in both intensity and rhythm across five stages, creating a progressively novel stimulus.
            </p>
            <div className="flex items-end gap-3 justify-center mb-4">
              {[
                { h: 24, l: 'Stage 1', d: 'Gentle' },
                { h: 36, l: 'Stage 2', d: 'Rhythmic' },
                { h: 48, l: 'Stage 3', d: 'Firm' },
                { h: 62, l: 'Stage 4', d: 'Strong' },
                { h: 80, l: 'Stage 5', d: 'Maximum' },
              ].map((s, i) => (
                <div key={i} className="text-center">
                  <div className="w-10 rounded-lg mx-auto mb-2 animate-bar-pulse" style={{ height: s.h, background: `linear-gradient(to top, hsl(var(--gold) / ${0.12 + i * 0.1}), hsl(var(--gold) / ${0.25 + i * 0.14}))`, animationDelay: `${i * 0.15}s` }} />
                  <div className="text-[10px] text-gold-dim font-semibold">{s.l}</div>
                  <div className="text-[9px] text-faint">{s.d}</div>
                </div>
              ))}
            </div>
            <p className="text-sm text-faint text-center italic font-serif">Most users wake at Stage 1–2. Stages 4–5 are for the deepest 5% of sleepers.</p>
          </div>
        </Reveal>
      </Section>
      <Divider />

      <Section className="text-center">
        <Reveal>
          <div className="p-10 bg-raised rounded-[20px] border border-gold-subtle max-w-[600px] mx-auto">
            <p className="font-serif italic text-[16px] leading-relaxed" style={{ color: 'hsl(0 0% 100% / 0.65)' }}>
              "The alarm industry optimised for the lightest sleepers and sold to everyone else as if they were broken."
            </p>
            <div className="w-9 h-px bg-primary mx-auto my-5 opacity-30" />
            <Link to="/product" onClick={scrollTop} className="inline-flex items-center gap-2 text-sm font-semibold text-gold no-underline">
              Experience the difference — Shop SilentNudge <ArrowRight size={14} />
            </Link>
          </div>
        </Reveal>
      </Section>

      {/* CTA Section */}
      <Section className="text-center pb-20">
        <Reveal>
          <h2 className="font-display text-[clamp(26px,4vw,38px)] leading-[1.15] font-medium mb-5">
            Ready to wake up <span className="text-gold">differently?</span>
          </h2>
          <Link
            to="/product"
            onClick={scrollTop}
            className="inline-flex items-center justify-center gap-2 font-bold text-[15px] px-10 py-4 rounded-full no-underline shadow-gold min-h-[52px]"
            style={{ background: 'hsl(var(--gold))', color: 'hsl(var(--background))' }}
          >
            Shop SilentNudge — $99
          </Link>
          <p className="text-[12px] text-muted-foreground mt-4">
            100-Night Guarantee · Free US Shipping · 2-Year Warranty
          </p>
        </Reveal>
      </Section>
    </>
  );
};

export default SciencePage;
