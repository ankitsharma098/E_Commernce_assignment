import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { useDebounce } from '../hooks/useDebounce';
import ProductCard from '../components/product/ProductCard';
import ProductFilters from '../components/product/ProductFilters';
import ProductSort from '../components/product/ProductSort';
import { SkeletonGrid } from '../components/common/SkeletonCard';
import Input from '../components/common/Input';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

export default function ProductListing() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('');
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  const selectedCategory = searchParams.get('category') || '';
  const debouncedSearch = useDebounce(search, 400);

  const { data: products, isLoading, isError } = useProducts();

  const handleCategoryChange = (cat) => {
    if (cat) {
      setSearchParams({ category: cat });
    } else {
      setSearchParams({});
    }
    setShowMobileFilter(false);
  };

  const filteredAndSorted = useMemo(() => {
    if (!products) return [];
    let result = [...products];

    // Category filter
    if (selectedCategory) {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Search filter
    if (debouncedSearch.trim()) {
      const q = debouncedSearch.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    // Sort
    switch (sort) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating-desc':
        result.sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0));
        break;
      case 'name-asc':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        break;
    }

    return result;
  }, [products, selectedCategory, debouncedSearch, sort]);

  return (
    <motion.div
      key="products"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="pt-20 min-h-screen bg-slate-50 dark:bg-slate-950"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
            All Products
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            {isLoading ? 'Loading...' : `${filteredAndSorted.length} products found`}
          </p>
        </div>

        {/* Search + Sort Bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="flex-1">
            <Input
              id="product-search"
              placeholder="Search products…"
              icon={Search}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-3">
            <ProductSort value={sort} onChange={setSort} />
            <button
              id="mobile-filter-btn"
              onClick={() => setShowMobileFilter(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300 transition-all hover:border-violet-400"
            >
              <SlidersHorizontal size={15} /> Filters
              {selectedCategory && (
                <span className="w-5 h-5 bg-violet-600 text-white text-xs rounded-full flex items-center justify-center">
                  1
                </span>
              )}
            </button>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filters — Desktop */}
          <div className="hidden lg:block w-56 flex-shrink-0">
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 card-shadow sticky top-24">
              <ProductFilters
                selectedCategory={selectedCategory}
                onCategoryChange={handleCategoryChange}
              />
            </div>
          </div>

          {/* Mobile Filter Drawer */}
          {showMobileFilter && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={() => setShowMobileFilter(false)}
              />
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'spring', damping: 25 }}
                className="absolute left-0 top-0 bottom-0 w-72 bg-white dark:bg-slate-900 p-6 shadow-2xl"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-bold text-slate-900 dark:text-white">Filters</h2>
                  <button onClick={() => setShowMobileFilter(false)}>
                    <X size={20} className="text-slate-500" />
                  </button>
                </div>
                <ProductFilters
                  selectedCategory={selectedCategory}
                  onCategoryChange={handleCategoryChange}
                />
              </motion.div>
            </div>
          )}

          {/* Product Grid */}
          <div className="flex-1 min-w-0">
            {isLoading && <SkeletonGrid count={8} />}

            {isError && (
              <div className="text-center py-20">
                <p className="text-slate-500 dark:text-slate-400 font-medium">
                  Failed to load products. Please try again.
                </p>
              </div>
            )}

            {!isLoading && !isError && filteredAndSorted.length === 0 && (
              <div className="text-center py-20 space-y-3">
                <p className="text-4xl">🔍</p>
                <p className="text-lg font-semibold text-slate-700 dark:text-slate-300">
                  No products found
                </p>
                <p className="text-slate-400 text-sm">
                  Try adjusting your search or filters
                </p>
              </div>
            )}

            {!isLoading && filteredAndSorted.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredAndSorted.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
