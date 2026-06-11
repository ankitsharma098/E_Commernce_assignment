import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCategories } from '../../hooks/useProducts';
import { categoryLabel, categoryIcon } from '../../utils/helpers';

const categoryColors = {
  electronics: 'from-blue-500 to-cyan-500',
  jewelery: 'from-amber-500 to-yellow-500',
  "men's clothing": 'from-slate-600 to-slate-800',
  "women's clothing": 'from-pink-500 to-rose-500',
};

const categoryBg = {
  electronics: 'bg-blue-50 dark:bg-blue-950/40',
  jewelery: 'bg-amber-50 dark:bg-amber-950/40',
  "men's clothing": 'bg-slate-50 dark:bg-slate-800/40',
  "women's clothing": 'bg-pink-50 dark:bg-pink-950/40',
};

export default function CategorySection() {
  const { data: categories, isLoading } = useCategories();

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } },
  };
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="py-20 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-violet-600 dark:text-violet-400 text-sm font-semibold tracking-widest uppercase"
          >
            Browse Categories
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mt-2"
          >
            Shop by Category
          </motion.h2>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-40 rounded-3xl bg-slate-100 dark:bg-slate-800 animate-pulse"
              />
            ))}
          </div>
        ) : (
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {categories?.map((cat) => (
              <motion.div key={cat} variants={item}>
                <Link
                  to={`/products?category=${encodeURIComponent(cat)}`}
                  className={`
                    group relative flex flex-col items-center justify-center
                    h-44 rounded-3xl overflow-hidden transition-all duration-300
                    hover:-translate-y-2 hover:shadow-2xl card-shadow
                    ${categoryBg[cat] || 'bg-slate-50 dark:bg-slate-800'}
                  `}
                >
                  {/* Gradient overlay on hover */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${
                      categoryColors[cat] || 'from-violet-500 to-indigo-500'
                    } opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-3xl`}
                  />

                  <span className="text-5xl mb-3 group-hover:scale-110 transition-transform duration-300">
                    {categoryIcon(cat)}
                  </span>
                  <span className="text-sm font-bold text-slate-800 dark:text-slate-200 text-center px-4">
                    {categoryLabel(cat)}
                  </span>

                  {/* Bottom gradient bar */}
                  <div
                    className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${
                      categoryColors[cat] || 'from-violet-500 to-indigo-500'
                    } scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}
                  />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
