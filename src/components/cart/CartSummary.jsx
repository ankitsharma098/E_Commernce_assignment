import { ShoppingBag, Tag } from 'lucide-react';
import useCartStore from '../../store/cartStore';
import { formatPrice } from '../../utils/helpers';
import Button from '../common/Button';
import toast from 'react-hot-toast';

export default function CartSummary() {
  const { getTotalPrice, getTotalItems, clearCart } = useCartStore();
  const subtotal = getTotalPrice();
  const shipping = subtotal > 50 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleCheckout = () => {
    toast.success('Order placed successfully! 🎉', { duration: 3000 });
    clearCart();
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl card-shadow p-6 space-y-5 sticky top-24">
      <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
        <ShoppingBag size={18} /> Order Summary
      </h2>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between text-slate-600 dark:text-slate-400">
          <span>Subtotal ({getTotalItems()} items)</span>
          <span className="font-semibold">{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between text-slate-600 dark:text-slate-400">
          <span>Shipping</span>
          <span className={`font-semibold ${shipping === 0 ? 'text-emerald-500' : ''}`}>
            {shipping === 0 ? 'FREE' : formatPrice(shipping)}
          </span>
        </div>
        <div className="flex justify-between text-slate-600 dark:text-slate-400">
          <span>Tax (8%)</span>
          <span className="font-semibold">{formatPrice(tax)}</span>
        </div>

        {shipping === 0 && (
          <div className="flex items-center gap-2 p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl">
            <Tag size={13} className="text-emerald-500" />
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
              You qualify for free shipping!
            </span>
          </div>
        )}

        {subtotal < 50 && subtotal > 0 && (
          <div className="text-xs text-slate-400 dark:text-slate-500 text-center">
            Add {formatPrice(50 - subtotal)} more for free shipping
          </div>
        )}

        <div className="border-t border-slate-100 dark:border-slate-800 pt-3 flex justify-between font-black text-base text-slate-900 dark:text-white">
          <span>Total</span>
          <span>{formatPrice(total)}</span>
        </div>
      </div>

      <Button
        id="checkout-btn"
        onClick={handleCheckout}
        className="w-full"
        size="lg"
      >
        Proceed to Checkout
      </Button>

      <p className="text-xs text-center text-slate-400">
        🔒 Secure checkout — your data is protected
      </p>
    </div>
  );
}
