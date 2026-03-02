interface ColorSelectorProps {
  selectedColor: string;
  onSelectColor: (color: string) => void;
  colors: string[];
}

export const ColorSelector = ({ selectedColor, onSelectColor, colors }: ColorSelectorProps) => (
  <div>
    <div className="text-[11px] tracking-[2px] uppercase text-gold-dim font-semibold mb-3">
      Color: <span className="text-foreground">{selectedColor}</span>
    </div>
    <div className="flex gap-3">
      {colors.map((color) => {
        const isActive = selectedColor === color;
        const bg = color === 'Black' ? '#1a1a1a' : '#f5f0e8';
        return (
          <button
            key={color}
            onClick={() => onSelectColor(color)}
            className={`w-10 h-10 rounded-full transition-all cursor-pointer flex items-center justify-center ${
              isActive ? 'ring-2 ring-gold ring-offset-2 ring-offset-background' : 'ring-1 ring-gold/20 hover:ring-gold/40'
            }`}
            style={{ background: bg }}
            aria-label={color}
          >
            {isActive && (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color === 'Black' ? '#fff' : '#1a1a1a'} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            )}
          </button>
        );
      })}
    </div>
  </div>
);

interface ColorAllocationProps {
  colorCounts: Record<string, number>;
  onUpdateCount: (color: string, delta: number) => void;
  totalRequired: number;
  colors: string[];
}

export const ColorAllocation = ({ colorCounts, onUpdateCount, totalRequired, colors }: ColorAllocationProps) => {
  const currentTotal = Object.values(colorCounts).reduce((a, b) => a + b, 0);
  const isValid = currentTotal === totalRequired;

  return (
    <div>
      <div className="text-[11px] tracking-[2px] uppercase text-gold-dim font-semibold mb-3">
        Choose Your Colors:
      </div>
      <div className="space-y-3">
        {colors.map((color) => {
          const count = colorCounts[color] || 0;
          const canIncrement = currentTotal < totalRequired;
          const canDecrement = count > 0;
          const bg = color === 'Black' ? '#1a1a1a' : '#f5f0e8';

          return (
            <div
              key={color}
              className="flex items-center justify-between p-3 rounded-xl"
              style={{ background: 'hsl(var(--raised))', border: '1px solid hsl(var(--border))' }}
            >
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full flex-shrink-0" style={{ background: bg, border: '1px solid hsl(var(--border))' }} />
                <span className="text-[13px] font-medium text-foreground">{color}</span>
              </div>
              <div className="flex items-center gap-0">
                <button
                  onClick={() => onUpdateCount(color, -1)}
                  disabled={!canDecrement}
                  className="w-8 h-8 flex items-center justify-center text-foreground text-[16px] rounded-l-lg transition-colors disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
                  style={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
                >
                  −
                </button>
                <div
                  className="w-8 h-8 flex items-center justify-center text-[14px] font-semibold text-foreground"
                  style={{ background: 'hsl(var(--card))', borderTop: '1px solid hsl(var(--border))', borderBottom: '1px solid hsl(var(--border))' }}
                >
                  {count}
                </div>
                <button
                  onClick={() => onUpdateCount(color, 1)}
                  disabled={!canIncrement}
                  className="w-8 h-8 flex items-center justify-center text-foreground text-[16px] rounded-r-lg transition-colors disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
                  style={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
                >
                  +
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <p className={`text-[12px] mt-2 ${isValid ? 'text-green-400' : 'text-gold'}`}>
        {isValid
          ? `✓ ${totalRequired} bands selected`
          : `Choose exactly ${totalRequired} bands (${currentTotal}/${totalRequired} selected)`
        }
      </p>
    </div>
  );
};
