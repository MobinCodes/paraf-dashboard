"use client";

import React from "react";
import {
    Search,
    Languages,
    Bell,
    ShoppingCart,
    LayoutGrid,
} from "lucide-react";
import { ParafLogo } from "./ParafLogo";
import { MobileSidebar } from "./MobileSidebar";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export const Header = () => {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-surface-white/90 backdrop-blur-md font-sans text-sm text-text-main dir-rtl transition-all">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4">

                {/* سمت راست: منوی همبرگری موبایل + لوگو + نوبار دسکتاپ */}
                <div className="flex items-center gap-2 md:gap-6">
                    <MobileSidebar />

                    {/* لوگو و زیرعنوان */}
                    <div className="flex items-center gap-2 cursor-pointer">
                        <ParafLogo />
                        <div className="hidden flex-col text-[10px] leading-tight text-blue-accent sm:flex">
                            <span className="font-semibold">بازار کالا و خدمات</span>
                            <span className="text-[9px] opacity-80">ساده، امن، بی‌مرز</span>
                        </div>
                    </div>

                    {/* منوهای ناوبری دسکتاپ */}
                    <NavigationMenu dir="rtl" className="hidden md:flex">
                        <NavigationMenuList className="gap-1">

                            {/* کالا */}
                            <NavigationMenuItem>
                                <NavigationMenuTrigger className="cursor-pointer relative bg-transparent text-sm font-medium text-text-main transition-colors duration-300 hover:text-text-main hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent data-[state=open]:text-text-main after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-text-main after:transition-all after:duration-300 hover:after:w-full data-[state=open]:after:w-full">
                                    کالا
                                </NavigationMenuTrigger>
                                <NavigationMenuContent className="bg-surface-white shadow-md border border-border/50 rounded-xl">
                                    <ul className="flex w-44 flex-col gap-1 p-1.5 bg-surface-white">
                                        <li>
                                            <NavigationMenuLink className="block rounded-lg px-3 py-2 text-sm text-text-main transition-colors duration-300 hover:bg-surface-hover cursor-pointer">
                                                لوازم دیجیتال
                                            </NavigationMenuLink>
                                        </li>
                                        <li>
                                            <NavigationMenuLink className="block rounded-lg px-3 py-2 text-sm text-text-main transition-colors duration-300 hover:bg-surface-hover cursor-pointer">
                                                مد و پوشاک
                                            </NavigationMenuLink>
                                        </li>
                                        <li>
                                            <NavigationMenuLink className="block rounded-lg px-3 py-2 text-sm text-text-main transition-colors duration-300 hover:bg-surface-hover cursor-pointer">
                                                خانه و آشپزخانه
                                            </NavigationMenuLink>
                                        </li>
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>

                            {/* خدمات */}
                            <NavigationMenuItem>
                                <NavigationMenuTrigger className="cursor-pointer relative bg-transparent text-sm font-medium text-text-main transition-colors duration-300 hover:text-text-main hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent data-[state=open]:text-text-main after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-text-main after:transition-all after:duration-300 hover:after:w-full data-[state=open]:after:w-full">
                                    خدمات
                                </NavigationMenuTrigger>
                                <NavigationMenuContent className="bg-surface-white shadow-md border border-border/50 rounded-xl">
                                    <ul className="flex w-44 flex-col gap-1 p-1.5 bg-surface-white">
                                        <li>
                                            <NavigationMenuLink className="block rounded-lg px-3 py-2 text-sm text-text-main transition-colors duration-300 hover:bg-surface-hover cursor-pointer">
                                                خدمات فنی
                                            </NavigationMenuLink>
                                        </li>
                                        <li>
                                            <NavigationMenuLink className="block rounded-lg px-3 py-2 text-sm text-text-main transition-colors duration-300 hover:bg-surface-hover cursor-pointer">
                                                آموزش و مشاوره
                                            </NavigationMenuLink>
                                        </li>
                                        <li>
                                            <NavigationMenuLink className="block rounded-lg px-3 py-2 text-sm text-text-main transition-colors duration-300 hover:bg-surface-hover cursor-pointer">
                                                طراحی و برنامه‌نویسی
                                            </NavigationMenuLink>
                                        </li>
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>

                            {/* فروشندگان */}
                            <NavigationMenuItem>
                                <button
                                    type="button"
                                    className={`${navigationMenuTriggerStyle()} cursor-pointer relative bg-transparent text-sm font-medium text-text-main transition-colors duration-300 hover:bg-transparent hover:text-text-main focus:bg-transparent after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-text-main after:transition-all after:duration-300 hover:after:w-full`}
                                >
                                    فروشندگان
                                </button>
                            </NavigationMenuItem>

                            {/* نمایندگی‌ها */}
                            <NavigationMenuItem>
                                <button
                                    type="button"
                                    className={`${navigationMenuTriggerStyle()} cursor-pointer relative bg-transparent text-sm font-medium text-text-main transition-colors duration-300 hover:bg-transparent hover:text-text-main focus:bg-transparent after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-text-main after:transition-all after:duration-300 hover:after:w-full`}
                                >
                                    نمایندگی‌ها
                                </button>
                            </NavigationMenuItem>

                        </NavigationMenuList>
                    </NavigationMenu>
                </div>

                {/* وسط: باکس سرچ */}
                <div className="hidden flex-1 max-w-md items-center md:flex">
                    <div className="relative w-full">
                        <input
                            type="text"
                            placeholder="جستجو در آگهی‌ها ..."
                            className="w-full rounded-full bg-surface-hover/60 py-2 pr-9 pl-4 text-sm text-text-main placeholder:text-text-muted outline-none transition-all focus:bg-surface-white focus:ring-1 focus:ring-blue-accent"
                        />
                        <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                    </div>
                </div>

                {/* سمت چپ: زبان، ثبت آگهی و آیکون‌ها */}
                <div className="flex items-center gap-2 sm:gap-3">
                    <div className="hidden items-center gap-2 lg:flex">
                        <button
                            type="button"
                            className="flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-text-main transition-colors duration-300 hover:bg-surface-hover cursor-pointer"
                        >
                            <Languages className="h-5 w-5 text-text-muted" />
                            <span className="text-sm font-medium">فارسی / IRT</span>
                        </button>

                        <button
                            type="button"
                            className="rounded-lg bg-transparent px-3 py-2 font-bold text-text-main transition-colors duration-300 hover:bg-surface-hover cursor-pointer"
                        >
                            ثبت آگهی جدید
                        </button>

                        <div className="h-5 w-[1px] bg-border/60 mx-1" />
                    </div>

                    {/* آیکون‌ها */}
                    <div className="flex items-center gap-1">
                        <button
                            type="button"
                            className="rounded-lg p-2 text-text-main transition-all duration-300 hover:bg-surface-hover hover:scale-105 cursor-pointer"
                        >
                            <Bell className="h-5 w-5" />
                        </button>
                        <button
                            type="button"
                            className="rounded-lg p-2 text-text-main transition-all duration-300 hover:bg-surface-hover hover:scale-105 cursor-pointer"
                        >
                            <ShoppingCart className="h-5 w-5" />
                        </button>
                        <button
                            type="button"
                            className="rounded-lg p-2 text-text-main transition-all duration-300 hover:bg-surface-hover hover:scale-105 cursor-pointer"
                        >
                            <LayoutGrid className="h-5 w-5" />
                        </button>
                    </div>
                </div>

            </div>
        </header>
    );
};