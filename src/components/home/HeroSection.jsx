import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Zap, Shield, Truck } from 'lucide-react';
import Button from '../common/Button';

const features = [
  { icon: Truck, label: 'Free Shipping', desc: 'On orders over $50' },
  { icon: Shield, label: 'Secure Payment', desc: '100% protected' },
  { icon: Zap, label: 'Fast Delivery', desc: '2-3 business days' },
  { icon: Star, label: 'Top Rated', desc: '4.8★ avg rating' },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center gradient-hero overflow-hidden pt-16">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-800/10 rounded-full blur-3xl" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-sm font-medium mb-6">
                <Zap size={14} className="fill-violet-400 text-violet-400" />
                New Collection 2026 is Here
              </span>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.1]">
                Shop the{' '}
                <span className="text-gradient bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
                  Future
                </span>{' '}
                of Style
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-lg text-slate-400 leading-relaxed max-w-lg"
            >
              Explore thousands of curated products across electronics, fashion,
              jewellery and more — all at unbeatable prices with lightning-fast delivery.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <Link to="/products">
                <Button size="lg" className="group shadow-2xl shadow-violet-500/40">
                  Shop Now
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Button>
              </Link>
              <Link to="/products?category=electronics">
                <Button variant="outline" size="lg" className="border-slate-600 text-slate-300 hover:bg-slate-800 hover:border-violet-500">
                  Explore Deals
                </Button>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex gap-8 pt-4"
            >
              {[
                { value: '10K+', label: 'Products' },
                { value: '50K+', label: 'Customers' },
                { value: '4.8★', label: 'Rating' },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-black text-white">{stat.value}</p>
                  <p className="text-sm text-slate-400">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — Floating Product Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative">
              {/* Main card */}
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="glass rounded-3xl p-6 max-w-sm mx-auto shadow-2xl"
              >
                <img
                  src="https://fakestoreapi.com/img/81fAn1uwkjL._AC_UY879_.jpg"
                  alt="Featured Product"
                  className="w-full h-56 object-contain mb-4"
                />
                <h3 className="text-white font-bold text-lg leading-tight mb-1">
                  Premium Women's Jacket
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-violet-400 font-black text-2xl">$56.99</span>
                  <div className="flex items-center gap-1 text-amber-400 text-sm">
                    <Star size={14} className="fill-amber-400" /> 4.8
                  </div>
                </div>
              </motion.div>

              {/* Floating badge 1 */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute -top-6 -right-6 glass rounded-2xl p-3 shadow-xl"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <Truck size={14} className="text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-white text-xs font-semibold">Free Delivery</p>
                    <p className="text-slate-400 text-xs">Ships today</p>
                  </div>
                </div>
              </motion.div>

              {/* Floating badge 2 */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="absolute -bottom-4 -left-8 glass rounded-2xl p-3 shadow-xl"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-violet-500/20 flex items-center justify-center">
                    <Star size={14} className="text-violet-400 fill-violet-400" />
                  </div>
                  <div>
                    <p className="text-white text-xs font-semibold">Top Rated</p>
                    <p className="text-slate-400 text-xs">4.9 / 5.0</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Feature Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {features.map(({ icon: Icon, label, desc }) => (
            <div
              key={label}
              className="flex items-center gap-3 glass rounded-2xl p-4"
            >
              <div className="w-10 h-10 rounded-xl bg-violet-500/20 flex items-center justify-center flex-shrink-0">
                <Icon size={18} className="text-violet-400" />
              </div>
              <div>
                <p className="text-white text-sm font-semibold">{label}</p>
                <p className="text-slate-400 text-xs">{desc}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
