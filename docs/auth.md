# ماژول احراز هویت

## هدف / Purpose

ماژول auth مسئول ورود کاربر به داشبورد باشگاه مشتریان است.

هدف بیزنسی این feature:

- دریافت شماره موبایل و رمز عبور
- ارسال درخواست login
- ذخیره access token
- مشخص کردن وضعیت authenticated برای نمایش داشبورد

این feature به‌صورت client-side پیاده‌سازی شده، چون وضعیت session فعلی بر localStorage متکی است.

## APIs

### `POST /users/login`

فایل مربوط:

- `src/features/auth/services/auth.api.ts`

Payload:

```ts
{
  phone: string;
  password: string;
}
```

Response handling:

- `loginUser` درخواست را با Axios مشترک ارسال می‌کند.
- ساختار پاسخ در UI به‌صورت زیر مصرف می‌شود:

```ts
{
  success: boolean;
  result: {
    accessToken: string;
    refreshToken: string;
  }
}
```

- اگر `result.accessToken` وجود داشته باشد، توکن در Zustand و localStorage ذخیره می‌شود.
- اگر درخواست fail شود، پیام backend نمایش داده می‌شود و در غیر این صورت یک پیام fallback استفاده می‌شود.

Axios:

- requestها از `src/shared/api/axios.ts` عبور می‌کنند.
- interceptor توکن را از localStorage خوانده و به هدر `Authorization` اضافه می‌کند.

## Stateها

### Global State

فایل:

- `src/features/auth/store/auth.store.ts`

stateها:

- `token`
- `isAuthenticated`
- `setToken(token)`
- `logout()`

این store در client از localStorage مقدار اولیه می‌گیرد.

### Local State

در `LoginForm`:

- `loading`
- `errorMsg`
- `showPassword`

فرم با React Hook Form مدیریت می‌شود و اعتبارسنجی با Zod انجام می‌شود.

## User Flow

1. کاربر فرم ورود را می‌بیند.
2. شماره موبایل و رمز عبور را وارد می‌کند.
3. `handleSubmit` داده‌ها را ارسال می‌کند.
4. `loginSchema` ورودی‌ها را validate می‌کند.
5. `loginUser` درخواست را به backend می‌فرستد.
6. اگر `result.accessToken` وجود داشته باشد، ذخیره می‌شود.
7. Zustand مقدار `isAuthenticated` را `true` می‌کند.
8. داشبورد جای فرم ورود را می‌گیرد.

## Edge Cases

- Validation error:
  - فون و password کوتاه یا خالی اجازه submit نمی‌گیرند.
- API error:
  - پیام backend نمایش داده می‌شود.
  - در صورت نبود پیام، fallback text استفاده می‌شود.
- Response mismatch:
  - اگر backend `result.accessToken` برنگرداند، کاربر وارد نمی‌شود.
- Token persistence:
  - چون token در localStorage ذخیره می‌شود، refresh صفحه login را از بین نمی‌برد.
- Hydration sensitivity:
  - چون auth به localStorage وابسته است، باید مراقب mismatch بین server و client بود.

