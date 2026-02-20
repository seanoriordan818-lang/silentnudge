import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQProps {
  q: string;
  a: string;
}

export const FAQAccordion = ({ q, a }: FAQProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-foreground/5">
      <button
        onClick={() => setOpen(!open)}
        className="w-full bg-transparent border-none cursor-pointer flex justify-between items-center py-5 text-foreground text-[15px] font-medium text-left font-body gap-4"
      >
        {q}
        <span className={`transition-transform duration-300 flex-shrink-0 ${open ? 'rotate-180' : ''}`}>
          <ChevronDown size={18} className="text-muted-foreground" />
        </span>
      </button>
      <div
        className="overflow-hidden transition-all duration-400"
        style={{ maxHeight: open ? 400 : 0, transition: 'max-height 0.4s cubic-bezier(.22,1,.36,1)' }}
      >
        <p className="text-sm leading-7 text-muted-foreground mb-5 pr-8">{a}</p>
      </div>
    </div>
  );
};
