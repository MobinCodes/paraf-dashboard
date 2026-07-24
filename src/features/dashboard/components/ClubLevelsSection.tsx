'use client';

import React from 'react';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckSquare, Zap, Check, ArrowLeft } from 'lucide-react';
import { getFallbackCupImage } from './DashboardMain';

interface LevelItem {
    id: number;
    name: string;
    scores: string | number;
    file?: { link?: string } | null;
}

interface ClubLevelsSectionProps {
    levels: LevelItem[];
    currentScores: number;
    onGoToTasks?: () => void;
}

export function ClubLevelsSection({
    levels = [],
    currentScores = 0,
    onGoToTasks,
}: ClubLevelsSectionProps) {
    const sortedLevels = [...levels].sort(
        (a, b) => Number(a.scores) - Number(b.scores)
    );

    const currentLevelIndex = sortedLevels.findLastIndex(
        (lvl) => currentScores >= Number(lvl.scores)
    );

    const activeLevelIndex = currentLevelIndex === -1 ? 0 : currentLevelIndex;
    const currentLevel = sortedLevels[activeLevelIndex];
    const nextLevel = sortedLevels[activeLevelIndex + 1] || null;

    const nextLevelScores = nextLevel ? Number(nextLevel.scores) : Number(currentLevel?.scores || 0);
    const prevLevelScores = Number(currentLevel?.scores || 0);
    const neededScores = nextLevel ? Math.max(0, nextLevelScores - currentScores) : 0;

    let progressPercent = 100;
    if (nextLevel) {
        const totalRange = nextLevelScores - prevLevelScores;
        const currentProgress = currentScores - prevLevelScores;
        progressPercent = totalRange > 0 ? Math.min(100, Math.max(0, (currentProgress / totalRange) * 100)) : 100;
    }

    return (
        <div className="space-y-4 font-sans text-slate-800 dir-rtl">

            <Card className="p-6 bg-gradient-to-br from-indigo-50/70 via-purple-50/50 to-blue-50/60 border-indigo-100/80 rounded-3xl shadow-xs relative overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">

                    <div className="lg:col-span-4 bg-white/80 backdrop-blur-md border border-indigo-100 rounded-2xl p-5 flex flex-col items-center justify-center text-center gap-3 shadow-xs">
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                            <span>امتیاز لازم تا</span>
                            <span className="text-purple-700 font-black">
                                {nextLevel ? nextLevel.name : 'حداکثر سطح'}
                            </span>
                            {nextLevel && (
                                <span className="inline-flex items-center gap-1 bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full text-[11px] font-extrabold">
                                    <Zap className="w-3 h-3 fill-purple-600" />
                                    +{neededScores.toLocaleString('fa-IR')}
                                </span>
                            )}
                        </div>

                        <Button
                            onClick={onGoToTasks}
                            className="w-full bg-white hover:bg-slate-50 text-sky-600 border border-sky-200 font-bold rounded-xl shadow-xs hover:shadow-sm transition-all flex items-center justify-center gap-2 py-5"
                        >
                            <CheckSquare className="w-4 h-4 text-sky-500" />
                            <span>ماموریت‌ها</span>
                        </Button>
                    </div>

                    <div className="lg:col-span-8 space-y-6 px-2">
                        <div className="flex justify-between items-end relative px-4">
                            {sortedLevels.map((lvl, index) => {
                                const isPassed = index <= activeLevelIndex;
                                const imgUrl = getFallbackCupImage(lvl.name); 

                                return (
                                    <div
                                        key={lvl.id || index}
                                        className={`flex flex-col items-center gap-1 transition-all duration-300 ${isPassed ? 'opacity-100 scale-100' : 'opacity-40 scale-90'
                                            }`}
                                    >
                                        <div className="relative w-12 h-12 flex items-center justify-center">
                                            <Image
                                                src={imgUrl}
                                                alt={lvl.name}
                                                width={44}
                                                height={44}
                                                sizes="44px"
                                                style={{ width: 'auto', height: 'auto' }}
                                                className="object-contain drop-shadow-md"
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="relative px-4 my-4">
                            <div className="h-3 w-full bg-purple-100/80 rounded-full overflow-hidden relative">
                                <div
                                    className="h-full bg-gradient-to-l from-indigo-500 to-purple-600 rounded-full transition-all duration-500"
                                    style={{ width: `${progressPercent}%` }}
                                />
                            </div>

                            <div
                                className="absolute -top-3.5 transform translate-x-1/2 flex items-center gap-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-black px-3 py-1 rounded-full shadow-md border-2 border-white transition-all duration-500 z-10"
                                style={{
                                    right: `${progressPercent}%`, 
                                }}
                            >
                                <Zap className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                                <span>{currentScores.toLocaleString('fa-IR')}</span>
                            </div>
                        </div>

                        <div className="flex justify-between items-start text-center px-1">
                            {sortedLevels.map((lvl, index) => {
                                const isPassed = index <= activeLevelIndex;
                                const isCurrent = index === activeLevelIndex;

                                return (
                                    <div key={lvl.id || index} className="space-y-0.5 min-w-[60px]">
                                        <div className="flex items-center justify-center gap-1">
                                            {isPassed && (
                                                <div className="w-3.5 h-3.5 rounded-full bg-purple-600 text-white flex items-center justify-center text-[9px]">
                                                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                                                </div>
                                            )}
                                            <p
                                                className={`text-xs font-bold ${isCurrent
                                                        ? 'text-purple-700 font-extrabold'
                                                        : isPassed
                                                            ? 'text-slate-800'
                                                            : 'text-slate-400'
                                                    }`}
                                            >
                                                {lvl.name}
                                            </p>
                                        </div>
                                        <p className="text-[10px] text-slate-400 font-medium">
                                            {Number(lvl.scores).toLocaleString('fa-IR')} امتیاز
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </Card>


            <Card className="p-3.5 bg-white border-slate-200/70 shadow-xs rounded-2xl">
                <div className="flex items-center justify-around flex-wrap gap-2">
                    {sortedLevels.map((lvl, index) => {
                        const imgUrl = getFallbackCupImage(lvl.name);
                        const isLast = index === sortedLevels.length - 1;

                        return (
                            <React.Fragment key={lvl.id || index}>
                                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl hover:bg-slate-50 transition-colors">
                                    <div className="relative w-6 h-6 shrink-0">
                                        <Image
                                            src={imgUrl}
                                            alt={lvl.name}
                                            width={24}
                                            height={24}
                                            sizes="24px"
                                            style={{ width: 'auto', height: 'auto' }}
                                            className="object-contain"
                                        />
                                    </div>
                                    <span className="text-xs font-bold text-slate-800">
                                        سطح {lvl.name}
                                    </span>
                                </div>

                                {!isLast && (
                                    <ArrowLeft className="w-4 h-4 text-slate-300 shrink-0" />
                                )}
                            </React.Fragment>
                        );
                    })}
                </div>
            </Card>
        </div>
    );
}
