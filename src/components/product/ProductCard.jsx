import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart } from 'lucide-react';
import toast from 'react-hot-toast';
import Rating from '../common/Rating';
import useCartStore from '../../store/cartStore';
import useWishlistStore from '../../store/wishlistStore';
import useAuthStore from '../../store/authStore';
import { formatPrice, truncate, categoryLabel } from '../../utils/helpers';

export default function ProductCard({ product, index = 0 }) {
  const { addToCart } = useCartStore();
  const { toggleWishlist, isWishlisted } = useWishlistStore();
  const { isAuthenticated } = useAuthStore();
  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error('Please sign in to add items to cart');
      return;
    }
    addToCart(product);
    toast.success('Added to cart!', {
      icon: '🛒',
    });
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error('Please sign in to save items');
      return;
    }
    toggleWishlist(product);
    toast.success(wishlisted ? 'Removed from wishlist' : 'Added to wishlist!', {
      icon: wishlisted ? '💔' : '❤️',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Link
        to={`/products/${product.id}`}
        className="group block bg-white dark:bg-slate-900 rounded-2xl overflow-hidden card-shadow hover:card-shadow-hover transition-all duration-300 hover:-translate-y-1"
      >
        {/* Image */}
        <div className="relative overflow-hidden bg-slate-50 dark:bg-slate-800 h-52 flex items-center justify-center p-6">
          <img
            src={product.image}
            alt={product.title}
            className="h-full w-full object-contain group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
          />

          {/* Wishlist Button */}
          <button
            id={`wishlist-btn-${product.id}`}
            onClick={handleWishlist}
            className={`
              absolute top-3 right-3 w-9 h-9 rounded-xl flex items-center justify-center
              backdrop-blur-md transition-all duration-200 shadow-sm
              ${
                wishlisted
                  ? 'bg-rose-500 text-white shadow-rose-500/30'
                  : 'bg-white/80 dark:bg-slate-800/80 text-slate-400 hover:text-rose-500'
              }
            `}
            aria-label="Toggle wishlist"
          >
            <Heart size={15} className={wishlisted ? 'fill-white' : ''} />
          </button>

          {/* Category Badge */}
          <span className="absolute top-3 left-3 px-2.5 py-1 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md text-xs font-medium text-slate-600 dark:text-slate-300 rounded-lg">
            {categoryLabel(product.category)}
          </span>
        </div>

        {/* Info */}
        <div className="p-4 space-y-3">
          <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 leading-snug line-clamp-2 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
            {truncate(product.title, 55)}
          </h3>

          <Rating
            value={product.rating?.rate || 0}
            count={product.rating?.count}
            size={13}
          />

          <div className="flex items-center justify-between pt-1">
            <span className="text-lg font-black text-slate-900 dark:text-white">
              {formatPrice(product.price)}
            </span>
            <button
              id={`add-to-cart-${product.id}`}
              onClick={handleAddToCart}
              className="
                flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold
                bg-violet-600 hover:bg-violet-700 text-white
                transition-all duration-200 active:scale-95 shadow-lg shadow-violet-500/25
              "
            >
              <ShoppingCart size={13} />
              Add
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
