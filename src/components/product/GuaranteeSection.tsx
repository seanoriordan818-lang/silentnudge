import { Reveal } from '@/components/Reveal';
import { Shield } from 'lucide-react';

interface GuaranteeSectionProps {
  onAddToCart: () => void;
  isLoading?: boolean;
}

export const GuaranteeSection = ({ onAddToCart, isLoading }: GuaranteeSectionProps) =>
<section className="bg-background md:py-20 px-5 py-[30px] md:px-[15px]">
    <div className="max-w-[600px] mx-auto text-center">
      <Reveal>
        <Shield size={48} className="text-gold mx-auto mb-6" />
        <h2 className="font-display text-[clamp(28px,4.5vw,42px)] leading-[1.15] font-medium mb-5">
          100-Night <span className="text-gold">Guarantee.</span>
        </h2>
        <p className="text-sm md:text-[15px] leading-7 text-muted-foreground mb-8">
          Try SilentNudge for 100 nights. Wake up without disturbing your partner. If it doesn't work — for any reason — we'll refund every cent. No forms. No explanation needed. No hassle.
        </p>
        <button
        onClick={onAddToCart}
        disabled={isLoading}
        className="w-full md:w-auto md:px-12 py-4 min-h-[56px] rounded-full bg-primary text-white font-bold text-base shadow-gold transition-all hover:brightness-110 disabled:opacity-50 mb-4">

          Try It Risk-Free — $99
        </button>
        <p className="text-[12px] text-muted-foreground">
          Joined by 30,000+ customers who woke up differently.
        </p>
      </Reveal>
    </div>
  </section>;