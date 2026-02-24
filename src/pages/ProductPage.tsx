import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Reveal } from '@/components/Reveal';
import { Divider, Label, Stars } from '@/components/shared';
import { Check, ArrowRight, Shield, Truck, RefreshCw, Lock, Loader2 } from 'lucide-react';
import { useCartStore } from '@/stores/cartStore';
import { storefrontApiRequest, STOREFRONT_PRODUCTS_QUERY, ShopifyProduct } from '@/lib/shopify';
import { toast } from 'sonner';
import { ProductCircle } from '@/components/ProductCircle';
import { OrderBump } from '@/components/product/OrderBump';
import { ScienceSection } from '@/components/product/ScienceSection';
import { ComparisonTable } from '@/components/product/ComparisonTable';
import { PersonaSection } from '@/components/product/PersonaSection';
import { ReviewsSection } from '@/components/product/ReviewsSection';
import { FAQSection } from '@/components/product/FAQSection';
import { GuaranteeStrip } from '@/components/product/GuaranteeStrip';
import { StickyBottomBar } from '@/components/product/StickyBottomBar';



const ProductPage = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [img, setImg] = useState(0);
  const [addedBump, setAddedBump] = useState(false);
  const [addedCase, setAddedCase] = useState(false);
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

  const price = parseFloat(product.node.priceRange.minVariantPrice.amount);
  const bumpPrice = 59;
  const casePrice = 19;
  const total = price + (addedBump ? bumpPrice : 0) + (addedCase ? casePrice : 0);

  return (
    <>
      {/* Breadcrumb */}
      <div className="max-w-[1200px] mx-auto px-5 md:px-7 pt-20 pb-2">
        <span className="text-[12px] text-faint">
          <Link to="/" className="text-faint no-underline hover:text-gold">Home</Link> / Shop / <span className="text-gold-dim">{product.node.title}</span>
        </span>
      </div>

      {/* PDP GRID */}
      <section className="max-w-[1200px] mx-auto px-5 md:px-7 pt-4 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Gallery - Mobile: swipeable main image + dots, Desktop: thumbnails + main */}
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

          {/* BUY BOX */}
          <div className="md:sticky md:top-6">
            {/* Rating */}
            <div className="flex items-center gap-2 mb-2">
              <Stars />
              <span className="text-[13px] text-muted-foreground">4.8 / 5</span>
              <span className="text-[12px] text-faint">· 1,247 reviews</span>
            </div>

            <h1 className="font-display text-[26px] md:text-[32px] font-medium leading-tight mb-2">{product.node.title}</h1>
            <p className="text-[14px] md:text-[15px] text-muted-foreground mb-4 md:mb-5 font-light">{product.node.description}</p>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-5">
              <span className="font-display text-[34px] md:text-[40px] text-gold">${price.toFixed(0)}</span>
              <span className="text-[15px] md:text-[17px] text-faint line-through">${(price * 1.5).toFixed(0)}</span>
              <span className="text-[11px] md:text-[12px] font-bold bg-primary text-primary-foreground px-2 py-0.5 rounded-full">SAVE ${((price * 1.5) - price).toFixed(0)}</span>
            </div>

            {/* What's included */}
            <div className="mb-5">
              <div className="text-[11px] tracking-[2px] uppercase text-gold-dim font-semibold mb-2.5">What's included</div>
              {['SilentNudge with purpose-built 5-stage wake motor', 'USB charging port', 'Quick-start card (no manual needed)'].map((item, i) => (
                <div key={i} className="flex gap-2.5 items-center mb-1.5">
                  <Check size={15} className="text-gold flex-shrink-0" />
                  <span className="text-[13px] text-muted-foreground font-light">{item}</span>
                </div>
              ))}
            </div>

            {/* Order Bumps */}
            <div className="mb-5 flex flex-col gap-2">
              <OrderBump
                selected={addedBump}
                onToggle={() => setAddedBump(!addedBump)}
                title={<>Add a second band for your partner <span className="text-gold">— 40% off</span></>}
                subtitle={<>Couples pack / travel backup · <span className="line-through">$99</span> <span className="text-gold font-semibold">$59</span></>}
              />
              <OrderBump
                selected={addedCase}
                onToggle={() => setAddedCase(!addedCase)}
                title="Add travel case"
                subtitle={<>Hard-shell protection for your bag · <span className="text-gold font-semibold">$19</span></>}
              />
            </div>

            {/* CTA */}
            <button
              onClick={handleAddToCart}
              disabled={isCartLoading}
              className="w-full py-4 rounded-full bg-primary text-primary-foreground font-bold text-[15px] shadow-gold flex items-center justify-center gap-2.5 transition-all hover:brightness-110 disabled:opacity-50 mb-3"
            >
              {isCartLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Add to Cart — ${total} <ArrowRight size={16} /></>}
            </button>

            <div className="flex items-center justify-center gap-1.5 mb-5">
              <Lock size={14} className="text-faint" />
              <span className="text-[11px] text-faint">Secure checkout · 256-bit encryption</span>
            </div>

            {/* Trust badges 2x2 */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: <Shield size={16} />, label: '100-night guarantee' },
                { icon: <Truck size={16} />, label: 'Free shipping' },
                { icon: <RefreshCw size={16} />, label: '2-year warranty' },
                { icon: <Stars n={1} />, label: '4.8★ · 1,247 reviews' },
              ].map((g, i) => (
                <div key={i} className="flex items-center gap-2 text-[11px] md:text-[12px] text-muted-foreground">
                  <span className="text-gold">{g.icon}</span>
                  {g.label}
                </div>
              ))}
            </div>
          </div>
        </div>
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
      <StickyBottomBar price={price} onAddToCart={handleAddToCart} isLoading={isCartLoading} />
    </>
  );
};

export default ProductPage;
