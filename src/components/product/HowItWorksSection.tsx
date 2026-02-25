import { Reveal } from '@/components/Reveal';
import { Label } from '@/components/shared';

const steps = [
  { num: '01', title: 'Wear It', desc: "Put it on before bed. Soft, slim — you'll forget it's there." },
  { num: '02', title: 'Set It', desc: 'Set your alarm directly on the band. No phone. No app. No pairing.' },
  { num: '03', title: 'Wake Up', desc: 'Gentle escalating vibration wakes you through your wrist. Your partner sleeps on.' },
];

export const HowItWorksSection = () => (
  <section className="bg-white py-16 md:py-20 px-5 md:px-7">
    <div className="max-w-[1200px] mx-auto">
      <Reveal>
        <div className="text-center mb-10 md:mb-14">
          <Label>How It Works</Label>
          <h2 className="font-display text-[clamp(26px,4vw,38px)] leading-[1.15] font-medium text-primary-foreground">
            Set Up in <span style={{ color: 'hsl(var(--gold))' }}>60 Seconds.</span>
          </h2>
        </div>
      </Reveal>

      {/* Single media placeholder */}
      <Reveal delay={0.05}>
        <div
          className="w-full aspect-video max-w-[800px] mx-auto rounded-[16px] mb-10 md:mb-14 flex items-center justify-center"
          style={{
            background: 'hsl(var(--background))',
            border: '2px dashed hsl(var(--gold) / 0.4)',
          }}
        >
          <p className="text-sm text-muted-foreground text-center px-6 max-w-[500px] leading-relaxed">
            [ GIF/IMAGE PLACEHOLDER — how to use visual, e.g. wrist wearing band or alarm being set on display. Easy to swap. ]
          </p>
        </div>
      </Reveal>

      {/* Steps */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-[900px] mx-auto">
        {steps.map((step, i) => (
          <Reveal key={i} delay={i * 0.08}>
            <div className="text-center md:text-left">
              <div className="text-[11px] tracking-[3px] uppercase font-semibold mb-2" style={{ color: 'hsl(var(--gold) / 0.7)' }}>
                Step {step.num}
              </div>
              <h3 className="font-display text-lg md:text-xl font-semibold text-primary-foreground mb-2">{step.title}</h3>
              <p className="text-sm leading-relaxed text-primary-foreground/60">{step.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
