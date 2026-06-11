export default function SkeletonCard() {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden card-shadow animate-pulse">
      <div className="h-52 bg-slate-200 dark:bg-slate-700" />
      <div className="p-4 space-y-3">
        <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded-full w-1/3" />
        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded-full w-full" />
        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded-full w-4/5" />
        <div className="flex justify-between items-center pt-2">
          <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded-full w-1/4" />
          <div className="h-9 bg-slate-200 dark:bg-slate-700 rounded-xl w-1/3" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonGrid({ count = 8 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
