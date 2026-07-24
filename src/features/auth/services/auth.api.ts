import { api } from '@/shared/api/axios';

export interface LoginPayload {
    phone: string;
    password: string;
}

export interface LoginResponse {
    success: boolean;
    result: {
        accessToken: string;
        refreshToken: string;
    };
}

export const loginUser = async (payload: LoginPayload): Promise<LoginResponse> => {
    const { data } = await api.post<LoginResponse>('/users/login', payload);
    return data;
};