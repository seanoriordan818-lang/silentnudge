import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { storefrontApiRequest, STOREFRONT_PRODUCTS_QUERY, ShopifyProduct, formatCheckoutUrl } from "@/lib/shopify";
import product2Pack from "@/assets/product-2pack.jpeg";
import product4Pack from "@/assets/product-4pack.jpeg";

const FREE_SHIPPING_THRESHOLD = 99;

function useCountdown(items: any[]) {
  const [seconds, setSeconds] = useState(600);
  const itemCount = items.length;
  useEffect(() => { setSeconds(600); }, [itemCount]);
  useEffect(() => {
    const id = setInterval(() => setSeconds((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, []);
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

const crossSellItems = [
  { name: "Couples Pack", price: 169, originalPrice: 258, description: "2× bands — one for each of you", image: product2Pack, bundleType: 'couples', qty: 2 },
  { name: "Family Pack", price: 299, originalPrice: 516, description: "4× bands — one for everyone in the house", image: product4Pack, bundleType: 'family', qty: 4 },
];

const BUNDLE_DISCOUNT_CODES: Record<string, string> = {
  couples: 'COUPLES-BUNDLE',
  family: 'FAMILY-BUNDLE',
};

/* Wristband SVG placeholder for items without images */
const WristbandPlaceholder = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" style={{ opacity: 0.3 }}>
    <rect x="4" y="14" width="28" height="8" rx="4" stroke="hsl(var(--gold))" strokeWidth="1.5" />
    <rect x="8" y="12" width="20" height="12" rx="6" stroke="hsl(var(--gold))" strokeWidth="1" opacity="0.4" />
  </svg>
);

/* Color variant dropdown for line items */
const ColorDropdown = ({
  currentColor,
  colors,
  onChangeColor,
  disabled,
}: {
  currentColor: string;
  colors: string[];
  onChangeColor: (color: string) => void;
  disabled: boolean;
}) => (
  <select
    value={currentColor}
    onChange={(e) => onChangeColor(e.target.value)}
    disabled={disabled}
    className="text-[12px] py-1 px-2 rounded-md bg-transparent cursor-pointer outline-none transition-colors disabled:opacity-50"
    style={{
      border: '1px solid hsl(var(--border))',
      color: 'hsl(var(--foreground))',
      fontFamily: 'inherit',
      WebkitAppearance: 'none',
      MozAppearance: 'none',
      appearance: 'none',
      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23999' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'right 6px center',
      paddingRight: '22px',
    }}
  >
    {colors.map((c) => (
      <option key={c} value={c} style={{ background: 'hsl(var(--background))', color: 'hsl(var(--foreground))' }}>
        {c}
      </option>
    ))}
  </select>
);

export const CartDrawer = () => {
  const {
    items, isLoading, isSyncing, isDrawerOpen, appliedDiscountCode, bundleType,
    updateQuantity, removeItem, getFreshCheckoutUrl, syncCart,
    openDrawer, closeDrawer, addBundleItems, swapVariant,
  } = useCartStore();
  const [discountOpen, setDiscountOpen] = useState(false);
  const [discountCode, setDiscountCode] = useState("");
  const [isRedirecting, setIsRedirecting] = useState(false);
  const crossSellRef = useRef<HTMLDivElement>(null);
  const [crossSellProduct, setCrossSellProduct] = useState<ShopifyProduct | null>(null);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + parseFloat(item.price.amount) * item.quantity, 0);
  const countdown = useCountdown(items);

  // Calculate discount amount for display
  const discountAmount = appliedDiscountCode === 'COUPLES-BUNDLE' ? 29 : appliedDiscountCode === 'FAMILY-BUNDLE' ? 97 : 0;
  const displayTotal = discountAmount > 0 ? totalPrice - discountAmount : totalPrice;

  const shippingRemaining = Math.max(0, FREE_SHIPPING_THRESHOLD - displayTotal);
  const shippingProgress = Math.min(100, (displayTotal / FREE_SHIPPING_THRESHOLD) * 100);
  const freeShippingUnlocked = displayTotal >= FREE_SHIPPING_THRESHOLD;

  useEffect(() => { if (isDrawerOpen) syncCart(); }, [isDrawerOpen, syncCart]);

  // Fetch product data for cross-sell
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await storefrontApiRequest(STOREFRONT_PRODUCTS_QUERY, { first: 1 });
        if (data?.data?.products?.edges?.[0]) {
          setCrossSellProduct(data.data.products.edges[0]);
        }
      } catch (err) {
        console.error('Failed to fetch product for cross-sell:', err);
      }
    };
    if (isDrawerOpen && !crossSellProduct) fetchProduct();
  }, [isDrawerOpen, crossSellProduct]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isDrawerOpen]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") closeDrawer(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [closeDrawer]);

  const handleCheckout = async () => {
    setIsRedirecting(true);
    try {
      const freshCheckoutUrl = await getFreshCheckoutUrl();
      if (!freshCheckoutUrl) {
        await syncCart();
        alert("Checkout is loading — please try again in a moment.");
        return;
      }

      const url = formatCheckoutUrl(freshCheckoutUrl);
      window.location.assign(url);
    } finally {
      setIsRedirecting(false);
    }
  };

  const handleCrossSellAdd = async (cs: typeof crossSellItems[0]) => {
    if (!crossSellProduct) return;
    const variants = crossSellProduct.node.variants.edges;
    const blackVariant = variants.find(v => v.node.title === 'Black' || v.node.selectedOptions?.some(o => o.value === 'Black'));
    const whiteVariant = variants.find(v => v.node.title === 'White' || v.node.selectedOptions?.some(o => o.value === 'White'));

    if (!blackVariant || !whiteVariant) return;

    const discountCode = BUNDLE_DISCOUNT_CODES[cs.bundleType];
    const bundleItems = [];

    if (cs.bundleType === 'couples') {
      bundleItems.push(
        { product: crossSellProduct, variantId: blackVariant.node.id, variantTitle: blackVariant.node.title, price: blackVariant.node.price, quantity: 1, selectedOptions: blackVariant.node.selectedOptions || [] },
        { product: crossSellProduct, variantId: whiteVariant.node.id, variantTitle: whiteVariant.node.title, price: whiteVariant.node.price, quantity: 1, selectedOptions: whiteVariant.node.selectedOptions || [] },
      );
    } else {
      bundleItems.push(
        { product: crossSellProduct, variantId: blackVariant.node.id, variantTitle: blackVariant.node.title, price: blackVariant.node.price, quantity: 2, selectedOptions: blackVariant.node.selectedOptions || [] },
        { product: crossSellProduct, variantId: whiteVariant.node.id, variantTitle: whiteVariant.node.title, price: whiteVariant.node.price, quantity: 2, selectedOptions: whiteVariant.node.selectedOptions || [] },
      );
    }

    await addBundleItems(bundleItems, discountCode, cs.bundleType);
  };

  // Handle color variant swap for a line item
  const handleColorChange = async (item: typeof items[0], newColor: string) => {
    const currentColor = item.selectedOptions.find(o => o.name === 'Color')?.value || item.variantTitle;
    if (newColor === currentColor) return;

    // Find the new variant from the product data
    const variants = item.product.node.variants.edges;
    const newVariant = variants.find(v =>
      v.node.title === newColor || v.node.selectedOptions?.some(o => o.name === 'Color' && o.value === newColor)
    );
    if (!newVariant) return;

    await swapVariant(item.variantId, newVariant.node.id, newVariant.node.title, newVariant.node.price, newVariant.node.selectedOptions || []);
  };

  // Get available colors from first item's product
  const getAvailableColors = (item: typeof items[0]): string[] => {
    return item.product.node.options?.find(o => o.name === 'Color')?.values || ['Black', 'White'];
  };

  // Determine if quantity editing should be locked for bundle items
  const isBundleLocked = !!bundleType && bundleType !== 'single';

  return createPortal(
    <>
      {/* ─── OVERLAY ─── */}
      <div
        className={`fixed inset-0 z-[10000] transition-all duration-300 ${isDrawerOpen ? "bg-black/70 pointer-events-auto" : "bg-transparent pointer-events-none"}`}
        onClick={closeDrawer}
      />

      {/* ─── DRAWER ─── */}
      <div
        className={`fixed z-[10001] flex flex-col overflow-hidden transition-transform duration-[380ms] ease-[cubic-bezier(0.4,0,0.2,1)]
          bottom-0 right-0 w-screen rounded-t-[16px]
          md:top-0 md:bottom-auto md:w-[420px] md:h-screen md:rounded-t-none md:rounded-l-none
          ${isDrawerOpen
            ? "translate-y-0 md:translate-x-0 md:translate-y-0 shadow-[-20px_0_60px_rgba(0,0,0,0.6)]"
            : "translate-y-full md:translate-y-0 md:translate-x-full"
          }`}
        style={{
          background: 'hsl(var(--background))',
          height: '100dvh',
          maxHeight: '100dvh',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {/* ─── HEADER ─── */}
        <div
          className="relative flex items-center justify-center px-4 py-3 flex-shrink-0"
          style={{ borderBottom: '1px solid hsl(var(--border))' }}
        >
          <div className="flex items-center gap-2">
            <span className="font-display text-[18px] font-semibold text-foreground tracking-tight">My Cart</span>
            {totalItems > 0 && (
              <span
                className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold"
                style={{ background: 'hsl(var(--gold))', color: 'hsl(var(--background))' }}
              >
                {totalItems}
              </span>
            )}
          </div>
          <button
            onClick={closeDrawer}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center text-foreground text-[16px] leading-none transition-colors"
            style={{ background: 'hsl(0 0% 100% / 0.08)', border: '1px solid hsl(var(--border))' }}
          >
            ✕
          </button>
        </div>

        {totalItems > 0 && (
          <>
            {/* ─── COUNTDOWN + SHIPPING STRIP ─── */}
            <div
              className="px-4 py-2 flex-shrink-0"
              style={{ background: 'hsl(var(--raised))', borderBottom: '1px solid hsl(var(--border))' }}
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-medium text-gold tracking-wide">
                  ⏱ Expires in <span className="font-bold">{countdown}</span>
                </span>
                {freeShippingUnlocked ? (
                  <span className="text-[11px] font-semibold" style={{ color: '#2ECC71' }}>
                    🚚 Free Shipping!
                  </span>
                ) : (
                  <span className="text-[11px]" style={{ color: 'hsl(0 0% 100% / 0.55)' }}>
                    <strong className="text-foreground font-semibold">${shippingRemaining.toFixed(2)}</strong> to free ship
                  </span>
                )}
              </div>
              <div className="mt-1.5 mb-1 h-1 rounded-full overflow-hidden" style={{ background: 'hsl(0 0% 100% / 0.08)' }}>
                <div
                  className="h-full rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${shippingProgress}%`, background: 'linear-gradient(90deg, hsl(var(--gold)), hsl(var(--gold-hover)))' }}
                />
              </div>
            </div>
          </>
        )}

        {/* ─── SCROLLABLE BODY ─── */}
        <div
          className="flex-1 overflow-y-auto overflow-x-hidden"
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: 'hsl(var(--border)) transparent',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {items.length === 0 ? (
            /* ─── EMPTY STATE ─── */
            <div className="flex flex-col items-center justify-center h-full px-8 text-center gap-4 py-16">
              <div className="text-[48px] opacity-40">🌙</div>
              <h3 className="font-display text-[22px] font-semibold text-foreground">Your cart is empty</h3>
              <p className="text-[13px] leading-relaxed" style={{ color: 'hsl(0 0% 100% / 0.55)' }}>
                Your partner is still being woken up by your alarm.<br />Let's fix that.
              </p>
              <Link
                to="/product"
                onClick={closeDrawer}
                className="mt-2 px-7 py-3.5 rounded-full font-bold text-[14px] no-underline"
                style={{ background: 'hsl(var(--gold))', color: 'hsl(var(--background))' }}
              >
                Shop SilentNudge — $99
              </Link>
            </div>
          ) : (
            <>
              {/* Bundle label */}
              {isBundleLocked && (
                <div className="px-4 pt-3 pb-1">
                  <div className="text-[11px] font-bold tracking-wide uppercase text-gold flex items-center gap-2">
                    🎁 {bundleType === 'couples' ? 'Couples Pack' : 'Family Pack'} Bundle
                    <span className="text-[10px] font-normal text-muted-foreground">(modify on product page)</span>
                  </div>
                </div>
              )}

              {/* ─── LINE ITEMS ─── */}
              <div className="px-4">
                {items.map((item, idx) => {
                  const price = parseFloat(item.price.amount);
                  const firstImage = item.product.node.images?.edges?.[0]?.node;
                  const currentColor = item.selectedOptions.find(o => o.name === 'Color')?.value || item.variantTitle;
                  const availableColors = getAvailableColors(item);

                  return (
                    <div key={item.variantId}>
                      <div className="flex gap-4 py-5 relative animate-[itemIn_0.3s_ease_forwards]">
                        {/* Thumbnail */}
                        <div
                          className="w-[96px] h-[96px] rounded-[10px] overflow-hidden flex-shrink-0 flex items-center justify-center"
                          style={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
                        >
                          {firstImage ? (
                            <img src={firstImage.url} alt={item.product.node.title} className="w-full h-full object-cover block" />
                          ) : (
                            <WristbandPlaceholder />
                          )}
                        </div>

                        {/* Details */}
                        <div className="flex-1 min-w-0">
                          <div className="text-[16px] font-semibold text-foreground leading-tight mb-0.5">
                            {item.product.node.title}
                          </div>

                          {/* Color dropdown */}
                          {availableColors.length > 1 ? (
                            <div className="mb-2 mt-1">
                              <ColorDropdown
                                currentColor={currentColor}
                                colors={availableColors}
                                onChangeColor={(newColor) => handleColorChange(item, newColor)}
                                disabled={isLoading}
                              />
                            </div>
                          ) : (
                            <div className="text-[11px] mb-3" style={{ color: 'hsl(0 0% 100% / 0.55)' }}>
                              {item.selectedOptions.map((o) => `${o.name}: ${o.value}`).join(" · ")}
                            </div>
                          )}

                          {/* Qty + Price row */}
                          <div className="flex items-center justify-between">
                            {isBundleLocked ? (
                              <div className="text-[13px] text-muted-foreground">
                                Qty: {item.quantity}
                              </div>
                            ) : (
                              <div
                                className="flex items-center rounded-full overflow-hidden"
                                style={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
                              >
                                <button
                                  onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                                  className="w-[36px] h-[36px] flex items-center justify-center text-foreground text-[18px] leading-none bg-transparent border-none cursor-pointer transition-colors hover:bg-[hsl(0_0%_100%/0.08)]"
                                >
                                  −
                                </button>
                                <span className="min-w-[24px] text-center text-[14px] font-semibold text-foreground">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                                  className="w-[36px] h-[36px] flex items-center justify-center text-foreground text-[18px] leading-none bg-transparent border-none cursor-pointer transition-colors hover:bg-[hsl(0_0%_100%/0.08)]"
                                >
                                  +
                                </button>
                              </div>
                            )}

                            {/* Price */}
                            <div className="text-right">
                              <span className="block text-[18px] font-bold text-foreground">${(price * item.quantity).toFixed(2)}</span>
                            </div>
                          </div>
                        </div>

                        {/* Delete */}
                        <button
                          onClick={() => removeItem(item.variantId)}
                          className="flex-shrink-0 self-start mt-0.5 p-1 rounded text-[14px] leading-none transition-colors cursor-pointer bg-transparent border-none"
                          style={{ color: 'hsl(0 0% 100% / 0.55)' }}
                          onMouseEnter={(e) => (e.currentTarget.style.color = '#E74C3C')}
                          onMouseLeave={(e) => (e.currentTarget.style.color = 'hsl(0 0% 100% / 0.55)')}
                        >
                          ✕
                        </button>
                      </div>
                      {idx < items.length - 1 && <div className="h-px" style={{ background: 'hsl(var(--border))' }} />}
                    </div>
                  );
                })}
              </div>

              {/* ─── CROSS-SELL ─── */}
              <div
                className="px-4 py-4 flex-shrink-0"
                style={{ borderTop: '1px solid hsl(var(--border))', background: 'hsl(var(--raised))' }}
              >
                <div className="text-[10px] font-bold tracking-[0.12em] uppercase text-gold mb-3">
                  Complete Your Order
                </div>
                <div ref={crossSellRef} className="flex gap-3 overflow-x-auto scrollbar-hide pb-1">
                  {crossSellItems.map((cs, i) => (
                    <div
                      key={i}
                      className="min-w-[148px] flex-shrink-0 rounded-xl p-3 transition-colors"
                      style={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
                      onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'hsl(var(--gold))')}
                      onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'hsl(var(--border))')}
                    >
                      {/* Safari-safe image container */}
                      <div
                        className="w-full rounded-lg mb-2.5 overflow-hidden relative"
                        style={{
                          aspectRatio: '16 / 9',
                          minHeight: '110px',
                        }}
                      >
                        <img
                          src={cs.image}
                          alt={cs.name}
                          className="block"
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            objectPosition: 'center',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                          }}
                        />
                      </div>
                      <div className="text-[12px] font-semibold text-foreground mb-0.5">{cs.name}</div>
                      <div className="text-[10px] leading-snug mb-2" style={{ color: 'hsl(0 0% 100% / 0.55)' }}>
                        {cs.description}
                      </div>
                      <div className="text-[13px] font-bold text-gold mb-2">
                        ${cs.price}{" "}
                        <span className="text-[11px] font-normal line-through" style={{ color: 'hsl(0 0% 100% / 0.55)' }}>
                          ${cs.originalPrice}
                        </span>
                      </div>
                      <button
                        onClick={() => handleCrossSellAdd(cs)}
                        disabled={isLoading}
                        className="w-full py-[7px] rounded-md text-[11px] font-bold tracking-wide cursor-pointer transition-colors disabled:opacity-50"
                        style={{
                          background: 'hsl(var(--gold) / 0.15)',
                          border: '1px solid hsl(var(--gold) / 0.4)',
                          color: 'hsl(var(--gold))',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'hsl(var(--gold))';
                          e.currentTarget.style.color = 'hsl(var(--background))';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'hsl(var(--gold) / 0.15)';
                          e.currentTarget.style.color = 'hsl(var(--gold))';
                        }}
                      >
                        {isLoading ? '...' : 'Add to Cart'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* ─── STICKY FOOTER ─── */}
        {totalItems > 0 && (
          <div className="flex-shrink-0 px-4 pb-4 pt-3" style={{ borderTop: '1px solid hsl(var(--border))', background: 'hsl(var(--background))' }}>
            {/* Discount */}
            <div className="mb-2">
              <button
                onClick={() => setDiscountOpen(!discountOpen)}
                className="text-[12px] bg-transparent border-none cursor-pointer underline underline-offset-[3px] transition-colors p-0"
                style={{ color: 'hsl(0 0% 100% / 0.55)', fontFamily: 'inherit' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'hsl(var(--foreground))')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'hsl(0 0% 100% / 0.55)')}
              >
                Have a discount code?
              </button>
              {discountOpen && (
                <div className="flex gap-2 mt-2">
                  <input
                    type="text"
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                    placeholder="Enter code"
                    className="flex-1 px-3 py-2.5 rounded-lg text-[13px] text-foreground outline-none transition-colors"
                    style={{
                      background: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      fontFamily: 'inherit',
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = 'hsl(var(--gold))')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = 'hsl(var(--border))')}
                  />
                  <button
                    className="px-3.5 py-2.5 rounded-lg text-[12px] font-semibold cursor-pointer transition-colors"
                    style={{
                      background: 'transparent',
                      border: '1px solid hsl(var(--gold))',
                      color: 'hsl(var(--gold))',
                      fontFamily: 'inherit',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'hsl(var(--gold))';
                      e.currentTarget.style.color = 'hsl(var(--background))';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = 'hsl(var(--gold))';
                    }}
                  >
                    Apply
                  </button>
                </div>
              )}
            </div>

            {/* Subtotal */}
            <div className="flex justify-between items-center mb-0.5">
              <span className="text-[12px]" style={{ color: 'hsl(0 0% 100% / 0.55)' }}>Subtotal</span>
              <span className="text-[14px] text-foreground">${totalPrice.toFixed(2)}</span>
            </div>

            {/* Bundle discount */}
            {discountAmount > 0 && (
              <div className="flex justify-between items-center mb-0.5">
                <span className="text-[12px]" style={{ color: '#2ECC71' }}>Bundle Discount</span>
                <span className="text-[14px] font-semibold" style={{ color: '#2ECC71' }}>−${discountAmount.toFixed(2)}</span>
              </div>
            )}

            {/* Total */}
            <div className="flex justify-between items-center mb-1">
              <span className="text-[13px] font-semibold text-foreground">Total</span>
              <span className="text-[20px] font-bold text-foreground font-display">${displayTotal.toFixed(2)}</span>
            </div>

            <p className="text-[10px] mb-2" style={{ color: 'hsl(0 0% 100% / 0.55)' }}>
              Taxes and shipping calculated at checkout
            </p>

            {/* Checkout */}
            <button
              onClick={handleCheckout}
              disabled={isLoading || isSyncing || isRedirecting}
              data-start-checkout
              className="w-full py-3 rounded-full font-bold text-[14px] flex items-center justify-center gap-1.5 tracking-wide cursor-pointer mb-2 transition-all disabled:opacity-50"
              style={{ background: 'hsl(var(--gold))', color: 'hsl(var(--background))', border: 'none' }}
              onMouseEnter={(e) => {
                if (!e.currentTarget.disabled) {
                  e.currentTarget.style.background = 'hsl(var(--gold-hover))';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'hsl(var(--gold))';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {isLoading || isSyncing || isRedirecting ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>Checkout · ${displayTotal.toFixed(2)} →</>
              )}
            </button>

            {/* Continue shopping */}
            <div className="text-center mb-1.5">
              <button
                onClick={(e) => { e.stopPropagation(); closeDrawer(); }}
                className="text-[12px] bg-transparent border-none cursor-pointer underline underline-offset-[3px] transition-colors"
                style={{ color: 'hsl(0 0% 100% / 0.55)', fontFamily: 'inherit' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'hsl(var(--foreground))')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'hsl(0 0% 100% / 0.55)')}
              >
                ← Continue Shopping
              </button>
            </div>

            {/* Trust */}
            <p className="text-center text-gold text-[10px] font-medium tracking-wide">
              🛡️ 100-Night Guarantee &nbsp;·&nbsp; 🔒 Secure Checkout
            </p>
          </div>
        )}
      </div>
    </>,
    document.body
  );
};
