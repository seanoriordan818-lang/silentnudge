import { Link } from 'react-router-dom';
import { Check, ArrowRight, Zap, Brain, Wifi } from 'lucide-react';
import heroLifestyle from '@/assets/hero-lifestyle.png';
import reviewSarah from '@/assets/reviews/sarah.jpeg';
import reviewJake from '@/assets/reviews/jake.jpeg';
import reviewAoife from '@/assets/reviews/aoife.png';

const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

const StarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="hsl(var(--gold))" className="inline-block">
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
    photo: reviewSarah,
  },
  {
    quote: "I have ADHD and I've been setting 9 alarms every night since college. It's been 6 weeks and I've set one alarm every single day. One.",
    name: "Jake T.",
    photo: reviewJake,
  },
  {
    quote: "Bought it after my partner told me my alarm was affecting our relationship. Three months in, mornings are completely different in our house.",
    name: "Aoife B.",
    photo: reviewAoife,
  },
];

const HomePage = () => {
  return (
    <>
      {/* HERO SECTION */}
      <section style={{ background: 'linear-gradient(180deg, hsl(var(--banner)) 0%, hsl(var(--background)) 100%)' }}>
        <div className="max-w-[1200px] mx-auto w-full">
          <div className="flex flex-col lg:flex-row">
            {/* Hero Image — reduced height on mobile so headline is above fold */}
            <div className="w-full lg:w-[55%] h-[45vh] lg:h-auto lg:min-h-[600px] relative overflow-hidden">
              <img src={heroLifestyle} alt="Man waking up with SilentNudge wristband while partner sleeps peacefully" className="w-full h-full object-cover absolute inset-0" />
              {/* Mobile gradient overlay for text visibility */}
              <div className="absolute inset-x-0 bottom-0 h-16 lg:hidden" style={{ background: 'linear-gradient(to top, hsl(var(--banner)), transparent)' }} />
            </div>

            {/* Hero Copy */}
            <div className="w-full lg:w-[45%] px-5 sm:px-8 lg:px-10 py-6 lg:py-12 flex flex-col justify-center">
              {/* Star rating */}
              <div className="mb-5">
                <Stars5 />
                <p className="text-[12px] text-gold-dim mt-1.5">Trusted by 30,000+ couples, deep sleepers & early risers</p>
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
                100-Night Guarantee · Free Shipping · 30,000+ Happy Customers
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST STAT BAR (replaces As Seen In logos) */}
      <section className="py-8 px-5" style={{ background: 'hsl(var(--raised))', borderTop: '1px solid hsl(var(--border))', borderBottom: '1px solid hsl(var(--border))' }}>
        <p className="text-[10px] tracking-[3px] uppercase text-muted-foreground text-center mb-5">Backed By Research</p>
        <div className="max-w-[900px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-0">
          {[
            { stat: '30,000+', label: 'Happy Customers' },
            { stat: '100 Nights', label: 'Risk-Free Guarantee' },
            { stat: 'Harvard Cell Study', label: 'December 2024' },
            { stat: '4.8 / 5', label: 'Average Rating' },
          ].map((item, i) => (
            <div key={i} className="text-center px-4 py-2 md:py-0 md:border-r last:border-r-0" style={{ borderColor: 'hsl(var(--border))' }}>
              <div className="font-display text-[18px] sm:text-[20px] text-gold font-medium">{item.stat}</div>
              <div className="text-[11px] text-muted-foreground mt-0.5">{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* BEST SELLERS */}
      <section className="py-14 px-5" style={{ background: 'hsl(var(--background))' }}>
        <div className="max-w-[900px] mx-auto">
          <div className="grid grid-cols-2 gap-3 sm:gap-5">
            {/* Card 1 — Best Seller */}
            <div className="rounded-2xl border overflow-hidden" style={{ background: 'hsl(220 18% 13%)', borderColor: 'hsl(var(--gold) / 0.1)' }}>
            <div className="min-h-[120px] sm:min-h-[200px] flex items-center justify-center" style={{ background: 'hsl(var(--raised2))' }}>
                <p className="text-[10px] sm:text-[12px] text-muted-foreground opacity-50">[ PRODUCT IMAGE ]</p>
              </div>
              <div className="p-3 sm:p-6">
                <span className="text-[9px] sm:text-[11px] font-semibold tracking-wider uppercase text-gold">🏆 Best Seller</span>
                <h3 className="text-[14px] sm:text-[18px] font-semibold text-foreground mt-1 sm:mt-2 mb-1">SilentNudge Wristband</h3>
                <p className="text-[18px] sm:text-[22px] font-bold text-foreground mb-1">$99</p>
                <p className="text-[10px] sm:text-[12px] text-muted-foreground mb-3 sm:mb-5">Free Shipping · 100-Night Guarantee</p>
                <Link
                  to="/product"
                  onClick={scrollTop}
                  className="w-full inline-flex items-center justify-center bg-primary text-primary-foreground font-bold text-[12px] sm:text-[14px] py-2.5 sm:py-3.5 rounded-full no-underline shadow-gold min-h-[40px] sm:min-h-[48px]"
                >
                  Shop Now
                </Link>
              </div>
            </div>

            {/* Card 2 — Couples */}
            <div className="rounded-2xl border overflow-hidden" style={{ background: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }}>
              <div className="min-h-[120px] sm:min-h-[200px] flex items-center justify-center" style={{ background: 'hsl(var(--raised2))' }}>
                <p className="text-[10px] sm:text-[12px] text-muted-foreground opacity-50">[ PRODUCT IMAGE ]</p>
              </div>
              <div className="p-3 sm:p-6">
                <span className="text-[9px] sm:text-[11px] font-semibold tracking-wider uppercase text-gold">❤️ Most Popular for Couples</span>
                <h3 className="text-[14px] sm:text-[18px] font-semibold text-foreground mt-1 sm:mt-2 mb-1">SilentNudge 2-Pack</h3>
                <p className="text-foreground mb-1">
                  <span className="text-[18px] sm:text-[22px] font-bold">$169</span>
                  <span className="text-[11px] sm:text-[14px] text-muted-foreground line-through ml-1 sm:ml-2">$258</span>
                  <span className="text-[10px] sm:text-[12px] text-gold ml-1 sm:ml-2 font-semibold">Save $89</span>
                </p>
                <p className="text-[10px] sm:text-[12px] text-muted-foreground mb-3 sm:mb-5">One for each of you</p>
                <Link
                  to="/product?bundle=true"
                  onClick={scrollTop}
                  className="w-full inline-flex items-center justify-center border font-bold text-[12px] sm:text-[14px] py-2.5 sm:py-3.5 rounded-full no-underline text-muted-foreground min-h-[40px] sm:min-h-[48px]"
                  style={{ borderColor: 'hsl(var(--gold) / 0.2)' }}
                >
                  Shop Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF STRIP (Reviews) */}
      <section className="py-10 px-5" style={{ background: 'hsl(var(--raised))' }}>
        <div className="max-w-[1200px] mx-auto">
          <div className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide">
            {reviews.map((r, i) => (
               <div
                key={i}
                className="min-w-[300px] sm:min-w-[340px] flex-1 snap-start rounded-2xl overflow-hidden border"
                style={{ background: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }}
              >
                <img src={r.photo} alt={`${r.name} with SilentNudge`} className="w-full h-[200px] object-cover" />
                <div className="p-6">
                  <Stars5 />
                  <p className="text-[14px] leading-relaxed text-foreground/85 mt-3 mb-4 font-light italic">
                    "{r.quote}"
                  </p>
                  <p className="text-[13px] font-semibold text-foreground">
                    — {r.name}, <span className="text-gold-dim font-normal">Verified Buyer</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS / BENEFITS */}
      <section className="py-12 md:py-14 px-5 bg-white">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="font-display text-[clamp(22px,3.5vw,32px)] leading-[1.15] font-medium text-center mb-10 text-[#1a1a1a]">
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
              <div key={i} className="rounded-2xl p-7 text-center bg-white border border-[hsl(var(--light-border))] shadow-card-light">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-4" style={{ background: 'hsl(var(--gold) / 0.12)', color: 'hsl(var(--gold))' }}>
                  {f.icon}
                </div>
                <h3 className="text-[16px] font-semibold mb-2 text-[#1a1a1a]">{f.title}</h3>
                <p className="text-[14px] leading-relaxed font-light text-[#6b6b6b]">{f.body}</p>
              </div>
            ))}
          </div>

          {/* CTA after benefit cards */}
          <div className="text-center mt-10">
            <Link
              to="/product"
              onClick={scrollTop}
              className="inline-flex items-center justify-center gap-2 font-bold text-[15px] px-10 py-4 rounded-full no-underline shadow-gold min-h-[52px]"
              style={{ background: 'hsl(var(--gold))', color: 'hsl(var(--background))' }}
            >
              Shop SilentNudge — $99
            </Link>
          </div>
        </div>
      </section>

      {/* SCIENCE TEASER */}
      <section className="py-12 md:py-16 px-5" style={{ background: 'hsl(var(--background))' }}>
        <div className="max-w-[640px] mx-auto text-center">
          <p className="text-[10px] tracking-[3px] uppercase text-gold-dim font-semibold mb-3">The Science</p>
          <h2 className="font-display text-[clamp(24px,4vw,36px)] leading-[1.15] font-medium text-foreground mb-5">
            The alarm industry got it wrong for 100 years.
          </h2>
          <p className="text-[15px] leading-relaxed text-muted-foreground font-light mb-6">
            Sound triggers your brain's threat response. Vibration doesn't. Harvard Medical School published the research in December 2024 — and we built the first alarm designed around it.
          </p>
          <Link
            to="/science"
            onClick={scrollTop}
            className="inline-flex items-center gap-2 text-sm font-semibold text-gold no-underline"
          >
            Read the science <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* GUARANTEE SECTION */}
      <section className="py-12 md:py-16 px-5" style={{ background: 'hsl(var(--raised))' }}>
        <div className="max-w-[640px] mx-auto text-center">
          <h2 className="font-display text-[clamp(26px,4vw,38px)] leading-[1.15] font-medium text-foreground mb-4">
            100-Night <span className="text-gold">Guarantee.</span>
          </h2>
          <p className="text-[15px] leading-relaxed text-muted-foreground font-light mb-7">
            If SilentNudge doesn't wake you — for any reason — we'll refund every cent. No forms. No hassle.
          </p>
          <Link
            to="/product"
            onClick={scrollTop}
            className="inline-flex items-center justify-center gap-2 font-bold text-[15px] px-10 py-4 rounded-full no-underline shadow-gold min-h-[52px]"
            style={{ background: 'hsl(var(--gold))', color: 'hsl(var(--background))' }}
          >
            Try It Risk-Free
          </Link>
        </div>
      </section>
    </>
  );
};

export default HomePage;
