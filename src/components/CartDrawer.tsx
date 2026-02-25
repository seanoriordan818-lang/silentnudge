import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";

const FREE_SHIPPING_THRESHOLD = 150;

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
  { name: "Family Pack", price: 299, originalPrice: 396, description: "4× bands — one for everyone in the house" },
  { name: "Single Band", price: 99, originalPrice: 149, description: "Just for you — one alarm, one solution" },
];

/* Wristband SVG placeholder for items without images */
const WristbandPlaceholder = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" style={{ opacity: 0.3 }}>
    <rect x="4" y="14" width="28" height="8" rx="4" stroke="hsl(var(--gold))" strokeWidth="1.5" />
    <rect x="8" y="12" width="20" height="12" rx="6" stroke="hsl(var(--gold))" strokeWidth="1" opacity="0.4" />
  </svg>
);

export const CartDrawer = () => {
  const {
    items, isLoading, isSyncing, isDrawerOpen,
    updateQuantity, removeItem, getCheckoutUrl, syncCart,
    openDrawer, closeDrawer,
  } = useCartStore();
  const [discountOpen, setDiscountOpen] = useState(false);
  const [discountCode, setDiscountCode] = useState("");
  const crossSellRef = useRef<HTMLDivElement>(null);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + parseFloat(item.price.amount) * item.quantity, 0);
  const countdown = useCountdown(items);

  const shippingRemaining = Math.max(0, FREE_SHIPPING_THRESHOLD - totalPrice);
  const shippingProgress = Math.min(100, (totalPrice / FREE_SHIPPING_THRESHOLD) * 100);
  const freeShippingUnlocked = totalPrice >= FREE_SHIPPING_THRESHOLD;

  useEffect(() => { if (isDrawerOpen) syncCart(); }, [isDrawerOpen, syncCart]);

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

  const handleCheckout = () => {
    const checkoutUrl = getCheckoutUrl();
    if (checkoutUrl) {
      window.open(checkoutUrl, "_blank");
      closeDrawer();
    }
  };

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
          bottom-0 right-0 w-screen h-[100dvh] rounded-t-[16px]
          md:top-0 md:bottom-auto md:w-[440px] md:h-screen md:rounded-t-none md:rounded-l-none
          ${isDrawerOpen
            ? "translate-y-0 md:translate-x-0 md:translate-y-0 shadow-[-20px_0_60px_rgba(0,0,0,0.6)]"
            : "translate-y-full md:translate-y-0 md:translate-x-full"
          }`}
        style={{ background: 'hsl(var(--background))' }}
      >
        {/* ─── HEADER ─── */}
        <div
          className="relative flex items-center justify-center px-4 py-3 md:justify-between md:px-5 md:py-4 flex-shrink-0"
          style={{ borderBottom: '1px solid hsl(var(--border))' }}
        >
          <div className="flex items-center gap-2">
            <span className="font-display text-[18px] md:text-[22px] font-semibold text-foreground tracking-tight">My Cart</span>
            {totalItems > 0 && (
              <span
                className="w-5 h-5 md:w-[22px] md:h-[22px] rounded-full flex items-center justify-center text-[10px] md:text-[11px] font-bold"
                style={{ background: 'hsl(var(--gold))', color: 'hsl(var(--background))' }}
              >
                {totalItems}
              </span>
            )}
          </div>
          <button
            onClick={closeDrawer}
            className="absolute right-3 top-1/2 -translate-y-1/2 md:relative md:right-auto md:top-auto md:translate-y-0 w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center text-foreground text-[16px] md:text-[18px] leading-none transition-colors"
            style={{ background: 'hsl(0 0% 100% / 0.08)', border: '1px solid hsl(var(--border))' }}
          >
            ✕
          </button>
        </div>

        {totalItems > 0 && (
          <>
            {/* ─── COMBINED COUNTDOWN + SHIPPING (mobile) / Separate (desktop) ─── */}
            <div
              className="px-4 py-2 md:py-0 flex-shrink-0"
              style={{ background: 'hsl(var(--raised))', borderBottom: '1px solid hsl(var(--border))' }}
            >
              {/* Mobile: single compact strip */}
              <div className="flex items-center justify-between md:hidden">
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
              <div className="mt-1.5 mb-1 h-1 rounded-full overflow-hidden md:hidden" style={{ background: 'hsl(0 0% 100% / 0.08)' }}>
                <div
                  className="h-full rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${shippingProgress}%`, background: 'linear-gradient(90deg, hsl(var(--gold)), hsl(var(--gold-hover)))' }}
                />
              </div>

              {/* Desktop: separate countdown + shipping sections */}
              <div className="hidden md:block">
                <div className="py-2.5 text-center">
                  <span className="text-[12px] font-medium text-gold tracking-wide">
                    ⏱ Your cart will expire in <span className="font-bold">{countdown}</span>
                  </span>
                </div>
              </div>
            </div>
            <div
              className="hidden md:block px-5 py-2.5 flex-shrink-0"
              style={{ background: 'hsl(var(--raised))', borderBottom: '1px solid hsl(var(--border))' }}
            >
              {freeShippingUnlocked ? (
                <p className="text-[12px] font-semibold text-center" style={{ color: '#2ECC71' }}>
                  🚚 You've unlocked Free Shipping!
                </p>
              ) : (
                <p className="text-[12px] text-center" style={{ color: 'hsl(0 0% 100% / 0.55)' }}>
                  Add <strong className="text-foreground font-semibold">${shippingRemaining.toFixed(2)}</strong> to unlock Free Shipping!
                </p>
              )}
              <div className="mt-1.5 h-1 rounded-full overflow-hidden" style={{ background: 'hsl(0 0% 100% / 0.08)' }}>
                <div
                  className="h-full rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${shippingProgress}%`, background: 'linear-gradient(90deg, hsl(var(--gold)), hsl(var(--gold-hover)))' }}
                />
              </div>
            </div>
          </>
        )}

        {/* ─── SCROLLABLE BODY ─── */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden" style={{ scrollbarWidth: 'thin', scrollbarColor: 'hsl(var(--border)) transparent' }}>
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
              {/* ─── LINE ITEMS ─── */}
              <div className="px-4 py-3 md:px-5 md:py-4">
                {items.map((item, idx) => {
                  const price = parseFloat(item.price.amount);
                  const firstImage = item.product.node.images?.edges?.[0]?.node;
                  return (
                    <div key={item.variantId}>
                      <div className="flex gap-3 md:gap-3.5 py-3 md:py-4 relative animate-[itemIn_0.3s_ease_forwards]">
                        {/* Thumbnail */}
                        <div
                          className="w-[60px] h-[60px] md:w-[72px] md:h-[72px] rounded-[10px] overflow-hidden flex-shrink-0 flex items-center justify-center"
                          style={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
                        >
                          {firstImage ? (
                            <img src={firstImage.url} alt={item.product.node.title} className="w-full h-full object-cover" />
                          ) : (
                            <WristbandPlaceholder />
                          )}
                        </div>

                        {/* Details */}
                        <div className="flex-1 min-w-0">
                          <div className="text-[13px] md:text-[14px] font-semibold text-foreground leading-tight mb-0.5">
                            {item.product.node.title}
                          </div>
                          <div className="text-[11px] mb-2" style={{ color: 'hsl(0 0% 100% / 0.55)' }}>
                            {item.selectedOptions.map((o) => `${o.name}: ${o.value}`).join(" · ")}
                          </div>

                          {/* Qty + Price row */}
                          <div className="flex items-center justify-between">
                            {/* Pill qty control */}
                            <div
                              className="flex items-center rounded-full overflow-hidden"
                              style={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
                            >
                              <button
                                onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                                className="w-[30px] h-[28px] flex items-center justify-center text-foreground text-[16px] leading-none bg-transparent border-none cursor-pointer transition-colors hover:bg-[hsl(0_0%_100%/0.08)]"
                              >
                                −
                              </button>
                              <span className="min-w-[22px] text-center text-[13px] font-semibold text-foreground">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                                className="w-[30px] h-[28px] flex items-center justify-center text-foreground text-[16px] leading-none bg-transparent border-none cursor-pointer transition-colors hover:bg-[hsl(0_0%_100%/0.08)]"
                              >
                                +
                              </button>
                            </div>

                            {/* Price */}
                            <div className="text-right">
                              <span className="block text-[15px] font-bold text-foreground">${(price * item.quantity).toFixed(2)}</span>
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
                className="px-5 py-4 flex-shrink-0"
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
                      {/* Image placeholder */}
                      <div
                        className="w-full h-[80px] rounded-lg mb-2.5 flex items-center justify-center"
                        style={{ background: 'hsl(var(--background))', border: '1px dashed hsl(var(--border))' }}
                      >
                        <span className="text-[9px] text-center px-2 leading-snug" style={{ color: 'hsl(0 0% 100% / 0.55)' }}>
                          [ ADD PRODUCT IMAGE ]
                        </span>
                      </div>
                      <div className="text-[12px] font-semibold text-foreground mb-0.5">{cs.name}</div>
                      <div className="text-[10px] leading-snug mb-2" style={{ color: 'hsl(0 0% 100% / 0.55)' }}>
                        {cs.description}
                      </div>
                      <div className="text-[13px] font-bold text-gold mb-2">
                        ${cs.price}{" "}
                        {cs.originalPrice && (
                          <span className="text-[11px] font-normal line-through" style={{ color: 'hsl(0 0% 100% / 0.55)' }}>
                            ${cs.originalPrice}
                          </span>
                        )}
                      </div>
                      <button
                        className="w-full py-[7px] rounded-md text-[11px] font-bold tracking-wide cursor-pointer transition-colors"
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
                        Add to Cart
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
          <div className="flex-shrink-0 px-4 pb-4 pt-3 md:px-5 md:pb-5 md:pt-4" style={{ borderTop: '1px solid hsl(var(--border))', background: 'hsl(var(--background))' }}>
            {/* Discount */}
            <div className="mb-2 md:mb-3.5">
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
            <div className="flex justify-between items-center mb-0.5 md:mb-1.5">
              <span className="text-[12px] md:text-[13px]" style={{ color: 'hsl(0 0% 100% / 0.55)' }}>Subtotal</span>
              <span className="text-[18px] md:text-[20px] font-bold text-foreground font-display">${totalPrice.toFixed(2)}</span>
            </div>
            <p className="text-[10px] md:text-[11px] mb-2 md:mb-3.5" style={{ color: 'hsl(0 0% 100% / 0.55)' }}>
              Taxes and shipping calculated at checkout
            </p>

            {/* Checkout */}
            <button
              onClick={handleCheckout}
              disabled={isLoading || isSyncing}
              className="w-full py-3 md:py-4 rounded-full font-bold text-[14px] md:text-[15px] flex items-center justify-center gap-1.5 tracking-wide cursor-pointer mb-2 md:mb-2.5 transition-all disabled:opacity-50"
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
              {isLoading || isSyncing ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>Checkout · ${totalPrice.toFixed(2)} →</>
              )}
            </button>

            {/* Express */}
            <div className="grid grid-cols-2 gap-2 mb-2 md:mb-3">
              <button
                className="py-2 md:py-2.5 rounded-lg font-bold text-[12px] md:text-[13px] text-white flex items-center justify-center tracking-wide cursor-pointer border-none transition-opacity hover:opacity-90"
                style={{ background: '#5A31F4' }}
              >
                Shop Pay
              </button>
              <button
                className="py-2 md:py-2.5 rounded-lg font-bold text-[12px] md:text-[13px] flex items-center justify-center tracking-wide cursor-pointer transition-opacity hover:opacity-85"
                style={{ background: 'white', color: '#1a1a1a', border: '1px solid #e0e0e0' }}
              >
                G Pay
              </button>
            </div>

            {/* Payment icons */}
            <div className="flex items-center justify-center gap-1 md:gap-2 mb-2 md:mb-3 flex-nowrap">
              {["VISA", "MC", "AMEX", "APPLE PAY", "AMAZON PAY", "SHOP PAY"].map((name) => (
                <span
                  key={name}
                  className="text-[9px] md:text-[10px] font-bold tracking-wide whitespace-nowrap rounded px-1.5 py-0.5 md:px-2 md:py-1"
                  style={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', color: 'hsl(0 0% 100% / 0.55)' }}
                >
                  {name}
                </span>
              ))}
            </div>

            {/* Continue shopping */}
            <div className="text-center mb-1.5 md:mb-2.5">
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
            <p className="text-center text-gold text-[10px] md:text-[11px] font-medium tracking-wide">
              🛡️ 100-Night Guarantee &nbsp;·&nbsp; 🔒 Secure Checkout
            </p>
          </div>
        )}
      </div>
    </>,
    document.body
  );
};
