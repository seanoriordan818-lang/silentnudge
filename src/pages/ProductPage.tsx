import { useState, useEffect, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Reveal } from '@/components/Reveal';
import { Stars } from '@/components/shared';
import { Check, ArrowRight, Shield, Truck, RefreshCw, Lock, Loader2, Zap } from 'lucide-react';
import { useCartStore } from '@/stores/cartStore';
import { storefrontApiRequest, STOREFRONT_PRODUCTS_QUERY, ShopifyProduct } from '@/lib/shopify';
import { ProductCircle } from '@/components/ProductCircle';
import { BundleSelector, bundles } from '@/components/product/BundleSelector';
import { HowItWorksSection } from '@/components/product/HowItWorksSection';
import { ScienceSectionV2 } from '@/components/product/ScienceSectionV2';
import { ReviewsSectionV2 } from '@/components/product/ReviewsSectionV2';
import { ComparisonTableV2 } from '@/components/product/ComparisonTableV2';
import { ProductFeaturesSection } from '@/components/product/ProductFeaturesSection';
import { GuaranteeSection } from '@/components/product/GuaranteeSection';
import { FAQSectionV2 } from '@/components/product/FAQSectionV2';
import { FinalCTASection } from '@/components/product/FinalCTASection';
import { StickyBottomBar } from '@/components/product/StickyBottomBar';

const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

