import { Link } from 'react-router-dom';
import { Check, ArrowRight, Zap, Brain, Wifi } from 'lucide-react';
import heroLifestyle from '@/assets/hero-lifestyle.png';

const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

const StarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="hsl(38, 55%, 65%)" className="inline-block">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const Stars5 = () => (
  <span className="inline-flex gap-0.5">
    {[...Array(5)].map((_, i) => <StarIcon key={i} />)}
  </span>
);

const reviews = [
  {
    quote: "My husband starts work at 5am. I don't have to be up until 7:30. First week with this I slept straight through. I actually cried.",
    name: "Sarah M.",
  },
  {
    quote: "I have ADHD and I've been setting 9 alarms every night since college. It's been 6 weeks and I've set one alarm every single day. One.",
    name: "Jake T.",
  },
  {
    quote: "Bought it after my partner told me my alarm was affecting our relationship. Three months in, mornings are completely different in our house.",
    name: "Aoife B.",
  },
];

const HomePage = () => {
  return (
    <>
      {/* STEP 3 — HERO SECTION */}
      <section style={{ background: 'linear-gradient(180deg, hsl(220 30% 8%) 0%, hsl(var(--background)) 100%)' }}>
        <div className="max-w-[1200px] mx-auto w-full">
          <div className="flex flex-col lg:flex-row">
            {/* Hero Image Placeholder */}
            <div className="w-full lg:w-[55%] min-h-[420px] lg:min-h-[600px] relative overflow-hidden">
              <img src={heroLifestyle} alt="Man waking up with SilentNudge wristband while partner sleeps peacefully" className="w-full h-full object-cover absolute inset-0" />
            </div>

            {/* Hero Copy */}
            <div className="w-full lg:w-[45%] px-5 sm:px-8 lg:px-10 py-8 lg:py-12 flex flex-col justify-center">
              {/* Star rating */}
              <div className="mb-5">
                <Stars5 />
                <p className="text-[12px] text-gold-dim mt-1.5">Trusted by 30,000+ light sleepers, deep sleepers & early risers</p>
              </div>

              {/* Headline */}
              <h1 className="font-display text-[clamp(26px,5vw,40px)] leading-[1.12] font-medium text-foreground mb-4">
                Wake Up Without Making a Sound. Without Stress. Without Guilt.
              </h1>

              {/* Subheadline */}
              <p className="text-[15px] leading-relaxed text-muted-foreground mb-6 font-light">
                A neuroscience-designed vibration alarm that wakes you through touch — not noise. Your partner sleeps through every morning.
              </p>

              {/* Benefit bullets */}
              <ul className="space-y-2.5 mb-7">
                {[
                  'Vibrates your wrist — your partner sleeps through it',
                  '5-stage escalation wakes even the deepest sleepers',
                  'Standalone — no phone, no app, no Bluetooth required',
                  '14+ day battery · Standard USB charging',
                ].map((b, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-[14px] text-foreground/85">
                    <Check size={16} className="text-gold mt-0.5 shrink-0" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              {/* CTAs */}
              <Link
                to="/product"
                onClick={scrollTop}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-bold text-[15px] px-8 py-4 rounded-full no-underline shadow-gold text-center min-h-[52px]"
              >
                Shop Now
              </Link>
              <Link
                to="/science"
                onClick={scrollTop}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border font-semibold text-[14px] px-8 py-3.5 rounded-full no-underline mt-3 text-center min-h-[48px] text-muted-foreground"
                style={{ borderColor: 'hsl(var(--gold) / 0.2)' }}
              >
                See How It Works
              </Link>

              {/* Reassurance */}
              <p className="text-[11px] text-faint mt-4 text-center sm:text-left">
                100-Night Guarantee · Free US Shipping · 30,000+ Happy Customers
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* STEP 4 — SOCIAL PROOF STRIP */}
      <section className="py-10 px-5" style={{ background: 'hsl(220 20% 10%)' }}>
        <div className="max-w-[1200px] mx-auto">
          <div className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide">
            {reviews.map((r, i) => (
              <div
                key={i}
                className="min-w-[300px] sm:min-w-[340px] flex-1 snap-start rounded-2xl p-6 border"
                style={{ background: 'hsl(220 18% 13%)', borderColor: 'hsl(var(--gold) / 0.08)' }}
              >
                <Stars5 />
                <p className="text-[14px] leading-relaxed text-foreground/85 mt-3 mb-4 font-light italic">
                  "{r.quote}"
                </p>
                <p className="text-[13px] font-semibold text-foreground">
                  — {r.name}, <span className="text-gold-dim font-normal">Verified Buyer</span>
                </p>
                <p className="text-[10px] text-faint mt-2 uppercase tracking-wider opacity-40">
                  [ Placeholder — Replace with real photo reviews ]
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STEP 5 + 6 — HOW IT WORKS / BENEFITS */}
      <section className="py-14 px-5" style={{ background: 'hsl(220 15% 96%)' }}>
        <div className="max-w-[1200px] mx-auto">
          <h2 className="font-display text-[clamp(22px,3.5vw,32px)] leading-[1.15] font-medium text-center mb-10" style={{ color: 'hsl(220 20% 12%)' }}>
            The First Alarm Designed for How Your Body Actually Works.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <Zap size={28} />,
                title: 'Wakes You. Not the Room.',
                body: '5-stage vibration escalation travels through deep-pressure nerve receptors in your wrist. Zero sound. Zero disruption.',
              },
              {
                icon: <Brain size={28} />,
                title: 'No Stress Response.',
                body: 'Sound alarms shock your brain awake. SilentNudge bypasses the cortisol spike entirely. You wake calm.',
              },
              {
                icon: <Wifi size={28} />,
                title: 'No Phone. No App. No Failure.',
                body: 'Set it directly on the band. 14+ day battery. Standard USB charging. It works whether your phone is on or off.',
              },
            ].map((f, i) => (
              <div key={i} className="rounded-2xl p-7 text-center" style={{ background: 'white', boxShadow: '0 2px 16px hsl(220 20% 12% / 0.06)' }}>
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-4" style={{ background: 'hsl(38 55% 65% / 0.12)', color: 'hsl(38 55% 55%)' }}>
                  {f.icon}
                </div>
                <h3 className="text-[16px] font-semibold mb-2" style={{ color: 'hsl(220 20% 12%)' }}>{f.title}</h3>
                <p className="text-[14px] leading-relaxed font-light" style={{ color: 'hsl(220 10% 40%)' }}>{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STEP 7 — PRODUCT SECTION */}
      <section className="py-14 px-5" style={{ background: 'hsl(var(--background))' }}>
        <div className="max-w-[900px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Card 1 — Best Seller */}
            <div className="rounded-2xl border overflow-hidden" style={{ background: 'hsl(220 18% 13%)', borderColor: 'hsl(var(--gold) / 0.1)' }}>
              <div className="min-h-[200px] flex items-center justify-center" style={{ background: 'hsl(220 20% 15%)' }}>
                <p className="text-[12px] text-muted-foreground opacity-50">[ PRODUCT IMAGE ]</p>
              </div>
              <div className="p-6">
                <span className="text-[11px] font-semibold tracking-wider uppercase text-gold">🏆 Best Seller</span>
                <h3 className="text-[18px] font-semibold text-foreground mt-2 mb-1">SilentNudge Wristband</h3>
                <p className="text-[22px] font-bold text-foreground mb-1">$99</p>
                <p className="text-[12px] text-muted-foreground mb-5">Free US Shipping · 100-Night Guarantee</p>
                <Link
                  to="/product"
                  onClick={scrollTop}
                  className="w-full inline-flex items-center justify-center bg-primary text-primary-foreground font-bold text-[14px] py-3.5 rounded-full no-underline shadow-gold min-h-[48px]"
                >
                  Shop Now
                </Link>
              </div>
            </div>

            {/* Card 2 — Couples */}
            <div className="rounded-2xl border overflow-hidden" style={{ background: 'hsl(220 18% 13%)', borderColor: 'hsl(var(--gold) / 0.1)' }}>
              <div className="min-h-[200px] flex items-center justify-center" style={{ background: 'hsl(220 20% 15%)' }}>
                <p className="text-[12px] text-muted-foreground opacity-50">[ PRODUCT IMAGE ]</p>
              </div>
              <div className="p-6">
                <span className="text-[11px] font-semibold tracking-wider uppercase text-gold">❤️ Most Popular for Couples</span>
                <h3 className="text-[18px] font-semibold text-foreground mt-2 mb-1">SilentNudge 2-Pack</h3>
                <p className="text-foreground mb-1">
                  <span className="text-[22px] font-bold">$169</span>
                  <span className="text-[14px] text-muted-foreground line-through ml-2">$198</span>
                  <span className="text-[12px] text-gold ml-2 font-semibold">Save $29</span>
                </p>
                <p className="text-[12px] text-muted-foreground mb-5">One for each of you</p>
                <Link
                  to="/product?bundle=true"
                  onClick={scrollTop}
                  className="w-full inline-flex items-center justify-center border font-bold text-[14px] py-3.5 rounded-full no-underline text-muted-foreground min-h-[48px]"
                  style={{ borderColor: 'hsl(var(--gold) / 0.2)' }}
                >
                  Shop Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STEP 8 — CREDIBILITY BAR */}
      <section className="py-8 px-5 overflow-hidden" style={{ background: 'hsl(220 20% 9%)', borderTop: '1px solid hsl(var(--gold) / 0.06)', borderBottom: '1px solid hsl(var(--gold) / 0.06)' }}>
        <p className="text-[10px] tracking-[3px] uppercase text-muted-foreground text-center mb-5">As Seen In / Backed By Research</p>
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-12 z-10" style={{ background: 'linear-gradient(90deg, hsl(220 20% 9%), transparent)' }} />
          <div className="absolute right-0 top-0 bottom-0 w-12 z-10" style={{ background: 'linear-gradient(270deg, hsl(220 20% 9%), transparent)' }} />
          <div className="flex animate-ticker whitespace-nowrap">
            {[...Array(3)].map((_, setIdx) => (
              <div key={setIdx} className="flex items-center shrink-0">
                {[
                  { name: 'HARVARD', sub: 'MEDICAL SCHOOL', serif: true },
                  { name: 'Forbes', sub: '', serif: true },
                  { name: "MEN'S HEALTH", sub: '', serif: false },
                  { name: 'Sleep Foundation', sub: '', serif: true },
                ].map((logo, i) => (
                  <div key={i} className="flex items-center justify-center px-10 sm:px-14 opacity-50 hover:opacity-80 transition-opacity">
                    <div className="text-center">
                      <span className={`text-[18px] sm:text-[22px] tracking-wide ${logo.serif ? 'font-display italic' : 'font-body font-bold uppercase tracking-[3px] text-[14px] sm:text-[16px]'}`} style={{ color: 'hsl(var(--gold) / 0.6)' }}>
                        {logo.name}
                      </span>
                      {logo.sub && (
                        <span className="block text-[8px] tracking-[2px] uppercase" style={{ color: 'hsl(var(--gold) / 0.35)' }}>{logo.sub}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STEP 9 — FOOTER / TRUST CLOSE (rendered separately via App.tsx Footer) */}
    </>
  );
};

export default HomePage;
