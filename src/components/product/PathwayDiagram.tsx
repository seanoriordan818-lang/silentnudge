const ArrowDown = ({ className }: { className?: string }) => (
  <div className={`flex justify-center items-center h-8 w-full ${className}`}>
    <svg viewBox="0 0 12 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-6">
      <line x1="6" y1="0" x2="6" y2="18" />
      <polyline points="2,14 6,20 10,14" />
    </svg>
  </div>
);

const Step = ({ icon, title, desc, variant }: { icon: string; title: string; desc: string; variant: 'stress' | 'calm' }) => {
  const isStress = variant === 'stress';
  return (
    <div
      className="w-full rounded-[14px] p-5"
      style={{
        background: isStress
          ? 'linear-gradient(135deg, #1e1520, #1a1018)'
          : 'linear-gradient(135deg, #1e1a10, #181510)',
        border: `1px solid ${isStress ? 'rgba(139,32,32,0.25)' : 'rgba(212,146,10,0.25)'}`,
      }}
    >
      <span className="text-xl mb-1 block">{icon}</span>
      <div className={`font-display text-[17px] font-bold mb-1 ${isStress ? 'text-[#8B2020]' : 'text-gold'}`}>{title}</div>
      <div className="text-[13px] text-white/45 leading-snug">{desc}</div>
    </div>
  );
};

const ResultCard = ({ icon, title, lines, variant }: { icon: string; title: string; lines: string[]; variant: 'stress' | 'calm' }) => {
  const isStress = variant === 'stress';
  return (
    <div
      className="w-full rounded-[14px] p-5 text-center"
      style={{
        background: isStress
          ? 'linear-gradient(135deg, #1e1520, #1a1018)'
          : 'linear-gradient(135deg, #1e1a10, #181510)',
        border: `1px solid ${isStress ? 'rgba(139,32,32,0.4)' : 'rgba(212,146,10,0.4)'}`,
        boxShadow: isStress ? '0 0 30px rgba(139,32,32,0.1)' : '0 0 30px rgba(212,146,10,0.12)',
      }}
    >
      <span className="text-[28px] mb-2 block">{icon}</span>
      <div className={`font-display text-[19px] font-bold mb-1.5 ${isStress ? 'text-[#8B2020]' : 'text-gold'}`}>{title}</div>
      {lines.map((line, i) => (
        <div key={i} className={`text-[13px] leading-relaxed ${isStress ? 'text-white/40' : 'text-white/55'}`}>{line}</div>
      ))}
    </div>
  );
};

export const PathwayDiagram = () => (
  <div
    className="w-full rounded-[20px] p-6 md:p-10 relative overflow-hidden"
    style={{ background: 'linear-gradient(180deg, #141220, #0f0d18)' }}
  >
    {/* Mobile: stacked, Desktop: side-by-side */}
    <div className="grid grid-cols-1 md:grid-cols-[1fr_60px_1fr] gap-6 md:gap-0">
      {/* LEFT — Stress */}
      <div className="flex flex-col items-center gap-0">
        <div className="text-[11px] font-semibold tracking-[3px] uppercase text-[#8B2020] text-center mb-5 pb-3 border-b border-[#8B2020]/20 w-full">
          ⚠️ Auditory Pathway
        </div>
        <Step variant="stress" icon="🔊" title="Sound Alarm" desc="Loud, repetitive auditory signal enters through the ear canal" />
        <ArrowDown className="text-[#8B2020] opacity-50" />
        <Step variant="stress" icon="🧠" title="Amygdala Hijack" desc="Brain's threat detector activates — interprets sound as danger" />
        <ArrowDown className="text-[#8B2020] opacity-50" />
        <Step variant="stress" icon="⚡" title="Cortisol Flood" desc="Stress hormones spike before you've even opened your eyes" />
        <ArrowDown className="text-[#8B2020] opacity-50" />
        <ResultCard variant="stress" icon="❌" title="Panic Wake-Up" lines={['Groggy. Stressed. Irritable.', 'Your partner wakes up too.']} />
      </div>

      {/* CENTER DIVIDER — hidden on mobile */}
      <div className="hidden md:flex flex-col items-center justify-center px-2">
        <div className="w-px flex-1" style={{ background: 'repeating-linear-gradient(to bottom, rgba(255,255,255,0.06) 0px, rgba(255,255,255,0.06) 4px, transparent 4px, transparent 12px)' }} />
        <div className="w-11 h-11 rounded-full flex items-center justify-center font-display text-sm font-bold text-white/35 my-2" style={{ background: '#141220', border: '1px solid rgba(255,255,255,0.1)' }}>vs</div>
        <div className="w-px flex-1" style={{ background: 'repeating-linear-gradient(to bottom, rgba(255,255,255,0.06) 0px, rgba(255,255,255,0.06) 4px, transparent 4px, transparent 12px)' }} />
      </div>

      {/* Mobile divider */}
      <div className="flex md:hidden items-center justify-center gap-3">
        <div className="h-px flex-1 bg-white/[0.06]" />
        <div className="w-10 h-10 rounded-full flex items-center justify-center font-display text-sm font-bold text-white/35" style={{ background: '#141220', border: '1px solid rgba(255,255,255,0.1)' }}>vs</div>
        <div className="h-px flex-1 bg-white/[0.06]" />
      </div>

      {/* RIGHT — Calm */}
      <div className="flex flex-col items-center gap-0">
        <div className="text-[11px] font-semibold tracking-[3px] uppercase text-gold text-center mb-5 pb-3 border-b border-gold/20 w-full">
          ✋ Tactile Pathway (SilentNudge)
        </div>
        <Step variant="calm" icon="〰️" title="Wrist Vibration" desc="5-stage escalating vibration pattern delivered through skin contact" />
        <ArrowDown className="text-gold opacity-50" />
        <Step variant="calm" icon="🔬" title="Pacinian Corpuscles" desc="Deep-pressure nerve receptors activate a separate sensory pathway" />
        <ArrowDown className="text-gold opacity-50" />
        <Step variant="calm" icon="🌅" title="Calm Arousal" desc="Brain wakes naturally — no threat response, no cortisol spike" />
        <ArrowDown className="text-gold opacity-50" />
        <ResultCard variant="calm" icon="✅" title="Gentle Wake-Up" lines={['Alert. Calm. No cortisol spike.', 'Your partner feels nothing.']} />
      </div>
    </div>

    <div className="text-center mt-8 text-[12px] text-white/20 italic tracking-wide">
      Based on Harvard Medical School research — Tactile awakening pathway published in Cell journal, December 2024
    </div>
  </div>
);
