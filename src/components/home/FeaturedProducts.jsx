import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useProducts } from '../../hooks/useProducts';
import ProductCard from '../product/ProductCard';
import { SkeletonGrid } from '../common/SkeletonCard';

export default function FeaturedProducts() {
  const { data: products, isLoading, isError } = useProducts();
  const featured = products?.slice(0, 8);

  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-violet-600 dark:text-violet-400 text-sm font-semibold tracking-widest uppercase"
            >
              Handpicked for You
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mt-2"
            >
              Featured Products
            </motion.h2>
          </div>
          <Link
            to="/products"
            className="hidden sm:flex items-center gap-2 text-sm font-semibold text-violet-600 dark:text-violet-400 hover:gap-3 transition-all duration-200 group"
          >
            View All
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Grid */}
        {isLoading && <SkeletonGrid count={8} />}

        {isError && (
          <div className="text-center py-16 text-slate-500 dark:text-slate-400">
            <p className="text-lg font-medium">Failed to load products.</p>
            <p className="text-sm mt-1">Please check your connection and try again.</p>
          </div>
        )}

        {featured && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featured.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        )}

        {/* Mobile View All */}
        <div className="mt-10 text-center sm:hidden">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-violet-600 text-white text-sm font-semibold hover:bg-violet-700 transition-colors"
          >
            View All Products <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
