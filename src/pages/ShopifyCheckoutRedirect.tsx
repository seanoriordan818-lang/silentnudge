import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SHOPIFY_STORE_PERMANENT_DOMAIN = 'store-launchpad-sprn5.myshopify.com';

/**
 * Catches Shopify checkout URLs that land on our app due to domain redirect,
 * and forwards them to the permanent .myshopify.com checkout domain.
 */
const ShopifyCheckoutRedirect = () => {
  const location = useLocation();

  useEffect(() => {
    const fullPath = location.pathname + location.search;
    const shopifyUrl = `https://${SHOPIFY_STORE_PERMANENT_DOMAIN}${fullPath}`;
    window.location.replace(shopifyUrl);
  }, [location]);

  return null;
};

export default ShopifyCheckoutRedirect;
