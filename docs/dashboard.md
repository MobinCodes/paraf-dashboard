# ماژول داشبورد

## هدف / Purpose

داشبورد، تجربه اصلی کاربر احراز هویت‌شده در باشگاه مشتریان پاراف است.

این بخش اطلاعات زیر را نمایش می‌دهد:

- اطلاعات کاربر یا ویترین فعال
- سطح فعلی و progression
- کیف پول و امتیاز
- فعالیت‌های اخیر
- banner تبلیغاتی
- بخش ویژگی‌های باشگاه

این ماژول در عمل، مرکز اصلی ارزش محصول برای engagement کاربر است.

## APIs

تمام requestهای داشبورد در `src/features/dashboard/services/dashboard.api.ts` تعریف شده‌اند و از Axios مشترک استفاده می‌کنند.

### `GET /users/me`

برای دریافت اطلاعات شخصی کاربر.

نمونه پاسخ:

```ts
{
  level: string | object;
  coins: number;
  scores: number;
}
```

در عمل `level` گاهی object برمی‌گردد و hook مربوطه باید آن را normalize کند.

### `GET /users/vitrin/all-user`

لیست ویترین‌های کاربر.

### `GET /users/vitrin/:userVitrinId`

جزئیات یک vitrin خاص.

### `GET /levels`

لیست سطح‌های باشگاه.

### `GET /customer-club/summary`

خلاصه باشگاه مشتریان برای profile شخصی.

### `GET /customer-club/summary-user-vitrin/:userVitrinId`

خلاصه باشگاه برای vitrin فعال.

### `GET /recent-activities`

برای feed فعالیت‌ها.

Query params:

```ts
{
  size?: number;
  offset?: number;
  type?: RecentActivitiesTypeEnum;
  userVitrinId?: string;
}
```

### Response Handling

در `useDashboardData` پاسخ‌ها normalize می‌شوند:

- `levels` به آرایه تبدیل می‌شود
- `vitrins` به آرایه تبدیل می‌شود
- `recentActivities` به آرایه تبدیل می‌شود
- `userInfo` و `clubSummary` اگر داخل `.result` باشند، unwrap می‌شوند

## Stateها

### Global State

#### `useVitrinStore`

فایل:

- `src/features/vitrin/store/vitrin.store.ts`

state:

- `activeTab`
- `setActiveTab(tab)`

این state مشخص می‌کند داشبورد در حالت profile است یا vitrin.

### Local State

در `useDashboardData`:

- `activityType`

در بخش‌های داشبورد:

- state مربوط به fallback image
- state مربوط به hover/visual behavior

### Server State

با React Query:

- vitrins
- user info
- levels
- club summary
- recent activities

## User Flow

1. کاربر بعد از login وارد داشبورد می‌شود.
2. هدر بالا خلاصه وضعیت را نشان می‌دهد.
3. Welcome banner نام کاربر را نمایش می‌دهد.
4. Hero card اطلاعات اصلی را خلاصه می‌کند.
5. Club levels progression کاربر را نشان می‌دهد.
6. Banner تصویری بین بخش‌ها قرار می‌گیرد.
7. Recent activities قابل فیلتر است.
8. بخش features ویژگی‌های تکمیلی را نمایش می‌دهد.
9. کاربر می‌تواند بین profile و vitrin جابه‌جا شود.

## Edge Cases

- Loading state:
  - بخش‌ها skeleton یا placeholder دارند.
- Empty state:
  - لیست فعالیت یا سطح‌ها اگر خالی باشند، UI جایگزین نمایش می‌دهد.
- Response shape mismatch:
  - hook داده‌ها را normalize می‌کند تا componentها کمتر fail شوند.
- Token expiry:
  - در صورت نبود token یا invalid بودن آن، requestها fail می‌شوند.
- Hydration mismatch:
  - auth مبتنی بر localStorage است و باید client-side مدیریت شود.
- Image fallback:
  - برای avatar و level iconها fallback image وجود دارد.

