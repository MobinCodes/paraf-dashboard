'use client';

import Image from 'next/image';

interface WelcomeBannerProps {
    userName: string;
}

export function WelcomeBanner({ userName }: WelcomeBannerProps) {
    return (
        <div className="relative w-full max-w-[750px] mx-auto">
            {/* 🔥 ۱. Fireworks سمت چپ */}
            <div className="absolute w-36 h-36 sm:w-48 sm:h-48 lg:w-65 lg:h-65 -left-12 -top-0 sm:-left-35 sm:-top-5 z-0 animate-pulse-scale pointer-events-none">
                <Image
                    alt="fireworks-left"
                    fill
                    className="object-contain"
                    src="/images/fireworks.png"
                />
            </div>

            {/* 🔥 ۲. Fireworks وسط */}
            <div className="absolute w-40 h-40 sm:w-52 sm:h-52 lg:w-60 lg:h-60 left-1/2 -translate-x-1/2 -top-15 sm:-top-20 z-0 animate-pulse-scale delay-1000 pointer-events-none">
                <Image
                    alt="fireworks-center"
                    fill
                    className="object-contain"
                    src="/images/fireworks.png"
                />
            </div>

            {/* 🔥 ۳. Fireworks سمت راست */}
            <div className="absolute w-36 h-36 sm:w-48 sm:h-48 lg:w-56 lg:h-56 -right-8 -bottom-12 sm:-right-12 sm:-bottom-20 z-0 animate-pulse-scale delay-500 pointer-events-none">
                <Image
                    alt="fireworks-right"
                    fill
                    className="object-contain"
                    src="/images/fireworks.png"
                />
            </div>

            {/* ⚪ باکس اصلی بنر */}
            <div className="relative z-10 rounded-4xl lg:rounded-full w-full bg-white p-5 lg:p-8 lg:px-10 shadow-md flex items-center justify-between">
                {/* متون سمت راست */}
                <div className="z-10 flex flex-col gap-2">
                    <span className="inline-block text-xs sm:text-sm font-medium px-3.5 py-1 rounded-full">
                        <b className="font-bold me-1 text-sm sm:text-base">{userName}</b>
                        عزیز
                    </span>
                    <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight leading-snug text-primary">
                        به پاراف کلاب
                        <span className="inline-block font-bold text-base sm:text-xl md:text-2xl mx-1 animate-text-pulse">
                            (باشگاه مشتریان پاراف)
                        </span>
                        خوش اومدی!
                    </h1>
                    <p className="text-xs sm:text-sm opacity-90">
                        ماموریت هات رو انجام بده، هم سطح اعتبارت رو افزایش میدی، هم سکه میگیری.
                    </p>
                </div>

                {/* تصویر جام و کیسه طلا */}
                <div className="relative w-35 lg:w-25 h-full">
                    <div className="absolute hidden sm:block w-25 h-25 left-15 lg:w-35 lg:h-35 z-20 lg:left-0 top-15 lg:top-20 -translate-y-1/2 animate-wiggle">
                        <Image
                            alt="gold-bag"
                            fill
                            className="object-cover"
                            src="/images/gold-bag.png"
                        />
                    </div>

                    <div className="absolute w-40 h-40 -right-12 sm:-right-5 sm:w-50 sm:h-50 lg:w-70 lg:h-70 lg:-left-40 lg:top-1/2 -translate-y-1/2 z-10 scale-x-[-1] animate-wiggle delay-200">
                        <Image
                            alt="cup"
                            fill
                            className="object-cover"
                            src="/images/cup-gold-hero.png"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}