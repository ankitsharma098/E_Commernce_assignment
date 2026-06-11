import { Minus, Plus, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import useCartStore from '../../store/cartStore';
import { formatPrice, truncate } from '../../utils/helpers';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCartStore();

  const handleRemove = () => {
    removeFromCart(item.id);
    toast.success('Item removed');
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex gap-4 p-4 bg-white dark:bg-slate-900 rounded-2xl card-shadow"
    >
      {/* Image */}
      <Link to={`/products/${item.id}`} className="flex-shrink-0">
        <div className="w-20 h-20 sm:w-24 sm:h-24 bg-slate-50 dark:bg-slate-800 rounded-xl overflow-hidden flex items-center justify-center p-2">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-contain"
          />
        </div>
      </Link>

      {/* Info */}
      <div className="flex-1 min-w-0 space-y-2">
        <Link to={`/products/${item.id}`}>
          <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 hover:text-violet-600 dark:hover:text-violet-400 transition-colors line-clamp-2">
            {truncate(item.title, 60)}
          </h3>
        </Link>
        <p className="text-lg font-black text-slate-900 dark:text-white">
          {formatPrice(item.price * item.quantity)}
        </p>
        <p className="text-xs text-slate-400">
          {formatPrice(item.price)} each
        </p>

        <div className="flex items-center justify-between pt-1">
          {/* Quantity Controls */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 rounded-xl p-1">
            <button
              id={`decrease-qty-${item.id}`}
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-500 hover:bg-white dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white transition-all"
            >
              <Minus size={13} />
            </button>
            <span className="w-8 text-center text-sm font-bold text-slate-800 dark:text-white">
              {item.quantity}
            </span>
            <button
              id={`increase-qty-${item.id}`}
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-500 hover:bg-white dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white transition-all"
            >
              <Plus size={13} />
            </button>
          </div>

          {/* Remove */}
          <button
            id={`remove-item-${item.id}`}
            onClick={handleRemove}
            className="flex items-center gap-1.5 text-xs text-rose-500 hover:text-rose-600 font-medium transition-colors"
          >
            <Trash2 size={14} /> Remove
          </button>
        </div>
      </div>
    </motion.div>
  );
}
