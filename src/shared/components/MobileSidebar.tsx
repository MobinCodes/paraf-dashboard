"use client";

import React from "react";
import { Search, Languages, Menu } from "lucide-react";
import { ParafLogo } from "./ParafLogo";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

export const MobileSidebar = () => {
    return (
        <div className="md:hidden">
            <Sheet>
                <SheetTrigger className="rounded-lg p-2 text-text-main transition-colors duration-300 hover:bg-surface-hover" aria-label="منو">
                    <Menu className="w-6 h-6" />
                </SheetTrigger>

                <SheetContent side="right" className="w-[300px] max-h-screen overflow-y-auto bg-surface-white dir-rtl p-4 flex flex-col gap-6 border-l border-border/60">
                    <SheetHeader className="text-right border-b border-border/50 pb-3">
                        <SheetTitle className="flex items-center gap-2">
                            <ParafLogo />
                            <div className="flex flex-col text-[10px] leading-tight text-blue-accent">
                                <span className="font-semibold">بازار کالا و خدمات</span>
                                <span className="text-[9px] opacity-80">ساده، امن، بی‌مرز</span>
                            </div>
                        </SheetTitle>
                    </SheetHeader>

                    <div className="relative w-full">
                        <input
                            type="text"
                            placeholder="جستجو در آگهی‌ها..."
                            className="w-full rounded-full bg-surface-hover/60 py-2 pr-9 pl-4 text-sm text-text-main placeholder:text-text-muted outline-none transition-all focus:bg-surface-white focus:ring-1 focus:ring-blue-accent"
                        />
                        <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                    </div>

                    <div className="flex flex-col gap-4 text-sm font-medium">
                        <div className="flex flex-col gap-2">
                            <span className="text-sm text-text-muted font-semibold">کالاها</span>
                            <div className="flex flex-col gap-1 pr-2 border-r-2 border-border/60">
                                <span className="cursor-pointer rounded-md px-2 py-1.5 transition-colors duration-300 hover:bg-surface-hover">لوازم دیجیتال</span>
                                <span className="cursor-pointer rounded-md px-2 py-1.5 transition-colors duration-300 hover:bg-surface-hover">مد و پوشاک</span>
                                <span className="cursor-pointer rounded-md px-2 py-1.5 transition-colors duration-300 hover:bg-surface-hover">خانه و آشپزخانه</span>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <span className="text-sm text-text-muted font-semibold">خدمات</span>
                            <div className="flex flex-col gap-1 pr-2 border-r-2 border-border/60">
                                <span className="cursor-pointer rounded-md px-2 py-1.5 transition-colors duration-300 hover:bg-surface-hover">خدمات فنی</span>
                                <span className="cursor-pointer rounded-md px-2 py-1.5 transition-colors duration-300 hover:bg-surface-hover">آموزش و مشاوره</span>
                                <span className="cursor-pointer rounded-md px-2 py-1.5 transition-colors duration-300 hover:bg-surface-hover">طراحی و برنامه‌نویسی</span>
                            </div>
                        </div>

                        <span className="cursor-pointer rounded-md px-2 py-1.5 transition-colors duration-300 hover:bg-surface-hover">فروشندگان</span>
                        <span className="cursor-pointer rounded-md px-2 py-1.5 transition-colors duration-300 hover:bg-surface-hover">نمایندگی‌ها</span>
                    </div>

                    <div className="mt-auto flex flex-col gap-3 pt-4 border-t border-border/50">
                        <button
                            type="button"
                            className="flex items-center justify-center gap-2 rounded-lg py-2 text-sm text-text-main transition-colors duration-300 hover:bg-surface-hover bg-surface-hover/60"
                        >
                            <Languages className="h-5 w-5 text-text-muted" />
                            <span>فارسی / IRT</span>
                        </button>

                        <button
                            type="button"
                            className="w-full rounded-lg bg-purple-primary py-2.5 text-sm font-bold text-white transition-opacity duration-300 hover:opacity-90"
                        >
                            ثبت آگهی جدید
                        </button>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    );
};