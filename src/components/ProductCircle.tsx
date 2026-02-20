interface ProductCircleProps {
  size?: number;
}

export function ProductCircle({ size = 240 }: ProductCircleProps) {
  return (
    <div className="relative" style={{ width: size, height: size }}>
      {[0, 1, 2].map(i => (
        <div
          key={i}
          className="absolute inset-0 rounded-full animate-hero-ring"
          style={{
            border: `1.5px solid hsl(var(--gold) / ${0.1 - i * 0.025})`,
            animationDelay: `${i}s`,
          }}
        />
      ))}
      <div
        className="absolute rounded-full flex items-center justify-center"
        style={{
          inset: size * 0.15,
          background: 'radial-gradient(circle at 38% 32%, hsl(252 18% 14%), hsl(255 25% 7.5%))',
          border: '2px solid hsl(var(--gold) / 0.25)',
          boxShadow: '0 0 60px hsl(var(--gold) / 0.06)',
        }}
      >
        <div className="text-center">
          <div className="font-display font-light text-gold" style={{ fontSize: size * 0.16, letterSpacing: -1 }}>
            5:00
          </div>
          <div className="text-[9px] tracking-[4px] mt-0.5" style={{ color: 'hsl(var(--gold) / 0.35)' }}>
            AM
          </div>
          <div className="flex gap-[3px] justify-center mt-2.5">
            {[7, 11, 15, 19, 25].map((h, i) => (
              <div
                key={i}
                className="animate-bar-pulse rounded-sm"
                style={{
                  width: 3.5,
                  height: h,
                  background: `hsl(var(--gold) / ${0.2 + i * 0.15})`,
                  animationDelay: `${i * 0.12}s`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
