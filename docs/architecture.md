# معماری پروژه

## نمای کلی

این ریپازیتوری یک اپلیکیشن Next.js 16 بر پایه App Router است که با ساختار Feature-First و رویکردی نزدیک به Clean Architecture سازمان‌دهی شده است. پروژه روی یک تجربه اصلی متمرکز است:

- کاربر احراز هویت‌نشده فرم ورود را می‌بیند.
- کاربر احراز هویت‌شده داشبورد باشگاه مشتریان را می‌بیند.
- لایه‌های مشترک مثل layout، providerها، API client و UI primitives به‌صورت جدا از featureها نگه‌داری شده‌اند.

این پروژه در عمل یک داشبورد client-heavy است که از Zustand، React Query، Axios و فرم‌های مبتنی بر React Hook Form + Zod استفاده می‌کند.

## Tech Stack

- Next.js 16.2.11
- React 19
- TypeScript 5
- Tailwind CSS v4
- Zustand
- TanStack React Query
- React Hook Form
- Zod
- Axios
- Lucide React
- `next/font/local`

## الگوی معماری

### App Router Shell

فولدر `src/app` نقطه ورود اصلی اپلیکیشن است:

- `layout.tsx` اسکلت HTML، فونت‌ها، providerها و هدر مشترک را تعریف می‌کند.
- `page.tsx` نقش gate اصلی احراز هویت را دارد:
  - اگر کاربر وارد نشده باشد، فرم ورود نمایش داده می‌شود.
  - اگر کاربر وارد شده باشد، داشبورد نمایش داده می‌شود.

### Feature-First Structure

منطق پروژه بر اساس featureها تفکیک شده است:

- `src/features/auth` برای ورود، schema، API و auth store
- `src/features/dashboard` برای داشبورد، hookهای داده، API و componentها
- `src/features/vitrin` برای کنترل active tab و context ویترین
- `src/shared` برای API client، typeها، componentهای مشترک و shellهای عمومی

این ساختار باعث می‌شود منطق بیزنسی نزدیک به UI همان feature بماند و صفحه‌های سطح بالا شلوغ نشوند.

### Data Flow

جریان اصلی برنامه به این شکل است:

1. کاربر phone و password را وارد می‌کند.
2. `loginUser` درخواست لاگین را با Axios ارسال می‌کند.
3. `accessToken` در localStorage و Zustand ذخیره می‌شود.
4. `page.tsx` دوباره render می‌شود و داشبورد را نشان می‌دهد.
5. داده‌های داشبورد با React Query دریافت می‌شوند.
6. تغییر vitrin یا profile باعث refetch شدن داده‌های مرتبط می‌شود.

### State Model

پروژه از سه نوع state استفاده می‌کند:

- Global client state:
  - `useAuthStore`
  - `useVitrinStore`
- Local component state:
  - loading و error لاگین
  - show/hide password
  - activity filter
  - fallback image state
- Server state:
  - vitrins
  - user info
  - levels
  - club summary
  - recent activities

## ساختار پوشه‌ها

### `src/app`

- `layout.tsx`: shell اصلی، فونت، header و providerها
- `page.tsx`: gate احراز هویت
- `providers.tsx`: provider مربوط به React Query
- `globals.css`: توکن‌های global و استایل پایه

### `src/features/auth`

- `components/LoginForm.tsx`
- `schemas/login.schema.ts`
- `services/auth.api.ts`
- `store/auth.store.ts`

### `src/features/dashboard`

- `components/`
- `hooks/useDashboardData.ts`
- `services/dashboard.api.ts`

### `src/features/vitrin`

- `store/vitrin.store.ts`

### `src/shared`

- `api/axios.ts`: Axios instance و interceptor احراز هویت
- `components/`: هدر، سایدبار موبایل، لوگو و shellهای مشترک
- `types/index.tsx`: DTOها و enumهای مشترک

### `src/components/ui`

کامپوننت‌های reusable شبیه shadcn/ui که برای formها، cardها، tooltipها و ... استفاده می‌شوند.

## نکات رندر

- `layout.tsx` هدر مشترک را بالای محتوای صفحه render می‌کند.
- بخش‌های داشبورد client-side هستند چون به localStorage، Zustand و React Query وابسته‌اند.
- `page.tsx` برای جلوگیری از hydration mismatch، تا mount شدن کلاینت صبر می‌کند.

## الگوی API

تمام requestها از Axios مشترک استفاده می‌کنند:

- `baseURL` در `src/shared/api/axios.ts`
- اضافه شدن خودکار `Authorization` از localStorage
- جداسازی request logic در سرویس‌های feature

این الگو باعث می‌شود componentها مستقیم با Axios درگیر نشوند.

