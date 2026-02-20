import { Reveal } from '@/components/Reveal';
import { Label, Heading, Gold, Section, Stars } from '@/components/shared';

const ReviewsPage = () => {
  return (
    <>
      <Section className="pt-24 text-center">
        <Reveal>
          <Label>Reviews</Label>
          <Heading>Real mornings. <Gold>Real people.</Gold></Heading>
          <p className="text-muted-foreground mt-5">No reviews yet. Be the first to share your experience!</p>
        </Reveal>
      </Section>

      <Section className="pt-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <Reveal key={i} delay={(i % 3) * 0.05}>
              <div className="p-6 rounded-[18px] bg-raised border border-gold-subtle">
                <div className="flex gap-0.5 mb-3">
                  {[...Array(5)].map((_, j) => (
                    <div key={j} className="w-3.5 h-3.5 rounded-sm" style={{ background: 'hsl(var(--gold) / 0.15)' }} />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground italic font-serif mb-4">"No review yet"</p>
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-raised2 flex items-center justify-center text-xs font-semibold text-gold-dim font-display">?</div>
                  <div>
                    <div className="text-[12px] font-semibold text-faint">Awaiting review</div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
};

export default ReviewsPage;
