import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Moon, Menu, X } from 'lucide-react';
import { CartTrigger } from './CartTrigger';

const links = [
{ label: 'Home', href: '/' },
{ label: 'The Science', href: '/science' },
{ label: 'Reviews', href: '/reviews' },
{ label: 'FAQ', href: '/faq' }];


export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [bannerVisible, setBannerVisible] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  useEffect(() => setMobileOpen(false), [location]);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-[200]">
        {/* Announcement Banner */}
        {bannerVisible &&
        <div className="w-full bg-banner py-2 px-4 text-center relative" style={{ borderBottom: '1px solid hsl(var(--border))' }}>
            <p className="text-[11px] sm:text-[12px] tracking-wide" style={{ color: 'hsl(0 0% 100% / 0.85)' }}>
              🚚 Free US Shipping on All Orders · 100-Night Guarantee
            </p>
            <button
            onClick={() => setBannerVisible(false)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors md:hidden"
            aria-label="Dismiss banner">

              <X size={14} />
            </button>
          </div>
        }

        {/* Nav bar */}
        <nav
          className="transition-all duration-500"
          style={{
            background: scrolled ? 'hsl(var(--background) / 0.95)' : 'hsl(var(--background) / 0.6)',
            backdropFilter: 'blur(20px)',
            borderBottom: scrolled ? '1px solid hsl(var(--gold) / 0.06)' : 'none'
          }}>

          <div className="max-w-[1240px] mx-auto px-5 h-[52px] flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 no-underline" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <Moon size={20} className="text-gold opacity-50" />
              <span className="font-display text-xl text-foreground">
                Silent<span className="text-gold">Nudge</span>
              </span>
            </Link>

            {/* Desktop */}
            <div className="hidden md:flex items-center gap-6">
              {links.map((l) =>
              <Link
                key={l.href}
                to={l.href}
                className={`text-[13px] no-underline tracking-wide transition-colors hover:text-gold ${
                location.pathname === l.href ? 'text-gold font-semibold' : 'text-muted-foreground'}`
                }>

                  {l.label}
                </Link>
              )}
            </div>

            <div className="flex items-center gap-3">
              <CartTrigger />
              <button onClick={() => setMobileOpen(!mobileOpen)} className="text-muted-foreground md:hidden">
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </nav>
      </div>

      {/* Spacer to push content below fixed header */}
      <div style={{ height: bannerVisible ? '84px' : '52px' }} />

      {/* Mobile overlay */}
      {mobileOpen &&
      <div className="fixed inset-0 z-[199] flex flex-col items-center justify-center gap-6" style={{ background: 'hsl(var(--background) / 0.98)' }}>
          {links.map((l) =>
        <Link key={l.href} to={l.href} className="text-lg text-muted-foreground no-underline font-body hover:text-gold">
              {l.label}
            </Link>
        )}
          <Link to="/product" className="text-[14px] font-semibold bg-primary text-primary-foreground px-8 py-3 rounded-full no-underline mt-3">
            Shop Now
          </Link>
        </div>
      }
    </>);

}