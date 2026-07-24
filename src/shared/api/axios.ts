import axios from 'axios';

export const API_BASE_URL = 'https://wholesaler-core-v2.paraf.app/api';
export const IMAGE_BASE_URL = 'https://wholesaler-core-develop.web.parafacc.ir/';

export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use((config) => {
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
});