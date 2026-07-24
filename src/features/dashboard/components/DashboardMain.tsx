'use client';

import Image from 'next/image';
import { useDashboardData } from '../hooks/useDashboardData';
import { useVitrinStore } from '@/features/vitrin/store/vitrin.store';
import { IMAGE_BASE_URL } from '@/shared/api/axios';
import { Card } from '@/components/ui/card';
import { DashboardHeader } from './DashboardHeader';
import { Trophy, Coins, Award, CheckCircle2, History } from 'lucide-react';

export function DashboardMain() {
    const {
        vitrins,
        userInfo,
        levels,
        clubSummary,
        recentActivities,
        isLoading,
        walletBalance,
    } = useDashboardData();
    const { activeTab, setActiveTab } = useVitrinStore();

    // محاسبه نام کاربر برای بنر
    const userName =
        userInfo?.firstName ||
        (typeof userInfo?.user === 'object' && userInfo?.user?.firstName) ||
        'کاربر';

    // نام سطح فعال
    const activeLevelName =
        typeof userInfo?.level === 'object' && userInfo?.level !== null
            ? (userInfo.level as { name?: string }).name
            : typeof userInfo?.level === 'string'
                ? userInfo.level
                : 'سطح پایه';

    return (
        <div className="min-h-screen bg-blue-200 pb-16 font-sans text-text-main dir-rtl">
            {/* هدر ثابت داشبورد */}
            <DashboardHeader
                userData={userInfo}
                levels={levels}
                walletBalance={walletBalance}
            />

            {/* محتوای اصلی داشبورد با مارجین بالای مناسب برای هدر فیکس */}
            <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-28 space-y-6 ">

                {/* ۱. بنر خوش‌آمدگویی */}
                <div className="relative rounded-4xl  lg:rounded-full w-full max-w-[750px] bg-white p-5 lg:p-8 lg:px-10  shadow-md flex items-center justify-between mx-auto">
                    <div className="z-10 flex flex-col gap-2 ">
                        <span className="inline-block text-xs sm:text-sm font-medium px-3.5 py-1 rounded-full border border-white/10">
                            <b className='font-bold me-1 text-sm sm:text-base'>
                                {userName}
                            </b>
                            عزیز
                        </span>
                        <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight leading-snug text-primary">
                            به پاراف کلاب
                            <span className='font-bold text-base sm:text-xl md:text-2xl mx-1'>
                                (باشگاه مشتریان پاراف)
                            </span>
                            خوش اومدی!
                        </h1>
                        <p className="text-xs sm:text-sm max-w-md opacity-90 ">
                            ماموریت هات رو انجام بده، هم سطح اعتبارت رو افزایش میدی، هم سکه میگیری.
                        </p>
                    </div>
                    <div className='relative w-35 lg:w-25 h-full'>

                        <div className="absolute hidden sm:block w-25 h-25 left-15 lg:w-35 lg:h-35 z-2 lg:left-0 top-15 lg:top-20 -translate-y-1/2">
                            <Image alt='cup' fill className='object-cover '  src='/images/gold-bag.png' />
                        </div>

                        <div className="absolute w-40 h-40 -right-12 sm:-right-5 sm:w-50 sm:h-50 lg:w-70 lg:h-70 lg:-left-40 lg:top-1/2 -translate-y-1/2 z-1 scale-x-[-1]">
                            <Image alt='cup' fill className='object-cover ' src='/images/cup-gold-hero.png' />
                        </div> 
                        
                        <div className="absolute hidden lg:block w-40 h-40 -right-12 sm:-right-5 sm:w-50 sm:h-50 lg:w-70 lg:h-70 lg:-left-40 lg:top-1/2 -translate-y-1/2 z-1 scale-x-[-1]">
                            <Image alt='cup' fill className='object-cover ' src='/images/' />
                        </div>
{/* 
                        <div className="absolute w-40 h-40 -right-12 sm:-right-5 sm:w-50 sm:h-50 lg:w-70 lg:h-70 lg:-left-40 lg:top-1/2 -translate-y-1/2 z-1 scale-x-[-1]">
                            <Image alt='cup' fill className='object-cover ' src='/images/cup-gold-hero.png' />
                        </div>

                        <div className="absolute w-40 h-40 -right-12 sm:-right-5 sm:w-50 sm:h-50 lg:w-70 lg:h-70 lg:-left-40 lg:top-1/2 -translate-y-1/2 z-1 scale-x-[-1]">
                            <Image alt='cup' fill className='object-cover ' src='/images/cup-gold-hero.png' />
                        </div>  */}

                    </div>
                </div>

                {/* ۲. تب‌های انتخاب ویترین / پروفایل */}
                <div className="flex items-center justify-between bg-surface-white p-1.5 sm:p-2 rounded-2xl shadow-2xs border border-border/40 mt-20">
                    <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-0.5">
                        {/* تب پروفایل شخصی */}
                        <button
                            onClick={() => setActiveTab('profile')}
                            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 whitespace-nowrap ${activeTab === 'profile'
                                ? 'bg-purple-primary text-white shadow-xs'
                                : 'text-text-muted hover:text-text-main hover:bg-surface-subtle'
                                }`}
                        >
                            پروفایل شخصی
                        </button>

                        {/* تب‌های ویترین‌ها */}
                        {vitrins.map((vitrin) => (
                            <button
                                key={vitrin.id}
                                onClick={() => setActiveTab(vitrin.id)}
                                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 whitespace-nowrap ${activeTab === vitrin.id
                                    ? 'bg-purple-primary text-white shadow-xs'
                                    : 'text-text-muted hover:text-text-main hover:bg-surface-subtle'
                                    }`}
                            >
                                {vitrin.companyName || 'ویترین بدون نام'}
                            </button>
                        ))}
                    </div>

                    <span className="text-xs text-text-muted hidden md:inline-block shrink-0 px-3 font-medium">
                        انتخاب باشگاه مشتریان
                    </span>
                </div>

                {/* ۳. کارت‌های آمار کلی (Overview Cards) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* کارت ۱: سطح فعال */}
                    <Card className="p-5 flex items-center justify-between bg-surface-white border-border/40 shadow-2xs rounded-2xl">
                        <div className="space-y-1">
                            <p className="text-xs font-medium text-text-muted">سطح فعال شما</p>
                            <h3 className="text-base sm:text-lg font-bold text-text-main">
                                {isLoading ? 'در حال دریافت...' : activeLevelName}
                            </h3>
                            <p className="text-xs text-purple-primary font-bold pt-1">
                                امتیاز کلی: {(userInfo?.scores ?? 0).toLocaleString('fa-IR')}
                            </p>
                        </div>
                        <div className="p-3 bg-amber-500/10 rounded-2xl text-amber-500 shrink-0">
                            <Award className="w-8 h-8 sm:w-9 sm:h-9" />
                        </div>
                    </Card>

                    {/* کارت ۲: سکه فعلی */}
                    <Card className="p-5 flex items-center justify-between bg-surface-white border-border/40 shadow-2xs rounded-2xl">
                        <div className="space-y-1">
                            <p className="text-xs font-medium text-text-muted">سکه فعلی</p>
                            <h3 className="text-base sm:text-lg font-bold text-text-main">
                                {(userInfo?.coins ?? 0).toLocaleString('fa-IR')} <span className="text-xs font-normal text-text-muted">سکه</span>
                            </h3>
                            <p className="text-xs text-text-muted font-medium pt-1">
                                ماهانه: {(clubSummary?.totalCoinMonthly ?? 0).toLocaleString('fa-IR')} سکه
                            </p>
                        </div>
                        <div className="p-3 bg-yellow-500/10 rounded-2xl text-yellow-500 shrink-0">
                            <Coins className="w-8 h-8 sm:w-9 sm:h-9" />
                        </div>
                    </Card>

                    {/* کارت ۳: ماموریت‌های انجام شده */}
                    <Card className="p-5 flex items-center justify-between bg-surface-white border-border/40 shadow-2xs rounded-2xl">
                        <div className="space-y-1">
                            <p className="text-xs font-medium text-text-muted">ماموریت‌های تکمیل‌شده</p>
                            <h3 className="text-base sm:text-lg font-bold text-text-main">
                                {(clubSummary?.numberTasksCompleted ?? 0).toLocaleString('fa-IR')} <span className="text-xs font-normal text-text-muted">ماموریت</span>
                            </h3>
                            <p className="text-xs text-emerald-600 font-bold pt-1">
                                امتیاز ماهانه: {(clubSummary?.totalScoreMonthly ?? 0).toLocaleString('fa-IR')}
                            </p>
                        </div>
                        <div className="p-3 bg-emerald-500/10 rounded-2xl text-emerald-500 shrink-0">
                            <CheckCircle2 className="w-8 h-8 sm:w-9 sm:h-9" />
                        </div>
                    </Card>
                </div>

                {/* ۴. لیست سطوح باشگاه مشتریان */}
                <Card className="p-5 sm:p-6 bg-surface-white border-border/40 shadow-2xs rounded-2xl space-y-4">
                    <div className="flex items-center justify-between border-b border-border/30 pb-3">
                        <h2 className="text-sm sm:text-base font-bold text-text-main">
                            سطوح باشگاه مشتریان
                        </h2>
                        <span className="text-xs text-text-muted font-medium">
                            {levels.length} سطح تعریف شده
                        </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3.5">
                        {[...levels]
                            .sort((a, b) => a.scores - b.scores)
                            .map((lvl, index) => (
                                <div
                                    key={lvl.id || index}
                                    className="flex items-center gap-3 p-3 rounded-xl border border-border/30 bg-surface-subtle/50 hover:bg-surface-subtle transition-colors"
                                >
                                    <div className="relative w-10 h-10 flex items-center justify-center shrink-0">
                                        {lvl.file?.link ? (
                                            <Image
                                                src={
                                                    IMAGE_BASE_URL.endsWith('/') || lvl.file.link.startsWith('/')
                                                        ? `${IMAGE_BASE_URL}${lvl.file.link}`
                                                        : `${IMAGE_BASE_URL}/${lvl.file.link}`}

                                                alt={lvl.name}
                                                width={36}
                                                height={36}
                                                className="object-contain"
                                            />
                                        ) : (
                                            <Trophy className="w-8 h-8 text-text-muted/40" />
                                        )}
                                    </div>
                                    <div className="space-y-0.5">
                                        <p className="text-xs sm:text-sm font-bold text-text-main">
                                            {lvl.name}
                                        </p>
                                        <p className="text-[11px] sm:text-xs text-text-muted font-medium">
                                            {lvl.scores.toLocaleString('fa-IR')} امتیاز
                                        </p>
                                    </div>
                                </div>
                            ))}
                    </div>
                </Card>

                {/* ۵. لیست فعالیت‌های اخیر */}
                <Card className="p-5 sm:p-6 bg-surface-white border-border/40 shadow-2xs rounded-2xl space-y-4">
                    <div className="flex items-center justify-between border-b border-border/30 pb-3">
                        <div className="flex items-center gap-2">
                            <History className="w-4 h-4 sm:w-5 sm:h-5 text-purple-primary" />
                            <h2 className="text-sm sm:text-base font-bold text-text-main">
                                فعالیت‌های اخیر
                            </h2>
                        </div>
                        <span className="text-xs text-text-muted font-medium bg-surface-subtle px-2.5 py-1 rounded-full border border-border/20">
                            ۱۰ فعالیت اخیر
                        </span>
                    </div>

                    <div className="divide-y divide-border/30">
                        {recentActivities.length === 0 ? (
                            <div className="py-10 text-center space-y-2">
                                <p className="text-xs sm:text-sm text-text-muted">
                                    هیچ فعالیتی ثبت نشده است.
                                </p>
                            </div>
                        ) : (
                            recentActivities.map((act, i) => (
                                <div
                                    key={i}
                                    className="py-3.5 flex items-center justify-between text-xs sm:text-sm hover:bg-surface-subtle/40 px-2 rounded-xl transition-colors gap-3"
                                >
                                    <div className="space-y-1">
                                        <p className="font-bold text-text-main">
                                            {act.taskTitle || 'فعالیت بدون عنوان'}
                                        </p>
                                        {act.taskDescription && (
                                            <p className="text-xs text-text-muted line-clamp-1">
                                                {act.taskDescription}
                                            </p>
                                        )}
                                    </div>

                                    <div className="text-left flex items-center gap-1.5 shrink-0">
                                        {act.scoreAmount > 0 && (
                                            <span className="bg-purple-primary/10 text-purple-primary text-[11px] sm:text-xs px-2.5 py-1 rounded-full font-bold">
                                                +{(act.scoreAmount).toLocaleString('fa-IR')} امتیاز
                                            </span>
                                        )}
                                        {act.coinAmount > 0 && (
                                            <span className="bg-yellow-500/10 text-yellow-600 text-[11px] sm:text-xs px-2.5 py-1 rounded-full font-bold">
                                                +{(act.coinAmount).toLocaleString('fa-IR')} سکه
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </Card>

            </main>
        </div>
    );
}