import { Reveal } from '@/components/Reveal';
import { Label } from '@/components/shared';

const features = [
  {
    placeholder: '[ PRODUCT DETAIL SHOT — macro close-up of band texture or motor ]',
    title: '5-Stage Escalation Motor',
    desc: "Starts soft. Gets serious. Impossible to sleep through — even if you've failed with vibrating alarms before.",
  },
  {
    placeholder: '[ DISPLAY CLOSE-UP — finger setting alarm time on band display ]',
    title: 'Set In Seconds',
    desc: 'Press. Set. Sleep. Remove the display, plug directly into any standard USB port to charge.',
  },
  {
    placeholder: '[ COMFORT LIFESTYLE — band on wrist, dark bedroom, pillow beside ]',
    title: '14+ Day Battery',
    desc: "Charge once at the start of the fortnight. Wear it every night. Never think about it again.",
  },
];

export const ProductFeaturesSection = () => (
  <section className="bg-background py-16 md:py-20 px-5 md:px-7">
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
      <div className="flex md:grid md:grid-cols-3 gap-5 overflow-x-auto scrollbar-hide pb-2 -mx-5 px-5 md:mx-0 md:px-0">
        {features.map((f, i) => (
          <Reveal key={i} delay={i * 0.08}>
            <div className="min-w-[280px] md:min-w-0 flex-shrink-0 md:flex-shrink">
              {/* Image placeholder */}
              <div
                className="w-full aspect-[4/3] rounded-[14px] mb-5 flex items-center justify-center"
                style={{
                  background: 'hsl(252 18% 12.5%)',
                  border: '2px dashed hsl(var(--gold) / 0.35)',
                }}
              >
                <p className="text-[11px] text-muted-foreground text-center px-4 leading-relaxed max-w-[220px]">
                  {f.placeholder}
                </p>
              </div>
              <h3 className="font-display text-lg font-semibold mb-2 text-foreground">{f.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
