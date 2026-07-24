export enum EndUserRoleEnum {
    USER = 'user',
    RETAILER = 'retailer',
    WHOLESALER = 'wholesaler',
    MARKETER = 'marketer',
    PRODUCER = 'producer',
    IMPORTER = 'importer',
    MERCHANT = 'merchant',
    DISTRIBUTOR = 'distributor',
    BANK = 'bank',
    GOVERNMENT = 'government',
    INSTITUTE = 'institute',
}

export enum RecentActivitiesTypeEnum {
    BOTH = 'BOTH',
    COIN = 'COIN',
    SCORE = 'SCORE',
    SPENTCOIN = 'SPENTCOIN',
    TRANSFERCOIN = 'TRANSFERCOIN',
}

export interface UserMeResponse {
    level: string;
    coins: number;
    scores: number;
}

export interface UserVitrinItem {
    id: string;
    role: EndUserRoleEnum;
    companyName: string;
}

export interface VitrinDetailResponse {
    level: string;
    scores: number;
}

export interface LevelItem {
    name: string;
    scores: number;
    file: {
        link: string;
    };
}

export interface CustomerClubSummary {
    numberTasksCompleted: number;
    totalScoreMonthly: number;
    totalCoinMonthly?: number;
}

export interface RecentActivityItem {
    type: RecentActivitiesTypeEnum;
    taskTitle: string;
    taskDescription: string;
    scoreAmount: number;
    coinAmount: number;
}