'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { RecentActivitiesTypeEnum, RecentActivityItem } from '@/shared/types';
import {
    Zap,
    Coins,
    Send,
    Repeat,
    Eye,
    Clock
} from 'lucide-react';

interface RecentActivitiesSectionProps {
    activities: RecentActivityItem[];
    onFilterChange?: (type?: RecentActivitiesTypeEnum) => void;
    isLoading?: boolean;
}

const FILTER_TABS = [
    { label: 'نمایش همه', value: undefined },
    { label: 'امتیاز', value: RecentActivitiesTypeEnum.SCORE },
    { label: 'سکه', value: RecentActivitiesTypeEnum.COIN },
    { label: 'دوگانه', value: RecentActivitiesTypeEnum.BOTH },
    { label: 'برداشت سکه', value: RecentActivitiesTypeEnum.SPENTCOIN },
    { label: 'انتقال سکه', value: RecentActivitiesTypeEnum.TRANSFERCOIN },
];

export function RecentActivitiesSection({
    activities = [],
    onFilterChange,
    isLoading = false,
}: RecentActivitiesSectionProps) {
    const [selectedType, setSelectedType] = useState<RecentActivitiesTypeEnum | undefined>(undefined);

    const handleTabClick = (type?: RecentActivitiesTypeEnum) => {
        setSelectedType(type);
        if (onFilterChange) {
            onFilterChange(type);
        }
    };

    const renderActivityStyleAndIcon = (act: RecentActivityItem) => {
        const score = act.scoreAmount || 0;
        const coin = act.coinAmount || 0;

        if (act.type === RecentActivitiesTypeEnum.BOTH || (score > 0 && coin > 0)) {
            return {
                icon: <Repeat className="w-4 h-4 text-emerald-500 transition-colors group-hover:text-white" />,
                badgeBg: 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-500',
                hoverGradientClass: 'activity-hover-emerald',
                text: (
                    <div className="flex flex-col items-start text-right text-xs font-bold sm:text-sm">
                        <span>+{score.toLocaleString('fa-IR')} امتیاز</span>
                        <span>+{coin.toLocaleString('fa-IR')} سکه</span>
                    </div>
                ),
            };
        }

        if (act.type === RecentActivitiesTypeEnum.SPENTCOIN || coin < 0) {
            return {
                icon: <Coins className="w-4 h-4 text-amber-500 transition-colors group-hover:text-white" />,
                badgeBg: 'bg-amber-50 text-amber-600 group-hover:bg-amber-500',
                hoverGradientClass: 'activity-hover-amber',
                text: (
                    <span className="text-xs font-bold sm:text-sm text-right block">
                        {coin.toLocaleString('fa-IR')} برداشت
                    </span>
                ),
            };
        }

        if (act.type === RecentActivitiesTypeEnum.TRANSFERCOIN) {
            return {
                icon: <Send className="w-4 h-4 text-rose-500 transition-colors group-hover:text-white" />,
                badgeBg: 'bg-rose-50 text-rose-600 group-hover:bg-rose-500',
                hoverGradientClass: 'activity-hover-rose',
                text: (
                    <span className="text-xs font-bold sm:text-sm text-right block">
                        {coin.toLocaleString('fa-IR')} انتقال
                    </span>
                ),
            };
        }

        if (act.type === RecentActivitiesTypeEnum.COIN || coin > 0) {
            return {
                icon: <Coins className="w-4 h-4 text-sky-500 transition-colors group-hover:text-white" />,
                badgeBg: 'bg-sky-50 text-sky-600 group-hover:bg-sky-500',
                hoverGradientClass: 'activity-hover-sky',
                text: (
                    <span className="text-xs font-bold sm:text-sm text-right block">
                        +{coin.toLocaleString('fa-IR')} سکه
                    </span>
                ),
            };
        }

        return {
            icon: <Zap className="w-4 h-4 text-emerald-500 transition-colors group-hover:text-white" />,
            badgeBg: 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-500',
            hoverGradientClass: 'activity-hover-emerald',
            text: (
                <span className="text-xs font-bold sm:text-sm text-right block">
                    +{score.toLocaleString('fa-IR')} امتیاز
                </span>
            ),
        };
    };

    return (
        <Card className="p-6 bg-white border border-slate-100 shadow-xs rounded-3xl space-y-6 dir-rtl">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <h3 className="text-lg font-bold text-slate-900">فعالیت‌های اخیر</h3>
                    <p className="mt-0.5 text-xs text-slate-400">مروری بر آخرین فعالیت‌ها و دستاوردها</p>
                </div>

                <div className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
                    {FILTER_TABS.map((tab) => {
                        const isActive = selectedType === tab.value;
                        return (
                            <button
                                key={tab.label}
                                onClick={() => handleTabClick(tab.value)}
                                className={`px-3.5 py-1.5 text-xs font-medium rounded-full transition-all shrink-0 cursor-pointer ${isActive
                                        ? 'bg-slate-900 text-white shadow-xs'
                                        : 'bg-slate-100/80 text-slate-600 hover:bg-slate-200/70'
                                    }`}
                            >
                                {tab.label}
                            </button>
                        );
                    })}
                </div>

                <button className="hidden lg:flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-slate-900 transition-colors shrink-0 cursor-pointer">
                    <Eye className="w-4 h-4 text-slate-500" />
                    <span>لیست کامل</span>
                </button>
            </div>

            <div className="space-y-2.5">
                {isLoading ? (
                    <div className="py-12 text-center text-xs text-slate-400">در حال دریافت اطلاعات...</div>
                ) : activities.length === 0 ? (
                    <div className="py-12 text-center text-xs text-slate-400">هیچ فعالیتی یافت نشد.</div>
                ) : (
                    activities.map((act, i) => {
                        const styleInfo = renderActivityStyleAndIcon(act);

                        return (
                            <div
                                key={i}
                                className={`group flex items-center justify-between p-3 sm:p-4 bg-slate-50/60 rounded-2xl transition-all duration-300 gap-3 border border-transparent hover:border-slate-100 hover:scale-[1.015] hover:shadow-md cursor-pointer ${styleInfo.hoverGradientClass}`}
                            >
                                <div className="flex items-center gap-3 min-w-0">
                                    <div
                                        className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${styleInfo.badgeBg}`}
                                    >
                                        {styleInfo.icon}
                                    </div>
                                    <div className="space-y-0.5 min-w-0 text-right">
                                        <p className="text-xs sm:text-sm font-bold text-slate-800 truncate transition-colors group-hover:text-slate-900">
                                            {act.taskTitle || 'فعالیت بدون عنوان'}
                                        </p>
                                        {act.taskDescription && (
                                            <p className="text-[11px] text-slate-400 truncate group-hover:text-slate-500">
                                                {act.taskDescription}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 shrink-0">
                                    <div className="text-right">
                                        {styleInfo.text}
                                    </div>

                                    <div className="hidden sm:flex items-center gap-2">
                                        <span className="bg-slate-200/60 text-slate-600 text-[11px] font-medium px-2.5 py-1 rounded-full transition-colors group-hover:bg-white group-hover:shadow-xs">
                                            موفق
                                        </span>
                                        <div className="flex items-center gap-1 text-[11px] text-slate-400">
                                            <Clock className="w-3 h-3" />
                                            <span>امروز</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </Card>
    );
}