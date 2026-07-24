'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Info, Trophy, Coins, AlertCircle, CheckSquare, Check, ChevronLeft } from 'lucide-react';
import { useDashboardData } from '../hooks/useDashboardData'; // مسیر متناسب پروژه خودت
import { useVitrinStore } from '@/features/vitrin/store/vitrin.store';

const IMAGE_BASE_URL = 'https://wholesaler-core-v2.paraf.app/'; // آدرس پایه آپلود فایل‌ها

export default function DashboardHeroCard() {
    const activeTab = useVitrinStore((state) => state.activeTab);
    const setActiveTab = useVitrinStore((state) => state.setActiveTab);

    const {
        vitrins,
        userInfo,
        levels,
        clubSummary,
        isLoading,
    } = useDashboardData();

    const isProfile = activeTab === 'profile';

    // ----------------------------------------------------
    // ۱. استخراج اطلاعات نمایش (کاربر شخصی یا ویترین)
    // ----------------------------------------------------
    const displayName = isProfile
        ? `${userInfo?.firstName || ''} ${userInfo?.lastName || ''}`.trim() || 'کاربر محترم'
        : userInfo?.companyName || 'ویترین بدون نام';

    const displayCity = userInfo?.city?.name || userInfo?.user?.city?.name || 'نامشخص';
    const displayCountry = userInfo?.country?.name || userInfo?.user?.country?.name || 'ایران';
    const locationText = `${displayCity}، ${displayCountry}`;

    // نقش کاربر / نوع فعالیت
    const roleBadge = isProfile
        ? userInfo?.defaultRole === 'user' ? 'کاربر عادی' : userInfo?.defaultRole || 'کاربر'
        : userInfo?.role || 'ویترین';

    // سکه و امتیاز (در ویترین‌ها سکه صفر یا تعریف نشده است)
    const currentScores = Number(userInfo?.scores ?? 0);
    const currentCoins = isProfile ? Number(userInfo?.coins ?? 0) : 0;

    // محاسبه یا دریافت سطح بر اساس امتیاز
    const currentLevel = userInfo?.level || levels?.find((lvl: any) => currentScores >= Number(lvl.scores));
    const activeLevelName = currentLevel?.name || 'بدون سطح';
    const activeLevelIcon = currentLevel?.file?.link;

    // عکس آواتار یا لوگو
    const avatarLink = isProfile
        ? userInfo?.file?.link
        : userInfo?.logo?.link;

    const avatarUrl = avatarLink ? `${IMAGE_BASE_URL}${avatarLink}` : '/images/default-avatar.png';

    if (isLoading) {
        return (
            <div className="w-full h-48 bg-slate-100 animate-pulse rounded-3xl mt-20 flex items-center justify-center text-slate-400 font-bold text-sm">
                در حال دریافت اطلاعات...
            </div>
        );
    }

    return (
        <div className="w-full space-y-4">
            {/* ---------------------------------------------------- */}
            {/* ۱. نوار بالای کارت: لینک‌های راهنما و تب‌های باشگاه */}
            {/* ---------------------------------------------------- */}
            <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4 px-1 pt-2 mt-20">
                {/* لینک‌های سمت چپ */}
                <div className="flex items-center gap-6 text-xs sm:text-sm font-bold text-slate-700">
                    <Link href="/faq" className="hover:text-slate-950 transition-colors">
                        سوالات متداول شما
                    </Link>
                    <Link href="/terms" className="hover:text-slate-950 transition-colors">
                        قوانین و مقررات
                    </Link>
                </div>

                {/* بخش تب‌های سمت راست */}
                <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-1 sm:pb-0">
                    <span className="text-xs sm:text-sm font-bold text-slate-700 shrink-0">
                        انتخاب باشگاه مشتریان:
                    </span>

                    {/* کانتینر خاکستری تب‌ها */}
                    <div className="flex items-center gap-1 bg-[#E2E8F0]/70 p-1 rounded-xl backdrop-blur-xs">
                        {/* تب پروفایل شخصی */}
                        <button
                            type="button"
                            onClick={() => setActiveTab('profile')}
                            className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer whitespace-nowrap ${isProfile
                                    ? 'bg-white text-slate-900 shadow-sm border border-slate-200/80'
                                    : 'text-slate-600 hover:text-slate-900'
                                }`}
                        >
                            پروفایل شخصی
                        </button>

                        {/* لیست تب‌های ویترین‌ها */}
                        {vitrins.map((vitrin: any) => (
                            <button
                                key={vitrin.id}
                                type="button"
                                onClick={() => setActiveTab(String(vitrin.id))}
                                className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer whitespace-nowrap ${activeTab === String(vitrin.id)
                                        ? 'bg-white text-slate-900 shadow-sm border border-slate-200/80'
                                        : 'text-slate-600 hover:text-slate-900'
                                    }`}
                            >
                                {vitrin.companyName || `ویترین (${vitrin.role})`}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* ---------------------------------------------------- */}
            {/* ۲. کارت هیرو اصلی (سفید رنگ سه تکه مطابق فیگما) */}
            {/* ---------------------------------------------------- */}
            <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-200/60 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">

                {/* ستون چپ: کارت‌های آمار و سکه (5 ستون از 12) */}
                <div className="md:col-span-5 flex flex-col gap-3">
                    <div className="grid grid-cols-2 gap-3">
                        {/* کارت سطح */}
                        <div className="bg-[#F8FAFC] border border-slate-100 rounded-2xl p-3.5 flex items-center justify-between">
                            <div className="space-y-1">
                                <span className="text-xs font-bold text-slate-800 block">
                                    سطح {activeLevelName}
                                </span>
                                <div className="flex items-center gap-1 text-[11px] text-slate-500">
                                    <span>{currentScores.toLocaleString('fa-IR')} امتیاز</span>
                                    <Info className="w-3 h-3 text-slate-400" />
                                </div>
                            </div>
                            <div className="w-10 h-10 relative shrink-0 flex items-center justify-center">
                                {activeLevelIcon ? (
                                    <Image
                                        src={`${IMAGE_BASE_URL}${activeLevelIcon}`}
                                        alt={activeLevelName}
                                        width={36}
                                        height={36}
                                        className="object-contain"
                                    />
                                ) : (
                                    <Trophy className="w-8 h-8 text-amber-700/80" />
                                )}
                            </div>
                        </div>

                        {/* کارت سکه */}
                        <div className="bg-[#FFFDF0] border border-amber-100/60 rounded-2xl p-3.5 flex items-center justify-between">
                            <div className="space-y-1">
                                <div className="flex items-center gap-1">
                                    <span className="text-sm font-extrabold text-slate-900">
                                        {currentCoins.toLocaleString('fa-IR')}
                                    </span>
                                    <span className="text-xs font-bold text-slate-600">سکه</span>
                                </div>
                                <div className="flex items-center gap-1 text-[10px] text-slate-400">
                                    <span>{(currentCoins * 100).toLocaleString('fa-IR')} تومان</span>
                                    <Info className="w-3 h-3 text-slate-400" />
                                </div>
                            </div>
                            <div className="w-9 h-9 relative shrink-0 flex items-center justify-center">
                                <Coins className="w-8 h-8 text-amber-500" />
                            </div>
                        </div>
                    </div>

                    {/* نوار پایینی آمار (۳۰ روز اخیر) */}
                    <div className="flex items-center justify-between text-[11px] text-slate-500 px-1 pt-1">
                        <div className="flex items-center gap-1 text-emerald-600 font-bold bg-emerald-50/60 px-2 py-0.5 rounded-lg">
                            <span>کسب {(clubSummary?.totalScoreMonthly ?? 0).toLocaleString('fa-IR')} امتیاز اخیر</span>
                        </div>
                        <div className="flex items-center gap-1 bg-slate-100/80 text-slate-600 px-2.5 py-1 rounded-full font-bold text-[10px]">
                            <span>۳۰ روز اخیر</span>
                            <ChevronLeft className="w-3 h-3" />
                        </div>
                    </div>
                </div>

                {/* ستون وسط: اکشن ماموریت (3 ستون از 12) */}
                <div className="md:col-span-3 flex flex-col items-center justify-center gap-3 md:border-r md:border-l border-slate-100 px-2 py-2">
                    <div className="bg-rose-50 text-rose-500 text-[11px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 text-center">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>وقت کمی مونده، ماموریت رو همین الان انجام بده.</span>
                    </div>
                    <button
                        type="button"
                        className="bg-[#00A3E0] hover:bg-[#008CC0] text-white text-xs font-bold px-5 py-2.5 rounded-xl flex items-center gap-2 shadow-sm transition-colors cursor-pointer"
                    >
                        <span>مشاهده ماموریت</span>
                        <CheckSquare className="w-4 h-4" />
                    </button>
                </div>

                {/* ستون راست: اطلاعات پروفایل کاربر یا ویترین (4 ستون از 12) */}
                <div className="md:col-span-4 flex items-center justify-end gap-4">
                    <div className="text-right space-y-1">
                        <div className="flex items-center justify-end gap-1.5">
                            <h2 className="text-base font-extrabold text-slate-900">{displayName}</h2>
                            {userInfo?.iranianAuthStatus && (
                                <span className="bg-blue-500 text-white rounded-full p-0.5 inline-flex items-center justify-center w-4 h-4" title="احراز هویت شده">
                                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                                </span>
                            )}
                        </div>
                        <p className="text-xs text-slate-400 font-medium">
                            {locationText}
                        </p>
                        <div className="flex items-center justify-end gap-2 pt-1">
                            <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-md">
                                {roleBadge}
                            </span>
                            <div className="flex items-center gap-1 text-xs text-slate-500 font-medium">
                                <span>ماموریت انجام‌شده:</span>
                                <span className="font-bold text-slate-800">
                                    {(clubSummary?.numberTasksCompleted ?? 0).toLocaleString('fa-IR')}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* عکس آواتار کاربر یا لوگوی ویترین */}
                    <div className="relative w-16 h-16 rounded-2xl overflow-hidden border-2 border-slate-100 bg-slate-50 shrink-0 shadow-xs">
                        <Image
                            src={avatarUrl}
                            alt={displayName}
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>

            </div>
        </div>
    );
}