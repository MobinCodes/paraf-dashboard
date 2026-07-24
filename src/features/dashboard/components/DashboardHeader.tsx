import Image from 'next/image';
import { UserMeResponse, LevelItem } from '@/shared/types';
import { HelpCircle } from 'lucide-react';

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';

interface DashboardHeaderProps {
    userData?: UserMeResponse | null;
    levels?: LevelItem[];
    walletBalance?: number;
}

export function DashboardHeader({
    userData,
    levels = [],
    walletBalance = 0,
}: DashboardHeaderProps) {
    // ۱. محاسبه امتیاز و سطح فعلی
    const currentScores = userData?.scores ?? 0;
    const sortedLevels = [...levels].sort((a, b) => a.scores - b.scores);

    let targetScores = 1000;
    let progressPercent = 0;
    let activeIndex = 0;

    if (sortedLevels.length > 0) {
        const currentLvlIndex = sortedLevels.findLastIndex(
            (lvl) => currentScores >= lvl.scores
        );
        activeIndex = currentLvlIndex !== -1 ? currentLvlIndex : 0;
        const nextIndex = Math.min(activeIndex + 1, sortedLevels.length - 1);

        targetScores = sortedLevels[nextIndex]?.scores || currentScores;
        const baseScores = sortedLevels[activeIndex]?.scores || 0;
        const range = targetScores - baseScores;

        progressPercent =
            range > 0
                ? Math.min(
                    Math.max(
                        Math.round(((currentScores - baseScores) / range) * 100),
                        0
                    ),
                    100
                )
                : 100;
    }

    // ۲. انتخاب دینامیک تصویر کاپ بر اساس سطح کاربر
    const getCupImage = () => {
        if (activeIndex === 0) return '/images/cup-bronze.png';
        if (activeIndex === 1) return '/images/cup-silver.png';
        return '/images/cup-gold.png';
    };

    return (
        <header className="w-full fixed top-16 left-0 right-0 z-40 bg-surface-subtle border-b border-border/40 backdrop-blur-sm font-sans text-text-main dir-rtl">
            {/* نوار اصلی هدر */}
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 sm:gap-4 px-3 sm:px-6 py-2 ">

                {/* ۱. Breadcrumb */}
                <div className="flex items-center gap-1 text-xs sm:text-sm text-text-muted font-medium shrink-0">
                    <Breadcrumb>
                        <BreadcrumbList className="flex-nowrap whitespace-nowrap text-xs sm:text-sm">
                            <BreadcrumbItem>
                                <BreadcrumbLink
                                    href="/"
                                    className="text-text-muted hover:text-purple-primary transition-colors text-xs sm:text-sm"
                                >
                                    پاراف
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator className="text-text-muted/50" />
                            <BreadcrumbItem>
                                <BreadcrumbPage className="text-text-main font-bold text-xs sm:text-sm whitespace-nowrap">
                                    داشبورد باشگاه مشتریان
                                </BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>

                {/* سمت چپ: آمار، تولتیپ و کیف پول */}
                <div className="flex items-center gap-2 sm:gap-3 shrink-0">

                    {/* ۲. کپسول کیف پول */}
                    <div className="flex h-8 items-center gap-1 sm:gap-1.5 rounded-2xl border border-border/40 bg-surface-white px-2.5 sm:px-4 py-1 text-xs sm:text-sm shadow-2xs whitespace-nowrap">
                        <span className="text-text-muted font-medium text-xs sm:text-sm">
                            کیف پول:
                        </span>
                        <span className="font-extrabold text-text-main text-xs sm:text-sm">
                            {walletBalance.toLocaleString('fa-IR')}
                        </span>
                        <span className="text-[10px] sm:text-xs text-text-muted font-normal">
                            تومان
                        </span>
                    </div>

                    {/* ۳. Tooltip علامت سؤال (نمایش فقط در سایز lg به بالا) */}
                    <TooltipProvider>
                        <div className="hidden lg:inline-flex">
                            <Tooltip >
                                <TooltipTrigger className="text-text-muted/60 hover:text-text-main transition-colors p-1 flex items-center justify-center">
                                    <HelpCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                                </TooltipTrigger>
                                <TooltipContent className="bg-slate-900 text-white text-xs p-2.5 rounded-lg shadow-xl border border-slate-700 max-w-xs dir-rtl">
                                    <p>
                                        این نوار میزان پیشرفت شما را در سطح فعلی نشان می‌دهد. با کسب
                                        امتیاز بیشتر، به سطح بعدی صعود کرده و جوایز بهتری دریافت خواهید
                                        کرد.
                                    </p>
                                </TooltipContent>
                            </Tooltip>
                        </div>
                    </TooltipProvider>

                    {/* ۴. نوار پروگرس بار امتیاز کپسولی */}
                    <div className="relative hidden sm:flex h-8 w-36 sm:w-56 items-center rounded-full bg-surface-white border border-border/30 px-1 shadow-sm shrink-0 ms-5">
                        {/* بخش پرشده بنفش نوار */}
                        <div
                            className="absolute right-0 top-0 bottom-0 bg-purple-primary rounded-full transition-all duration-500 ease-out flex items-center justify-between px-1"
                            style={{ width: `${Math.max(progressPercent, 28)}%` }}
                        >
                            {/* تصویر آیکون کاپ چسبیده به سمت راست نوار بنفش */}
                            <div className="absolute -right-4 top-1/2 -translate-y-1/2 z-20 flex h-6 w-6 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-white shadow-md border border-border/20">
                                <Image
                                    src={getCupImage()}
                                    alt="Level Cup"
                                    width={25}
                                    height={25}
                                    className="object-contain sm:w-7 sm:h-7"
                                />
                            </div>

                            {/* عدد امتیاز چسبیده به سمت چپ نوار بنفش */}
                            <span className="absolute left-2 sm:left-3 text-xs sm:text-sm font-bold text-white tracking-wide z-10 select-none whitespace-nowrap">
                                {currentScores.toLocaleString('fa-IR')}
                            </span>
                        </div>
                    </div>

                </div>
            </div>
        </header>
    );
}