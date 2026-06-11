import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ShoppingCart, Heart, ArrowLeft, Share2, Minus, Plus, CheckCircle,
} from 'lucide-react';
import { useProduct } from '../hooks/useProducts';
import useCartStore from '../store/cartStore';
import useWishlistStore from '../store/wishlistStore';
import useAuthStore from '../store/authStore';
import Rating from '../components/common/Rating';
import Button from '../components/common/Button';
import { SkeletonGrid } from '../components/common/SkeletonCard';
import { formatPrice, categoryLabel } from '../utils/helpers';
import toast from 'react-hot-toast';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const { data: product, isLoading, isError } = useProduct(id);
  const { addToCart, isInCart } = useCartStore();
  const { toggleWishlist, isWishlisted } = useWishlistStore();
  const { isAuthenticated } = useAuthStore();

  const wishlisted = product ? isWishlisted(product.id) : false;
  const inCart = product ? isInCart(product.id) : false;

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      toast.error('Please sign in to add items to cart');
      navigate('/login');
      return;
    }
    addToCart(product, quantity);
    toast.success(`${quantity} item${quantity > 1 ? 's' : ''} added to cart! 🛒`);
  };

  const handleWishlist = () => {
    if (!isAuthenticated) {
      toast.error('Please sign in to save items');
      navigate('/login');
      return;
    }
    toggleWishlist(product);
    toast.success(wishlisted ? 'Removed from wishlist' : 'Added to wishlist ❤️');
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to clipboard!');
  };

  if (isLoading) {
    return (
      <div className="pt-24 pb-16 min-h-screen bg-slate-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SkeletonGrid count={1} />
        </div>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="text-center space-y-4">
          <p className="text-6xl">😕</p>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Product not found</h2>
          <Link to="/products">
            <Button variant="outline">Browse all products</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      key="product-detail"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="pt-20 min-h-screen bg-slate-50 dark:bg-slate-950"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-8">
          <Link to="/" className="hover:text-violet-600 transition-colors">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-violet-600 transition-colors">Products</Link>
          <span>/</span>
          <Link
            to={`/products?category=${encodeURIComponent(product.category)}`}
            className="hover:text-violet-600 transition-colors"
          >
            {categoryLabel(product.category)}
          </Link>
          <span>/</span>
          <span className="text-slate-700 dark:text-slate-300 truncate max-w-48">
            {product.title}
          </span>
        </nav>

        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors mb-8 group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left — Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-10 card-shadow flex items-center justify-center aspect-square">
              <img
                src={product.image}
                alt={product.title}
                className="max-h-96 w-full object-contain hover:scale-105 transition-transform duration-500"
              />
            </div>
          </motion.div>

          {/* Right — Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-6"
          >
            {/* Category */}
            <span className="inline-flex px-3 py-1.5 bg-violet-50 dark:bg-violet-950 text-violet-600 dark:text-violet-400 text-xs font-semibold rounded-lg">
              {categoryLabel(product.category)}
            </span>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white leading-tight">
              {product.title}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-4">
              <Rating value={product.rating?.rate} count={product.rating?.count} size={18} />
              {inCart && (
                <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                  <CheckCircle size={14} /> In your cart
                </span>
              )}
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-black text-slate-900 dark:text-white">
                {formatPrice(product.price)}
              </span>
              <span className="text-sm text-slate-400 line-through">
                {formatPrice(product.price * 1.2)}
              </span>
              <span className="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 text-xs font-bold rounded-lg">
                17% OFF
              </span>
            </div>

            {/* Description */}
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
              {product.description}
            </p>

            {/* Quantity */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Quantity
              </label>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 rounded-xl p-1.5">
                  <button
                    id="qty-decrease"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-500 hover:bg-white dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white transition-all"
                  >
                    <Minus size={15} />
                  </button>
                  <span className="w-10 text-center text-base font-bold text-slate-800 dark:text-white">
                    {quantity}
                  </span>
                  <button
                    id="qty-increase"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-500 hover:bg-white dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white transition-all"
                  >
                    <Plus size={15} />
                  </button>
                </div>
                <span className="text-sm text-slate-400">In stock</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <Button
                id="add-to-cart-detail"
                onClick={handleAddToCart}
                size="lg"
                className="flex-1"
              >
                <ShoppingCart size={18} />
                {inCart ? 'Add More to Cart' : 'Add to Cart'}
              </Button>
              <button
                id="wishlist-detail-btn"
                onClick={handleWishlist}
                className={`w-14 h-14 rounded-xl flex items-center justify-center border-2 transition-all duration-200 ${
                  wishlisted
                    ? 'bg-rose-500 border-rose-500 text-white'
                    : 'border-slate-200 dark:border-slate-700 text-slate-400 hover:border-rose-400 hover:text-rose-500'
                }`}
              >
                <Heart size={20} className={wishlisted ? 'fill-white' : ''} />
              </button>
              <button
                id="share-btn"
                onClick={handleShare}
                className="w-14 h-14 rounded-xl flex items-center justify-center border-2 border-slate-200 dark:border-slate-700 text-slate-400 hover:border-violet-400 hover:text-violet-500 transition-all duration-200"
              >
                <Share2 size={18} />
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-3 pt-4">
              {[
                { icon: '🚚', text: 'Free Shipping', sub: 'Over $50' },
                { icon: '↩️', text: 'Easy Returns', sub: '30-day policy' },
                { icon: '🔒', text: 'Secure Pay', sub: 'SSL encrypted' },
              ].map((badge) => (
                <div
                  key={badge.text}
                  className="flex flex-col items-center text-center p-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl"
                >
                  <span className="text-xl mb-1">{badge.icon}</span>
                  <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    {badge.text}
                  </p>
                  <p className="text-xs text-slate-400">{badge.sub}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
