import { categoryLabel, categoryIcon } from '../../utils/helpers';
import { useCategories } from '../../hooks/useProducts';
import { SlidersHorizontal, X } from 'lucide-react';

export default function ProductFilters({ selectedCategory, onCategoryChange }) {
  const { data: categories } = useCategories();

  return (
    <aside className="space-y-6">
      <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200">
        <SlidersHorizontal size={18} />
        <h2 className="font-bold text-base">Filters</h2>
      </div>

      {/* Category Filter */}
      <div>
        <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
          Category
        </h3>
        <div className="space-y-1">
          <button
            onClick={() => onCategoryChange('')}
            className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
              !selectedCategory
                ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/20'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <span>🛍️</span>
            All Products
          </button>
          {categories?.map((cat) => (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                selectedCategory === cat
                  ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/20'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <span>{categoryIcon(cat)}</span>
              {categoryLabel(cat)}
            </button>
          ))}
        </div>
      </div>

      {/* Clear Filter */}
      {selectedCategory && (
        <button
          onClick={() => onCategoryChange('')}
          className="flex items-center gap-1.5 text-xs text-rose-500 hover:text-rose-600 font-medium transition-colors"
        >
          <X size={13} /> Clear Filter
        </button>
      )}
    </aside>
  );
}
