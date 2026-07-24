# ماژول Vitrin

## هدف / Purpose

ماژول vitrin نماینده context فعال کاربر داخل داشبورد است.

هدف این feature:

- جابه‌جایی بین profile شخصی
- و یکی از vitrinهای کاربر

این context روی داده‌های زیر اثر می‌گذارد:

- اطلاعات کاربر
- خلاصه باشگاه
- فعالیت‌های اخیر

## APIs

این feature سرویس API مستقل ندارد و از APIهای داشبورد استفاده می‌کند:

- `GET /users/vitrin/all-user`
- `GET /users/vitrin/:userVitrinId`
- `GET /customer-club/summary-user-vitrin/:userVitrinId`
- `GET /recent-activities?userVitrinId=...`

## Stateها

### Global State

فایل:

- `src/features/vitrin/store/vitrin.store.ts`

state:

- `activeTab: 'profile' | string`
- `setActiveTab(tab)`

مقدار پیش‌فرض `profile` است.

### Local State

خود feature بیشتر global-state driven است، اما در UI مصرف‌کننده ممکن است این stateها وجود داشته باشند:

- selected tab
- display labelها
- loading stateهای React Query

## User Flow

1. داشبورد با `profile` باز می‌شود.
2. کاربر اطلاعات پروفایل را می‌بیند.
3. روی یک vitrin دیگر کلیک می‌کند.
4. `activeTab` تغییر می‌کند.
5. queryها دوباره اجرا می‌شوند.
6. UI بر اساس vitrin جدید رندر می‌شود.

## Edge Cases

- نبود vitrin:
  - profile باید همچنان کار کند.
- vitrin ID نامعتبر:
  - requestها می‌توانند fail شوند.
- پاسخ خالی:
  - UI نباید crash کند.
- تغییر سریع context:
  - ممکن است refetchهای متعددی رخ دهد.

