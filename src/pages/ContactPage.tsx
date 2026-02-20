import { useState } from 'react';
import { Reveal } from '@/components/Reveal';
import { Label, Heading, Gold, Section } from '@/components/shared';
import { Mail, Check } from 'lucide-react';

const ContactPage = () => {
  const [sent, setSent] = useState(false);

  return (
    <>
      <Section className="pt-24 text-center">
        <Reveal>
          <Label>Contact Us</Label>
          <Heading>We'd love to <Gold>hear from you.</Gold></Heading>
          <p className="text-[15px] text-muted-foreground mt-3.5 font-light max-w-[500px] mx-auto">Whether you have a question, need help with your order, or want to share your experience — we're here.</p>
        </Reveal>
      </Section>
      <Section className="pt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-[900px] mx-auto">
          <Reveal>
            <div>
              <h3 className="font-display text-xl mb-5">Get in touch</h3>
              <div className="flex items-center gap-3 mb-4">
                <Mail size={20} className="text-gold" />
                <span className="text-sm text-muted-foreground">support@silentnudge.com</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">We typically respond within 24 hours. For order-related questions, please include your order number.</p>
              <div className="p-6 bg-raised rounded-[16px] border border-gold-subtle">
                <h4 className="text-sm font-semibold mb-3">Common topics</h4>
                {['Order status & tracking', 'Returns & 100-night guarantee', 'Product help & setup', 'Wholesale & partnership enquiries'].map((t, i) => (
                  <div key={i} className="flex items-center gap-2 mb-2">
                    <Check size={14} className="text-gold" />
                    <span className="text-[13px] text-muted-foreground">{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            {sent ? (
              <div className="p-12 bg-raised rounded-[20px] border border-gold-faint text-center">
                <div className="text-4xl mb-4">✓</div>
                <h3 className="font-display text-[22px] mb-2">Message sent</h3>
                <p className="text-sm text-muted-foreground">We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <div className="p-8 bg-raised rounded-[20px] border border-gold-subtle">
                {[
                  { label: 'Name', type: 'text', placeholder: 'Your name' },
                  { label: 'Email', type: 'email', placeholder: 'you@example.com' },
                  { label: 'Subject', type: 'text', placeholder: 'How can we help?' },
                ].map((f, i) => (
                  <div key={i} className="mb-4">
                    <label className="text-[11px] tracking-[1.5px] uppercase text-gold-dim font-semibold block mb-1.5">{f.label}</label>
                    <input type={f.type} placeholder={f.placeholder} className="w-full px-4 py-3 rounded-[10px] border border-gold-faint bg-background text-foreground text-sm outline-none focus:border-primary/40 transition-colors" />
                  </div>
                ))}
                <div className="mb-4">
                  <label className="text-[11px] tracking-[1.5px] uppercase text-gold-dim font-semibold block mb-1.5">Message</label>
                  <textarea rows={5} placeholder="Tell us more..." className="w-full px-4 py-3 rounded-[10px] border border-gold-faint bg-background text-foreground text-sm outline-none focus:border-primary/40 transition-colors resize-y" />
                </div>
                <button onClick={() => setSent(true)} className="w-full py-3.5 rounded-full bg-primary text-primary-foreground font-bold text-sm">
                  Send Message
                </button>
              </div>
            )}
          </Reveal>
        </div>
      </Section>
    </>
  );
};

export default ContactPage;
