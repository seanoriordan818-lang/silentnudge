import { Link } from 'react-router-dom';
import { Reveal } from '@/components/Reveal';
import { Divider, Label, Heading, Gold, Section } from '@/components/shared';
import { ArrowRight } from 'lucide-react';

const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

const StoryPage = () => {
  return (
    <>
      <Section className="pt-24">
        <Reveal>
          <div className="max-w-[720px] mx-auto text-center">
            <Label>Our Story</Label>
            <Heading>We didn't set out to build an <Gold>alarm company.</Gold></Heading>
          </div>
        </Reveal>
      </Section>

      <Section className="pt-0">
        <div className="max-w-[680px] mx-auto">
          {[
            "We set out to answer one question: why do millions of people start every single day with a stress response their body was never designed to handle?",
            "The answer led us to sleep science, neurological pathways, and a conviction that the alarm clock industry had failed a massive population of people.",
            "Nobody asked: what if the sensory channel itself is the problem?",
            "In December 2024, Harvard Medical School published research in Cell that confirmed what we'd already suspected.",
          ].map((text, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <p className="text-[16px] leading-[1.9] text-muted-foreground font-light mb-5">{text}</p>
            </Reveal>
          ))}
          <Reveal delay={0.2}>
            <p className="font-display italic text-xl text-gold leading-relaxed mb-5">
              SilentNudge is what happens when you design an alarm for how bodies actually work — not how the industry assumed they should.
            </p>
          </Reveal>

          <Divider />

          <Reveal delay={0.1}>
            <h3 className="font-display text-[22px] mt-10 mb-4">The people we build for</h3>
            {[
              { who: 'Couples', text: 'where one partner rises early — and the alarm has become a source of daily friction.' },
              { who: 'Deep sleepers', text: "who've tried everything and been told they're lazy." },
              { who: 'Deaf & Hard of Hearing', text: '— 16M+ Americans who need a portable solution that works anywhere.' },
              { who: 'Adults with ADHD', text: '— whose brains habituate to repeated stimuli faster.' },
            ].map((p, i) => (
              <p key={i} className="text-[16px] leading-[1.9] text-muted-foreground font-light mb-3">
                <strong className="text-foreground">{p.who}</strong> {p.text}
              </p>
            ))}
          </Reveal>

          <Reveal delay={0.15}>
            <div className="p-8 bg-raised rounded-[18px] border border-gold-subtle mt-8">
              <p className="font-serif italic text-[15px] leading-relaxed" style={{ color: 'hsl(0 0% 100% / 0.6)' }}>
                "You are selling a marriage, a morning, a muscle, and a movement. The wristband is the vehicle. The life it protects is the destination."
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="text-center mt-12">
              <Link to="/product" onClick={scrollTop} className="inline-flex items-center gap-2.5 bg-primary text-primary-foreground font-bold text-sm px-8 py-4 rounded-full no-underline shadow-gold">
                Shop SilentNudge — $99 <ArrowRight size={16} />
              </Link>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
};

export default StoryPage;
