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

export const getFullImageUrl = (path?: string | null): string | null => {
    if (!path) return null;
    if (path.startsWith('http://') || path.startsWith('https://')) return path;
    const cleanBase = IMAGE_BASE_URL.endsWith('/') ? IMAGE_BASE_URL.slice(0, -1) : IMAGE_BASE_URL;
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return `${cleanBase}${cleanPath}`;
};

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
            <DashboardHeader
                userData={userInfo}
                levels={levels}
                walletBalance={walletBalance}
            />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 space-y-20">
                <WelcomeBanner userName={displayName} />

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


                <ClubLevelsSection
                    levels={levels}
                    currentScores={currentScores}
                    onGoToTasks={() => {
                    }}
                />

                <section className="overflow-hidden rounded-3xl border border-border/30 bg-surface-white shadow-2xs">
                    <div className="relative aspect-[1440/260] w-full min-h-[160px] sm:min-h-[200px] md:min-h-[240px]">
                        <img
                            src="/images/banner.png"
                            alt="Dashboard banner"
                            className="block h-full w-full object-cover object-center"
                        />
                    </div>
                </section>


                <RecentActivitiesSection
                    activities={recentActivities}
                    onFilterChange={(type) => setActivityType(type)}
                    isLoading={isLoadingRecentActivities}
                />

                <ClubFeaturesSection />
            
            </main>
        </div>
    );
}
