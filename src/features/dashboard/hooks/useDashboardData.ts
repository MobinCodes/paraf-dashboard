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
import {
    DashboardClubSummary,
    EndUserRoleEnum,
    LevelItem,
    RecentActivitiesTypeEnum,
    RecentActivityItem,
    UserMeResponse,
    UserVitrinItem,
    VitrinDetailResponse,
} from '@/shared/types';

type ApiEnvelope<T> = {
    result?: T;
    data?: T;
};

const unwrapArray = <T,>(value: unknown): T[] => {
    if (Array.isArray(value)) return value as T[];
    if (value && typeof value === 'object') {
        const envelope = value as ApiEnvelope<unknown[]>;
        if (Array.isArray(envelope.result)) return envelope.result as T[];
        if (Array.isArray(envelope.data)) return envelope.data as T[];
    }
    return [];
};

const unwrapObject = <T,>(value: unknown): T | undefined => {
    if (value && typeof value === 'object') {
        const envelope = value as ApiEnvelope<T>;
        if (envelope.result !== undefined) return envelope.result;
        if (envelope.data !== undefined) return envelope.data;
    }
    return value as T | undefined;
};

type DashboardUserInfo = UserMeResponse &
    Partial<VitrinDetailResponse> & {
        companyName?: string;
        role?: EndUserRoleEnum | string;
        city?: {
            name?: string;
        };
        country?: {
            name?: string;
        };
        user?: {
            firstName?: string;
            lastName?: string;
            city?: {
                name?: string;
            };
            country?: {
                name?: string;
            };
        };
        file?: {
            link?: string;
        };
        logo?: {
            link?: string;
        };
        defaultRole?: EndUserRoleEnum | string;
        iranianAuthStatus?: boolean;
    };

type DashboardData = {
    vitrins: UserVitrinItem[];
    userInfo: DashboardUserInfo | undefined;
    levels: LevelItem[];
    clubSummary: DashboardClubSummary | undefined;
    recentActivities: RecentActivityItem[];
    walletBalance: number;
    activityType: RecentActivitiesTypeEnum | undefined;
    setActivityType: (type: RecentActivitiesTypeEnum | undefined) => void;
    isLoadingRecentActivities: boolean;
    isLoading: boolean;
};

export function useDashboardData(): DashboardData {
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

    const levelsArray = unwrapArray<LevelItem>(levelsQuery.data);
    const vitrinsArray = unwrapArray<UserVitrinItem>(vitrinsQuery.data);
    const activitiesArray = unwrapArray<RecentActivityItem>(recentActivitiesQuery.data);
    const userInfoData = unwrapObject<DashboardUserInfo>(userInfoQuery.data);
    const clubSummaryData = unwrapObject<DashboardClubSummary>(clubSummaryQuery.data);

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
