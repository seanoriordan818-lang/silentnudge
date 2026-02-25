import { Reveal } from '@/components/Reveal';
import { Label } from '@/components/shared';
import { Check } from 'lucide-react';

const GoldCheck = () => (
  <Check size={15} className="text-gold inline-block mr-1" strokeWidth={3} />
);

const rows = [
  {
    feature: 'Wakes only you',
    sn: <><GoldCheck /> Wrist vibration</>,
    aw: '⚠️ Weak haptics',
    pv: '⚠️ Electric shock',
    gn: '⚠️ Weak vibration',
  },
  {
    feature: 'Works for deep sleepers',
    sn: <><GoldCheck /> 5-stage escalation</>,
    aw: '❌ Single fixed pulse',
    pv: '✅ Shock-based',
    gn: '❌ Single intensity',
  },
  {
    feature: 'No phone required',
    sn: <><GoldCheck /> Fully standalone</>,
    aw: '❌ App dependent',
    pv: '❌ App + subscription',
    gn: '✅ Standalone',
  },
  {
    feature: 'Battery life',
    sn: <><GoldCheck /> 14+ days</>,
    aw: '❌ Charge daily',
    pv: '❌ 2–3 days',
    gn: '⚠️ Varies',
  },
  {
    feature: 'Subscription',
    sn: <><GoldCheck /> None, ever</>,
    aw: '❌ Apple ecosystem',
    pv: '❌ $4.99/month',
    gn: '✅ None',
  },
  {
    feature: 'Price',
    sn: <><GoldCheck /> $99 once</>,
    aw: '❌ $400+',
    pv: '❌ $128 + subscription',
    gn: '⚠️ $30–50 (weak motor)',
  },
  {
    feature: 'Harvard-backed science',
    sn: <><GoldCheck /> Yes</>,
    aw: '❌ No',
    pv: '❌ No',
    gn: '❌ No',
  },
  {
    feature: '100-night guarantee',
    sn: <><GoldCheck /> Yes</>,
    aw: '❌ 14-day return',
    pv: '❌ 30-day return',
    gn: '❌ Varies',
  },
];

export const ComparisonTableV2 = () => (
  <section className="bg-white py-12 md:py-20 px-5 md:px-7">
    <div className="max-w-[1100px] mx-auto">
      <Reveal>
        <div className="text-center mb-10 md:mb-12">
          <Label>Compare</Label>
          <h2 className="font-display text-[clamp(24px,3.5vw,36px)] leading-[1.15] font-medium text-[#1a1a1a]">
            Not All Alarms Are <span style={{ color: 'hsl(var(--gold))' }}>Equal.</span>
          </h2>
        </div>
      </Reveal>

      <Reveal delay={0.08}>
        {/* Mobile scroll hint */}
        <p className="text-[11px] text-[#6b6b6b] text-center mb-2 md:hidden">Swipe to compare →</p>
        <div className="overflow-x-auto rounded-[14px] border border-[hsl(var(--light-border))] shadow-card-light">
          <table className="w-full text-left min-w-[720px]">
            <thead>
              <tr className="border-b border-[hsl(var(--light-border))]">
                <th className="p-4 text-[12px] tracking-[1px] uppercase text-[#6b6b6b] font-semibold sticky left-0 bg-white z-10 min-w-[100px]">Feature</th>
                <th className="p-4 text-[12px] tracking-[1px] uppercase font-semibold text-gold bg-gold/[0.06] sticky left-[100px] z-10 min-w-[130px]">SilentNudge</th>
                <th className="p-4 text-[12px] tracking-[1px] uppercase text-[#6b6b6b] font-semibold min-w-[130px]">Apple Watch ($400+)</th>
                <th className="p-4 text-[12px] tracking-[1px] uppercase text-[#6b6b6b] font-semibold min-w-[140px]">Pavlok ($128+)</th>
                <th className="p-4 text-[12px] tracking-[1px] uppercase text-[#6b6b6b] font-semibold min-w-[150px]">Generic Watch ($30–50)</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i} className={i < rows.length - 1 ? 'border-b border-[hsl(var(--light-border))]' : ''}>
                  <td className="p-4 text-[13px] text-[#1a1a1a]/70 font-medium sticky left-0 bg-white z-10">{row.feature}</td>
                  <td className="p-4 text-[13px] text-[#1a1a1a] font-semibold bg-gold/[0.06] sticky left-[100px] z-10">{row.sn}</td>
                  <td className="p-4 text-[13px] text-[#6b6b6b]">{row.aw}</td>
                  <td className="p-4 text-[13px] text-[#6b6b6b]">{row.pv}</td>
                  <td className="p-4 text-[13px] text-[#6b6b6b]">{row.gn}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Reveal>
    </div>
  </section>
);
