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
    pa: '❌ Wakes the room',
  },
  {
    feature: 'Works for deep sleepers',
    sn: <><GoldCheck /> 5-stage escalation</>,
    aw: '❌ Single pulse',
    pa: '❌ Habituation',
  },
  {
    feature: 'No phone required',
    sn: <><GoldCheck /> Fully standalone</>,
    aw: '❌ App dependent',
    pa: '❌ IS the phone',
  },
  {
    feature: 'Battery life',
    sn: <><GoldCheck /> 14+ days</>,
    aw: '❌ Charge daily',
    pa: 'N/A',
  },
  {
    feature: 'Price',
    sn: <><GoldCheck /> $99 once</>,
    aw: '❌ $400+',
    pa: '❌ Free but failing you',
  },
];

export const ComparisonTableV2 = () => (
  <section className="bg-white py-16 md:py-20 px-5 md:px-7">
    <div className="max-w-[1000px] mx-auto">
      <Reveal>
        <div className="text-center mb-10 md:mb-12">
          <Label>Compare</Label>
          <h2 className="font-display text-[clamp(24px,3.5vw,36px)] leading-[1.15] font-medium text-[#1a1a1a]">
            Not All Alarms Are <span style={{ color: 'hsl(var(--gold))' }}>Equal.</span>
          </h2>
        </div>
      </Reveal>

      <Reveal delay={0.08}>
        <div className="overflow-x-auto rounded-[14px] border border-[hsl(var(--light-border))] shadow-card-light">
          <table className="w-full text-left min-w-[560px]">
            <thead>
              <tr className="border-b border-[hsl(var(--light-border))]">
                <th className="p-4 text-[12px] tracking-[1px] uppercase text-[#6b6b6b] font-semibold">Feature</th>
                <th className="p-4 text-[12px] tracking-[1px] uppercase font-semibold text-gold bg-gold/[0.06]">SilentNudge</th>
                <th className="p-4 text-[12px] tracking-[1px] uppercase text-[#6b6b6b] font-semibold">Apple Watch ($400+)</th>
                <th className="p-4 text-[12px] tracking-[1px] uppercase text-[#6b6b6b] font-semibold">Phone Alarm</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i} className={i < rows.length - 1 ? 'border-b border-[hsl(var(--light-border))]' : ''}>
                  <td className="p-4 text-[13px] text-[#1a1a1a]/70 font-medium">{row.feature}</td>
                  <td className="p-4 text-[13px] text-[#1a1a1a] font-semibold bg-gold/[0.06]">{row.sn}</td>
                  <td className="p-4 text-[13px] text-[#6b6b6b]">{row.aw}</td>
                  <td className="p-4 text-[13px] text-[#6b6b6b]">{row.pa}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Reveal>
    </div>
  </section>
);
