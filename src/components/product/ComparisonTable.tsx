import { Reveal } from '@/components/Reveal';
import { Label, HeadingSm, Gold } from '@/components/shared';
import { Check, X } from 'lucide-react';

const rows: { f: string; sn: boolean | string; sw: boolean | string; fs: boolean | string }[] = [
  { f: 'Purpose-built wake motor', sn: true, sw: false, fs: false },
  { f: '5-stage escalating vibration', sn: true, sw: false, fs: '3 levels' },
  { f: 'Harvard-backed mechanism', sn: true, sw: false, fs: false },
  { f: 'Standalone (no phone/app)', sn: true, sw: false, fs: true },
  { f: '7+ day battery', sn: true, sw: false, fs: false },
  { f: 'One-button alarm setting', sn: true, sw: false, fs: false },
  { f: 'Deep sleeper guarantee', sn: true, sw: false, fs: true },
  { f: 'USB Charging', sn: true, sw: true, fs: false },
  { f: 'Premium build + 2yr warranty', sn: true, sw: true, fs: false },
  { f: 'Price', sn: '$99', sw: '$250–$500', fs: '$49–$84' },
];

const CellValue = ({ val, isGold }: { val: boolean | string; isGold: boolean }) => {
  if (val === true) return <Check size={isGold ? 18 : 16} className={`mx-auto ${isGold ? 'text-gold' : 'text-foreground/30'}`} />;
  if (val === false) return <X size={16} className="mx-auto text-faint" />;
  return <span className={`text-[13px] font-semibold ${isGold ? 'text-gold' : 'text-muted-foreground'}`}>{val}</span>;
};

export const ComparisonTable = () => (
  <section className="max-w-[1200px] mx-auto py-20 px-7">
    <Reveal>
      <div className="text-center mb-12">
        <Label>How We Compare</Label>
        <HeadingSm>Your $400 watch uses a <Gold>text-message motor</Gold> to wake you.</HeadingSm>
        <p className="text-[15px] text-muted-foreground mt-3 font-light">That was never going to work. Here's why SilentNudge is categorically different.</p>
      </div>
    </Reveal>
    <Reveal delay={0.1}>
      <div className="bg-raised rounded-[20px] border border-gold-subtle overflow-hidden max-w-[900px] mx-auto">
        <div className="grid grid-cols-4 p-3.5 px-5" style={{ background: 'hsl(var(--gold) / 0.04)', borderBottom: '2px solid hsl(var(--gold) / 0.1)' }}>
          <span className="text-[11px] tracking-[2px] uppercase text-faint font-semibold">Feature</span>
          <span className="text-[11px] tracking-[2px] uppercase text-gold font-semibold text-center">SilentNudge</span>
          <span className="text-[11px] tracking-[2px] uppercase text-faint font-semibold text-center">Smartwatch</span>
          <span className="text-[11px] tracking-[2px] uppercase text-faint font-semibold text-center">OTHERS</span>
        </div>
        {rows.map((row, i) => (
          <div key={i} className="grid grid-cols-4 px-5 py-3.5 items-center hover:bg-gold/[0.02] transition-colors" style={{ borderBottom: '1px solid hsl(0 0% 100% / 0.04)' }}>
            <span className="text-[13px] text-muted-foreground">{row.f}</span>
            <span className="text-center"><CellValue val={row.sn} isGold /></span>
            <span className="text-center"><CellValue val={row.sw} isGold={false} /></span>
            <span className="text-center"><CellValue val={row.fs} isGold={false} /></span>
          </div>
        ))}
      </div>
    </Reveal>
  </section>
);
