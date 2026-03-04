import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import {
  CartItem,
  createShopifyCart,
  createShopifyCartMulti,
  addLineToShopifyCart,
  addLinesToShopifyCart,
  updateShopifyCartLine,
  removeLineFromShopifyCart,
  applyDiscountCodesToCart,
  storefrontApiRequest,
  CART_QUERY,
  ShopifyProduct,
} from '@/lib/shopify';

export type { CartItem } from '@/lib/shopify';

interface BundleLineItem {
  variantId: string;
  variantTitle: string;
  price: { amount: string; currencyCode: string };
  quantity: number;
  selectedOptions: Array<{ name: string; value: string }>;
  product: ShopifyProduct;
}

interface CartStore {
  items: CartItem[];
  cartId: string | null;
  checkoutUrl: string | null;
  isLoading: boolean;
  isSyncing: boolean;
  isDrawerOpen: boolean;
  appliedDiscountCode: string | null;
  bundleType: string | null;
  addItem: (item: Omit<CartItem, 'lineId'>) => Promise<void>;
  addBundleItems: (items: BundleLineItem[], discountCode: string, bundleType: string) => Promise<void>;
  updateQuantity: (variantId: string, quantity: number) => Promise<void>;
  removeItem: (variantId: string) => Promise<void>;
  swapVariant: (oldVariantId: string, newVariantId: string, newVariantTitle: string, newPrice: { amount: string; currencyCode: string }, newSelectedOptions: Array<{ name: string; value: string }>) => Promise<void>;
  clearCart: () => void;
  syncCart: () => Promise<void>;
  getCheckoutUrl: () => string | null;
  openDrawer: () => void;
  closeDrawer: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      cartId: null,
      checkoutUrl: null,
      isLoading: false,
      isSyncing: false,
      isDrawerOpen: false,
      appliedDiscountCode: null,
      bundleType: null,

      addItem: async (item) => {
        const { items, cartId, clearCart } = get();
        const existingItem = items.find(i => i.variantId === item.variantId);
        set({ isLoading: true });
        try {
          if (!cartId) {
            const result = await createShopifyCart({ ...item, lineId: null });
            if (result) {
              set({ cartId: result.cartId, checkoutUrl: result.checkoutUrl, items: [{ ...item, lineId: result.lineId }], appliedDiscountCode: null, bundleType: null });
            }
          } else if (existingItem) {
            const newQuantity = existingItem.quantity + item.quantity;
            if (!existingItem.lineId) return;
            const result = await updateShopifyCartLine(cartId, existingItem.lineId, newQuantity);
            if (result.success) {
              set({ items: get().items.map(i => i.variantId === item.variantId ? { ...i, quantity: newQuantity } : i) });
              // Remove discount if quantities changed and we had a bundle
              const { appliedDiscountCode } = get();
              if (appliedDiscountCode) {
                await applyDiscountCodesToCart(cartId, []);
                set({ appliedDiscountCode: null, bundleType: null });
              }
            } else if (result.cartNotFound) clearCart();
          } else {
            const result = await addLineToShopifyCart(cartId, { ...item, lineId: null });
            if (result.success) {
              set({ items: [...get().items, { ...item, lineId: result.lineId ?? null }] });
            } else if (result.cartNotFound) clearCart();
          }
        } catch (error) {
          console.error('Failed to add item:', error);
        } finally {
          set({ isLoading: false });
        }
      },

