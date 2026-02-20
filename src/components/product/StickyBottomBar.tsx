import { Loader2 } from 'lucide-react';

interface StickyBottomBarProps {
  price: number;
  onAddToCart: () => void;
  isLoading: boolean;
}

export const StickyBottomBar = ({ price, onAddToCart, isLoading }: StickyBottomBarProps) => (
  <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-gold/10 py-3 px-6 flex items-center justify-between max-w-[600px] mx-auto md:hidden" style={{ background: 'hsla(var(--background) / 0.95)', backdropFilter: 'blur(20px)' }}>
    <div>
      <div className="font-display text-[22px] text-gold">${price}</div>
      <div className="text-[10px] text-faint">Free shipping · 100-night trial</div>
    </div>
    <button
      onClick={onAddToCart}
      disabled={isLoading}
      className="py-3 px-8 rounded-full bg-primary text-primary-foreground font-bold text-sm shadow-gold disabled:opacity-50"
    >
      {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Add to Cart'}
    </button>
  </div>
);
