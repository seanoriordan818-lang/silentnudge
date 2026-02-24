import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Reveal } from '@/components/Reveal';
import { Divider, Label, Stars } from '@/components/shared';
import { Check, ArrowRight, Shield, Truck, RefreshCw, Lock, Loader2, Zap } from 'lucide-react';
import { useCartStore } from '@/stores/cartStore';
import { storefrontApiRequest, STOREFRONT_PRODUCTS_QUERY, ShopifyProduct } from '@/lib/shopify';
import { toast } from 'sonner';
import { ProductCircle } from '@/components/ProductCircle';
import { BundleSelector, bundles } from '@/components/product/BundleSelector';
import { ScienceSection } from '@/components/product/ScienceSection';
import { ComparisonTable } from '@/components/product/ComparisonTable';
import { PersonaSection } from '@/components/product/PersonaSection';
import { ReviewsSection } from '@/components/product/ReviewsSection';
import { FAQSection } from '@/components/product/FAQSection';
import { GuaranteeStrip } from '@/components/product/GuaranteeStrip';
import { StickyBottomBar } from '@/components/product/StickyBottomBar';


const ProductPage = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [img, setImg] = useState(0);
  const [selectedBundle, setSelectedBundle] = useState(
    searchParams.get('bundle') === 'true' ? 'couples' : 'single'
  );
  const [addedBackup, setAddedBackup] = useState(true);
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
  const productImages = product?.node?.images?.edges || [];

  const currentBundle = bundles.find(b => b.id === selectedBundle) || bundles[0];
  const backupPrice = 19;
  const total = currentBundle.price + (addedBackup ? backupPrice : 0);

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
      <section className="max-w-[1200px] mx-auto py-20 px-7 pt-24 text-center">
        <h2 className="font-display text-[clamp(22px,3.2vw,34px)] leading-[1.15] font-medium">No products found</h2>
        <p className="text-muted-foreground mt-4">Products will appear here once they're added to the store.</p>
      </section>
    );
  }

  return (
    <>
      {/* Breadcrumb */}
      <div className="pt-4" />

      {/* IMAGE GALLERY — full width, untouched */}
      <section className="max-w-[700px] mx-auto px-5 md:px-7 pt-4 pb-4">
        <div className="flex flex-col md:flex-row gap-3 md:gap-4">
          {/* Desktop thumbnails */}
          {productImages.length > 1 && (
            <div className="hidden md:flex flex-col gap-2">
              {productImages.map((image, i) => (
                <div
                  key={i}
                  onClick={() => setImg(i)}
                  className={`w-16 h-16 rounded-[10px] cursor-pointer overflow-hidden transition-all ${
                    img === i ? 'border-2 border-gold/40' : 'border-2 border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={image.node.url} alt={image.node.altText || product.node.title} className="w-full h-full object-cover" loading="lazy" />
                </div>
              ))}
            </div>
          )}

          {/* Main image */}
          <div className="relative flex-1">
            <div
              className="w-full aspect-square rounded-[16px] md:rounded-[20px] border border-gold-subtle flex items-center justify-center overflow-hidden relative"
              style={{ background: 'linear-gradient(135deg, hsl(252 18% 14%), hsl(255 25% 7.5%))' }}
              onTouchStart={(e) => {
                const touch = e.touches[0];
                (e.currentTarget as any)._touchStartX = touch.clientX;
              }}
              onTouchEnd={(e) => {
                const startX = (e.currentTarget as any)._touchStartX;
                if (startX === undefined) return;
                const endX = e.changedTouches[0].clientX;
                const diff = startX - endX;
                if (Math.abs(diff) > 50) {
                  if (diff > 0 && img < productImages.length - 1) setImg(img + 1);
                  if (diff < 0 && img > 0) setImg(img - 1);
                }
              }}
            >
              {productImages.length > 0 ? (
                <img src={productImages[img]?.node.url} alt={product.node.title} className="w-full h-full object-cover" />
              ) : (
                <ProductCircle size={220} />
              )}
            </div>

            {/* Mobile dot indicators */}
            {productImages.length > 1 && (
              <div className="flex md:hidden justify-center gap-1.5 mt-3">
                {productImages.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setImg(i)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      img === i ? 'bg-gold w-5' : 'bg-gold/25'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          STEP 4 — SOCIAL PROOF + HEADLINE
          ═══════════════════════════════════════════════════ */}
      <section className="max-w-[600px] mx-auto px-5 md:px-7 pt-6 pb-2 text-center">
        <Reveal>
          {/* Rating line */}
          <div className="flex items-center justify-center gap-2 mb-3">
            <Stars />
            <span className="text-[13px] text-muted-foreground">
              Rated <span className="text-foreground font-medium">4.8/5</span> by 30,000+ Happy Customers
            </span>
          </div>

          {/* Product name */}
          <p className="text-[14px] text-gold-dim tracking-wide uppercase font-medium mb-1">
            SilentNudge Wristband Alarm
          </p>

          {/* Headline */}
          <h1 className="font-display text-[28px] md:text-[38px] font-semibold leading-[1.15] mb-4">
            The Alarm That Wakes<br className="hidden sm:block" /> Only You.
          </h1>

          {/* Price line */}
          <div className="flex items-baseline justify-center gap-3">
            <span className="text-[16px] text-faint line-through">$149</span>
            <span className="font-display text-[36px] md:text-[42px] text-gold">$99</span>
            <span className="text-[11px] font-bold bg-primary text-primary-foreground px-2.5 py-1 rounded-full uppercase tracking-wide">
              Save $50
            </span>
          </div>
        </Reveal>
      </section>

      {/* ═══════════════════════════════════════════════════
          STEP 5 — BUNDLE SELECTOR
          ═══════════════════════════════════════════════════ */}
      <section className="max-w-[600px] mx-auto px-5 md:px-7 pt-8 pb-2">
        <Reveal>
          <BundleSelector selected={selectedBundle} onSelect={setSelectedBundle} />
        </Reveal>
      </section>

      {/* ═══════════════════════════════════════════════════
          STEP 6 — KEY BENEFITS
          ═══════════════════════════════════════════════════ */}
      <section className="max-w-[600px] mx-auto px-5 md:px-7 pt-8 pb-2">
        <Reveal>
          <div className="flex flex-col gap-3">
            {[
              'Wakes you through touch — your partner never hears a thing',
              '5-stage escalation — works even if you\'ve failed with vibrating alarms before',
              'Standalone — set it on the band, no phone or app ever required',
            ].map((text, i) => (
              <div key={i} className="flex gap-3 items-start">
                <Check size={18} className="text-gold flex-shrink-0 mt-0.5" />
                <span className="text-[14px] text-muted-foreground leading-relaxed">{text}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ═══════════════════════════════════════════════════
          STEP 7 — ORDER BUMP
          ═══════════════════════════════════════════════════ */}
      <section className="max-w-[600px] mx-auto px-5 md:px-7 pt-8 pb-2">
        <Reveal>
          {/* Micro trust icons */}
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 mt-5 text-[11px] text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Shield size={14} className="text-gold" /> 100-Night Guarantee
            </span>
            <span className="flex items-center gap-1.5">
              <Truck size={14} className="text-gold" /> Free US Shipping
            </span>
            <span className="flex items-center gap-1.5">
              <Zap size={14} className="text-gold" /> Harvard-Backed Research
            </span>
          </div>
        </Reveal>
      </section>

      {/* ═══════════════════════════════════════════════════
          STEP 8 — ADD TO CART CTA
          ═══════════════════════════════════════════════════ */}
      <section className="max-w-[600px] mx-auto px-5 md:px-7 pt-8 pb-6">
        <Reveal>
          <button
            onClick={handleAddToCart}
            disabled={isCartLoading}
            className="w-full py-4 min-h-[56px] rounded-full bg-primary text-primary-foreground font-bold text-[16px] shadow-gold flex items-center justify-center gap-2.5 transition-all hover:brightness-110 disabled:opacity-50 mb-4"
          >
            {isCartLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>Add to Cart — ${total} <ArrowRight size={16} /></>
            )}
          </button>

          {/* Reassurance lines */}
          <div className="flex flex-col items-center gap-2 text-[12px] text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Lock size={13} className="text-faint" />
              <span>Secure Shopify Checkout</span>
            </div>
            <div className="flex items-center gap-1.5">
              <RefreshCw size={13} className="text-faint" />
              <span>100 nights to try it — full refund if it doesn't wake you</span>
            </div>
            <div className="flex items-center gap-1.5 mt-1">
              <Truck size={13} className="text-faint" />
              <span>Ships within 1–3 days · Arrives in 3–5 business days</span>
            </div>
          </div>
        </Reveal>
      </section>

      <Divider />
      <ScienceSection />
      <Divider />
      <ComparisonTable />
      <Divider />
      <PersonaSection />
      <Divider />
      <ReviewsSection />
      <Divider />
      <FAQSection />
      <GuaranteeStrip />
      <StickyBottomBar price={total} onAddToCart={handleAddToCart} isLoading={isCartLoading} />
    </>
  );
};

export default ProductPage;
