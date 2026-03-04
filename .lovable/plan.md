

## Problem Analysis

The checkout button in the cart drawer calls `handleCheckout()` which reads `checkoutUrl` from the Zustand store and opens it via `window.open(checkoutUrl, "_blank")`. Two likely failure scenarios:

1. **`checkoutUrl` is `null`** — If items were added to the cart before the store was properly set up, or if the cart was loaded from localStorage with a stale/missing checkoutUrl, the button silently does nothing (the `if (checkoutUrl)` guard prevents the `window.open`).

2. **Popup blocker** — On mobile Safari and some desktop browsers, `window.open` with `_blank` can be blocked. Although `handleCheckout` is synchronous (no `await` before `window.open`), some browsers still block it inside portal-rendered drawers.

The user also wants checkout to go to their "original Shopify checkout" — the current implementation already uses the Storefront API `checkoutUrl`, which should point to the correct Shopify checkout domain. The fix needs to ensure the URL is actually available and the navigation works reliably.

## Plan

### 1. Add fallback handling when `checkoutUrl` is null

In `CartDrawer.tsx` `handleCheckout`, if `checkoutUrl` is null, show a toast error telling the user something went wrong and attempt to re-sync/recreate the cart. This prevents the silent no-op.

### 2. Use `window.location.href` as fallback for mobile

Replace `window.open(url, "_blank")` with a dual approach:
- Try `window.open` first
- If it returns `null` (popup blocked), fall back to `window.location.href = checkoutUrl`

### 3. Ensure checkoutUrl persists correctly in Zustand

The `partialize` function in the cart store already includes `checkoutUrl`. Verify the flow: when `addBundleItems` or `addItem` completes, `checkoutUrl` is set. The issue may be that after a `swapVariant` call, the `checkoutUrl` isn't being refreshed (the swap creates new lines but doesn't fetch a new checkoutUrl). Fix `swapVariant` to re-fetch the cart's checkoutUrl after modifications.

### 4. Re-fetch checkoutUrl on cart sync

Update the `CART_QUERY` to also return `checkoutUrl`, and update `syncCart` to refresh the stored `checkoutUrl` from Shopify. This ensures even stale carts get a valid checkout URL.

### Files to modify

- **`src/lib/shopify.ts`**: Update `CART_QUERY` to include `checkoutUrl` in the response fields.
- **`src/stores/cartStore.ts`**: Update `syncCart` to store the refreshed `checkoutUrl`. Update `swapVariant` to re-query the cart for an updated `checkoutUrl` after line changes.
- **`src/components/CartDrawer.tsx`**: Update `handleCheckout` to handle null URL (show toast) and add popup-blocker fallback using `window.location.href`.

