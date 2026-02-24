import { Link } from 'react-router-dom';
import { Shield, Truck, Lock } from 'lucide-react';

export function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="border-t pt-12 pb-8 px-5" style={{ background: 'hsl(220 20% 7%)', borderColor: 'hsl(var(--gold) / 0.06)' }}>
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {/* Logo + tagline */}
          <div>
            <span className="font-body text-lg font-semibold text-foreground">
              Silent<span className="text-gold">Nudge</span>
            </span>
            <p className="text-[13px] text-muted-foreground mt-2">Wake only you.</p>
          </div>

          {/* Links */}
          <div className="flex gap-6 flex-wrap">
            {[
              ['FAQ', '/faq'],
              ['Shipping', '/faq'],
              ['Returns', '/faq'],
              ['Contact', '/contact'],
              ['Privacy Policy', '/faq'],
            ].map(([label, href], i) => (
              <Link key={i} to={href} onClick={scrollTop} className="text-[13px] text-muted-foreground no-underline hover:text-gold transition-colors">
                {label}
              </Link>
            ))}
          </div>

          {/* Trust badges */}
          <div className="flex items-center gap-5 flex-wrap md:justify-end">
            {[
              { icon: <Shield size={14} />, text: '100-Night Guarantee' },
              { icon: <Lock size={14} />, text: 'Secure Checkout' },
              { icon: <Truck size={14} />, text: 'Ships in 1-3 days' },
            ].map((b, i) => (
              <span key={i} className="text-[11px] text-muted-foreground flex items-center gap-1.5">
                <span className="text-gold">{b.icon}</span> {b.text}
              </span>
            ))}
          </div>
        </div>

        <div className="border-t pt-4" style={{ borderColor: 'hsl(var(--gold) / 0.06)' }}>
          <p className="text-[11px] text-faint text-center">© 2025 SilentNudge. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
