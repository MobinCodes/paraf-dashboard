'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Info, Coins, AlertCircle, CheckSquare, Check, ChevronLeft } from 'lucide-react';
import { getFallbackCupImage } from './DashboardMain';

interface DashboardHeroCardProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
    isProfile: boolean;
    vitrins: any[];
    displayName: string;
    locationText: string;
    roleBadge: string;
    currentScores: number;
    currentCoins: number;
    activeLevelName: string;
    activeLevelIconUrl: string | null;
    avatarUrl: string | null;
    clubSummary: any;
    iranianAuthStatus: boolean;
    isLoading: boolean;
}

export default function DashboardHeroCard({
    activeTab,
    setActiveTab,
    isProfile,
    vitrins,
    displayName,
    locationText,
    roleBadge,
    currentScores,
    currentCoins,
    activeLevelName,
    activeLevelIconUrl,
    avatarUrl,
    clubSummary,
    iranianAuthStatus,
    isLoading,
}: DashboardHeroCardProps) {
    // مدیریت Error حالت‌های لود تصویر
    const [imgAvatarSrc, setImgAvatarSrc] = useState<string>('/images/user.png');
    const [imgLevelSrc, setImgLevelSrc] = useState<string>('/images/cup-bronze.png');

    useEffect(() => {
        setImgAvatarSrc(avatarUrl || '/images/user.png');
    }, [avatarUrl]);

    useEffect(() => {
        setImgLevelSrc(activeLevelIconUrl || getFallbackCupImage(activeLevelName));
    }, [activeLevelIconUrl, activeLevelName]);

    if (isLoading) {
        return (
            <div className="w-full h-48 bg-surface-subtle animate-pulse rounded-3xl mt-20 flex items-center justify-center text-text-muted font-bold text-sm">
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
                <div className="flex items-center gap-6 text-xs sm:text-sm font-bold text-text-main">
                    <Link href="/faq" className="hover:text-purple-primary transition-colors">
                        سوالات متداول شما
                    </Link>
                    <Link href="/terms" className="hover:text-purple-primary transition-colors">
                        قوانین و مقررات
                    </Link>
                </div>

                {/* بخش تب‌های سمت راست */}
                <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-1 sm:pb-0">
                    <span className="text-xs sm:text-sm font-bold text-text-main shrink-0">
                        انتخاب باشگاه مشتریان:
                    </span>

                    <div className="flex items-center gap-1 bg-input/70 p-1 rounded-xl backdrop-blur-xs">
                        <button
                            type="button"
                            onClick={() => setActiveTab('profile')}
                            className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer whitespace-nowrap ${isProfile
                                    ? 'bg-surface-white text-text-main shadow-xs border border-border/40'
                                    : 'text-text-muted hover:text-text-main'
                                }`}
                        >
                            پروفایل شخصی
                        </button>

                        {vitrins.map((vitrin: any) => (
                            <button
                                key={vitrin.id}
                                type="button"
                                onClick={() => setActiveTab(String(vitrin.id))}
                                className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer whitespace-nowrap ${activeTab === String(vitrin.id)
                                        ? 'bg-surface-white text-text-main shadow-xs border border-border/40'
                                        : 'text-text-muted hover:text-text-main'
                                    }`}
                            >
                                {vitrin.companyName || `ویترین (${vitrin.role})`}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* ---------------------------------------------------- */}
            {/* ۲. کارت هیرو اصلی */}
            {/* ---------------------------------------------------- */}
            <div className="bg-card rounded-3xl p-5 shadow-xs border border-border/30 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">

                {/* ستون راست (RTL): اطلاعات پروفایل کاربر یا ویترین */}
                <div className="md:col-span-4 flex items-center justify-start gap-4">
                    <div className="relative w-16 h-16 rounded-2xl overflow-hidden border-2 border-muted bg-surface-subtle shrink-0 shadow-xs">
                        <Image
                            src={imgAvatarSrc}
                            alt={displayName}
                            fill
                            className="object-cover"
                            onError={() => setImgAvatarSrc('/images/user.png')}
                        />
                    </div>

                    <div className="text-right space-y-1">
                        <div className="flex items-center gap-1.5">
                            <h2 className="text-base font-extrabold text-text-main">{displayName}</h2>
                            {iranianAuthStatus && (
                                <span className="bg-blue-accent text-surface-white rounded-full p-0.5 inline-flex items-center justify-center w-4 h-4" title="احراز هویت شده">
                                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                                </span>
                            )}
                        </div>
                        <p className="text-xs text-text-muted font-medium">
                            {locationText}
                        </p>
                        <div className="flex items-center gap-2 pt-1">
                            <span className="text-[10px] bg-muted text-text-muted px-2 py-0.5 rounded-md font-medium">
                                {roleBadge}
                            </span>
                            <div className="flex items-center gap-1 text-xs text-text-muted font-medium">
                                <span>ماموریت انجام‌شده:</span>
                                <span className="font-bold text-text-main">
                                    {(clubSummary?.numberTasksCompleted ?? 0).toLocaleString('fa-IR')}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ستون وسط: اکشن ماموریت */}
                <div className="md:col-span-3 flex flex-col items-center justify-center gap-3 md:border-r md:border-l border-muted px-2 py-2">
                    <div className="bg-danger-bg text-danger-text text-[11px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 text-center">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>وقت کمی مونده، ماموریت رو همین الان انجام بده.</span>
                    </div>
                    <button
                        type="button"
                        className="bg-blue-accent hover:opacity-90 text-surface-white text-xs font-bold px-5 py-2.5 rounded-xl flex items-center gap-2 shadow-xs transition-all cursor-pointer"
                    >
                        <span>مشاهده ماموریت</span>
                        <CheckSquare className="w-4 h-4" />
                    </button>
                </div>

                {/* ستون چپ: کارت‌های آمار و سکه */}
                <div className="md:col-span-5 flex flex-col gap-3">
                    <div className="grid grid-cols-2 gap-3">
                        {/* کارت سطح */}
                        <div className="bg-surface-subtle border border-muted rounded-2xl p-3.5 flex items-center justify-between">
                            <div className="space-y-1">
                                <span className="text-xs font-bold text-text-main block">
                                    سطح {activeLevelName}
                                </span>
                                <div className="flex items-center gap-1 text-[11px] text-text-muted">
                                    <span>{currentScores.toLocaleString('fa-IR')} امتیاز</span>
                                    <Info className="w-3 h-3 text-text-muted" />
                                </div>
                            </div>
                            <div className="w-10 h-10 relative shrink-0 flex items-center justify-center">
                                <Image
                                    src={imgLevelSrc}
                                    alt={activeLevelName}
                                    width={36}
                                    height={36}
                                    className="object-contain"
                                    onError={() => setImgLevelSrc(getFallbackCupImage(activeLevelName))}
                                />
                            </div>
                        </div>

                        {/* کارت سکه */}
                        <div className="bg-amber-bg border border-amber-border/60 rounded-2xl p-3.5 flex items-center justify-between">
                            <div className="space-y-1">
                                <div className="flex items-center gap-1">
                                    <span className="text-sm font-extrabold text-text-main">
                                        {currentCoins.toLocaleString('fa-IR')}
                                    </span>
                                    <span className="text-xs font-bold text-amber-text">سکه</span>
                                </div>
                                <div className="flex items-center gap-1 text-[10px] text-text-muted">
                                    <span>{(currentCoins * 100).toLocaleString('fa-IR')} تومان</span>
                                    <Info className="w-3 h-3 text-text-muted" />
                                </div>
                            </div>
                            <div className="w-9 h-9 relative shrink-0 flex items-center justify-center">
                                <Coins className="w-8 h-8 text-amber-text" />
                            </div>
                        </div>
                    </div>

                    {/* نوار پایینی آمار (۳۰ روز اخیر) */}
                    <div className="flex items-center justify-between text-[11px] text-text-muted px-1 pt-1">
                        <div className="flex items-center gap-1 text-success-text font-bold bg-success-bg px-2.5 py-0.5 rounded-lg">
                            <span>کسب {(clubSummary?.totalScoreMonthly ?? 0).toLocaleString('fa-IR')} امتیاز اخیر</span>
                        </div>
                        <div className="flex items-center gap-1 bg-muted text-text-muted px-2.5 py-1 rounded-full font-bold text-[10px]">
                            <span>۳۰ روز اخیر</span>
                            <ChevronLeft className="w-3 h-3" />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}