      addBundleItems: async (bundleItems, discountCode, bundleType) => {
        set({ isLoading: true });
        try {
          const { cartId, clearCart } = get();
          // Clear existing cart first for clean bundle
          if (cartId) {
            // Remove all existing items
            const currentItems = get().items;
            for (const item of currentItems) {
              if (item.lineId) {
                await removeLineFromShopifyCart(cartId, item.lineId);
              }
            }
          }
          
          // Create new cart with all bundle lines
          const lines = bundleItems.filter(i => i.quantity > 0).map(i => ({
            quantity: i.quantity,
            merchandiseId: i.variantId,
          }));

          if (lines.length === 0) return;

          const result = await createShopifyCartMulti(lines);
          if (!result) return;

          const newItems: CartItem[] = bundleItems.filter(i => i.quantity > 0).map(i => {
            const lineInfo = result.lineIds.find(l => l.variantId === i.variantId);
            return {
              ...i,
              lineId: lineInfo?.lineId ?? null,
            };
          });

          set({
            cartId: result.cartId,
            checkoutUrl: result.checkoutUrl,
            items: newItems,
            bundleType,
          });

          // Apply discount code
          if (discountCode && result.cartId) {
            const discountResult = await applyDiscountCodesToCart(result.cartId, [discountCode]);
            if (discountResult.success) {
              set({
                appliedDiscountCode: discountCode,
                checkoutUrl: discountResult.checkoutUrl || result.checkoutUrl,
              });
            }
          }
        } catch (error) {
          console.error('Failed to add bundle items:', error);
        } finally {
          set({ isLoading: false });
        }
      },

      updateQuantity: async (variantId, quantity) => {
        if (quantity <= 0) { await get().removeItem(variantId); return; }
        const { items, cartId, clearCart, appliedDiscountCode } = get();
        const item = items.find(i => i.variantId === variantId);
        if (!item?.lineId || !cartId) return;
        set({ isLoading: true });
        try {
          const result = await updateShopifyCartLine(cartId, item.lineId, quantity);
          if (result.success) {
            set({ items: get().items.map(i => i.variantId === variantId ? { ...i, quantity } : i) });
            // Remove bundle discount when quantities are manually changed
            if (appliedDiscountCode) {
              await applyDiscountCodesToCart(cartId, []);
              set({ appliedDiscountCode: null, bundleType: null });
            }
          } else if (result.cartNotFound) clearCart();
        } catch (error) {
          console.error('Failed to update quantity:', error);
        } finally {
          set({ isLoading: false });
        }
      },

      removeItem: async (variantId) => {
        const { items, cartId, clearCart, appliedDiscountCode } = get();
        const item = items.find(i => i.variantId === variantId);
        if (!item?.lineId || !cartId) return;
        set({ isLoading: true });
        try {
          const result = await removeLineFromShopifyCart(cartId, item.lineId);
          if (result.success) {
            const newItems = get().items.filter(i => i.variantId !== variantId);
            if (newItems.length === 0) {
              clearCart();
            } else {
              set({ items: newItems });
              // Remove bundle discount when item removed
              if (appliedDiscountCode) {
                await applyDiscountCodesToCart(cartId, []);
                set({ appliedDiscountCode: null, bundleType: null });
              }
            }
          } else if (result.cartNotFound) clearCart();
        } catch (error) {
          console.error('Failed to remove item:', error);
        } finally {
          set({ isLoading: false });
        }
      },

