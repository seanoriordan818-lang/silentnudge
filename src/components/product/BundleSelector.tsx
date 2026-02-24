import { useState } from 'react';

export type BundleOption = {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  badge: string;
  topBadge?: string;
};

const bundles: BundleOption[] = [
  {
    id: 'single',
    name: 'Single',
    description: '1× Band',
    price: 99,
    originalPrice: 149,
    badge: 'Free US Shipping',
  },
  {
    id: 'couples',
    name: 'Couples Pack',
    description: '2× Bands',
    price: 169,
    originalPrice: 298,
    badge: 'Save $29',
    topBadge: 'MOST POPULAR',
  },
  {
    id: 'family',
    name: 'Family Pack',
    description: '4× Bands',
    price: 299,
    originalPrice: 396,
    badge: 'Save $97',
    topBadge: 'BEST VALUE',
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
    <div className="grid grid-cols-3 gap-2 sm:gap-3">
      {bundles.map((b) => {
        const isActive = selected === b.id;
        return (
          <button
            key={b.id}
            onClick={() => onSelect(b.id)}
            className={`relative text-left p-3 sm:p-4 rounded-[12px] sm:rounded-[14px] transition-all cursor-pointer overflow-hidden ${
              isActive
                ? 'border-2 border-solid bg-gold/[0.08]'
                : 'border border-solid border-gold/15 bg-gold/[0.03] hover:border-gold/30'
            }`}
            style={isActive ? { borderColor: 'hsl(var(--gold) / 0.5)' } : undefined}
          >
            {b.topBadge && (
              <span className="absolute -top-2.5 left-2 sm:left-3 text-[7px] sm:text-[8px] font-bold uppercase tracking-wider bg-primary text-primary-foreground px-1.5 sm:px-2 py-0.5 rounded-full whitespace-nowrap">
                {b.topBadge}
              </span>
            )}

            {/* Radio dot */}
            <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5">
              <div
                className={`w-[14px] h-[14px] sm:w-[16px] sm:h-[16px] rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                  isActive ? 'border-gold' : 'border-gold/25'
                }`}
              >
                {isActive && (
                  <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-gold" />
                )}
              </div>
              <span className="text-[10px] sm:text-[13px] font-semibold text-foreground leading-tight whitespace-nowrap truncate">{b.name}</span>
            </div>

            <div className="text-[10px] sm:text-[11px] text-muted-foreground mb-1.5 whitespace-nowrap">{b.description}</div>
            <div className="flex items-baseline gap-1.5 flex-nowrap">
              <span className="text-[10px] sm:text-[12px] text-faint line-through">${b.originalPrice}</span>
              <span className="font-display text-[18px] sm:text-[22px] text-gold">${b.price}</span>
            </div>
            <div className="mt-1.5">
              <span
                className={`text-[8px] sm:text-[9px] font-semibold tracking-wide px-1.5 sm:px-2 py-0.5 rounded-full whitespace-nowrap ${
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
