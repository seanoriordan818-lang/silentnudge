const ArrowDown = ({ color }: { color: 'stress' | 'calm' }) => (
  <div className="flex justify-center items-center h-[22px] w-full">
    <svg width="10" height="16" viewBox="0 0 12 24" fill="none" stroke="currentColor" strokeWidth="2"
      style={{ color: color === 'stress' ? '#8B2020' : 'hsl(var(--gold))', opacity: 0.5 }}>
      <line x1="6" y1="0" x2="6" y2="18" />
      <polyline points="2,14 6,20 10,14" />
    </svg>
  </div>
);

const StepCard = ({ icon, title, desc, type }: { icon: string; title: string; desc: string; type: 'stress' | 'calm' }) => (
  <div className="w-full max-w-[320px] rounded-[11px] p-3"
    style={{
      background: type === 'stress'
        ? 'linear-gradient(135deg, #1e1520 0%, #1a1018 100%)'
        : 'linear-gradient(135deg, #1e1a10 0%, #181510 100%)',
      border: `1px solid ${type === 'stress' ? 'rgba(139,32,32,0.25)' : 'rgba(212,146,10,0.25)'}`,
    }}>
    <div className="flex items-start gap-2">
      <span className="text-[16px] shrink-0 mt-px">{icon}</span>
      <div className="min-w-0">
        <div className="font-display text-[14.5px] font-bold leading-tight mb-0.5"
          style={{ color: type === 'stress' ? '#8B2020' : 'hsl(var(--gold))' }}>{title}</div>
        <div className="text-[11.5px] leading-snug" style={{ color: 'rgba(255,255,255,0.42)' }}>{desc}</div>
      </div>
    </div>
  </div>
);

const ResultCard = ({ title, lines, type }: { title: string; lines: string[]; type: 'stress' | 'calm' }) => (
  <div className="w-full max-w-[320px] rounded-[11px] p-3.5 text-center"
    style={{
      background: type === 'stress'
        ? 'linear-gradient(135deg, #1e1520 0%, #1a1018 100%)'
        : 'linear-gradient(135deg, #1e1a10 0%, #181510 100%)',
      border: `1px solid ${type === 'stress' ? 'rgba(139,32,32,0.4)' : 'rgba(212,146,10,0.4)'}`,
      boxShadow: type === 'stress' ? '0 0 24px rgba(139,32,32,0.1)' : '0 0 24px rgba(212,146,10,0.12)',
    }}>
    <div className="font-display text-[16px] font-bold mb-1"
      style={{ color: type === 'stress' ? '#8B2020' : 'hsl(var(--gold))' }}>{title}</div>
    {lines.map((l, i) => (
      <div key={i} className="text-[11.5px] leading-relaxed"
        style={{ color: type === 'calm' ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.4)' }}>{l}</div>
    ))}
  </div>
);

export const PathwayDiagramCompact = () => (
  <div className="w-full rounded-[16px] p-5 md:p-7 flex flex-col overflow-hidden"
    style={{ background: 'linear-gradient(180deg, #141220 0%, #0f0d18 100%)' }}>

    <div className="flex flex-row flex-nowrap items-stretch flex-1 w-full">
      {/* LEFT — Stress */}
      <div className="flex-1 min-w-0 flex flex-col items-center">
        <div className="text-[10px] font-semibold tracking-[2.5px] uppercase text-center w-full mb-4 pb-2"
          style={{ color: '#8B2020', borderBottom: '1px solid rgba(139,32,32,0.2)' }}>
          ⚠️ Auditory Pathway
        </div>
        <StepCard icon="🔊" title="Sound Alarm" desc="Loud, repetitive auditory signal enters through the ear canal" type="stress" />
        <ArrowDown color="stress" />
        <StepCard icon="🧠" title="Amygdala Hijack" desc="Brain's threat detector activates — interprets sound as danger" type="stress" />
        <ArrowDown color="stress" />
        <StepCard icon="⚡" title="Cortisol Flood" desc="Stress hormones spike before you've even opened your eyes" type="stress" />
        <ArrowDown color="stress" />
        <ResultCard title="Panic Wake-Up" lines={['Groggy. Stressed. Irritable.', 'Your partner wakes up too.']} type="stress" />
      </div>

      {/* DIVIDER */}
      <div className="flex-[0_0_48px] w-[48px] flex flex-col items-center justify-center">
        <div className="w-px flex-1" style={{ background: 'repeating-linear-gradient(to bottom, rgba(255,255,255,0.06) 0px, rgba(255,255,255,0.06) 4px, transparent 4px, transparent 12px)' }} />
        <div className="w-9 h-9 rounded-full flex items-center justify-center font-display text-xs font-bold my-1.5 shrink-0"
          style={{ background: '#141220', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.35)' }}>vs</div>
        <div className="w-px flex-1" style={{ background: 'repeating-linear-gradient(to bottom, rgba(255,255,255,0.06) 0px, rgba(255,255,255,0.06) 4px, transparent 4px, transparent 12px)' }} />
      </div>

      {/* RIGHT — Calm */}
      <div className="flex-1 min-w-0 flex flex-col items-center">
        <div className="text-[10px] font-semibold tracking-[2.5px] uppercase text-center w-full mb-4 pb-2"
          style={{ color: 'hsl(var(--gold))', borderBottom: '1px solid rgba(212,146,10,0.2)' }}>
          ✋ Tactile Pathway (SilentNudge)
        </div>
        <StepCard icon="〰️" title="Wrist Vibration" desc="5-stage escalating vibration pattern delivered through skin" type="calm" />
        <ArrowDown color="calm" />
        <StepCard icon="🔬" title="Pacinian Corpuscles" desc="Deep-pressure nerve receptors activate a separate pathway" type="calm" />
        <ArrowDown color="calm" />
        <StepCard icon="🌅" title="Calm Arousal" desc="Brain wakes naturally — no threat response, no cortisol" type="calm" />
        <ArrowDown color="calm" />
        <ResultCard title="Gentle Wake-Up" lines={['Alert. Calm. No cortisol spike.', 'Your partner feels nothing.']} type="calm" />
      </div>
    </div>

    <p className="text-center mt-4 text-[10.5px] italic tracking-wide" style={{ color: 'rgba(255,255,255,0.18)' }}>
      Based on Harvard Medical School research — Tactile awakening pathway published in Cell journal, December 2024
    </p>
  </div>
);
