'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import {
    Gift,
    Headphones,
    Truck,
    BarChart3,
    CalendarDays,
    Users2,
    LucideIcon
} from 'lucide-react';

interface FeatureItem {
    id: number;
    title: string;
    description: string;
    lucideIcon: LucideIcon;
}

const FEATURES_DATA: FeatureItem[] = [
    {
        id: 1,
        title: 'جوایز ویژه',
        description: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است.',
        lucideIcon: Gift,
    },
    {
        id: 2,
        title: 'پشتیبانی حرفه‌ای',
        description: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است.',
        lucideIcon: Headphones,
    },
    {
        id: 3,
        title: 'ارسال رایگان',
        description: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است.',
        lucideIcon: Truck,
    },
    {
        id: 4,
        title: 'گزارش فروش',
        description: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است.',
        lucideIcon: BarChart3,
    },
    {
        id: 5,
        title: 'رویدادهای ویژه',
        description: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است.',
        lucideIcon: CalendarDays,
    },
    {
        id: 6,
        title: 'شبکه همکاران',
        description: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است.',
        lucideIcon: Users2,
    },
];

export function ClubFeaturesSection() {
    return (
        <section className="space-y-6 dir-rtl">
            <div className="flex items-center justify-between">
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    ویژگی‌های <span className="text-purple-primary">پاراف‌کلاب</span>
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {FEATURES_DATA.map((feature) => {
                    const LucideIconComponent = feature.lucideIcon;

                    return (
                        <Card
                            key={feature.id}
                            className="feature-card-glow relative p-6 sm:p-8 bg-white/90 backdrop-blur-md border border-slate-100 shadow-sm rounded-3xl flex flex-col items-center justify-center text-center overflow-hidden cursor-pointer group min-h-[220px]"
                        >
                            <div className="mb-4 p-4 rounded-2xl bg-purple-primary/10 text-purple-primary transition-all duration-500 group-hover:scale-110 group-hover:bg-purple-primary group-hover:text-white shrink-0">
                                <LucideIconComponent className="w-8 h-8 sm:w-10 sm:h-10 transition-colors duration-300" />
                            </div>

                            <div className="relative w-full h-14 flex items-center justify-center perspective-1000">
                                <h3 className="flip-text-title absolute inset-0 flex items-center justify-center text-base sm:text-lg font-bold text-slate-800 px-2">
                                    {feature.title}
                                </h3>

                                <p className="flip-text-desc absolute inset-0 flex items-center justify-center text-xs sm:text-sm text-slate-500 leading-relaxed font-medium px-1">
                                    {feature.description}
                                </p>
                            </div>
                        </Card>
                    );
                })}
            </div>
        </section>
    );
}