import { api } from '@/shared/api/axios';
import {
    UserMeResponse,
    UserVitrinItem,
    VitrinDetailResponse,
    LevelItem,
    CustomerClubSummary,
    RecentActivityItem,
    RecentActivitiesTypeEnum,
} from '@/shared/types';

// ۱. اطلاعات کاربر
export const getUserMe = async (): Promise<UserMeResponse> => {
    const { data } = await api.get<UserMeResponse>('/users/me');
    return data;
};

// ۲. لیست ویترین‌های کاربر
export const getUserVitrins = async (): Promise<UserVitrinItem[]> => {
    const { data } = await api.get<UserVitrinItem[]>('/users/vitrin/all-user');
    return data;
};

// ۳. اطلاعات یک ویترین خاص
export const getVitrinDetail = async (userVitrinId: string): Promise<VitrinDetailResponse> => {
    const { data } = await api.get<VitrinDetailResponse>(`/users/vitrin/${userVitrinId}`);
    return data;
};

// ۴. لیست سطح‌ها
export const getLevels = async (): Promise<LevelItem[]> => {
    const { data } = await api.get<LevelItem[]>('/levels');
    return data;
};

// ۵. خلاصه باشگاه مشتریان کاربر
export const getUserClubSummary = async (): Promise<CustomerClubSummary> => {
    const { data } = await api.get<CustomerClubSummary>('/customer-club/summary');
    return data;
};

// ۶. خلاصه باشگاه مشتریان ویترین
export const getVitrinClubSummary = async (userVitrinId: string): Promise<CustomerClubSummary> => {
    const { data } = await api.get<CustomerClubSummary>(`/customer-club/summary-user-vitrin/${userVitrinId}`);
    return data;
};

// ۷. لیست فعالیت‌های اخیر (کاربر یا ویترین)
export const getRecentActivities = async (params: {
    offset?: number;
    size?: number;
    type?: RecentActivitiesTypeEnum;
    userVitrinId?: string;
}): Promise<RecentActivityItem[]> => {
    const { data } = await api.get<RecentActivityItem[]>('/recent-activities', { params });
    return data;
};