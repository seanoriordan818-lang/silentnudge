import { useState, useCallback } from 'react';
import { Reveal } from '@/components/Reveal';
import { Label } from '@/components/shared';
import { X, Volume2, Activity } from 'lucide-react';
import pathwayDiagram from '@/assets/science-pathway-diagram.png';

const SoundPathwayCard = () => (
  <div className="rounded-2xl border border-red-500/20 bg-red-500/[0.06] p-5">
    <div className="flex items-center gap-2 mb-4">
      <div className="w-8 h-8 rounded-full bg-red-500/15 flex items-center justify-center">
        <Volume2 className="w-4 h-4 text-red-400" />
      </div>
      <h3 className="text-[15px] font-semibold text-red-400">Sound Alarm Pathway</h3>
    </div>
    <div className="flex flex-col gap-2.5">
      {[
        { step: 'Sound Alarm', desc: 'Loud noise hits your eardrums' },
        { step: 'Amygdala Hijack', desc: 'Brain detects a threat signal' },
        { step: 'Cortisol Flood', desc: 'Stress hormones spike instantly' },
        { step: 'Panic Wake-Up', desc: 'Jolt awake, groggy & on edge' },
      ].map((item, i) => (
        <div key={i} className="flex items-start gap-3">
          <div className="flex flex-col items-center mt-1">
            <div className="w-5 h-5 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center text-[10px] font-bold text-red-400">
              {i + 1}
            </div>
            {i < 3 && <div className="w-px h-4 bg-red-500/20 mt-1" />}
          </div>
          <div>
            <p className="text-[13px] font-semibold text-foreground leading-tight">{item.step}</p>
            <p className="text-[12px] text-muted-foreground leading-snug">{item.desc}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const TactilePathwayCard = () => (
  <div className="rounded-2xl border border-gold/20 bg-gold/[0.06] p-5">
    <div className="flex items-center gap-2 mb-4">
      <div className="w-8 h-8 rounded-full bg-gold/15 flex items-center justify-center">
        <Activity className="w-4 h-4 text-gold" />
      </div>
      <h3 className="text-[15px] font-semibold text-gold">SilentNudge · Tactile Pathway</h3>
    </div>
    <div className="flex flex-col gap-2.5">
      {[
        { step: 'Wrist Vibration', desc: 'Gentle pulse on your wrist' },
        { step: 'Pacinian Corpuscles', desc: 'Pressure receptors activate calmly' },
        { step: 'Calm Arousal', desc: 'Brain wakes without stress response' },
        { step: 'Gentle Wake-Up', desc: 'Alert, rested & cortisol-free' },
      ].map((item, i) => (
        <div key={i} className="flex items-start gap-3">
          <div className="flex flex-col items-center mt-1">
            <div className="w-5 h-5 rounded-full bg-gold/20 border border-gold/30 flex items-center justify-center text-[10px] font-bold text-gold">
              {i + 1}
            </div>
            {i < 3 && <div className="w-px h-4 bg-gold/20 mt-1" />}
          </div>
          <div>
            <p className="text-[13px] font-semibold text-foreground leading-tight">{item.step}</p>
            <p className="text-[12px] text-muted-foreground leading-snug">{item.desc}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export const ScienceSectionV2 = () => {
  return (
    <section className="bg-background md:py-20 py-[20px] md:py-[30px]">
      <div className="max-w-[1200px] w-[90%] mx-auto">
        <Reveal>
          <div className="text-center mb-7 md:mb-14">
            <Label>The Science</Label>
            <h2 className="font-display text-[clamp(26px,4vw,38px)] leading-[1.15] font-medium">
              Why Vibration Works <span className="text-gold">When Sound Fails.</span>
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-12 items-center md:max-w-[1000px] mx-auto">
          {/* Left — desktop: diagram image, mobile: pathway cards */}
          <Reveal delay={0.05}>
            {/* Desktop image */}
            <img
              src={pathwayDiagram}
              alt="Auditory vs Tactile pathway comparison"
              className="hidden md:block w-full h-auto object-contain rounded-[16px] max-w-none"
            />
            {/* Mobile cards */}
            <div className="flex flex-col gap-4 md:hidden">
              <SoundPathwayCard />
              <TactilePathwayCard />
            </div>
          </Reveal>

          {/* Right — copy */}
          <Reveal delay={0.12}>
            <div>
              <p className="text-[15px] md:text-[17px] leading-7 text-muted-foreground mb-5">
                Sound alarms trigger your brain's threat response — flooding your system with cortisol before you've opened your eyes. That's not a wake-up. That's a micro panic attack, every morning.
              </p>
              <p className="text-[15px] md:text-[17px] leading-7 text-muted-foreground mb-5">
                SilentNudge uses a completely different neurological pathway. Deep-pressure vibration activates Pacinian corpuscles in your wrist — nerve receptors that communicate directly with your brain's arousal system, bypassing the stress response entirely.
              </p>
              <p className="text-[15px] md:text-[17px] leading-7 text-foreground font-medium">
                You wake up. Your body doesn't fight it.
              </p>
              <p className="text-[15px] md:text-[17px] leading-7 text-foreground font-medium mt-2">
                No cortisol spike. No grogginess. No panic.
              </p>

              {/* Credibility badge */}
              <div className="mt-6 inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-gold/[0.08] border border-gold/[0.15]">
                <span className="text-base">📖</span>
                <span className="text-[13px] text-gold leading-snug">
                  Validated by Harvard Medical School — Tactile awakening pathway research published in <em>Cell</em> journal, December 2024.
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
