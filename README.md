# MetalDepo — Turborepo Monorepo

Premium metal products portfolio + backoffice management system.

## Apps

| App | Port | Description |
|---|---|---|
| `apps/web` | 3000 | Public portfolio site (Next.js 15) |
| `apps/backoffice` | 3001 | Admin management panel (Next.js 15) |
| `apps/api` | 4000 | REST API (NestJS + Prisma + PostgreSQL) |

## Packages

- `packages/types` — Shared TypeScript types + Zod validation schemas

## Tech Stack

- **Monorepo**: Turborepo + pnpm workspaces
- **Frontend**: Next.js 15 (App Router), Tailwind CSS, Framer Motion, React Query
- **Backend**: NestJS, Prisma ORM, PostgreSQL
- **Validation**: Zod (shared schemas)
- **Design**: Navy + Gold premium industrial theme

## Quick Start

### 1. Prerequisites
- Node.js 20+
- pnpm 9+
- PostgreSQL database

### 2. Environment Setup

```bash
# API
cp apps/api/.env.example apps/api/.env
# Edit apps/api/.env with your DATABASE_URL

# Web
cp apps/web/.env.example apps/web/.env.local

# Backoffice
cp apps/backoffice/.env.example apps/backoffice/.env.local
```

### 3. Database Setup

```bash
cd apps/api

# Run migrations
npx prisma migrate dev --name init

# Seed with sample data
npx prisma db seed
```

### 4. Run Development

```bash
# From root — starts all apps
pnpm dev

# Or individually:
pnpm --filter @metal-depo/api dev        # API on :4000
pnpm --filter @metal-depo/web dev        # Web on :3000
pnpm --filter @metal-depo/backoffice dev # Admin on :3001
```

## API Endpoints

### Public (Web)
```
GET /api/products              — List products (pagination, filter, search)
GET /api/products/featured     — Featured products
GET /api/products/slug/:slug   — Product by slug
GET /api/categories            — All categories
GET /api/banners               — Banners by page
GET /api/pages/many?keys=...   — Page content blocks
POST /api/contact              — Submit contact form
```

### Admin (Backoffice)
```
GET/POST/PUT/DELETE /api/products
GET/POST/PUT/DELETE /api/categories
GET/POST/PUT/DELETE /api/banners
GET/POST/DELETE /api/pages
GET/PATCH/DELETE /api/contact
POST /api/upload/image
```

## Design System

### Colors
- **Navy** (`#1A2744`) — Primary brand color
- **Gold** (`#C9A84C`) — Accent / premium feel
- **Steel grays** — UI neutrals

### Typography
- Font: Inter (Google Fonts)
- Tight tracking on headings
- Wide tracking on labels/buttons (uppercase)

## Features

### Portfolio Site
- Full-screen hero slider with banners managed from backoffice
- Stats bar (configurable)
- Category showcase grid
- Featured products grid
- About section with company stats
- Why Us section with feature cards
- CTA section
- Products listing with sidebar filters + pagination
- Product detail with image gallery, related products
- Contact form with Zod validation
- Responsive header with transparent → solid scroll behavior

### Backoffice
- Dashboard with stats overview
- Products CRUD with multi-image upload
- Categories CRUD (inline modal)
- Banners CRUD with image upload
- Page content blocks (key-value content management)
- Contact message inbox with read/unread tracking
