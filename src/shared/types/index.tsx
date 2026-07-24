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
    level: string | UserLevelRef;
    coins: number;
    scores: number;
    firstName?: string;
    lastName?: string;
    companyName?: string;
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
}

export interface UserLevelRef {
    id?: string | number;
    name?: string;
    scores?: number;
    status?: string;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string | null;
    file?: {
        link?: string;
    };
}

export interface UserVitrinItem {
    id: string;
    role: EndUserRoleEnum;
    companyName: string;
}

export interface VitrinDetailResponse {
    level: string | UserLevelRef;
    scores: number;
}

export interface LevelItem {
    id?: string | number;
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

export interface UserVitrinSummary {
    id: string | number;
    role?: EndUserRoleEnum | string;
    companyName?: string;
    defaultRole?: EndUserRoleEnum | string;
}

export interface DashboardClubSummary {
    numberTasksCompleted?: number;
    totalScoreMonthly?: number;
    totalCoinMonthly?: number;
}
