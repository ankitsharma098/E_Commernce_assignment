import { Star } from 'lucide-react';

export default function Rating({ value = 0, count, size = 16, showValue = true }) {
  const stars = Array.from({ length: 5 }, (_, i) => {
    const filled = i < Math.floor(value);
    const partial = !filled && i < value;
    return { filled, partial };
  });

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {stars.map((star, i) => (
          <Star
            key={i}
            size={size}
            className={
              star.filled
                ? 'fill-amber-400 text-amber-400'
                : star.partial
                ? 'fill-amber-200 text-amber-400'
                : 'fill-slate-200 text-slate-300 dark:fill-slate-700 dark:text-slate-600'
            }
          />
        ))}
      </div>
      {showValue && (
        <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
          {value.toFixed(1)}
        </span>
      )}
      {count !== undefined && (
        <span className="text-xs text-slate-400 dark:text-slate-500">
          ({count.toLocaleString()})
        </span>
      )}
    </div>
  );
}
