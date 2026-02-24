import { useState } from 'react';

export type BundleOption = {
  id: string;
  name: string;
  description: string;
  price: number;
  badge: string;
  recommended?: boolean;
};

const bundles: BundleOption[] = [
  {
    id: 'single',
    name: 'Single',
    description: '1× Band',
    price: 99,
    badge: 'Free US Shipping',
  },
  {
    id: 'couples',
    name: 'Couples Pack',
    description: '2× Bands',
    price: 169,
    badge: 'Save $29',
    recommended: true,
  },
  {
    id: 'deep-sleeper',
    name: 'Deep Sleeper Kit',
    description: '1× Band + Backup Band',
    price: 118,
    badge: 'Never miss an alarm',
  },
];

interface BundleSelectorProps {
  selected: string;
  onSelect: (id: string) => void;
}

export const BundleSelector = ({ selected, onSelect }: BundleSelectorProps) => (
  <div>
    <div className="text-[11px] tracking-[2px] uppercase text-gold-dim font-semibold mb-3">
      Select Your Bundle:
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      {bundles.map((b) => {
        const isActive = selected === b.id;
        return (
          <button
            key={b.id}
            onClick={() => onSelect(b.id)}
            className={`relative text-left p-4 rounded-[14px] transition-all cursor-pointer ${
              isActive
                ? 'border-2 border-solid bg-gold/[0.08]'
                : 'border border-solid border-gold/15 bg-gold/[0.03] hover:border-gold/30'
            }`}
            style={isActive ? { borderColor: 'hsl(var(--gold) / 0.5)' } : undefined}
          >
            {b.recommended && (
              <span className="absolute -top-2.5 left-4 text-[9px] font-bold uppercase tracking-wider bg-primary text-primary-foreground px-2.5 py-0.5 rounded-full">
                Recommended
              </span>
            )}

            {/* Radio dot */}
            <div className="flex items-center gap-2.5 mb-2">
              <div
                className={`w-[18px] h-[18px] rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                  isActive ? 'border-gold' : 'border-gold/25'
                }`}
              >
                {isActive && (
                  <div className="w-2.5 h-2.5 rounded-full bg-gold" />
                )}
              </div>
              <span className="text-[14px] font-semibold text-foreground">{b.name}</span>
            </div>

            <div className="text-[12px] text-muted-foreground mb-1.5 pl-[30px]">{b.description}</div>
            <div className="flex items-baseline gap-2 pl-[30px]">
              <span className="font-display text-[22px] text-gold">${b.price}</span>
            </div>
            <div className="mt-2 pl-[30px]">
              <span
                className={`text-[10px] font-semibold tracking-wide px-2 py-0.5 rounded-full ${
                  isActive
                    ? 'bg-gold/20 text-gold'
                    : 'bg-gold/10 text-gold-dim'
                }`}
              >
                {b.badge}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  </div>
);

export { bundles };
