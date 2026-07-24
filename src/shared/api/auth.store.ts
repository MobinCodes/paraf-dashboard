import { create } from 'zustand';

interface AuthState {
    token: string | null;
    isAuthenticated: boolean;
    setToken: (token: string) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    token: typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null,
    isAuthenticated: typeof window !== 'undefined' ? !!localStorage.getItem('accessToken') : false,
    setToken: (token: string) => {
        localStorage.setItem('accessToken', token);
        set({ token, isAuthenticated: true });
    },
    logout: () => {
        localStorage.removeItem('accessToken');
        set({ token: null, isAuthenticated: false });
    },
}));