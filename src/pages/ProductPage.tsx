import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Reveal } from '@/components/Reveal';
import { ProductCircle } from '@/components/ProductCircle';
import { Divider, Label, HeadingSm, Gold, Section, Stars } from '@/components/shared';
import { Check, ArrowRight, Shield, Truck, RefreshCw } from 'lucide-react';
import { useCartStore } from '@/stores/cartStore';
import { storefrontApiRequest, STOREFRONT_PRODUCTS_QUERY, ShopifyProduct } from '@/lib/shopify';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

const ProductPage = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [img, setImg] = useState(0);
  const addItem = useCartStore(state => state.addItem);
  const isCartLoading = useCartStore(state => state.isLoading);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await storefrontApiRequest(STOREFRONT_PRODUCTS_QUERY, { first: 10 });
        if (data?.data?.products?.edges) {
          setProducts(data.data.products.edges);
        }
      } catch (err) {
        console.error('Failed to fetch products:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const product = products[0];
  const variant = product?.node?.variants?.edges?.[0]?.node;
  const productImage = product?.node?.images?.edges?.[0]?.node?.url;
  const imgViews = ['Front', 'Wrist', 'Escalation', 'Band', 'Charging'];

  const handleAddToCart = async () => {
    if (!product || !variant) return;
    await addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });
    toast.success('Added to cart!', { position: 'top-center' });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-[68px]">
        <Loader2 className="h-8 w-8 animate-spin text-gold" />
      </div>
    );
  }

  if (!product) {
    return (
      <Section className="pt-24 text-center">
        <HeadingSm>No products found</HeadingSm>
        <p className="text-muted-foreground mt-4">Products will appear here once they're added to the store.</p>
      </Section>
    );
  }

  const price = parseFloat(product.node.priceRange.minVariantPrice.amount);

  return (
    <>
      {/* Breadcrumb */}
      <div className="max-w-[1200px] mx-auto px-7 pt-20 pb-2">
        <span className="text-[12px] text-faint">
          <Link to="/" className="text-faint no-underline hover:text-gold">Home</Link> / Shop / <span className="text-gold-dim">{product.node.title}</span>
        </span>
      </div>

      {/* PDP GRID */}
      <Section className="pt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Gallery */}
          <div className="flex gap-3.5">
            <div className="flex flex-col gap-2">
              {imgViews.map((label, i) => (
                <div
                  key={i}
                  onClick={() => setImg(i)}
                  className={`w-[60px] h-[60px] rounded-[10px] cursor-pointer flex items-center justify-center transition-all text-[9px] uppercase tracking-wider text-muted-foreground ${
                    img === i ? 'border-2 border-gold-faint bg-raised2' : 'border-2 border-transparent bg-raised'
                  }`}
                >
                  {label}
                </div>
              ))}
            </div>
            <div className="flex-1 aspect-square rounded-[20px] border border-gold-subtle flex items-center justify-center overflow-hidden relative" style={{ background: 'linear-gradient(135deg, hsl(252 18% 14%), hsl(255 25% 7.5%))' }}>
              {img === 0 && productImage ? (
                <img src={productImage} alt={product.node.title} className="w-full h-full object-cover" />
              ) : img === 2 ? (
                <div className="flex flex-col items-center gap-3.5">
                  <div className="text-[11px] tracking-[3px] uppercase" style={{ color: 'hsl(var(--gold) / 0.4)' }}>5-Stage Escalation</div>
                  <div className="flex items-end gap-2">
                    {[20, 30, 42, 56, 72].map((h, i) => (
                      <div key={i} className="w-7 rounded-md animate-bar-pulse" style={{ height: h, background: `linear-gradient(to top, hsl(var(--gold) / ${0.15 + i * 0.12}), hsl(var(--gold) / ${0.3 + i * 0.15}))`, animationDelay: `${i * 0.15}s` }} />
                    ))}
                  </div>
                  <div className="flex gap-5 mt-1">
                    {['Gentle', 'Rhythmic', 'Firm', 'Strong', 'Max'].map((l, i) => (
                      <div key={i} className="text-[9px] text-center w-7" style={{ color: 'hsl(var(--gold) / 0.3)' }}>{l}</div>
                    ))}
                  </div>
                </div>
              ) : img === 4 ? (
                <div className="text-center">
                  <div className="text-2xl opacity-40 mb-2">⚡</div>
                  <div className="text-sm font-display" style={{ color: 'hsl(var(--gold) / 0.5)' }}>USB Fast Charge</div>
                  <div className="text-[12px] text-faint mt-1">1 hour → 7+ days</div>
                </div>
              ) : img === 3 ? (
                <div className="text-center">
                  <div className="w-[120px] h-4 rounded-lg mx-auto mb-3" style={{ background: 'linear-gradient(90deg, hsl(var(--gold) / 0.15), hsl(var(--gold) / 0.06))' }} />
                  <div className="text-sm font-display" style={{ color: 'hsl(var(--gold) / 0.5)' }}>Medical-grade silicone</div>
                  <div className="text-[12px] text-faint mt-1">Hypoallergenic · Breathable · 22g</div>
                </div>
              ) : (
                <ProductCircle size={220} />
              )}
            </div>
          </div>

          {/* BUY BOX */}
          <div className="md:sticky md:top-20">
            <h1 className="font-display text-[30px] font-medium leading-tight mb-2">{product.node.title}</h1>
            <p className="text-[15px] text-muted-foreground mb-5 font-light">{product.node.description}</p>

            <div className="flex items-baseline gap-3 mb-6">
              <span className="font-display text-[38px] text-gold">${price.toFixed(0)}</span>
              <span className="text-[16px] text-faint line-through">${(price * 1.5).toFixed(0)}</span>
              <span className="text-[11px] font-bold bg-primary text-primary-foreground px-2.5 py-0.5 rounded-full">SAVE ${((price * 1.5) - price).toFixed(0)}</span>
            </div>

            <div className="mb-5">
              <div className="text-[11px] tracking-[2px] uppercase text-gold-dim font-semibold mb-2.5">What's included</div>
              {['SilentNudge with purpose-built 5-stage wake motor', 'Silicone wristband (medical-grade, hypoallergenic)', 'USB magnetic charging cable', 'Quick-start card'].map((item, i) => (
                <div key={i} className="flex gap-2.5 items-center mb-1.5">
                  <Check size={14} className="text-gold flex-shrink-0" />
                  <span className="text-[13px] text-muted-foreground font-light">{item}</span>
                </div>
              ))}
            </div>

            <button
              onClick={handleAddToCart}
              disabled={isCartLoading}
              className="w-full py-4 rounded-full bg-primary text-primary-foreground font-bold text-[15px] shadow-gold flex items-center justify-center gap-2.5 transition-all hover:brightness-110 disabled:opacity-50 mb-4"
            >
              {isCartLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Add to Cart — ${price.toFixed(0)} <ArrowRight size={16} /></>}
            </button>

            <div className="grid grid-cols-3 gap-3 mt-4">
              {[
                { icon: <Truck size={18} />, label: 'Free Shipping' },
                { icon: <Shield size={18} />, label: '100-Night Trial' },
                { icon: <RefreshCw size={18} />, label: '2-Year Warranty' },
              ].map((g, i) => (
                <div key={i} className="flex flex-col items-center gap-1.5 py-3 rounded-xl bg-raised border border-gold-subtle">
                  <span className="text-gold">{g.icon}</span>
                  <span className="text-[10px] text-muted-foreground font-medium">{g.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>
      <Divider />

      {/* COMPARISON TABLE */}
      <Section>
        <Reveal>
          <div className="text-center mb-10">
            <Label>How We Compare</Label>
            <HeadingSm>Your $400 watch uses a <Gold>text-message motor</Gold> to wake you.</HeadingSm>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="bg-raised rounded-[20px] border border-gold-subtle overflow-hidden max-w-[860px] mx-auto">
            <div className="grid grid-cols-4 p-3.5 px-5" style={{ background: 'hsl(var(--gold) / 0.04)', borderBottom: '2px solid hsl(var(--gold) / 0.08)' }}>
              <span className="text-[11px] tracking-[2px] uppercase text-faint font-semibold">Feature</span>
              <span className="text-[11px] tracking-[2px] uppercase text-gold font-semibold text-center">SilentNudge</span>
              <span className="text-[11px] tracking-[2px] uppercase text-faint font-semibold text-center">Smartwatch</span>
              <span className="text-[11px] tracking-[2px] uppercase text-faint font-semibold text-center">Others</span>
            </div>
            {[
              ['Purpose-built wake motor', true, false, false],
              ['5-stage escalation', true, false, '3 levels'],
              ['Harvard-backed mechanism', true, false, false],
              ['Standalone (no phone)', true, false, true],
              ['7+ day battery', true, false, true],
              ['Deep sleeper guarantee', true, false, true],
              ['Price', '$99', '$250–$500', '$49–$84'],
            ].map(([f, sn, sw, ot], i) => (
              <div key={i} className="grid grid-cols-4 px-5 py-3 items-center" style={{ borderBottom: '1px solid hsl(0 0% 100% / 0.04)' }}>
                <span className="text-[13px] text-muted-foreground">{f as string}</span>
                {([sn, sw, ot] as (boolean | string)[]).map((val, j) => (
                  <span key={j} className={`text-center ${typeof val === 'string' ? 'text-[12px] font-semibold' : 'text-[16px]'} ${j === 0 ? 'text-gold' : 'text-faint'}`}>
                    {val === true ? <Check size={j === 0 ? 18 : 16} className={`mx-auto ${j !== 0 ? 'opacity-40' : ''}`} /> : val === false ? '✕' : val}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </Reveal>
      </Section>
    </>
  );
};

export default ProductPage;
