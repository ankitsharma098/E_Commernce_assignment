# ShopVibe — E-Commerce Frontend Assignment

A fully-featured, modern E-Commerce web application built with **React 18 + Vite**, showcasing clean architecture, state management, API integration, and premium UI/UX design.

---

## 🚀 Live Demo

> Deploy to Vercel: `vercel --prod` (see Deployment section below)

---

## ✨ Features

### Required
- 🔐 **Authentication** — Login & Signup with full form validation (React Hook Form + Zod). Mock auth with any valid email/password.
- 🏠 **Home Page** — Animated Hero, Category browsing, Featured Products
- 📦 **Product Listing** — Debounced search, category filter, multi-sort (price/rating/name), mobile filter drawer
- 🔍 **Product Detail** — Full detail view, quantity selector, breadcrumb, ratings, trust badges
- 🛒 **Cart** — Add/Remove/Update quantity, persisted to localStorage via Zustand
- 📱 **Responsive** — Mobile, tablet, and desktop layouts

### Bonus
- ❤️ **Wishlist** — Toggle from any product card, move to cart, dedicated page
- 🌙 **Dark Mode** — System preference detection + manual toggle, persisted
- ✨ **Animations** — Framer Motion page transitions, floating hero cards, hover effects
- 💀 **Skeleton Loading** — Skeleton cards on all product grids during API fetch
- 🧱 **Reusable Components** — Button, Input, Rating, SkeletonCard, Navbar, Footer
- 📁 **Clean Folder Structure** — Feature-based architecture

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Bundler | Vite 8 |
| UI | React 18 |
| Styling | Tailwind CSS v4 |
| State Management | Zustand (with persist middleware) |
| Routing | React Router v6 |
| Data Fetching | TanStack React Query |
| HTTP Client | Axios |
| Forms & Validation | React Hook Form + Zod |
| Animations | Framer Motion |
| Icons | Lucide React |
| Notifications | React Hot Toast |
| API | [FakeStoreAPI](https://fakestoreapi.com) |

---

## 📁 Project Structure

```
src/
├── assets/
├── components/
│   ├── common/          # Button, Input, Rating, SkeletonCard, Navbar, Footer
│   ├── home/            # HeroSection, CategorySection, FeaturedProducts
│   ├── product/         # ProductCard, ProductFilters, ProductSort
│   └── cart/            # CartItem, CartSummary
├── pages/               # Home, ProductListing, ProductDetail, Cart, Wishlist, Login, Signup
├── store/               # authStore, cartStore, wishlistStore (Zustand)
├── hooks/               # useProducts, useDebounce
├── services/            # api.js (Axios instance + endpoints)
├── context/             # ThemeContext (Dark/Light mode)
├── routes/              # ProtectedRoute
└── utils/               # helpers.js (formatPrice, truncate, etc.)
```

---

## ⚙️ Setup & Installation

### Prerequisites
- Node.js 18+
- npm 9+

### Steps

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd assignment

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

The app will be available at **http://localhost:5173**

### Build for Production

```bash
npm run build
npm run preview
```

---

## 🔐 Demo Login

> Any valid email + password (6+ characters) works with our mock auth.

```
Email:    demo@shopvibe.com
Password: demo123
```

---

## 🚀 Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel --prod
```

### Netlify

```bash
npm run build
# Drag & drop the /dist folder to Netlify
```

---

## 📋 Evaluation Checklist

| Criteria | Status |
|---|---|
| Code Quality & Architecture | ✅ Feature-based, clean separation |
| UI/UX Implementation | ✅ Premium design with glassmorphism, gradients |
| Responsiveness | ✅ Mobile / Tablet / Desktop |
| API Handling | ✅ Axios + React Query with error/loading states |
| State Management | ✅ Zustand with localStorage persistence |
| Performance | ✅ React Query caching, lazy images, debounce |
| Reusable Components | ✅ Button, Input, Rating, SkeletonCard, etc. |
| Git Commit Quality | ✅ Conventional commits |

---

## 👤 Author

Built for the **WebNest Frontend Developer Assignment** — 2026
