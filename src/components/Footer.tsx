import { Link } from 'react-router-dom';
import { Moon, Check } from 'lucide-react';

export function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="border-t border-border/30 pt-16 pb-10 px-7" style={{ background: 'hsl(var(--banner))' }}>
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Moon size={18} className="text-gold opacity-50" />
              <span className="font-display text-lg text-muted-foreground">
                Silent<span className="text-gold-dim">Nudge</span>
              </span>
            </div>
            <p className="text-[13px] leading-relaxed text-faint max-w-[250px]">
              Wake only you. Never miss. No panic. The first alarm engineered for how your brain actually wakes up.
            </p>
          </div>
          {[
            { title: 'Shop', items: [['SilentNudge Wristband', '/product']] },
            { title: 'Learn', items: [['The Science', '/science'], ['Our Story', '/story'], ['Reviews', '/reviews'], ['FAQ', '/faq']] },
            { title: 'Support', items: [['Contact Us', '/contact'], ['Shipping & Returns', '/faq'], ['100-Night Guarantee', '/faq']] },
          ].map((col, i) => (
            <div key={i}>
              <div className="text-[10px] tracking-[2px] uppercase text-gold-dim font-semibold mb-4">{col.title}</div>
              {col.items.map(([label, href], j) => (
                <Link key={j} to={href} onClick={scrollTop} className="block text-[13px] text-muted-foreground no-underline mb-2.5 hover:text-gold transition-colors">
                  {label}
                </Link>
              ))}
            </div>
          ))}
        </div>
        <div className="border-t border-border/30 pt-5 flex justify-between flex-wrap gap-2">
          <p className="text-[11px] text-faint">© 2025 SilentNudge. All rights reserved. Not a medical device.</p>
          <p className="text-[11px] text-faint">Designed with purpose. Engineered for every sleeper.</p>
        </div>
      </div>
    </footer>
  );
}
