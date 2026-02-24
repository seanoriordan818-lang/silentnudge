import { Loader2, ArrowRight } from 'lucide-react';

interface StickyBottomBarProps {
  price: number;
  onAddToCart: () => void;
  isLoading: boolean;
}

export const StickyBottomBar = ({ price, onAddToCart, isLoading }: StickyBottomBarProps) => (
  <div
    className="fixed bottom-0 left-0 right-0 z-50 border-t border-gold/10 py-3 px-4 md:hidden"
    style={{ background: 'hsla(var(--background) / 0.95)', backdropFilter: 'blur(20px)' }}
  >
    <button
      onClick={onAddToCart}
      disabled={isLoading}
      className="w-full py-3.5 min-h-[50px] rounded-full bg-primary text-primary-foreground font-bold text-[15px] shadow-gold flex items-center justify-center gap-2 disabled:opacity-50"
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <>Add to Cart — ${price} <ArrowRight size={15} /></>
      )}
    </button>
  </div>
);
