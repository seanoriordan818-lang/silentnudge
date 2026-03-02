import { Reveal } from '@/components/Reveal';
import { Label } from '@/components/shared';
import howItWorksGif from '@/assets/how-it-works.gif';

const steps = [
{ num: '01', title: 'Wear It', desc: "Put it on before bed. Soft, slim — you'll forget it's there." },
{ num: '02', title: 'Set It', desc: 'Set your alarm directly on the band. No phone. No app. No pairing.' },
{ num: '03', title: 'Wake Up', desc: "Escalating vibration wakes you through your wrist. Your partner doesn't feel a thing." }];


export const HowItWorksSection = () =>
<section className="bg-white py-12 md:py-20 px-5 md:px-[15px]">
    <div className="max-w-[1200px] mx-auto">
      <Reveal>
        <div className="text-center mb-10 md:mb-14">
          <Label>How It Works</Label>
          <h2 className="font-display text-[clamp(26px,4vw,38px)] leading-[1.15] font-medium text-[#1a1a1a]">
            Set Up in <span style={{ color: 'hsl(var(--gold))' }}>60 Seconds.</span>
          </h2>
        </div>
      </Reveal>

      {/* Single media placeholder */}
      <Reveal delay={0.05}>
        <div className="w-full aspect-video max-w-[800px] mx-auto rounded-[16px] mb-10 md:mb-14 overflow-hidden">
          <img src={howItWorksGif} alt="How to use SilentNudge wristband alarm" className="w-full h-full object-cover rounded-[16px]" />
        </div>
      </Reveal>

      {/* Steps */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-[900px] mx-auto">
        {steps.map((step, i) =>
      <Reveal key={i} delay={i * 0.08}>
            <div className="text-center md:text-left">
              <div className="text-[11px] tracking-[3px] uppercase font-semibold mb-2 text-gold">
                Step {step.num}
              </div>
              <h3 className="font-display text-lg md:text-xl font-semibold text-[#1a1a1a] mb-2">{step.title}</h3>
              <p className="text-sm leading-relaxed text-[#6b6b6b]">{step.desc}</p>
            </div>
          </Reveal>
      )}
      </div>
    </div>
  </section>;