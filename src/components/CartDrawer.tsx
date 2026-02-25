import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { X, Minus, Plus, Loader2, ShoppingCart } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";

const FREE_SHIPPING_THRESHOLD = 150;

function useCountdown(items: any[]) {
  const [seconds, setSeconds] = useState(587);
  const itemCount = items.length;
  useEffect(() => { setSeconds(587); }, [itemCount]);
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

export const CartDrawer = () => {
  const {
    items, isLoading, isSyncing, isDrawerOpen,
    updateQuantity, removeItem, getCheckoutUrl, syncCart,
    openDrawer, closeDrawer,
  } = useCartStore();
  const [discountOpen, setDiscountOpen] = useState(false);
  const [discountCode, setDiscountCode] = useState("");

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + parseFloat(item.price.amount) * item.quantity, 0);
  const countdown = useCountdown(items);

  const shippingRemaining = Math.max(0, FREE_SHIPPING_THRESHOLD - totalPrice);
  const shippingProgress = Math.min(100, (totalPrice / FREE_SHIPPING_THRESHOLD) * 100);
  const freeShippingUnlocked = totalPrice >= FREE_SHIPPING_THRESHOLD;

  useEffect(() => { if (isDrawerOpen) syncCart(); }, [isDrawerOpen, syncCart]);

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

  return (
    <>
      {/* Trigger button */}
      <button onClick={openDrawer} className="relative p-2 rounded-lg border border-border/50 hover:border-primary/30 transition-colors">
        <ShoppingCart className="h-5 w-5 text-muted-foreground" />
        {totalItems > 0 && (
          <span className="absolute -top-1.5 -right-1.5 h-5 w-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
            {totalItems}
          </span>
        )}
      </button>

      {/* Overlay */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 z-[9998] transition-all duration-350"
          style={{ background: "rgba(0,0,0,0.72)" }}
          onClick={closeDrawer}
        />
      )}

      {/* Drawer — desktop: slide from right, mobile: slide from bottom */}
      <div
        className={`
          fixed z-[9999] flex flex-col overflow-hidden transition-transform duration-[380ms] ease-[cubic-bezier(0.4,0,0.2,1)]
          
          /* Mobile: bottom sheet */
          bottom-0 right-0 w-screen h-[95vh] rounded-t-[20px]
          ${isDrawerOpen ? "translate-y-0" : "translate-y-full"}
          
          /* Desktop: side drawer */
          min-[521px]:top-0 min-[521px]:bottom-0 min-[521px]:right-0 min-[521px]:left-auto
          min-[521px]:w-[440px] min-[521px]:h-screen min-[521px]:rounded-none
          ${isDrawerOpen ? "min-[521px]:translate-x-0 min-[521px]:translate-y-0" : "min-[521px]:translate-x-full min-[521px]:translate-y-0"}
        `}
        style={{
          background: "hsl(var(--background))",
          boxShadow: isDrawerOpen ? "-20px 0 60px rgba(0,0,0,0.6)" : "none",
        }}
      >
        {/* ─── HEADER ─── */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-border/40 flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="font-display text-[22px] font-semibold text-foreground tracking-tight">My Cart</span>
            {totalItems > 0 && (
              <span className="w-[22px] h-[22px] rounded-full bg-primary text-primary-foreground text-[11px] font-bold flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </div>
          <button
            onClick={closeDrawer}
            className="w-9 h-9 rounded-full flex items-center justify-center border border-border/40 text-foreground hover:bg-secondary transition-colors"
            style={{ background: "hsl(0 0% 100% / 0.08)" }}
          >
            <X size={18} />
          </button>
        </div>

        {totalItems > 0 && (
          <>
            {/* ─── COUNTDOWN ─── */}
            <div className="flex-shrink-0 py-2.5 text-center border-b border-border/40 bg-secondary">
              <span className="text-primary text-[12px] font-medium tracking-wide">
                ⏱ Your cart will expire in <span className="font-bold">{countdown}</span>
              </span>
            </div>

            {/* ─── SHIPPING BAR ─── */}
            <div className="flex-shrink-0 px-5 py-2.5 border-b border-border/40 bg-secondary">
              {freeShippingUnlocked ? (
                <p className="text-[12px] font-semibold" style={{ color: "#2ECC71" }}>🚚 You've unlocked Free Shipping!</p>
              ) : (
                <p className="text-muted-foreground text-[12px]">
                  Add <strong className="text-foreground font-semibold">${shippingRemaining.toFixed(2)}</strong> to unlock Free Shipping!
                </p>
              )}
              <div className="mt-1.5 h-1 rounded-full overflow-hidden" style={{ background: "hsl(0 0% 100% / 0.08)" }}>
                <div
                  className="h-full rounded-full transition-all duration-500 ease-out"
                  style={{
                    width: `${shippingProgress}%`,
                    background: "linear-gradient(90deg, hsl(var(--primary)), hsl(40 91% 50%))",
                  }}
                />
              </div>
            </div>
          </>
        )}

        {/* ─── SCROLLABLE BODY ─── */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-hide">
          {items.length === 0 ? (
            /* Empty State */
            <div className="flex flex-col items-center justify-center h-full px-8 text-center gap-4">
              <span className="text-[48px] opacity-40">🌙</span>
              <h3 className="font-display text-[22px] font-semibold text-foreground">Your cart is empty</h3>
              <p className="text-muted-foreground text-[13px] leading-relaxed">
                Your partner is still being woken up by your alarm.<br />Let's fix that.
              </p>
              <Link
                to="/product"
                onClick={closeDrawer}
                className="mt-2 px-7 py-3.5 rounded-full bg-primary text-primary-foreground font-bold text-[14px] text-center no-underline"
              >
                Shop SilentNudge — $99
              </Link>
            </div>
          ) : (
            <>
              {/* ─── LINE ITEMS ─── */}
              <div className="px-5 py-4">
                {items.map((item, idx) => {
                  const price = parseFloat(item.price.amount);
                  const comparePrice = (item.price as any).compareAtAmount ? parseFloat((item.price as any).compareAtAmount) : null;
                  const savings = comparePrice ? comparePrice - price : 0;
                  return (
                    <div
                      key={item.variantId}
                      className="flex gap-3.5 py-4 border-b border-border/40 last:border-b-0 animate-fade-up"
                    >
                      {/* Thumbnail */}
                      <div
                        className="w-[72px] h-[72px] rounded-[10px] overflow-hidden flex-shrink-0 border border-border/40 flex items-center justify-center"
                        style={{ background: "hsl(var(--card))" }}
                      >
                        {item.product.node.images?.edges?.[0]?.node ? (
                          <img src={item.product.node.images.edges[0].node.url} alt={item.product.node.title} className="w-full h-full object-cover" />
                        ) : (
                          <svg className="w-9 h-9 opacity-30" viewBox="0 0 36 36" fill="none">
                            <rect x="4" y="14" width="28" height="8" rx="4" stroke="hsl(var(--primary))" strokeWidth="1.5" />
                            <rect x="8" y="12" width="20" height="12" rx="6" stroke="hsl(var(--primary))" strokeWidth="1" opacity="0.4" />
                          </svg>
                        )}
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <div className="text-foreground font-semibold text-[14px] leading-tight mb-0.5">
                          {item.product.node.title}
                        </div>
                        <div className="text-muted-foreground text-[11px] mb-2">
                          {item.selectedOptions.map((o) => `${o.name}: ${o.value}`).join(" · ")}
                        </div>

                        {/* Qty + Price row */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center rounded-full overflow-hidden border border-border/40" style={{ background: "hsl(var(--card))" }}>
                            <button
                              onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                              className="w-[30px] h-7 flex items-center justify-center text-foreground/70 hover:text-foreground transition-colors"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="min-w-[22px] text-center text-foreground text-[13px] font-semibold">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                              className="w-[30px] h-7 flex items-center justify-center text-foreground/70 hover:text-foreground transition-colors"
                            >
                              <Plus size={14} />
                            </button>
                          </div>

                          <div className="text-right">
                            {comparePrice && (
                              <span className="text-muted-foreground text-[11px] line-through block">${comparePrice.toFixed(0)}</span>
                            )}
                            <span className="text-foreground font-bold text-[15px] block">${price.toFixed(2)}</span>
                            {savings > 0 && (
                              <span className="text-[10px] font-semibold block" style={{ color: "#2ECC71" }}>You save ${savings.toFixed(0)}</span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Delete */}
                      <button
                        onClick={() => removeItem(item.variantId)}
                        className="self-start mt-0.5 text-muted-foreground hover:text-destructive transition-colors p-1 flex-shrink-0 text-[14px]"
                      >
                        ✕
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* ─── CROSS-SELL ─── */}
              <div className="px-5 py-4 border-t border-border/40 bg-secondary">
                <p className="text-[10px] font-bold text-primary tracking-[0.12em] uppercase mb-3">Complete Your Order</p>
                <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-1">
                  {crossSellItems.map((cs, i) => (
                    <div
                      key={i}
                      className="min-w-[148px] flex-shrink-0 rounded-xl border border-border/40 p-3 flex flex-col transition-colors hover:border-primary"
                      style={{ background: "hsl(var(--card))" }}
                    >
                      {/* Placeholder image */}
                      <div
                        className="w-full h-[80px] rounded-lg mb-2.5 flex items-center justify-center border border-dashed border-border/40"
                        style={{ background: "hsl(var(--background))" }}
                      >
                        <span className="text-[9px] text-muted-foreground/50 text-center px-2 leading-snug">[ ADD PRODUCT IMAGE ]</span>
                      </div>
                      <p className="text-foreground font-semibold text-[12px] leading-tight mb-0.5">{cs.name}</p>
                      <p className="text-muted-foreground text-[10px] leading-snug mb-2">{cs.description}</p>
                      <p className="text-primary font-bold text-[13px] mb-2">
                        ${cs.price}{" "}
                        {cs.originalPrice && (
                          <span className="text-muted-foreground text-[11px] font-normal line-through">${cs.originalPrice}</span>
                        )}
                      </p>
                      <button className="w-full py-[7px] rounded-md text-[11px] font-bold tracking-wide transition-all border bg-gold-faint border-primary/40 text-primary hover:bg-primary hover:text-primary-foreground">
                        Add to Cart
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* ─── FOOTER ─── */}
        {totalItems > 0 && (
          <div className="flex-shrink-0 border-t border-border/40 px-5 pt-4 pb-5" style={{ background: "hsl(var(--background))" }}>
            {/* Discount */}
            <div className="mb-3.5">
              <button
                onClick={() => setDiscountOpen(!discountOpen)}
                className="text-muted-foreground text-[12px] underline underline-offset-[3px] hover:text-foreground transition-colors bg-transparent border-none cursor-pointer"
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
                    className="flex-1 h-9 px-3 rounded-lg text-[13px] bg-card border border-border/40 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                  />
                  <button className="h-9 px-3.5 rounded-lg text-[12px] font-semibold border border-primary text-primary transition-all hover:bg-primary hover:text-primary-foreground">
                    Apply
                  </button>
                </div>
              )}
            </div>

            {/* Subtotal */}
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-muted-foreground text-[13px]">Subtotal</span>
              <span className="text-foreground font-display text-[20px] font-bold">${totalPrice.toFixed(2)}</span>
            </div>
            <p className="text-muted-foreground text-[11px] mb-3.5">Taxes and shipping calculated at checkout</p>

            {/* Checkout */}
            <button
              onClick={handleCheckout}
              disabled={isLoading || isSyncing}
              className="w-full py-4 rounded-full bg-primary text-primary-foreground font-bold text-[15px] tracking-wide flex items-center justify-center gap-1.5 mb-2.5 transition-all hover:brightness-110 hover:-translate-y-px active:translate-y-0 disabled:opacity-50"
            >
              {isLoading || isSyncing ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>Checkout · ${totalPrice.toFixed(2)} <span>→</span></>
              )}
            </button>

            {/* Express */}
            <div className="grid grid-cols-2 gap-2 mb-3">
              <button className="h-11 rounded-lg font-bold text-[13px] tracking-wide flex items-center justify-center" style={{ background: "#5A31F4", color: "white" }}>
                Shop Pay
              </button>
              <button className="h-11 rounded-lg font-bold text-[13px] tracking-wide flex items-center justify-center border" style={{ background: "white", color: "#1a1a1a", borderColor: "#e0e0e0" }}>
                G Pay
              </button>
            </div>

            {/* Payment icons */}
            <div className="flex items-center justify-center gap-2 mb-3 flex-wrap">
              {["VISA", "MC", "AMEX", "APPLE PAY", "AMAZON PAY", "SHOP PAY"].map((name) => (
                <span
                  key={name}
                  className="text-[10px] font-bold text-muted-foreground tracking-wide border border-border/40 rounded-[5px] px-2 py-1 whitespace-nowrap"
                  style={{ background: "hsl(var(--card))" }}
                >
                  {name}
                </span>
              ))}
            </div>

            {/* Continue shopping */}
            <div className="text-center mb-2.5">
              <button
                onClick={closeDrawer}
                className="text-muted-foreground text-[12px] underline underline-offset-[3px] hover:text-foreground transition-colors"
              >
                ← Continue Shopping
              </button>
            </div>

            {/* Trust */}
            <p className="text-center text-primary text-[11px] font-medium tracking-wide">
              🛡️ 100-Night Guarantee &nbsp;·&nbsp; 🔒 Secure Checkout
            </p>
          </div>
        )}
      </div>
    </>
  );
};