const ProductPage = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [img, setImg] = useState(0);
  const [selectedBundle, setSelectedBundle] = useState(
    searchParams.get('bundle') === 'true' ? 'couples' : 'single'
  );
  const nameRef = useRef<HTMLParagraphElement>(null);
  const finalCtaRef = useRef<HTMLDivElement>(null);
  const [stickyVisible, setStickyVisible] = useState(false);
  const [finalCtaVisible, setFinalCtaVisible] = useState(false);
  const addItem = useCartStore((state) => state.addItem);
  const isCartLoading = useCartStore((state) => state.isLoading);
  const openDrawer = useCartStore((state) => state.openDrawer);

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

  useEffect(() => {
    const el = nameRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setStickyVisible(!entry.isIntersecting && el.getBoundingClientRect().bottom < 0),
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [loading]);

  useEffect(() => {
    const el = finalCtaRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setFinalCtaVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [loading]);

  const product = products[0];
  const variant = product?.node?.variants?.edges?.[0]?.node;
  const productImages = product?.node?.images?.edges || [];

  const currentBundle = bundles.find((b) => b.id === selectedBundle) || bundles[0];
  const total = currentBundle.price;

  const handleAddToCart = async () => {
    if (!product || !variant) return;
    await addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || []
    });
    openDrawer();
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
      {/* Breadcrumb spacer */}
      <div className="pt-4" />

      {/* IMAGE GALLERY */}
      <section className="max-w-[700px] mx-auto px-5 md:px-7 pt-4 pb-0">
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

            {/* Mobile thumbnail strip */}
            {productImages.length > 1 && (
              <div className="flex md:hidden gap-2 mt-3 overflow-x-auto pb-1">
                {productImages.map((image, i) => (
                  <button
                    key={i}
                    onClick={() => setImg(i)}
                    className={`w-14 h-14 flex-shrink-0 rounded-[8px] overflow-hidden transition-all ${
                      img === i ? 'border-2 border-gold/50' : 'border-2 border-transparent opacity-50 hover:opacity-100'
                    }`}
                  >
                    <img src={image.node.url} alt={image.node.altText || product.node.title} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF + HEADLINE + PRICE + BENEFITS + BUNDLES + CTA */}
      <section className="max-w-[600px] mx-auto px-5 md:px-7 pt-5 pb-2 text-left">
        <Reveal>
          {/* Rating line */}
          <div className="flex items-center gap-2 mb-3">
            <Stars />
            <span className="text-[13px] text-muted-foreground">
              Rated <span className="text-foreground font-medium">4.8/5</span> by 30,000+ Happy Customers
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-[13px] tracking-[1px] uppercase font-medium mb-1 text-primary">
            The Alarm That Wakes Only You.
          </h1>

          {/* Product name */}
          <p ref={nameRef} className="font-display text-[22px] md:text-[28px] font-semibold leading-[1.2] mb-2 text-muted-foreground">
            SilentNudge Wristband Alarm
          </p>

          {/* Price line — anchor $129 */}
          <div className="flex items-baseline gap-3 mb-3">
            <span className="text-[14px] text-faint line-through">${currentBundle.originalPrice}</span>
            <span className="font-display text-[24px] md:text-[28px] text-gold">${currentBundle.price}</span>
            {currentBundle.originalPrice - currentBundle.price > 0 && (
              <span className="text-[11px] font-bold bg-primary text-white px-2.5 py-1 rounded-full uppercase tracking-wide">
                Save ${currentBundle.originalPrice - currentBundle.price}
              </span>
            )}
          </div>

          {/* Benefit ticks */}
          <div className="flex flex-col gap-2.5 text-left max-w-[440px] mx-auto mb-4">
            {[
              'Your partner sleeps through every alarm',
              '5-stage escalation — built for deep sleepers',
              'No phone. No app. No Bluetooth. Ever.',
            ].map((text, i) => (
              <div key={i} className="flex gap-2.5 items-start">
                <Check size={16} className="text-gold flex-shrink-0 mt-0.5" />
                <span className="text-[13px] text-muted-foreground leading-snug">{text}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* BUNDLE SELECTOR */}
      <section className="max-w-[600px] mx-auto px-5 md:px-7 pb-2">
        <Reveal>
          <BundleSelector selected={selectedBundle} onSelect={setSelectedBundle} />
        </Reveal>
      </section>

      {/* ADD TO CART CTA */}
      <section className="max-w-[600px] mx-auto px-5 md:px-7 pt-6 pb-6">
        <Reveal>
          <div>
            <button
              onClick={handleAddToCart}
              disabled={isCartLoading}
              className="w-full py-4 min-h-[56px] rounded-full bg-primary text-white font-bold text-[16px] shadow-gold flex items-center justify-center gap-2.5 transition-all hover:brightness-110 disabled:opacity-50 mb-4"
            >
              {isCartLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>Add to Cart</>
              )}
            </button>
          </div>

          {/* Reassurance lines */}
          <div className="flex flex-col items-center gap-2 text-[12px] text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Lock size={13} className="text-faint" />
              <span>Secure Checkout</span>
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

      <HowItWorksSection />
      <ScienceSectionV2 />
      <ReviewsSectionV2 />
      <ComparisonTableV2 />
      <ProductFeaturesSection />
      <GuaranteeSection onAddToCart={handleAddToCart} isLoading={isCartLoading} />
      <FAQSectionV2 />
      <div ref={finalCtaRef}>
        <FinalCTASection onAddToCart={handleAddToCart} isLoading={isCartLoading} />
      </div>

      {/* CONTACT SECTION */}
      <section className="py-12 md:py-16 px-5 md:px-7" style={{ background: 'hsl(var(--raised))' }}>
        <div className="max-w-[600px] mx-auto text-center">
          <Reveal>
            <p className="text-[10px] tracking-[3px] uppercase text-gold-dim font-semibold mb-3">Questions?</p>
            <h2 className="font-display text-[clamp(24px,4vw,36px)] leading-[1.15] font-medium text-foreground mb-4">
              We're here to help.
            </h2>
            <p className="text-[15px] leading-relaxed text-muted-foreground font-light mb-5">
              Whether it's about the product, your order, or just want to know if SilentNudge is right for you — reach out.
            </p>
            <p className="text-[13px] text-muted-foreground mb-4">Email us anytime at <span className="text-gold font-medium">support@silentnudge.com</span></p>
            <Link
              to="/contact"
              onClick={scrollTop}
              className="inline-flex items-center gap-2 text-sm font-semibold text-gold no-underline"
            >
              Contact Us →
            </Link>
          </Reveal>
        </div>
      </section>

      {stickyVisible && !finalCtaVisible && <StickyBottomBar price={total} onAddToCart={handleAddToCart} isLoading={isCartLoading} />}
    </>
  );
};

export default ProductPage;
