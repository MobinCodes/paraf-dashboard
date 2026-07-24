'use client';

import React from 'react';
import { useDashboardData } from '../hooks/useDashboardData';
import { useVitrinStore } from '@/features/vitrin/store/vitrin.store';
import { IMAGE_BASE_URL } from '@/shared/api/axios';
import { DashboardHeader } from './DashboardHeader';
import { WelcomeBanner } from './WelcomeBanner';
import DashboardHeroCard from './DashboardHeroCard';
import { ClubLevelsSection } from './ClubLevelsSection';
import { RecentActivitiesSection } from './RecentActivitiesSection';
import { ClubLevelItem } from '@/shared/types';
import { ClubFeaturesSection } from './ClubFeaturesSection';

// تابع کمکی برای فرمت‌دهی آدرس تصاویر
export const getFullImageUrl = (path?: string | null): string | null => {
    if (!path) return null;
    if (path.startsWith('http://') || path.startsWith('https://')) return path;
    const cleanBase = IMAGE_BASE_URL.endsWith('/') ? IMAGE_BASE_URL.slice(0, -1) : IMAGE_BASE_URL;
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return `${cleanBase}${cleanPath}`;
};

// تابع کمکی برای پیدا کردن کاپ مناسب براساس نام سطح
export const getFallbackCupImage = (levelName?: string): string => {
    const name = levelName?.toLowerCase() || '';
    if (name.includes('الماس') || name.includes('diamond')) return '/images/diamond.png';
    if (name.includes('طلا') || name.includes('gold')) return '/images/cup-gold.png';
    if (name.includes('نقره') || name.includes('silver')) return '/images/cup-silver.png';
    return '/images/cup-bronze.png';
};

export function DashboardMain() {
    const {
        vitrins,
        userInfo,
        levels,
        clubSummary,
        recentActivities,
        isLoading,
        walletBalance,
        setActivityType,
        isLoadingRecentActivities,
    } = useDashboardData();

    const { activeTab, setActiveTab } = useVitrinStore();
    const isProfile = activeTab === 'profile';

    // ----------------------------------------------------
    // محاسبات یکپارچه داده‌ها برای پاس دادن به HeroCard
    // ----------------------------------------------------
    const displayName = isProfile
        ? `${userInfo?.firstName || ''} ${userInfo?.lastName || ''}`.trim() || 'کاربر محترم'
        : userInfo?.companyName || 'ویترین بدون نام';

    const displayCity = userInfo?.city?.name || userInfo?.user?.city?.name || 'نامشخص';
    const displayCountry = userInfo?.country?.name || userInfo?.user?.country?.name || 'ایران';
    const locationText = `${displayCity}، ${displayCountry}`;

    const roleBadge = isProfile
        ? userInfo?.defaultRole === 'user' ? 'کاربر عادی' : userInfo?.defaultRole || 'کاربر'
        : userInfo?.role || 'ویترین';

    const currentScores = Number(userInfo?.scores ?? 0);
    const currentCoins = isProfile ? Number(userInfo?.coins ?? 0) : 0;

    const currentLevel = userInfo?.level || levels?.find((lvl: ClubLevelItem) => currentScores >= Number(lvl.scores));
    const activeLevelName = currentLevel?.name || 'سطح برنزی';
    const activeLevelIconUrl = getFullImageUrl(currentLevel?.file?.link);

    const rawAvatarLink = isProfile ? userInfo?.file?.link : userInfo?.logo?.link;
    const avatarUrl = getFullImageUrl(rawAvatarLink);

    return (
        <div className="min-h-screen pb-16 font-sans text-text-main dir-rtl">
            {/* هدر ثابت بالای صفحه */}
            <DashboardHeader
                userData={userInfo}
                levels={levels}
                walletBalance={walletBalance}
            />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 space-y-20">
                <WelcomeBanner userName={displayName} />

                {/* کارت هیرو داشبورد */}
                <DashboardHeroCard
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    isProfile={isProfile}
                    vitrins={vitrins}
                    displayName={displayName}
                    locationText={locationText}
                    roleBadge={roleBadge}
                    currentScores={currentScores}
                    currentCoins={currentCoins}
                    activeLevelName={activeLevelName}
                    activeLevelIconUrl={activeLevelIconUrl}
                    avatarUrl={avatarUrl}
                    clubSummary={clubSummary}
                    iranianAuthStatus={Boolean(userInfo?.iranianAuthStatus)}
                    isLoading={isLoading}
                />

                {/* ---------------------------------------------------- */}
                {/* ۳. لیست سطوح باشگاه مشتریان */}
                {/* ---------------------------------------------------- */}
                <ClubLevelsSection
                    levels={levels}
                    currentScores={currentScores}
                    onGoToTasks={() => {
                        // مثلا روت‌دهی به صفحه ماموریت‌ها یا باز کردن مدال
                    }}
                />

                {/* ---------------------------------------------------- */}
                {/* ۴. لیست فعالیت‌های اخیر */}
                {/* ---------------------------------------------------- */}
                <RecentActivitiesSection
                    activities={recentActivities}
                    onFilterChange={(type) => setActivityType(type)}
                    isLoading={isLoadingRecentActivities}
                />

                {/* ۵. سکشن ویژگی‌های پاراف کلاب */}
                <ClubFeaturesSection />
            
            </main>
        </div>
    );
}