# راهنمای راه‌اندازی

## پیش‌نیازها

- Node.js 20 یا بالاتر
- یکی از package managerهای `pnpm`، `npm` یا `yarn`
- Git برای clone و push پروژه

در این پروژه lockfile وجود دارد و جریان نصب فعلی با `pnpm` سازگار است، بنابراین `pnpm` انتخاب پیشنهادی است.

## نصب وابستگی‌ها

از ریشه پروژه:

```bash
pnpm install
```

اگر از npm استفاده می‌کنید:

```bash
npm install
```

## متغیرهای محیطی

یک فایل `.env.local` در ریشه پروژه بسازید.

در وضعیت فعلی، URLهای API و تصاویر در `src/shared/api/axios.ts` به‌صورت hardcoded تعریف شده‌اند، بنابراین پروژه برای اجرا در حالت فعلی به env اجباری نیاز ندارد. با این حال، برای استانداردتر شدن پروژه می‌توان در آینده این متغیرها را اضافه کرد:

```env
NEXT_PUBLIC_API_BASE_URL=
NEXT_PUBLIC_IMAGE_BASE_URL=
```

## اجرای پروژه در حالت توسعه

```bash
pnpm dev
```

پروژه با Next.js development mode و Turbopack اجرا می‌شود.

## ساخت نسخه production

```bash
pnpm build
```

## اجرای نسخه production

```bash
pnpm start
```

## بررسی کیفیت کد

```bash
pnpm lint
```

## نکات مهم

- جریان ورود به localStorage متکی است، پس رفتار کلاینت در رندر اهمیت دارد.
- داده‌های داشبورد به شکل پاسخ API حساس هستند و hookها بخشی از این داده را normalize می‌کنند.
- اگر shape پاسخ backend تغییر کند، بخش‌های مصرف‌کننده باید هماهنگ شوند.

