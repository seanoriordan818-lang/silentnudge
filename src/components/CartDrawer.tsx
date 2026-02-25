import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { X, Minus, Plus, Trash2, ExternalLink, Loader2, ShoppingCart, Play, ChevronDown, Lock, Shield } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";

const FREE_SHIPPING_THRESHOLD = 150;

function useCountdown(items: any[]) {
  const [seconds, setSeconds] = useState(600);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const itemCount = items.length;

  // Reset on item change
  useEffect(() => {
    setSeconds(600);
  }, [itemCount]);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setSeconds((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

const crossSellItems = [
  {
    name: "Backup Band",
    price: 19,
    description: "Never miss an alarm — keep one charging, wear one always.",
    placeholder: true,
  },
  {
    name: "Couples Pack Upgrade",
    price: null,
    description: "Already have one? Add a second band for your partner.",
    placeholder: true,
  },
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

  const handleCheckout = () => {
    const checkoutUrl = getCheckoutUrl();
    if (checkoutUrl) {
      window.open(checkoutUrl, "_blank");
      closeDrawer();
    }
  };

  return (
    <>
      {/* Trigger button in navbar */}
      <button
        onClick={openDrawer}
        className="relative p-2 rounded-lg border border-border/50 hover:border-primary/30 transition-colors"
      >
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
          className="fixed inset-0 z-[300] bg-black/50 transition-opacity duration-300"
          onClick={closeDrawer}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-[301] w-[90vw] max-w-[420px] flex flex-col transition-transform duration-300 ease-in-out ${
          isDrawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ background: "hsl(var(--background))" }}
      >
        {/* === STICKY HEADER === */}
        <div className="flex-shrink-0">
          {/* Header bar */}
          <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid hsl(var(--gold) / 0.1)" }}>
            <div className="flex items-center gap-2.5">
              <span className="text-foreground font-bold text-base">My Cart</span>
              {totalItems > 0 && (
                <span className="h-5 min-w-[20px] px-1.5 rounded-full bg-primary text-primary-foreground text-[11px] font-bold flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </div>
            <button onClick={closeDrawer} className="text-foreground/70 hover:text-foreground transition-colors p-1">
              <X size={20} />
            </button>
          </div>

          {/* Countdown urgency bar */}
          {totalItems > 0 && (
            <div className="px-5 py-2.5 text-center" style={{ background: "hsl(220 20% 10%)" }}>
              <p className="text-gold text-[12px] font-medium">⏱ Your cart will expire in {countdown}</p>
            </div>
          )}

          {/* Free shipping progress */}
          {totalItems > 0 && (
            <div className="px-5 py-3" style={{ borderBottom: "1px solid hsl(var(--gold) / 0.08)" }}>
              {freeShippingUnlocked ? (
                <p className="text-gold text-[13px] font-semibold text-center">🚚 You've unlocked Free Shipping!</p>
              ) : (
                <p className="text-foreground/80 text-[13px] text-center">
                  Add <span className="text-gold font-bold">${shippingRemaining.toFixed(2)}</span> to unlock Free Shipping!
                </p>
              )}
              <div className="mt-2 h-2 rounded-full overflow-hidden" style={{ background: "hsl(220 18% 14%)" }}>
                <div
                  className="h-full rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${shippingProgress}%`, background: "hsl(var(--gold))" }}
                />
              </div>
            </div>
          )}
        </div>

        {/* === SCROLLABLE CONTENT === */}
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          {items.length === 0 ? (
            /* Empty cart */
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
              {/* Cart line items */}
              <div className="px-5 py-4">
                {items.map((item, idx) => (
                  <div key={item.variantId}>
                    <div className="flex gap-3 py-3 relative">
                      {/* Thumbnail */}
                      <div
                        className="w-[68px] h-[68px] rounded-lg overflow-hidden flex-shrink-0"
                        style={{ background: "hsl(220 18% 14%)" }}
                      >
                        {item.product.node.images?.edges?.[0]?.node && (
                          <img
                            src={item.product.node.images.edges[0].node.url}
                            alt={item.product.node.title}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0 pr-6">
                        <h4 className="text-foreground font-semibold text-[14px] truncate">{item.product.node.title}</h4>
                        <p className="text-muted-foreground text-[12px] mt-0.5">
                          {item.selectedOptions.map((o) => o.value).join(" · ")}
                        </p>
                        <div className="flex items-baseline gap-2 mt-1">
                          <span className="text-foreground font-bold text-[15px]">
                            ${parseFloat(item.price.amount).toFixed(2)}
                          </span>
                        </div>

                        {/* Quantity controls */}
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                            className="w-7 h-7 rounded-md flex items-center justify-center transition-colors"
                            style={{ background: "hsl(var(--gold) / 0.1)", color: "hsl(var(--gold))" }}
                          >
                            <Minus size={14} />
                          </button>
                          <span className="text-foreground text-[14px] font-medium w-6 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                            className="w-7 h-7 rounded-md flex items-center justify-center transition-colors"
                            style={{ background: "hsl(var(--gold) / 0.1)", color: "hsl(var(--gold))" }}
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>

                      {/* Delete */}
                      <button
                        onClick={() => removeItem(item.variantId)}
                        className="absolute top-3 right-0 text-muted-foreground hover:text-destructive transition-colors p-1"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                    {idx < items.length - 1 && (
                      <div className="h-px" style={{ background: "hsl(var(--gold) / 0.08)" }} />
                    )}
                  </div>
                ))}
              </div>

              {/* Cross-sell */}
              <div className="px-5 py-4" style={{ borderTop: "1px solid hsl(var(--gold) / 0.08)" }}>
                <p className="text-gold text-[11px] font-bold tracking-[2px] uppercase mb-3">
                  Complete Your Order
                </p>
                <p className="text-[9px] text-muted-foreground mb-3 opacity-50">
                  [ CROSS-SELL PRODUCTS — connect to real Shopify products when added to store ]
                </p>
                <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
                  {crossSellItems.map((cs, i) => (
                    <div
                      key={i}
                      className="min-w-[160px] flex-shrink-0 rounded-xl border p-3 flex flex-col"
                      style={{ background: "hsl(220 18% 12%)", borderColor: "hsl(var(--gold) / 0.1)" }}
                    >
                      <div
                        className="w-full h-24 rounded-lg mb-2.5 flex items-center justify-center"
                        style={{ background: "hsl(220 18% 16%)" }}
                      >
                        <span className="text-[9px] text-muted-foreground opacity-50">[ ADD PRODUCT IMAGE ]</span>
                      </div>
                      <p className="text-foreground font-semibold text-[13px] mb-1">
                        {cs.placeholder ? `[ PLACEHOLDER — ${cs.name} ]` : cs.name}
                      </p>
                      {cs.price && <p className="text-gold font-bold text-[14px] mb-1">${cs.price}</p>}
                      <p className="text-muted-foreground text-[11px] leading-snug mb-3 flex-1">{cs.description}</p>
                      <button
                        className="w-full py-2 rounded-full text-[12px] font-bold transition-all"
                        style={{ background: "hsl(var(--gold))", color: "hsl(var(--background))" }}
                      >
                        Add to Cart
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Discount & Subtotal */}
              <div className="px-5 py-4" style={{ borderTop: "1px solid hsl(var(--gold) / 0.08)" }}>
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
                      className="flex-1 h-9 px-3 rounded-lg text-[13px] border bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1"
                      style={{ borderColor: "hsl(var(--gold) / 0.2)" }}
                    />
                    <button
                      className="h-9 px-4 rounded-lg text-[13px] font-semibold border transition-colors hover:bg-primary hover:text-primary-foreground"
                      style={{ borderColor: "hsl(var(--gold) / 0.4)", color: "hsl(var(--gold))" }}
                    >
                      Apply
                    </button>
                  </div>
                )}

                {/* Subtotal */}
                <div className="flex justify-between items-center mb-1">
                  <span className="text-foreground font-semibold text-[15px]">Subtotal</span>
                  <span className="text-foreground font-bold text-[18px]">${totalPrice.toFixed(2)}</span>
                </div>
                <p className="text-muted-foreground text-[11px]">Taxes and shipping calculated at checkout</p>
              </div>
            </>
          )}
        </div>

        {/* === STICKY FOOTER === */}
        {totalItems > 0 && (
          <div className="flex-shrink-0 px-5 pb-5 pt-3" style={{ borderTop: "1px solid hsl(var(--gold) / 0.1)" }}>
            {/* Checkout button */}
            <button
              onClick={handleCheckout}
              disabled={isLoading || isSyncing}
              className="w-full py-4 min-h-[56px] rounded-full font-bold text-[15px] flex items-center justify-center gap-2 shadow-gold transition-all hover:brightness-110 disabled:opacity-50 mb-3"
              style={{ background: "hsl(var(--gold))", color: "hsl(var(--background))" }}
            >
              {isLoading || isSyncing ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>Checkout · ${totalPrice.toFixed(2)}</>
              )}
            </button>

            {/* Express payment buttons */}
            <div className="flex gap-2 mb-3">
              <button className="flex-1 h-11 rounded-lg font-bold text-[13px] flex items-center justify-center gap-1.5" style={{ background: "#5a31f4", color: "white" }}>
                Shop Pay
              </button>
              <button className="flex-1 h-11 rounded-lg font-bold text-[13px] flex items-center justify-center gap-1.5 border" style={{ background: "white", color: "#000" }}>
                G Pay
              </button>
            </div>

            {/* Payment icons */}
            <div className="flex items-center justify-center gap-3 mb-3 text-[10px] text-muted-foreground opacity-60">
              <span>Visa</span>
              <span>·</span>
              <span>Mastercard</span>
              <span>·</span>
              <span>Amex</span>
              <span>·</span>
              <span>Apple Pay</span>
              <span>·</span>
              <span>Amazon Pay</span>
            </div>

            {/* Continue shopping */}
            <div className="text-center mb-2">
              <button onClick={closeDrawer} className="text-muted-foreground text-[13px] hover:underline hover:text-foreground transition-colors">
                ← Continue Shopping
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
