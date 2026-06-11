import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ShoppingCart, Trash2, ArrowRight } from 'lucide-react';
import useWishlistStore from '../store/wishlistStore';
import useCartStore from '../store/cartStore';
import { formatPrice, truncate, categoryLabel } from '../utils/helpers';
import Rating from '../components/common/Rating';
import Button from '../components/common/Button';
import toast from 'react-hot-toast';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

export default function Wishlist() {
  const { items, removeFromWishlist, clearWishlist } = useWishlistStore();
  const { addToCart } = useCartStore();

  const handleMoveToCart = (item) => {
    addToCart(item);
    removeFromWishlist(item.id);
    toast.success('Moved to cart! 🛒');
  };

  return (
    <motion.div
      key="wishlist"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="pt-20 min-h-screen bg-slate-50 dark:bg-slate-950"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white flex items-center gap-3">
              <Heart className="text-rose-500 fill-rose-500" size={28} />
              Wishlist
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">
              {items.length} saved {items.length === 1 ? 'item' : 'items'}
            </p>
          </div>
          {items.length > 0 && (
            <button
              id="clear-wishlist-btn"
              onClick={() => { clearWishlist(); toast.success('Wishlist cleared'); }}
              className="flex items-center gap-1.5 text-sm text-rose-500 hover:text-rose-600 font-medium transition-colors"
            >
              <Trash2 size={15} /> Clear All
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 space-y-5">
            <div className="w-24 h-24 rounded-3xl bg-rose-50 dark:bg-rose-950/30 flex items-center justify-center">
              <Heart size={40} className="text-rose-200 dark:text-rose-800" />
            </div>
            <div className="text-center">
              <h2 className="text-xl font-bold text-slate-800 dark:text-white">
                Your wishlist is empty
              </h2>
              <p className="text-slate-400 text-sm mt-1">
                Save your favourite products here
              </p>
            </div>
            <Link to="/products">
              <Button>
                Discover Products <ArrowRight size={16} />
              </Button>
            </Link>
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {items.map((item, i) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1, transition: { delay: i * 0.05 } }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden card-shadow group"
                >
                  {/* Image */}
                  <Link to={`/products/${item.id}`} className="block">
                    <div className="h-52 bg-slate-50 dark:bg-slate-800 flex items-center justify-center p-6">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </Link>

                  {/* Info */}
                  <div className="p-4 space-y-3">
                    <span className="text-xs font-medium text-violet-600 dark:text-violet-400">
                      {categoryLabel(item.category)}
                    </span>
                    <Link to={`/products/${item.id}`}>
                      <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 line-clamp-2 hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
                        {truncate(item.title, 55)}
                      </h3>
                    </Link>
                    <Rating value={item.rating?.rate} count={item.rating?.count} size={13} />
                    <p className="text-lg font-black text-slate-900 dark:text-white">
                      {formatPrice(item.price)}
                    </p>

                    <div className="flex gap-2 pt-1">
                      <button
                        id={`move-to-cart-${item.id}`}
                        onClick={() => handleMoveToCart(item)}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-xs font-semibold transition-colors"
                      >
                        <ShoppingCart size={13} /> Move to Cart
                      </button>
                      <button
                        id={`remove-wishlist-${item.id}`}
                        onClick={() => { removeFromWishlist(item.id); toast.success('Removed from wishlist'); }}
                        className="w-10 h-10 rounded-xl flex items-center justify-center border border-rose-200 dark:border-rose-900 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        )}
      </div>
    </motion.div>
  );
}
