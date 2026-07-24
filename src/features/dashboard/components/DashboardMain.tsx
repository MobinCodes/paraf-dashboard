'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useDashboardData } from '../hooks/useDashboardData';
import { useVitrinStore } from '@/features/vitrin/store/vitrin.store';
import { IMAGE_BASE_URL } from '@/shared/api/axios';
import { Card } from '@/components/ui/card';
import { DashboardHeader } from './DashboardHeader';
import {
    Trophy,
    Coins,
    CheckCircle2,
    History,
    CheckSquare,
    AlertCircle,
    ChevronLeft,
    Info,
    Check
} from 'lucide-react';
import { WelcomeBanner } from './WelcomeBanner';

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

    // محاسبه نام کاربر
    const userName =
        userInfo?.firstName && userInfo?.lastName
            ? `${userInfo.firstName} ${userInfo.lastName}`
            : userInfo?.firstName ||
            (typeof userInfo?.user === 'object' && userInfo?.user?.firstName) ||
            'کاربر گرامی';

    // نام سطح فعال
    const activeLevelName =
        typeof userInfo?.level === 'object' && userInfo?.level !== null
            ? (userInfo.level as { name?: string }).name
            : typeof userInfo?.level === 'string'
                ? userInfo.level
                : 'سطح برنزی';

    // آیکون سطح فعال
    const activeLevelIcon =
        typeof userInfo?.level === 'object' && userInfo?.level?.file?.link
            ? userInfo.level.file.link
            : null;

    return (
        <div className="min-h-screen pb-16 font-sans text-text-main dir-rtl">
            {/* هدر ثابت بالای صفحه */}
            <DashboardHeader
                userData={userInfo}
                levels={levels}
                walletBalance={walletBalance}
            />

            <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-24 space-y-4">

                <WelcomeBanner userName={userName} />

                {/* ---------------------------------------------------- */}
                {/* ۱. نوار بالای کارت: لینک‌های راهنما و تب‌های باشگاه */}
                {/* ---------------------------------------------------- */}
                <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4 px-1 pt-2 mt-20 " >

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
                    <div className="flex items-center gap-2">
                        <span className="text-xs sm:text-sm font-bold text-slate-700 shrink-0">
                            انتخاب باشگاه مشتریان:
                        </span>

                        {/* کانتینر خاکستری تب‌ها */}
                        <div className="flex items-center gap-1 bg-[#E2E8F0]/70 p-1 rounded-xl backdrop-blur-xs" >
                            {/* تب پروفایل شخصی */}
                            <button
                                type="button"
                                onClick={() => setActiveTab('profile')}
                                className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer whitespace-nowrap ${activeTab === 'profile'
                                        ? 'bg-white text-slate-900 shadow-sm border border-slate-200/80'
                                        : 'text-slate-600 hover:text-slate-900'
                                    }`}
                            >
                                پروفایل شخصی
                            </button>

                            {/* لیست تب‌های ویترین‌ها */}
                            {vitrins.map((vitrin) => (
                                <button
                                    key={vitrin.id}
                                    type="button"
                                    onClick={() => setActiveTab(vitrin.id)}
                                    className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer whitespace-nowrap ${activeTab === vitrin.id
                                            ? 'bg-white text-slate-900 shadow-sm border border-slate-200/80'
                                            : 'text-slate-600 hover:text-slate-900'
                                        }`}
                                >
                                    {vitrin.companyName || 'ویترین بدون نام'}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ---------------------------------------------------- */}
                {/* ۲. کارت هیرو اصلی (سفید رنگ سه تکه مطابق فیگما) */}
                {/* ---------------------------------------------------- */}
                <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-200/60 grid grid-cols-1 md:grid-cols-12 gap-6 items-center" >

                    {/* ستون چپ: کارت‌های آمار و سکه (4 ستون از 12) */}
                    <div className="md:col-span-5 flex flex-col gap-3">
                        <div className="grid grid-cols-2 gap-3">
                            {/* کارت سطح */}
                            <div className="bg-[#F8FAFC] border border-slate-100 rounded-2xl p-3.5 flex items-center justify-between">
                                <div className="space-y-1">
                                    <span className="text-xs font-bold text-slate-800 block">
                                        {activeLevelName}
                                    </span>
                                    <div className="flex items-center gap-1 text-[11px] text-slate-500">
                                        <span>{(userInfo?.scores ?? 0).toLocaleString('fa-IR')} امتیاز</span>
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
                                            {(userInfo?.coins ?? 0).toLocaleString('fa-IR')}
                                        </span>
                                        <span className="text-xs font-bold text-slate-600">سکه</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-[10px] text-slate-400">
                                        <span>{((userInfo?.coins ?? 0) * 100).toLocaleString('fa-IR')} تومان</span>
                                        <Info className="w-3 h-3 text-slate-400" />
                                    </div>
                                </div>
                                <div className="w-9 h-9 relative shrink-0">
                                    <Coins className="w-8 h-8 text-amber-500" />
                                </div>
                            </div>
                        </div>

                        {/* نوار پایینی آمار (۳۰ روز اخیر) */}
                        <div className="flex items-center justify-between text-[11px] text-slate-500 px-1 pt-1">
                            <div className="flex items-center gap-1 text-emerald-600 font-bold bg-emerald-50/60 px-2 py-0.5 rounded-lg">
                                <span>معادل ۵۶ امتیاز</span>
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

                    {/* ستون راست: اطلاعات پروفایل کاربر (4 ستون از 12) */}
                    <div className="md:col-span-4 flex items-center justify-end gap-4">
                        <div className="text-right space-y-1">
                            <div className="flex items-center justify-end gap-1.5">
                                <h2 className="text-base font-extrabold text-slate-900">{userName}</h2>
                                <span className="bg-blue-500 text-white rounded-full p-0.5 inline-flex items-center justify-center w-4 h-4">
                                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                                </span>
                            </div>
                            <p className="text-xs text-slate-400 font-medium">
                                تعمیرکار موبایل / مشهد، ایران
                            </p>
                            <div className="flex items-center justify-end gap-2 pt-1">
                                <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-md">
                                    مغازه‌دار
                                </span>
                                <div className="flex items-center gap-1 text-xs text-slate-500 font-medium">
                                    <span>ماموریت انجام‌شده:</span>
                                    <span className="font-bold text-slate-800">
                                        {(clubSummary?.numberTasksCompleted ?? 0).toLocaleString('fa-IR')}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* عکس آواتار کاربر */}
                        <div className="relative w-16 h-16 rounded-2xl overflow-hidden border-2 border-slate-100 bg-slate-50 shrink-0 shadow-xs">
                            <Image
                                src={userInfo?.avatarUrl || '/images/default-avatar.png'}
                                alt={userName}
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>

                </div>

                {/* ---------------------------------------------------- */}
                {/* ۳. لیست سطوح باشگاه مشتریان */}
                {/* ---------------------------------------------------- */}
                <Card className="p-5 bg-white border-slate-200/60 shadow-xs rounded-2xl space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                        <h3 className="text-sm font-bold text-slate-900">
                            سطوح باشگاه مشتریان
                        </h3>
                        <span className="text-xs text-slate-500 font-medium">
                            {levels.length} سطح تعریف شده
                        </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3.5">
                        {[...levels]
                            .sort((a, b) => a.scores - b.scores)
                            .map((lvl, index) => (
                                <div
                                    key={lvl.id || index}
                                    className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors"
                                >
                                    <div className="relative w-10 h-10 flex items-center justify-center shrink-0">
                                        {lvl.file?.link ? (
                                            <Image
                                                src={
                                                    IMAGE_BASE_URL.endsWith('/') || lvl.file.link.startsWith('/')
                                                        ? `${IMAGE_BASE_URL}${lvl.file.link}`
                                                        : `${IMAGE_BASE_URL}/${lvl.file.link}`
                                                }
                                                alt={lvl.name}
                                                width={36}
                                                height={36}
                                                className="object-contain"
                                            />
                                        ) : (
                                            <Trophy className="w-8 h-8 text-slate-300" />
                                        )}
                                    </div>
                                    <div className="space-y-0.5">
                                        <p className="text-xs sm:text-sm font-bold text-slate-900">
                                            {lvl.name}
                                        </p>
                                        <p className="text-[11px] text-slate-500 font-medium">
                                            {lvl.scores.toLocaleString('fa-IR')} امتیاز
                                        </p>
                                    </div>
                                </div>
                            ))}
                    </div>
                </Card>

                {/* ---------------------------------------------------- */}
                {/* ۴. لیست فعالیت‌های اخیر */}
                {/* ---------------------------------------------------- */}
                <Card className="p-5 bg-white border-slate-200/60 shadow-xs rounded-2xl space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                        <div className="flex items-center gap-2">
                            <History className="w-4 h-4 text-purple-600" />
                            <h3 className="text-sm font-bold text-slate-900">
                                فعالیت‌های اخیر
                            </h3>
                        </div>
                        <span className="text-xs text-slate-500 font-medium bg-slate-100 px-2.5 py-1 rounded-full">
                            ۱۰ فعالیت اخیر
                        </span>
                    </div>

                    <div className="divide-y divide-slate-100">
                        {recentActivities.length === 0 ? (
                            <div className="py-8 text-center text-xs text-slate-400">
                                هیچ فعالیتی ثبت نشده است.
                            </div>
                        ) : (
                            recentActivities.map((act, i) => (
                                <div
                                    key={i}
                                    className="py-3 flex items-center justify-between text-xs sm:text-sm hover:bg-slate-50 px-2 rounded-xl transition-colors gap-3"
                                >
                                    <div className="space-y-1">
                                        <p className="font-bold text-slate-800">
                                            {act.taskTitle || 'فعالیت بدون عنوان'}
                                        </p>
                                        {act.taskDescription && (
                                            <p className="text-xs text-slate-400 line-clamp-1">
                                                {act.taskDescription}
                                            </p>
                                        )}
                                    </div>

                                    <div className="text-left flex items-center gap-1.5 shrink-0">
                                        {act.scoreAmount > 0 && (
                                            <span className="bg-purple-50 text-purple-600 text-[11px] px-2.5 py-1 rounded-full font-bold">
                                                +{(act.scoreAmount).toLocaleString('fa-IR')} امتیاز
                                            </span>
                                        )}
                                        {act.coinAmount > 0 && (
                                            <span className="bg-amber-50 text-amber-600 text-[11px] px-2.5 py-1 rounded-full font-bold">
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