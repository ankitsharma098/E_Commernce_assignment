import { ArrowUpDown } from 'lucide-react';

const SORT_OPTIONS = [
  { value: '', label: 'Default' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating-desc', label: 'Top Rated' },
  { value: 'name-asc', label: 'Name: A–Z' },
];

export default function ProductSort({ value, onChange }) {
  return (
    <div className="flex items-center gap-2">
      <ArrowUpDown size={15} className="text-slate-400 flex-shrink-0" />
      <select
        id="product-sort"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="text-sm font-medium bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-violet-300 dark:focus:ring-violet-800 cursor-pointer transition-all"
      >
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
