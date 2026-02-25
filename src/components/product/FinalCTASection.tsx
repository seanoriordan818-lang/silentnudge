import { Reveal } from '@/components/Reveal';
import { Shield, Truck, Zap } from 'lucide-react';

interface FinalCTASectionProps {
  onAddToCart: () => void;
  isLoading?: boolean;
}

export const FinalCTASection = ({ onAddToCart, isLoading }: FinalCTASectionProps) => (
  <section className="relative bg-background py-20 md:py-28 px-5 md:px-7 overflow-hidden">
    {/* Background image placeholder — swap in a hero lifestyle image */}
    <div
      className="absolute inset-0 flex items-center justify-center opacity-[0.07]"
      aria-hidden
    >
      <p className="text-xs text-muted-foreground text-center max-w-[300px]">
        [ HERO LIFESTYLE IMAGE — dark bedroom, person waking calmly, partner asleep. Overlay text on top. ]
      </p>
    </div>

    <div className="relative max-w-[600px] mx-auto text-center">
      <Reveal>
        <h2 className="font-display text-[clamp(28px,5vw,44px)] leading-[1.12] font-medium mb-3">
          Your partner deserves a full night's sleep.
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground mb-8">So do you.</p>

        <button
          onClick={onAddToCart}
          disabled={isLoading}
          className="w-full md:w-auto md:px-14 py-4 min-h-[56px] rounded-full bg-primary text-white font-bold text-base shadow-gold transition-all hover:brightness-110 disabled:opacity-50 mb-6"
        >
          Add to Cart
        </button>

        <div className="flex items-center justify-center gap-4 md:gap-6 flex-wrap text-[12px] text-muted-foreground">
          <span className="flex items-center gap-1.5"><Shield size={14} className="text-gold" /> 100-Night Guarantee</span>
          <span className="flex items-center gap-1.5"><Truck size={14} className="text-gold" /> Free US Shipping</span>
          <span className="flex items-center gap-1.5"><Zap size={14} className="text-gold" /> Harvard-Backed Research</span>
        </div>
      </Reveal>
    </div>
  </section>
);
