import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";

export const CartTrigger = () => {
  const totalItems = useCartStore((s) => s.items.reduce((sum, item) => sum + item.quantity, 0));
  const openDrawer = useCartStore((s) => s.openDrawer);

  return (
    <button
      onClick={openDrawer}
      className="relative p-2 rounded-lg transition-colors"
      style={{ border: '1px solid hsl(var(--border))' }}
    >
      <ShoppingCart className="h-5 w-5 text-foreground" />
      {totalItems > 0 && (
        <span
          className="absolute -top-1.5 -right-1.5 h-5 w-5 rounded-full text-[10px] font-bold flex items-center justify-center"
          style={{ background: 'hsl(var(--gold))', color: 'hsl(var(--background))' }}
        >
          {totalItems}
        </span>
      )}
    </button>
  );
};
