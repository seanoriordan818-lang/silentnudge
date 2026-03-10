import { useEffect } from 'react';
import { useCartStore } from '@/stores/cartStore';

/**
 * Global Meta Pixel tracking hook.
 * 
 * Listens for clicks on elements with:
 *   [data-add-to-cart]    → fires fbq('track', 'AddToCart', ...)
 *   [data-start-checkout] → fires fbq('track', 'InitiateCheckout', ...)
 *
 * Data attributes on add-to-cart buttons:
 *   data-add-to-cart       (presence flag)
 *   data-product-id        Shopify variant GID
 *   data-product-name      Product title
 *   data-price             Unit price as string
 *   data-currency          Currency code (e.g. "USD")
 *
 * Data attributes on checkout buttons:
 *   data-start-checkout    (presence flag)
 *
 * The hook reads live cart totals from zustand for InitiateCheckout.
 */
export function useMetaPixelTracking() {
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const target = e.target as HTMLElement;

      // Walk up to find the button with the data attribute (handles clicks on child elements like icons/text)
      const addToCartEl = target.closest('[data-add-to-cart]') as HTMLElement | null;
      const checkoutEl = target.closest('[data-start-checkout]') as HTMLElement | null;

      if (addToCartEl) {
        const productId = addToCartEl.getAttribute('data-product-id') || '';
        const productName = addToCartEl.getAttribute('data-product-name') || '';
        const price = parseFloat(addToCartEl.getAttribute('data-price') || '0');
        const currency = addToCartEl.getAttribute('data-currency') || 'USD';

        if (typeof window.fbq === 'function') {
          window.fbq('track', 'AddToCart', {
            content_ids: [productId],
            content_name: productName,
            content_type: 'product',
            value: price,
            currency,
          });
        }
      }

      if (checkoutEl) {
        // Read live cart state for checkout values
        const state = useCartStore.getState();
        const totalPrice = state.items.reduce(
          (sum, item) => sum + parseFloat(item.price.amount) * item.quantity,
          0
        );
        const discountAmount =
          state.appliedDiscountCode === 'COUPLES-BUNDLE' ? 29 :
          state.appliedDiscountCode === 'FAMILY-BUNDLE' ? 97 : 0;
        const finalTotal = totalPrice - discountAmount;
        const currency = state.items[0]?.price.currencyCode || 'USD';

        if (typeof window.fbq === 'function') {
          window.fbq('track', 'InitiateCheckout', {
            value: finalTotal,
            currency,
            num_items: state.items.reduce((sum, item) => sum + item.quantity, 0),
          });
        }
      }
    }

    document.addEventListener('click', handleClick, true);
    return () => document.removeEventListener('click', handleClick, true);
  }, []);
}
