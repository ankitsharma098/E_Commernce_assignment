# ShopVibe — Modern E-Commerce Frontend

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-black?style=for-the-badge&logo=vercel)](https://e-commernce-assignment.vercel.app)
[![GitHub](https://img.shields.io/badge/GitHub-Repo-181717?style=for-the-badge&logo=github)](https://github.com/ankitsharma098/E_Commernce_assignment)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite)](https://vite.dev)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-v4-06B6D4?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com)

> **WebNest Frontend Developer Assignment** — Built in 3 days with modern React architecture.

A fully-featured, responsive E-Commerce web application built with React 18 + Vite, showcasing clean architecture, state management, API integration, and premium UI/UX design.

---

## 🖥️ Live Demo

🔗 **[e-commernce-assignment.vercel.app](https://e-commernce-assignment.vercel.app)**

---

## ✨ Features

### ✅ Required
| Feature | Details |
|---|---|
| 🔐 Authentication | Login & Signup with React Hook Form + Zod validation. Mock auth. |
| 🏠 Home Page | Animated Hero, Category browsing, Featured Products section |
| 📦 Product Listing | Debounced search, category sidebar filter, multi-sort, mobile drawer |
| 🔍 Product Detail | Images, description, rating, quantity selector, breadcrumbs |
| 🛒 Cart | Add / Remove / Update quantity, persisted to localStorage |
| 📱 Responsive | Mobile, tablet, and desktop layouts throughout |

### ⭐ Bonus
| Feature | Details |
|---|---|
| ❤️ Wishlist | Toggle from any card, dedicated page, move-to-cart |
| 🌙 Dark Mode | System preference detection + manual toggle, persisted |
| ✨ Animations | Framer Motion — page transitions, floating cards, hover effects |
| 💀 Skeleton Loading | Loading placeholders on all product grids |
| 🧱 Reusable Components | Button, Input, Rating, SkeletonCard, Navbar, Footer |
| 📁 Clean Architecture | Feature-based folder structure, custom hooks, Zustand stores |

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Bundler | **Vite 8** |
| UI Framework | **React 18** |
| Styling | **Tailwind CSS v4** |
| State Management | **Zustand** (with persist middleware) |
| Routing | **React Router v7** |
| Data Fetching | **TanStack React Query** |
| HTTP Client | **Axios** |
| Forms & Validation | **React Hook Form + Zod** |
| Animations | **Framer Motion** |
| Icons | **Lucide React** |
| Notifications | **React Hot Toast** |
| API | **[FakeStoreAPI](https://fakestoreapi.com)** |

---

## 📁 Project Structure

```
src/
├── components/
│   ├── common/       # Button, Input, Rating, SkeletonCard, Navbar, Footer
│   ├── home/         # HeroSection, CategorySection, FeaturedProducts
│   ├── product/      # ProductCard, ProductFilters, ProductSort
│   └── cart/         # CartItem, CartSummary
├── pages/            # Home, ProductListing, ProductDetail, Cart, Wishlist, Login, Signup
├── store/            # authStore, cartStore, wishlistStore (Zustand + persist)
├── hooks/            # useProducts, useDebounce
├── services/         # api.js (Axios instance + FakeStoreAPI endpoints)
├── context/          # ThemeContext (Dark/Light mode)
├── routes/           # ProtectedRoute (auth guard)
└── utils/            # helpers.js (formatPrice, truncate, etc.)
```

---

## ⚙️ Local Setup

### Prerequisites
- Node.js 18+
- npm 9+

### Steps

```bash
# 1. Clone the repo
git clone https://github.com/ankitsharma098/E_Commernce_assignment.git
cd assignment

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
# → http://localhost:5173
```

### Build for Production

```bash
npm run build    # Creates /dist folder
npm run preview  # Preview production build locally
```

---

## 🔐 Demo Login

> Any valid email + password (min 6 chars) works — it's mock auth.

```
Email:    demo@shopvibe.com
Password: demo123
```

---

## 🚀 Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Go to [vercel.com](https://vercel.com) → Import repo
3. Framework auto-detected as **Vite** — click Deploy ✅

### Netlify
1. Push to GitHub
2. Go to [netlify.com](https://netlify.com) → Import repo
3. Build command: `npm run build` | Publish dir: `dist`
4. `public/_redirects` handles client-side routing ✅

---

## 📋 Evaluation Checklist

| Criteria | Status |
|---|---|
| Code Quality & Architecture | ✅ Clean feature-based separation |
| UI/UX Implementation | ✅ Premium dark design, glassmorphism, animations |
| Responsiveness | ✅ Mobile / Tablet / Desktop |
| API Handling | ✅ Axios + React Query + error/loading states |
| State Management | ✅ Zustand with localStorage persistence |
| Performance | ✅ React Query caching, debounced search, lazy images |
| Reusable Components | ✅ Button, Input, Rating, Skeleton, etc. |
| Git Commit Quality | ✅ Conventional commits |

---

## 👤 Author

**Ankit Sharma**
- GitHub: [@ankitsharma098](https://github.com/ankitsharma098)
- LinkedIn: [ankitsharma](https://www.linkedin.com/in/ankit-sharma-037379223/)

---

> Built for the **WebNest Frontend Developer Assignment** — 2026
