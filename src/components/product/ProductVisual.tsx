import { ProductCircle } from '@/components/ProductCircle';

interface ProductVisualProps {
  type: string;
  productImage?: string;
  productTitle?: string;
}

export const ProductVisual = ({ type, productImage, productTitle }: ProductVisualProps) => {
  if ((type === 'front' || type === 'wrist') && productImage) {
    return (
      <div className="relative w-full h-full flex items-center justify-center">
        <img src={productImage} alt={productTitle || 'Product'} className="w-full h-full object-cover" />
        {type === 'wrist' && (
          <div className="absolute bottom-8 text-[11px] tracking-[2px] uppercase" style={{ color: 'hsl(var(--gold) / 0.35)' }}>
            Worn on wrist · 22g
          </div>
        )}
      </div>
    );
  }

  if ((type === 'front' || type === 'wrist') && !productImage) {
    return <ProductCircle size={220} />;
  }

  if (type === 'escalation') {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4">
        <div className="text-[11px] tracking-[3px] uppercase" style={{ color: 'hsl(var(--gold) / 0.4)' }}>5-Stage Escalation</div>
        <div className="flex items-end gap-2">
          {[20, 30, 42, 56, 72].map((h, i) => (
            <div key={i} className="w-7 rounded-md animate-bar-pulse" style={{ height: h, background: `linear-gradient(to top, hsl(var(--gold) / ${0.15 + i * 0.12}), hsl(var(--gold) / ${0.3 + i * 0.15}))`, animationDelay: `${i * 0.15}s` }} />
          ))}
        </div>
        <div className="flex gap-6 mt-2">
          {['Gentle', 'Rhythmic', 'Firm', 'Strong', 'Maximum'].map((l, i) => (
            <div key={i} className="text-[9px] text-center w-7" style={{ color: 'hsl(var(--gold) / 0.3)' }}>{l}</div>
          ))}
        </div>
      </div>
    );
  }

  if (type === 'band') {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-3">
        <div className="w-[120px] h-4 rounded-lg relative" style={{ background: 'linear-gradient(90deg, hsl(var(--gold) / 0.15), hsl(var(--gold) / 0.08))' }}>
          <div className="absolute inset-[2px] rounded-md" style={{ background: 'linear-gradient(90deg, hsl(var(--gold) / 0.06), transparent)' }} />
        </div>
        <div className="text-sm font-display" style={{ color: 'hsl(var(--gold) / 0.5)' }}>Medical-grade silicone</div>
        <div className="text-[11px] text-muted-foreground">Hypoallergenic · Breathable · Secure</div>
      </div>
    );
  }

  // charge
  return (
    <div className="flex flex-col items-center justify-center h-full gap-2">
      <div className="text-2xl opacity-40">⚡</div>
      <div className="text-sm font-display" style={{ color: 'hsl(var(--gold) / 0.5)' }}>USB-C Fast Charge</div>
      <div className="text-[11px] text-muted-foreground">1 hour → 7+ days</div>
    </div>
  );
};