      swapVariant: async (oldVariantId, newVariantId, newVariantTitle, newPrice, newSelectedOptions) => {
        const { items, cartId, clearCart, appliedDiscountCode, bundleType } = get();
        const oldItem = items.find(i => i.variantId === oldVariantId);
        if (!oldItem?.lineId || !cartId) return;

        // Check if new variant already exists in cart
        const existingNewItem = items.find(i => i.variantId === newVariantId);

        set({ isLoading: true });
        try {
          // Remove old line
          const removeResult = await removeLineFromShopifyCart(cartId, oldItem.lineId);
          if (!removeResult.success) {
            if (removeResult.cartNotFound) clearCart();
            return;
          }

          if (existingNewItem?.lineId) {
            // Merge: update existing line quantity
            const newQty = existingNewItem.quantity + oldItem.quantity;
            const updateResult = await updateShopifyCartLine(cartId, existingNewItem.lineId, newQty);
            if (updateResult.success) {
              set({
                items: get().items
                  .filter(i => i.variantId !== oldVariantId)
                  .map(i => i.variantId === newVariantId ? { ...i, quantity: newQty } : i),
              });
            } else if (updateResult.cartNotFound) clearCart();
          } else {
            // Add new line
            const newCartItem: CartItem = {
              ...oldItem,
              variantId: newVariantId,
              variantTitle: newVariantTitle,
              price: newPrice,
              selectedOptions: newSelectedOptions,
              lineId: null,
            };
            const addResult = await addLineToShopifyCart(cartId, newCartItem);
            if (addResult.success) {
              set({
                items: get().items
                  .filter(i => i.variantId !== oldVariantId)
                  .concat([{ ...newCartItem, lineId: addResult.lineId ?? null }]),
              });
            } else if (addResult.cartNotFound) clearCart();
          }

          // Re-fetch checkoutUrl after line changes
          const refreshData = await storefrontApiRequest(CART_QUERY, { id: cartId });
          if (refreshData?.data?.cart?.checkoutUrl) {
            try {
              const url = new URL(refreshData.data.cart.checkoutUrl);
              url.searchParams.set('channel', 'online_store');
              set({ checkoutUrl: url.toString() });
            } catch {
              set({ checkoutUrl: refreshData.data.cart.checkoutUrl });
            }
          }

          // Recalculate bundle discount based on total quantity
          const currentItems = get().items;
          const totalQty = currentItems.reduce((sum, i) => sum + i.quantity, 0);

          if (totalQty === 2) {
            const result = await applyDiscountCodesToCart(cartId, ['COUPLES-BUNDLE']);
            if (result.success) set({ appliedDiscountCode: 'COUPLES-BUNDLE', bundleType: 'couples', checkoutUrl: result.checkoutUrl || get().checkoutUrl });
          } else if (totalQty === 4) {
            const result = await applyDiscountCodesToCart(cartId, ['FAMILY-BUNDLE']);
            if (result.success) set({ appliedDiscountCode: 'FAMILY-BUNDLE', bundleType: 'family', checkoutUrl: result.checkoutUrl || get().checkoutUrl });
          } else if (appliedDiscountCode) {
            await applyDiscountCodesToCart(cartId, []);
            set({ appliedDiscountCode: null, bundleType: null });
          }
        } catch (error) {
          console.error('Failed to swap variant:', error);
        } finally {
          set({ isLoading: false });
        }
      },

      clearCart: () => set({ items: [], cartId: null, checkoutUrl: null, appliedDiscountCode: null, bundleType: null }),
      getCheckoutUrl: () => get().checkoutUrl,
      openDrawer: () => set({ isDrawerOpen: true }),
      closeDrawer: () => set({ isDrawerOpen: false }),

      syncCart: async () => {
        const { cartId, isSyncing, clearCart } = get();
        if (!cartId || isSyncing) return;
        set({ isSyncing: true });
        try {
          const data = await storefrontApiRequest(CART_QUERY, { id: cartId });
          if (!data) return;
          const cart = data?.data?.cart;
          if (!cart || cart.totalQuantity === 0) {
            clearCart();
          } else if (cart.checkoutUrl) {
            // Refresh checkoutUrl from Shopify (handles stale/expired URLs)
            try {
              const url = new URL(cart.checkoutUrl);
              url.searchParams.set('channel', 'online_store');
              set({ checkoutUrl: url.toString() });
            } catch {
              set({ checkoutUrl: cart.checkoutUrl });
            }
          }
        } catch (error) {
          console.error('Failed to sync cart:', error);
        } finally {
          set({ isSyncing: false });
        }
      },
    }),
    {
      name: 'shopify-cart',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        items: state.items,
        cartId: state.cartId,
        checkoutUrl: state.checkoutUrl,
        appliedDiscountCode: state.appliedDiscountCode,
        bundleType: state.bundleType,
      }),
    }
  )
);
