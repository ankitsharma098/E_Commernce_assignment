import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, ArrowRight, Trash2 } from 'lucide-react';
import useCartStore from '../store/cartStore';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';
import Button from '../components/common/Button';
import toast from 'react-hot-toast';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

export default function Cart() {
  const { items, clearCart } = useCartStore();

  const handleClearCart = () => {
    clearCart();
    toast.success('Cart cleared');
  };

  return (
    <motion.div
      key="cart"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="pt-20 min-h-screen bg-slate-50 dark:bg-slate-950"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white">
              My Cart
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">
              {items.length} {items.length === 1 ? 'item' : 'items'}
            </p>
          </div>
          {items.length > 0 && (
            <button
              id="clear-cart-btn"
              onClick={handleClearCart}
              className="flex items-center gap-1.5 text-sm text-rose-500 hover:text-rose-600 font-medium transition-colors"
            >
              <Trash2 size={15} /> Clear All
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 space-y-5">
            <div className="w-24 h-24 rounded-3xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
              <ShoppingBag size={40} className="text-slate-300 dark:text-slate-600" />
            </div>
            <div className="text-center">
              <h2 className="text-xl font-bold text-slate-800 dark:text-white">
                Your cart is empty
              </h2>
              <p className="text-slate-400 text-sm mt-1">
                Add some products to get started
              </p>
            </div>
            <Link to="/products">
              <Button>
                Browse Products <ArrowRight size={16} />
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <AnimatePresence mode="popLayout">
                {items.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </AnimatePresence>
            </div>

            {/* Cart Summary */}
            <div className="lg:col-span-1">
              <CartSummary />
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
