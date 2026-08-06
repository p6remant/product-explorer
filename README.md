# Product Explorer

A product browsing app built with **React 19**, **Next.js 16**, **TanStack Query**, **Tailwind CSS v4**, **Zustand**, and **Redux Toolkit**.

The app includes:

- Infinite-scroll product grid with loading skeletons
- Debounced product search
- URL-based category filtering with multi-select
- Product detail pages with image gallery
- Favorites with local persistence (Zustand)
- Dark/light theme support (Redux)
- Responsive layout with mobile filter drawer
- DummyJSON API integration

---

## Demo URL

```txt
https://product-explorer-gilt-one.vercel.app/
```

---

## Tech Stack

- React 19
- TypeScript
- Next.js 16 (App Router)
- TanStack Query 5
- Tailwind CSS 4
- Zustand
- Redux Toolkit
- Axios
- Framer Motion
- Lucide React
- pnpm

---

## Prerequisites

- Node.js
- pnpm

---

## Setup

### 1. Clone Repository

#### HTTPS

```bash
git clone https://github.com/p6remant/product-explorer.git
```

#### SSH

```bash
git clone git@github.com:p6remant/product-explorer.git
```

---

### 2. Install Dependencies

```bash
pnpm install
```

---

### 3. Environment Variables

Create a `.env` file in the project root:

```env
NEXT_PUBLIC_API_BASE_URL=https://dummyjson.com
```

---

### 4. Run Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

### 5. Build Application

```bash
pnpm build
```

---

### 6. Start Production Server

```bash
pnpm start
```

---

## Project Structure

```txt
product-explorer/
├── public/
├── src/
│   ├── app/
│   │   ├── products/[id]/     
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx           
│   ├── components/
│   │   ├── common/            
│   │   ├── filters/           
│   │   ├── layouts/           
│   │   ├── products/          
│   │   ├── skeleton/          
│   │   └── ui/                
│   ├── hooks/
│   │   ├── useCategories.ts
│   │   ├── useDebounce.ts
│   │   ├── useInfiniteProducts.ts
│   │   ├── useInfiniteScroll.ts
│   │   └── useProduct.ts
│   ├── lib/
│   │   ├── apiClient.ts
│   │   ├── constants.ts
│   │   ├── filterUtils.ts
│   │   └── utils.ts
│   ├── providers/
│   │   ├── QueryProvider.tsx
│   │   └── ThemeProvider.tsx
│   ├── services/
│   │   └── api.ts             
│   ├── store/
│   │   ├── redux/             
│   │   └── zustand/           
│   └── types/
│       └── product.ts
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── prettier.config.mjs
└── README.md
```

---
