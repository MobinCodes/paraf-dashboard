# Paraf Club Dashboard

🇮🇷 [نسخه فارسی](README-FA.md)

![Paraf Club Dashboard](./public/readme/hero-section.png)

A polished customer club dashboard built with Next.js 16, React 19, TypeScript, Tailwind CSS v4, React Query, Zustand, React Hook Form, and Zod.

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS v4
- Shadcn/UI
- Radix UI
- TanStack Query
- Zustand
- React Hook Form
- Zod
- Axios
- Lucide React

## Key Features

- Auth-based entry flow with login form and token persistence
- Dashboard summary with wallet, level, and activity sections
- Vitrin-aware context switching between profile and storefronts
- Responsive dashboard UI with custom banners and hero sections
- Form validation with Zod and React Hook Form
- API-driven data fetching with React Query

## Architecture Overview

This project follows a Feature-First structure on top of Next.js App Router:

- `src/app` contains the root shell, layout, providers, and page gate
- `src/features/auth` contains login UI, schema, API, and auth store
- `src/features/dashboard` contains dashboard sections, hooks, and services
- `src/features/vitrin` contains the active dashboard context state
- `src/shared` contains API client, shared types, and reusable UI shells

The app separates client state with Zustand and server state with React Query, while form state is handled with React Hook Form + Zod.

## Getting Started

```bash
pnpm install
pnpm dev
```

## Build

```bash
pnpm build
```

## Start

```bash
pnpm start
```

## Documentation

- [Architecture](./docs/architecture.md)
- [Setup](./docs/setup.md)
- [Auth](./docs/auth.md)
- [Dashboard](./docs/dashboard.md)
- [Vitrin](./docs/vitrin.md)
