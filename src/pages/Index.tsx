import { Link } from 'react-router-dom';
import { Reveal } from '@/components/Reveal';
import { ProductCircle } from '@/components/ProductCircle';
import { Divider, Label, Heading, HeadingSm, Gold, Section, Stars } from '@/components/shared';
import { Check, ArrowRight, Shield, Truck, RefreshCw } from 'lucide-react';

const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

const HomePage = () => {
  return (
    <>
      {/* HERO */}
      <section className="min-h-screen flex items-center pt-[68px] relative overflow-hidden">
        <div className="absolute top-[8%] right-[-4%] w-[450px] h-[450px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, hsl(var(--gold) / 0.035) 0%, transparent 70%)' }} />
        <div className="max-w-[1200px] mx-auto w-full px-7 py-12 md:py-[50px]">
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-[60px]">
            <div className="flex-[1.3] text-center md:text-left">
              <div className="inline-flex items-center gap-2.5 bg-gold-faint border border-gold-faint rounded-full py-[7px] px-[18px] mb-8 animate-fade-up">
                <span className="w-[5px] h-[5px] rounded-full bg-primary animate-breathe" />
                <span className="text-[10px] tracking-[2.5px] uppercase text-gold-dim font-medium">Backed by Harvard Research · December 2024</span>
              </div>
              <h1 className="font-display text-[clamp(34px,5.5vw,56px)] leading-[1.08] font-medium mb-6 animate-fade-up" style={{ animationDelay: '0.15s' }}>
                Wake <Gold>only you.</Gold><br />Never miss.<br />No panic.
              </h1>
              <p className="text-[17px] leading-relaxed text-muted-foreground max-w-[500px] mb-9 font-light animate-fade-up mx-auto md:mx-0" style={{ animationDelay: '0.3s' }}>
                The first alarm engineered for how your brain actually wakes up. Vibration so precise your partner won't know it happened.
              </p>
              <div className="flex gap-3.5 flex-wrap justify-center md:justify-start animate-fade-up" style={{ animationDelay: '0.42s' }}>
                <Link to="/product" onClick={scrollTop} className="inline-flex items-center gap-2.5 bg-primary text-primary-foreground font-bold text-sm px-8 py-4 rounded-full no-underline shadow-gold transition-all">
                  Shop SilentNudge — $99 <ArrowRight size={16} />
                </Link>
                <Link to="/science" onClick={scrollTop} className="inline-flex items-center gap-2 border border-gold-faint text-gold-dim font-medium text-[13px] px-6 py-[15px] rounded-full no-underline">
                  The science
                </Link>
              </div>
              <div className="flex gap-6 mt-8 animate-fade-up flex-wrap justify-center md:justify-start" style={{ animationDelay: '0.55s' }}>
                {['Free shipping', '100-night trial', '2-year warranty'].map((t, i) => (
                  <span key={i} className="text-[11px] text-faint flex items-center gap-1.5">
                    <Check size={14} className="text-gold" /> {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex-1 flex justify-center animate-fade-up order-first md:order-last" style={{ animationDelay: '0.3s' }}>
              <div className="animate-float">
                <ProductCircle size={300} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="border-t border-b py-3.5 overflow-hidden whitespace-nowrap" style={{ borderColor: 'hsl(var(--gold) / 0.06)', background: 'hsl(var(--gold) / 0.012)' }}>
        <div className="inline-flex animate-marquee">
          {[...Array(3)].flatMap(() => ['Purpose-Built Wake Motor', '7+ Day Battery', 'Standalone Operation', '5-Stage Escalation', '22g Ultralight', 'USB Charging', '100-Night Guarantee']).map((t, i) => (
            <span key={i} className="inline-flex items-center gap-2 px-9 text-[12px] tracking-[1.5px] uppercase" style={{ color: 'hsl(var(--gold) / 0.4)' }}>
              <span className="w-1 h-1 rounded-full" style={{ background: 'hsl(var(--gold) / 0.25)' }} />{t}
            </span>
          ))}
        </div>
      </div>

      {/* BRAND STATEMENT */}
      <Section>
        <Reveal>
          <div className="max-w-[760px] mx-auto text-center">
            <p className="font-display italic text-[clamp(18px,2.8vw,26px)] leading-[1.55]" style={{ color: 'hsl(0 0% 100% / 0.65)' }}>
              "For over a century, alarm clocks operated on one principle — <Gold>volume equals reliability.</Gold> That premise was never tested against the full range of human sleep biology."
            </p>
            <div className="w-9 h-px bg-primary mx-auto my-7 opacity-30" />
            <p className="text-[12px] tracking-[2px] uppercase text-faint">The people left behind weren't broken. They were customers nobody designed for.</p>
          </div>
        </Reveal>
      </Section>
      <Divider />

      {/* SCIENCE TEASER */}
      <Section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <Reveal>
            <Label>The Mechanism</Label>
            <HeadingSm>Your wrist wakes you through a <Gold>different neurological pathway.</Gold></HeadingSm>
            <p className="text-[15px] leading-relaxed text-muted-foreground my-5 font-light">
              Sound alarms trigger your amygdala — your brain's threat detector. Tactile vibration on the wrist engages Pacinian corpuscles — a direct route to arousal centres that bypasses the auditory habituation loop entirely.
            </p>
            <Link to="/science" onClick={scrollTop} className="inline-flex items-center gap-2 text-[13px] font-semibold text-gold no-underline border-b pb-0.5" style={{ borderColor: 'hsl(var(--gold) / 0.25)' }}>
              Read the full science <ArrowRight size={14} />
            </Link>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="bg-raised border border-gold-subtle rounded-[20px] p-8 md:p-10">
              <div className="grid grid-cols-2 gap-7">
                {[
                  { label: 'Sound Alarm', desc: 'Amygdala hijack', sub: 'Threat response → cortisol spike', bad: true },
                  { label: 'SilentNudge', desc: 'Tactile pathway', sub: 'Gentle arousal → calm waking', bad: false },
                ].map((item, i) => (
                  <div key={i}>
                    <div className={`text-[10px] tracking-[2px] uppercase mb-2.5 font-semibold ${item.bad ? 'text-destructive/60' : 'text-gold-dim'}`}>{item.label}</div>
                    <div className={`text-[17px] font-display font-medium mb-1.5 ${item.bad ? 'text-destructive/70' : 'text-gold'}`}>{item.desc}</div>
                    <p className="text-[12px] leading-relaxed text-faint">{item.sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </Section>
      <Divider />

      {/* FEATURES */}
      <Section>
        <Reveal>
          <div className="text-center mb-13">
            <Label>Engineered for One Job</Label>
            <HeadingSm>Everything a wake-up device needs. <Gold>Nothing it doesn't.</Gold></HeadingSm>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
          {[
            { icon: '📳', title: 'Purpose-Built Wake Motor', sub: '5-stage escalating vibration. Bed-shaker power on your wrist.', num: '01' },
            { icon: '🔋', title: '7+ Day Battery', sub: 'Charge once a week. USB cable. Low-battery alert at 20%.', num: '02' },
            { icon: '🌐', title: 'Fully Standalone', sub: 'No phone. No app. No Bluetooth. Set it, wear it, trust it.', num: '03' },
            { icon: '🛡️', title: '100-Night Guarantee', sub: 'Wake-up reliability or your money back. No forms. No friction.', num: '04' },
          ].map((f, i) => (
            <Reveal key={i} delay={i * 0.07}>
              <div className="p-8 rounded-[18px] bg-raised border border-gold-subtle h-full transition-colors hover:border-gold-faint">
                <div className="text-[11px] font-semibold mb-4" style={{ color: 'hsl(var(--gold) / 0.2)' }}>{f.num}</div>
                <div className="text-2xl mb-4">{f.icon}</div>
                <h3 className="text-[15px] font-semibold mb-2">{f.title}</h3>
                <p className="text-[13px] leading-relaxed text-muted-foreground font-light">{f.sub}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
      <Divider />

      {/* WHO IT'S FOR */}
      <Section>
        <Reveal>
          <div className="text-center mb-12">
            <Label>Built for You</Label>
            <HeadingSm>One product. <Gold>Four lives it transforms.</Gold></HeadingSm>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { emoji: '💑', label: 'Couples', hook: "Stop being the alarm villain.", body: "Your partner sleeps. You wake up. Zero guilt, zero apology." },
            { emoji: '😴', label: 'Deep Sleepers', hook: "You're not broken.", body: "Your brain habituates to sound. Vibration uses a pathway it can't learn to ignore." },
            { emoji: '🤟', label: 'Deaf / HOH', hook: "Independence you wear.", body: "Every hotel, every morning. No bed shaker. No front desk. Just your wrist." },
            { emoji: '⚡', label: 'ADHD', hook: "One alarm. That works.", body: "Escalating vibration resists the ADHD habituation loop." },
          ].map((a, i) => (
            <Reveal key={i} delay={i * 0.07}>
              <div className="p-7 rounded-[18px] bg-raised border border-gold-subtle h-full transition-colors hover:border-gold-faint">
                <div className="text-[28px] mb-3">{a.emoji}</div>
                <div className="text-[11px] tracking-[2px] uppercase text-gold-dim font-semibold mb-2">{a.label}</div>
                <h3 className="font-display text-[17px] font-medium mb-2.5">{a.hook}</h3>
                <p className="text-[13px] leading-relaxed text-muted-foreground font-light">{a.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
      <Divider />

      {/* CTA */}
      <Section className="text-center relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, hsl(var(--gold) / 0.03), transparent)' }} />
        <Reveal>
          <Label>Your Last Bad Morning</Label>
          <Heading className="mb-4">This morning's alarm is the last one that has to be <Gold>the wrong one.</Gold></Heading>
          <p className="text-[16px] text-muted-foreground max-w-[500px] mx-auto mb-8 font-light">
            The wristband is the vehicle. The life it protects is the destination.
          </p>
          <Link to="/product" onClick={scrollTop} className="inline-flex items-center gap-2.5 bg-primary text-primary-foreground font-bold text-[15px] px-10 py-[17px] rounded-full no-underline shadow-gold">
            Order SilentNudge — $99 <ArrowRight size={16} />
          </Link>
        </Reveal>
      </Section>

      {/* GUARANTEE BAR */}
      <div className="bg-gold-faint border-t border-b py-[18px] px-7 text-center" style={{ borderColor: 'hsl(var(--gold) / 0.08)' }}>
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <Shield size={20} className="text-gold" />
          <span className="font-display text-[16px]">100-Night <Gold>"Wake-Up Reliability"</Gold> Guarantee</span>
          <span className="text-[13px] text-muted-foreground">— it works, or it's free.</span>
        </div>
      </div>
    </>
  );
};

export default HomePage;
