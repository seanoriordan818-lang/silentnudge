import { Shield } from 'lucide-react';

export const GuaranteeStrip = () => (
  <div className="bg-gold/[0.04] border-t border-b border-gold/[0.08] py-5 px-7 text-center">
    <div className="flex items-center justify-center gap-3 flex-wrap">
      <Shield size={20} className="text-gold" />
      <span className="font-display text-base">100-Night <span className="text-gold">"Wake-Up Reliability"</span> Guarantee</span>
      <span className="text-[13px] text-muted-foreground font-light">— it works, or it's free.</span>
    </div>
  </div>
);
