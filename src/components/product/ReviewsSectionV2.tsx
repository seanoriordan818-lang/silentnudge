import { Reveal } from '@/components/Reveal';
import { Label, Stars } from '@/components/shared';
import { Play } from 'lucide-react';

const reviews = [
{
  tag: 'Couples',
  quote: "My husband starts work at 5am. I don't have to be up until 7:30. For two years I woke up with him every single morning. First week with this I slept straight through. I actually cried.",
  name: 'Sarah M.',
  init: 'S'
},
{
  tag: 'Deep Sleeper',
  quote: "Deeply sceptical at $99. I'm a heavy sleeper, nothing wakes me. By night three the escalating pattern got through. My wife hasn't been disturbed once.",
  name: 'David K.',
  init: 'D'
},
{
  tag: 'ADHD',
  quote: "I've been setting 9 alarms every night since college. It's been 6 weeks and I've set one alarm every single day. One.",
  name: 'Jake T.',
  init: 'J'
},
{
  tag: 'Shift Worker',
  quote: "I'm a nurse on rotating shifts. I've woken my flatmates up more times than I can count. This solved a problem I thought I just had to live with.",
  name: 'Chloe R.',
  init: 'C'
}];


export const ReviewsSectionV2 = () =>
<section className="bg-white md:py-20 px-5 md:px-7 py-[30px]">
    <div className="max-w-[1200px] mx-auto">
      <Reveal>
        <div className="text-center mb-10 md:mb-12">
          <Label>Reviews</Label>
          <h2 className="font-display text-[clamp(26px,4vw,38px)] leading-[1.15] font-medium text-[#1a1a1a]">
            30,000+ People Waking Up <span style={{ color: 'hsl(var(--gold))' }}>Differently.</span>
          </h2>
          <div className="flex items-center justify-center gap-2 mt-4">
            <Stars />
            <span className="text-sm text-[#6b6b6b]">4.8/5</span>
          </div>
        </div>
      </Reveal>

      {/* 2x2 grid on desktop, single column on mobile */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[900px] mx-auto">
        {reviews.map((r, i) =>
      <Reveal key={i} delay={i * 0.06}>
            <div
          className="p-6 rounded-[16px] bg-white border border-[hsl(var(--light-border))] shadow-card-light">

              <div className="flex items-center gap-3 mb-4">
                {/* Avatar placeholder */}
                <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold text-gold font-display flex-shrink-0"
              style={{ background: 'hsl(var(--background))' }}>

                  {r.init}
                </div>
                <div>
                  <div className="text-[13px] font-semibold text-[#1a1a1a]">{r.name}</div>
                  <div className="text-[10px] text-[#6b6b6b]">Verified Buyer</div>
                </div>
                <span className="ml-auto text-[10px] tracking-[1px] uppercase font-semibold px-2.5 py-1 rounded-full text-gold" style={{ background: 'hsl(var(--gold) / 0.15)', border: '1px solid hsl(var(--gold) / 0.3)' }}>
                  {r.tag}
                </span>
              </div>
              <div className="mb-3"><Stars /></div>
              <p className="font-serif italic text-sm leading-7 text-[#6b6b6b]">"{r.quote}"</p>
            </div>
          </Reveal>
      )}
      </div>

      {/* Video placeholder */}
      <Reveal delay={0.3}>
        <div
        className="mt-10 max-w-[800px] mx-auto aspect-video rounded-[16px] flex flex-col items-center justify-center gap-3"
        style={{
          background: 'hsl(var(--background))',
          border: '2px dashed hsl(var(--gold) / 0.3)'
        }}>

          <div className="w-14 h-14 rounded-full bg-gold/[0.15] flex items-center justify-center">
            <Play size={24} className="text-gold ml-1" />
          </div>
          <p className="text-xs text-muted-foreground text-center px-6 max-w-[400px] leading-relaxed">
            [ UGC VIDEO REVIEW — 30–60 sec, real customer, iPhone-style. Add when available. ]
          </p>
        </div>
      </Reveal>
    </div>
  </section>;