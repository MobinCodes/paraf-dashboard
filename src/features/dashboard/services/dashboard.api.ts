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

export const getUserMe = async (): Promise<UserMeResponse> => {
    const { data } = await api.get<UserMeResponse>('/users/me');
    return data;
};

export const getUserVitrins = async (): Promise<UserVitrinItem[]> => {
    const { data } = await api.get<UserVitrinItem[]>('/users/vitrin/all-user');
    return data;
};

export const getVitrinDetail = async (userVitrinId: string): Promise<VitrinDetailResponse> => {
    const { data } = await api.get<VitrinDetailResponse>(`/users/vitrin/${userVitrinId}`);
    return data;
};

export const getLevels = async (): Promise<LevelItem[]> => {
    const { data } = await api.get<LevelItem[]>('/levels');
    return data;
};

export const getUserClubSummary = async (): Promise<CustomerClubSummary> => {
    const { data } = await api.get<CustomerClubSummary>('/customer-club/summary');
    return data;
};

export const getVitrinClubSummary = async (userVitrinId: string): Promise<CustomerClubSummary> => {
    const { data } = await api.get<CustomerClubSummary>(`/customer-club/summary-user-vitrin/${userVitrinId}`);
    return data;
};

export const getRecentActivities = async (params: {
    offset?: number;
    size?: number;
    type?: RecentActivitiesTypeEnum;
    userVitrinId?: string;
}): Promise<RecentActivityItem[]> => {
    const { data } = await api.get<RecentActivityItem[]>('/recent-activities', { params });
    return data;
};