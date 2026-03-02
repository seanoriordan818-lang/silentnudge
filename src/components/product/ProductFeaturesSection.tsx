import { Reveal } from '@/components/Reveal';
import { Label } from '@/components/shared';

/* Inline escalation bar chart */
const EscalationChart = () =>
<div className="flex items-end gap-2 justify-center h-full py-6">
    {[
  { h: 24, l: 'Stage 1', d: 'Gentle' },
  { h: 36, l: 'Stage 2', d: 'Rhythmic' },
  { h: 48, l: 'Stage 3', d: 'Firm' },
  { h: 62, l: 'Stage 4', d: 'Strong' },
  { h: 80, l: 'Stage 5', d: 'Maximum' }].
  map((s, i) =>
  <div key={i} className="text-center">
        <div
      className="w-8 sm:w-10 rounded-lg mx-auto mb-2 animate-bar-pulse"
      style={{
        height: s.h,
        background: `linear-gradient(to top, hsl(var(--gold) / ${0.12 + i * 0.1}), hsl(var(--gold) / ${0.25 + i * 0.14}))`,
        animationDelay: `${i * 0.15}s`
      }} />

        <div className="text-[9px] sm:text-[10px] text-gold-dim font-semibold">{s.l}</div>
        <div className="text-[8px] sm:text-[9px] text-faint">{s.d}</div>
      </div>
  )}
  </div>;


/* Pathway comparison mini cards */
const PathwayComparison = () =>
<div className="flex gap-2 h-full py-4 px-2">
    {/* Auditory (dimmed) */}
    <div className="flex-1 rounded-xl p-3" style={{ background: 'hsl(0 60% 30% / 0.08)', border: '1px solid hsl(0 60% 40% / 0.15)' }}>
      <div className="text-[9px] font-bold uppercase tracking-wider mb-2" style={{ color: 'hsl(0 50% 50% / 0.6)' }}>🔊 Sound</div>
      <div className="text-[10px] leading-snug text-center" style={{ color: 'hsl(0 50% 50% / 0.5)' }}>
        Sound<br/>↓<br/>Amygdala<br/>↓<br/>Cortisol spike<br/>↓<br/>Stress wake-up
      </div>
    </div>
    {/* Tactile (highlighted) */}
    <div className="flex-1 rounded-xl p-3 bg-gold/[0.08]" style={{ border: '1px solid hsl(var(--gold) / 0.25)' }}>
      <div className="text-[9px] font-bold uppercase tracking-wider text-gold mb-2">✋ Vibration</div>
      <div className="text-[10px] leading-snug text-gold-dim text-center">
        Vibration<br/>↓<br/>Pacinian corpuscles<br/>↓<br/>Calm arousal<br/>↓<br/>Gentle wake-up
      </div>
    </div>
  </div>;const features = [{ visual: <EscalationChart />, title: '5-Stage Escalation Motor', desc: "Starts soft. Gets serious. Impossible to sleep through — even if you've failed with vibrating alarms before.", note: 'Most users wake at Stage 1–2. Stages 4–5 are for the deepest 5% of sleepers.' }, { visual: <PathwayComparison />, title: 'Your Wrist Wakes You Better Than Your Ears.', desc: "Two pathways. One works better. Based on Harvard Medical School research, Cell journal, December 2024.", note: null }, { placeholder: '[ PRODUCT DETAIL SHOT — macro close-up of band on wrist ]', title: '22 Grams. Forget It\'s There.', desc: "Medical-grade silicone. Slimmer than a fitness tracker. Most users forget they're wearing it by night three.", note: null }, { placeholder: '[ PRODUCT DETAIL SHOT — USB charging, no cable ]', title: 'Charges in an Hour. Lasts Two Weeks.', desc: "Remove the display, plug directly into any USB port. No cable required. 14+ days between charges.", note: null }];export const ProductFeaturesSection = () => <section className="bg-background px-5 md:px-0 md:py-[30px] py-[30px]">
    <div className="max-w-[1200px] mx-auto">
      <Reveal>
        <div className="text-center mb-10 md:mb-14">
          <Label>Features</Label>
          <h2 className="font-display text-[clamp(24px,3.5vw,36px)] leading-[1.15] font-medium">
            Built for One Job. Does It <span className="text-gold">Better Than Anything Else.</span>
          </h2>
        </div>
      </Reveal>

      {/* Horizontally scrollable on mobile, grid on desktop */}
      <div className="flex md:grid md:grid-cols-4 gap-4 md:gap-5 overflow-x-auto scrollbar-hide pb-2 -mx-5 px-5 md:mx-0 md:px-0">
        {features.map((f, i) => <Reveal key={i} delay={i * 0.08}>
            <div className="min-w-[260px] md:min-w-0 flex-shrink-0 md:flex-shrink">
              {/* Visual or placeholder */}
              <div className="w-full aspect-[4/3] rounded-[14px] mb-4 flex items-center justify-center overflow-hidden" style={{ background: 'hsl(252 18% 12.5%)', border: f.visual ? '1px solid hsl(var(--gold) / 0.15)' : '2px dashed hsl(var(--gold) / 0.35)' }}>

                {f.visual ? f.visual : <p className="text-[11px] text-muted-foreground text-center px-4 leading-relaxed max-w-[220px]">
                    {f.placeholder}
                  </p>}
              </div>
              <h3 className="font-display text-lg font-semibold mb-2 text-foreground">{f.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
              {f.note && <p className="text-[12px] text-faint italic font-serif mt-2">{f.note}</p>}
            </div>
          </Reveal>
      )}
      </div>
    </div>
  </section>;