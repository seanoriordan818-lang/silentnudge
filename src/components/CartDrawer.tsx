import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { X, Minus, Plus, Trash2, Loader2, ShoppingCart, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
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
  { name: "Backup Band", price: 19, originalPrice: 29, description: "Never miss an alarm — keep one charging, wear one always.", placeholder: true },
  { name: "Couples Pack Upgrade", price: 79, originalPrice: 99, description: "Already have one? Add a second band for your partner.", placeholder: true },
];

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

  const handleCheckout = () => {
    const checkoutUrl = getCheckoutUrl();
    if (checkoutUrl) {
      window.open(checkoutUrl, "_blank");
      closeDrawer();
    }
  };

  const scrollCrossSell = (dir: number) => {
    crossSellRef.current?.scrollBy({ left: dir * 200, behavior: "smooth" });
  };

  return (
    <>
      {/* Trigger button in navbar */}
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
        <div className="fixed inset-0 z-[300] bg-black/50 transition-opacity duration-300" onClick={closeDrawer} />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-[301] w-[90vw] max-w-[420px] flex flex-col transition-transform duration-300 ease-in-out ${isDrawerOpen ? "translate-x-0" : "translate-x-full"}`}
        style={{ background: "hsl(var(--background))" }}
      >
        {/* ─── STICKY HEADER ─── */}
        <div className="flex-shrink-0">
          {/* Title bar */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-border/30">
            <h2 className="text-foreground font-bold text-lg">
              My cart {totalItems > 0 && <span className="text-muted-foreground">• {totalItems}</span>}
            </h2>
            <button onClick={closeDrawer} className="text-foreground/70 hover:text-foreground transition-colors p-1">
              <X size={22} />
            </button>
          </div>

          {totalItems > 0 && (
            <>
              {/* Countdown */}
              <div className="py-2.5 text-center" style={{ background: "hsl(var(--raised))" }}>
                <p className="text-gold text-[12px] font-medium">
                  Your cart will expire in <span className="font-bold">{countdown}</span> ⏰
                </p>
              </div>

              {/* Free shipping progress */}
              <div className="px-5 py-3 border-b border-border/20">
                {freeShippingUnlocked ? (
                  <p className="text-gold text-[13px] font-semibold text-center">🚚 You've unlocked Free Shipping!</p>
                ) : (
                  <p className="text-foreground/80 text-[13px] text-center">
                    Add <span className="text-gold font-bold">${shippingRemaining.toFixed(2)}</span> to unlock <span className="font-semibold">Free shipping</span>!
                  </p>
                )}
                <div className="mt-2 h-2.5 rounded-full overflow-hidden relative" style={{ background: "hsl(var(--card))" }}>
                  <div
                    className="h-full rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${shippingProgress}%`, background: "hsl(var(--gold))" }}
                  />
                  {/* Shipping truck icon at end of bar */}
                  <div className="absolute right-1 top-1/2 -translate-y-1/2 text-[10px]">📦</div>
                </div>
                <p className="text-right text-muted-foreground text-[11px] mt-1">🔓 Free shipping</p>
              </div>
            </>
          )}
        </div>

        {/* ─── SCROLLABLE CONTENT ─── */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full px-5">
              <ShoppingCart size={48} className="text-muted-foreground mb-4 opacity-40" />
              <p className="text-foreground/70 text-[15px] mb-6">Your cart is empty.</p>
              <Link
                to="/product"
                onClick={closeDrawer}
                className="w-full py-3.5 rounded-full bg-primary text-primary-foreground font-bold text-[14px] text-center no-underline shadow-gold"
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
                  return (
                    <div key={item.variantId}>
                      <div className="flex gap-3.5 py-3.5 relative">
                        {/* Thumbnail */}
                        <div className="w-[80px] h-[80px] rounded-lg overflow-hidden flex-shrink-0 border border-border/20" style={{ background: "hsl(var(--card))" }}>
                          {item.product.node.images?.edges?.[0]?.node && (
                            <img src={item.product.node.images.edges[0].node.url} alt={item.product.node.title} className="w-full h-full object-cover" />
                          )}
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start pr-7">
                            <h4 className="text-foreground font-bold text-[14px] leading-tight">{item.product.node.title}</h4>
                            <div className="text-right flex-shrink-0 ml-2">
                              <p className="text-foreground font-bold text-[15px]">${price.toFixed(2)}</p>
                            </div>
                          </div>

                          <p className="text-muted-foreground text-[12px] mt-0.5">
                            {item.selectedOptions.map((o) => `${o.name}: ${o.value}`).join(", ")}
                          </p>

                          {/* Quantity controls */}
                          <div className="flex items-center justify-between mt-2.5">
                            <div className="flex items-center border border-border/30 rounded-lg overflow-hidden">
                              <button
                                onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                                className="w-8 h-8 flex items-center justify-center text-foreground/70 hover:text-foreground transition-colors"
                              >
                                <Minus size={14} />
                              </button>
                              <span className="w-8 text-center text-foreground text-[14px] font-medium">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                                className="w-8 h-8 flex items-center justify-center text-foreground/70 hover:text-foreground transition-colors"
                              >
                                <Plus size={14} />
                              </button>
                            </div>

                            {/* Delete */}
                            <button
                              onClick={() => removeItem(item.variantId)}
                              className="text-muted-foreground hover:text-destructive transition-colors p-1"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                      {idx < items.length - 1 && <div className="h-px bg-border/20" />}
                    </div>
                  );
                })}
              </div>

              {/* ─── CROSS-SELL CAROUSEL ─── */}
              <div className="px-5 py-4 border-t border-border/20">
                <p className="text-[10px] text-muted-foreground/40 mb-2">
                  [ CROSS-SELL PRODUCTS — connect to real Shopify products when added to store ]
                </p>
                <div className="relative">
                  {/* Scroll arrows */}
                  <button
                    onClick={() => scrollCrossSell(-1)}
                    className="absolute left-[-12px] top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-background border border-border/30 flex items-center justify-center text-foreground/60 hover:text-foreground shadow-sm"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    onClick={() => scrollCrossSell(1)}
                    className="absolute right-[-12px] top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-background border border-border/30 flex items-center justify-center text-foreground/60 hover:text-foreground shadow-sm"
                  >
                    <ChevronRight size={16} />
                  </button>

                  <div ref={crossSellRef} className="flex gap-3 overflow-x-auto scrollbar-hide pb-1">
                    {crossSellItems.map((cs, i) => {
                      const savings = cs.originalPrice && cs.price ? cs.originalPrice - cs.price : 0;
                      const savingsPercent = cs.originalPrice ? Math.round((savings / cs.originalPrice) * 100) : 0;
                      return (
                        <div
                          key={i}
                          className="min-w-[170px] w-[170px] flex-shrink-0 rounded-xl border border-border/20 p-3 flex flex-col"
                          style={{ background: "hsl(var(--card))" }}
                        >
                          {/* Image placeholder */}
                          <div className="w-full h-[100px] rounded-lg mb-2.5 flex items-center justify-center overflow-hidden" style={{ background: "hsl(var(--raised2))" }}>
                            <span className="text-[9px] text-muted-foreground/40 text-center px-2">[ ADD PRODUCT IMAGE ]</span>
                          </div>
                          <p className="text-foreground font-bold text-[13px] leading-tight mb-1">{cs.name}</p>
                          <div className="flex items-baseline gap-1.5 mb-0.5">
                            <span className="text-foreground font-bold text-[15px]">${cs.price.toFixed(2)}</span>
                            {cs.originalPrice && (
                              <span className="text-muted-foreground text-[12px] line-through">${cs.originalPrice.toFixed(2)}</span>
                            )}
                          </div>
                          {savingsPercent > 0 && (
                            <p className="text-gold text-[11px] font-semibold mb-1.5">You save {savingsPercent}%</p>
                          )}
                          <p className="text-muted-foreground text-[10px] leading-snug mb-3 flex-1">{cs.description}</p>
                          <button
                            className="w-full py-2 rounded-lg text-[12px] font-bold transition-all bg-primary text-primary-foreground hover:brightness-110"
                          >
                            Add to cart
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* ─── DISCOUNT & SUBTOTAL ─── */}
              <div className="px-5 py-4 border-t border-border/20">
                {/* Discount code */}
                <button
                  onClick={() => setDiscountOpen(!discountOpen)}
                  className="flex items-center gap-1.5 text-muted-foreground text-[13px] mb-3 hover:text-gold transition-colors"
                >
                  <ChevronDown size={14} className={`transition-transform ${discountOpen ? "rotate-180" : ""}`} />
                  Have a discount code?
                </button>
                {discountOpen && (
                  <div className="flex gap-2 mb-4">
                    <input
                      type="text"
                      value={discountCode}
                      onChange={(e) => setDiscountCode(e.target.value)}
                      placeholder="Enter code"
                      className="flex-1 h-9 px-3 rounded-lg text-[13px] border bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/30 border-border/30"
                    />
                    <button className="h-9 px-4 rounded-lg text-[13px] font-semibold border border-primary/40 text-gold transition-colors hover:bg-primary hover:text-primary-foreground">
                      Apply
                    </button>
                  </div>
                )}

                {/* Subtotal */}
                <div className="flex justify-between items-center mb-1">
                  <span className="text-foreground font-bold text-[15px]">Subtotal</span>
                  <span className="text-foreground font-bold text-[18px]">${totalPrice.toFixed(2)}</span>
                </div>
                <p className="text-muted-foreground text-[11px]">Taxes and shipping calculated at checkout</p>
              </div>
            </>
          )}
        </div>

        {/* ─── STICKY FOOTER ─── */}
        {totalItems > 0 && (
          <div className="flex-shrink-0 px-5 pb-5 pt-3 border-t border-border/20">
            {/* Checkout button */}
            <button
              onClick={handleCheckout}
              disabled={isLoading || isSyncing}
              className="w-full py-4 min-h-[56px] rounded-full font-bold text-[15px] flex items-center justify-center gap-2 transition-all hover:brightness-110 disabled:opacity-50 mb-3 bg-primary text-primary-foreground shadow-gold"
            >
              {isLoading || isSyncing ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>Checkout • ${totalPrice.toFixed(2)}</>
              )}
            </button>

            {/* Express payment buttons */}
            <div className="flex gap-2 mb-3">
              <button className="flex-1 h-11 rounded-lg font-bold text-[14px] flex items-center justify-center" style={{ background: "#5a31f4", color: "white" }}>
                <svg viewBox="0 0 341 80" className="h-5 w-auto" fill="white"><path d="M227.297 0C220.97 0 216.2 4.768 216.2 10.672c0 5.904 4.77 10.672 11.097 10.672 6.327 0 11.097-4.768 11.097-10.672S233.624 0 227.297 0zm0 17.387c-3.648 0-6.715-2.86-6.715-6.715 0-3.856 3.067-6.715 6.715-6.715 3.648 0 6.715 2.86 6.715 6.715 0 3.856-3.067 6.715-6.715 6.715z"/><path d="M227.297 4.768c-3.067 0-5.486 2.442-5.486 5.904 0 3.463 2.419 5.904 5.486 5.904 3.067 0 5.486-2.441 5.486-5.904 0-3.462-2.419-5.904-5.486-5.904z"/></svg>
                <span className="ml-1.5">shop</span>
              </button>
              <button className="flex-1 h-11 rounded-lg font-bold text-[14px] flex items-center justify-center border border-border/30" style={{ background: "white", color: "#000" }}>
                <svg viewBox="0 0 24 24" className="h-5 w-auto mr-1" fill="none"><path d="M12.48 10.92v3.28h7.84c-.24 1.84-.96 3.2-2.04 4.12-1.2 1.04-2.96 1.6-5.8 1.6-4.6 0-8.2-3.72-8.2-8.32s3.6-8.32 8.2-8.32c2.32 0 4.04.92 5.32 2.12l2.32-2.32C18.56 1.68 15.92.08 12.48.08 5.76.08.32 5.36.32 12s5.44 11.92 12.16 11.92c3.56 0 6.24-1.16 8.32-3.32 2.16-2.16 2.84-5.16 2.84-7.6 0-.76-.04-1.4-.16-2.04h-11z" fill="currentColor"/></svg>
                Pay
              </button>
            </div>

            {/* Payment icons */}
            <div className="flex items-center justify-center gap-2 mb-3 flex-wrap">
              {["Amex", "Visa", "Shop Pay", "Apple Pay", "Amazon", "G Pay", "MC"].map((name) => (
                <span key={name} className="text-[9px] text-muted-foreground/60 border border-border/20 rounded px-1.5 py-0.5">{name}</span>
              ))}
            </div>

            {/* Continue shopping */}
            <div className="text-center mb-1.5">
              <button onClick={closeDrawer} className="text-foreground/70 text-[13px] font-medium hover:underline hover:text-foreground transition-colors">
                continue shopping
              </button>
            </div>

            {/* Trust line */}
            <p className="text-center text-gold text-[11px]">
              🛡️ 100-Night Guarantee · 🔒 Secure Checkout
            </p>
          </div>
        )}
      </div>
    </>
  );
};
