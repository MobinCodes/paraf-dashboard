import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
    getUserMe,
    getUserVitrins,
    getVitrinDetail,
    getLevels,
    getUserClubSummary,
    getVitrinClubSummary,
    getRecentActivities,
} from '../services/dashboard.api';
import { useVitrinStore } from '@/features/vitrin/store/vitrin.store';
import { RecentActivitiesTypeEnum } from '@/shared/types';

export function useDashboardData() {
    const activeTab = useVitrinStore((state) => state.activeTab);
    const isProfile = activeTab === 'profile';

    const [activityType, setActivityType] = useState<RecentActivitiesTypeEnum | undefined>(undefined);

    const vitrinsQuery = useQuery({
        queryKey: ['vitrins'],
        queryFn: getUserVitrins,
    });

    const userInfoQuery = useQuery({
        queryKey: ['userInfo', activeTab],
        queryFn: () => (isProfile ? getUserMe() : getVitrinDetail(activeTab)),
    });

    const levelsQuery = useQuery({
        queryKey: ['levels'],
        queryFn: getLevels,
    });

    const clubSummaryQuery = useQuery({
        queryKey: ['clubSummary', activeTab],
        queryFn: () => (isProfile ? getUserClubSummary() : getVitrinClubSummary(activeTab)),
    });

    const recentActivitiesQuery = useQuery({
        queryKey: ['recentActivities', activeTab, activityType],
        queryFn: () =>
            getRecentActivities({
                size: 10,
                offset: 0,
                type: activityType,
                userVitrinId: isProfile ? undefined : activeTab,
            }),
    });

    const rawLevels = levelsQuery.data as any;
    const levelsArray = Array.isArray(rawLevels)
        ? rawLevels
        : Array.isArray(rawLevels?.result)
            ? rawLevels.result
            : Array.isArray(rawLevels?.data)
                ? rawLevels.data
                : [];

    const rawVitrins = vitrinsQuery.data as any;
    const vitrinsArray = Array.isArray(rawVitrins)
        ? rawVitrins
        : Array.isArray(rawVitrins?.result)
            ? rawVitrins.result
            : Array.isArray(rawVitrins?.data)
                ? rawVitrins.data
                : [];

    const rawActivities = recentActivitiesQuery.data as any;
    const activitiesArray = Array.isArray(rawActivities)
        ? rawActivities
        : Array.isArray(rawActivities?.result)
            ? rawActivities.result
            : Array.isArray(rawActivities?.data)
                ? rawActivities.data
                : [];

    const userInfoData = (userInfoQuery.data as any)?.result || userInfoQuery.data;
    const clubSummaryData = (clubSummaryQuery.data as any)?.result || clubSummaryQuery.data;

    return {
        vitrins: vitrinsArray,
        userInfo: userInfoData,
        levels: levelsArray,
        clubSummary: clubSummaryData,
        recentActivities: activitiesArray,
        walletBalance: userInfoData?.coins ?? 0,

        activityType,
        setActivityType,
        isLoadingRecentActivities: recentActivitiesQuery.isLoading,

        isLoading:
            userInfoQuery.isLoading ||
            levelsQuery.isLoading ||
            clubSummaryQuery.isLoading,
    };
}