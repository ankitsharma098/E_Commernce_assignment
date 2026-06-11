import { Link } from 'react-router-dom';
import { ShoppingBag, Globe, MessageCircle, Camera, Heart } from 'lucide-react';

export default function Footer() {
  const year = new Date().getFullYear();

  const links = {
    Shop: [
      { label: 'All Products', to: '/products' },
      { label: 'Electronics', to: '/products?category=electronics' },
      { label: "Men's Clothing", to: "/products?category=men's clothing" },
      { label: "Women's Clothing", to: "/products?category=women's clothing" },
      { label: 'Jewellery', to: '/products?category=jewelery' },
    ],
    Account: [
      { label: 'Sign In', to: '/login' },
      { label: 'Create Account', to: '/signup' },
      { label: 'My Cart', to: '/cart' },
      { label: 'My Wishlist', to: '/wishlist' },
    ],
  };

  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2 group w-fit">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/30">
                <ShoppingBag size={18} className="text-white" />
              </div>
              <span className="text-2xl font-black text-white">ShopVibe</span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Discover thousands of products across electronics, fashion,
              jewellery and more. Premium quality at unbeatable prices.
            </p>
            <div className="flex items-center gap-3 pt-2">
              {[
                { icon: Globe, href: 'https://github.com', label: 'GitHub' },
                { icon: MessageCircle, href: 'https://twitter.com', label: 'Twitter' },
                { icon: Camera, href: 'https://instagram.com', label: 'Instagram' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-violet-600 flex items-center justify-center transition-all duration-200 group"
                >
                  <Icon size={16} className="text-slate-400 group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([section, items]) => (
            <div key={section}>
              <h3 className="text-white font-semibold text-sm mb-4">{section}</h3>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.to}
                      className="text-slate-400 hover:text-violet-400 text-sm transition-colors duration-200"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            © {year} ShopVibe. All rights reserved.
          </p>
          <p className="text-slate-500 text-sm flex items-center gap-1">
            Made with <Heart size={13} className="text-rose-500 fill-rose-500" /> for WebNest Assignment
          </p>
        </div>
      </div>
    </footer>
  );
}
