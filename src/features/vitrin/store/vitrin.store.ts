import { create } from 'zustand';

interface VitrinState {
    activeTab: 'profile' | string; 
    setActiveTab: (tab: string) => void;
}

export const useVitrinStore = create<VitrinState>((set) => ({
    activeTab: 'profile',
    setActiveTab: (tab: string) => set({ activeTab: tab }),
}));