import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Moon, Menu, X } from 'lucide-react';
import { CartDrawer } from './CartDrawer';

const links = [
  { label: 'Shop', href: '/product' },
  { label: 'Science', href: '/science' },
  { label: 'Reviews', href: '/reviews' },
  { label: 'Our Story', href: '/story' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  useEffect(() => setMobileOpen(false), [location]);

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-[200] transition-all duration-500"
        style={{
          background: scrolled ? 'hsl(var(--background) / 0.95)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid hsl(var(--gold) / 0.06)' : 'none',
        }}
      >
        <div className="max-w-[1240px] mx-auto px-7 h-[68px] flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 no-underline" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <Moon size={20} className="text-gold opacity-50" />
            <span className="font-display text-xl text-foreground">
              Silent<span className="text-gold">Nudge</span>
            </span>
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-7">
            {links.map(l => (
              <Link
                key={l.href}
                to={l.href}
                className={`text-[13px] no-underline tracking-wide transition-colors hover:text-gold ${
                  location.pathname === l.href ? 'text-gold font-semibold' : 'text-muted-foreground'
                }`}
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/product"
              className="text-[13px] font-semibold bg-primary text-primary-foreground px-6 py-2.5 rounded-full no-underline shadow-gold tracking-wide"
            >
              Shop Now
            </Link>
            <CartDrawer />
          </div>

          {/* Mobile */}
          <div className="flex md:hidden items-center gap-3">
            <CartDrawer />
            <button onClick={() => setMobileOpen(!mobileOpen)} className="text-muted-foreground">
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[199] flex flex-col items-center justify-center gap-7" style={{ background: 'hsl(var(--background) / 0.98)' }}>
          {links.map(l => (
            <Link key={l.href} to={l.href} className="text-xl text-muted-foreground no-underline font-display hover:text-gold">
              {l.label}
            </Link>
          ))}
          <Link to="/product" className="text-[15px] font-semibold bg-primary text-primary-foreground px-9 py-3.5 rounded-full no-underline mt-4">
            Shop Now — $99
          </Link>
        </div>
      )}
    </>
  );
}
