import { ReactNode } from 'react';

export const Divider = () => (
  <div className="h-px" style={{ background: 'linear-gradient(90deg, transparent, hsl(var(--gold) / 0.1), transparent)' }} />
);

export const Label = ({ children }: { children: ReactNode }) => (
  <div className="text-[10px] tracking-[4px] uppercase text-gold font-medium mb-4">{children}</div>
);

export const Heading = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <h2 className={`font-display text-[clamp(26px,4vw,40px)] leading-[1.12] font-medium ${className}`}>{children}</h2>
);

export const HeadingSm = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <h2 className={`font-display text-[clamp(22px,3.2vw,34px)] leading-[1.15] font-medium ${className}`}>{children}</h2>
);

export const Gold = ({ children }: { children: ReactNode }) => (
  <span className="text-gold">{children}</span>
);

export const Section = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <section className={`max-w-[1200px] mx-auto py-14 px-7 ${className}`}>{children}</section>
);

export const Stars = ({ n = 5 }: { n?: number }) => (
  <div className="flex gap-0.5 text-gold">
    {[...Array(n)].map((_, i) => (
      <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ))}
  </div>
);
