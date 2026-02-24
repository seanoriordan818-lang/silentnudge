import { useState } from 'react';
import { X } from 'lucide-react';

export function AnnouncementBanner() {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  return (
    <div className="w-full bg-raised py-2.5 px-4 text-center relative z-[201]" style={{ borderBottom: '1px solid hsl(var(--gold) / 0.08)' }}>
      <p className="text-[11px] sm:text-[12px] tracking-wide text-gold-dim">
        🚚 Free US Shipping on All Orders · 100-Night Guarantee · Wake Only You
      </p>
      <button
        onClick={() => setVisible(false)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors md:hidden"
        aria-label="Dismiss banner"
      >
        <X size={14} />
      </button>
    </div>
  );
}
