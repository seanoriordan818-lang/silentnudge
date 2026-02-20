interface OrderBumpProps {
  selected: boolean;
  onToggle: () => void;
  title: React.ReactNode;
  subtitle: React.ReactNode;
}

export const OrderBump = ({ selected, onToggle, title, subtitle }: OrderBumpProps) => (
  <div
    onClick={onToggle}
    className={`p-4 px-[18px] rounded-[14px] cursor-pointer flex gap-3.5 items-center transition-all ${
      selected
        ? 'border border-solid border-gold/40 bg-gold/[0.08]'
        : 'border border-dashed border-gold/15 bg-gold/[0.04] hover:border-gold/30'
    }`}
  >
    <div
      className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all ${
        selected ? 'border-gold bg-gold' : 'border-gold/25 bg-transparent'
      }`}
    >
      {selected && <span className="text-background text-[11px] font-extrabold">✓</span>}
    </div>
    <div className="flex-1">
      <div className="text-[13px] font-semibold text-foreground">{title}</div>
      <div className="text-[11px] text-faint">{subtitle}</div>
    </div>
  </div>
);
