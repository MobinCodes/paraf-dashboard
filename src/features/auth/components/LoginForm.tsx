'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginSchemaType } from '../schemas/login.schema';
import { loginUser } from '../services/auth.api';
import { useAuthStore } from '../store/auth.store';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { Phone, Lock, Eye, EyeOff, Loader2, AlertCircle, LogIn } from 'lucide-react';

export function LoginForm() {
    const setToken = useAuthStore((state) => state.setToken);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginSchemaType>({
        resolver: zodResolver(loginSchema as never),
        defaultValues: {
            phone: '989027927890',
            password: 'p.123456',
        },
    });

    const onSubmit = async (data: LoginSchemaType) => {
        setLoading(true);
        setErrorMsg('');
        try {
            const res = await loginUser(data);

            if (res?.result?.accessToken) {
                setToken(res.result.accessToken);
            } else {
                setErrorMsg('توکن دریافت نشد');
            }
        } catch (err: unknown) {
            if (typeof err === 'object' && err !== null && 'response' in err) {
                const apiError = err as {
                    response?: {
                        data?: {
                            message?: string;
                        };
                    };
                };
                setErrorMsg(apiError.response?.data?.message || 'خطا در ورود به سیستم');
            } else {
                setErrorMsg('خطا در ورود به سیستم');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center p-4 dir-rtl">
            <Card className="glass-card w-full max-w-md rounded-3xl border border-white/60 shadow-xl overflow-hidden">
                {/* هدر کارت */}
                <CardHeader className="text-center pb-4 pt-8 space-y-2">
                    <div className="mx-auto mb-2 flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-primary/10 text-purple-primary ring-8 ring-purple-primary/5">
                        <LogIn className="h-7 w-7" />
                    </div>
                    <CardTitle className="text-2xl font-black text-slate-900 tracking-tight">
                        ورود به <span className="text-purple-primary">پاراف‌کلاب</span>
                    </CardTitle>
                    <CardDescription className="text-xs sm:text-sm text-slate-500 font-medium">
                        اطلاعات حساب خود را جهت ورود وارد کنید
                    </CardDescription>
                </CardHeader>

                <CardContent className="p-6 sm:p-8 pt-2">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        {/* فیلد شماره همراه */}
                        <div className="space-y-2">
                            <Label htmlFor="phone" className="text-xs font-bold text-slate-700">
                                شماره همراه
                            </Label>
                            <div className="relative">
                                <Phone className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                <Input
                                    id="phone"
                                    type="text"
                                    dir="ltr"
                                    {...register('phone')}
                                    placeholder="989027927890"
                                    className="pr-10 text-left font-mono text-sm bg-white/80 border-slate-200 focus-visible:ring-purple-primary focus-visible:border-purple-primary rounded-xl h-11 transition-all"
                                />
                            </div>
                            {errors.phone && (
                                <p className="text-xs font-semibold text-rose-500 flex items-center gap-1 mt-1">
                                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                                    {errors.phone.message}
                                </p>
                            )}
                        </div>

                        {/* فیلد رمز عبور */}
                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-xs font-bold text-slate-700">
                                رمز عبور
                            </Label>
                            <div className="relative">
                                <Lock className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                <Input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    dir="ltr"
                                    {...register('password')}
                                    placeholder="••••••••"
                                    className="px-10 text-left font-mono text-sm bg-white/80 border-slate-200 focus-visible:ring-purple-primary focus-visible:border-purple-primary rounded-xl h-11 transition-all"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                                >
                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="text-xs font-semibold text-rose-500 flex items-center gap-1 mt-1">
                                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        {/* نمایش خطای سرور */}
                        {errorMsg && (
                            <div className="rounded-xl bg-rose-50 border border-rose-200 p-3 text-center text-xs font-bold text-rose-600 flex items-center justify-center gap-2 animate-shake">
                                <AlertCircle className="w-4 h-4 shrink-0" />
                                <span>{errorMsg}</span>
                            </div>
                        )}

                        {/* دکمه ورود */}
                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full h-11 bg-purple-primary hover:bg-purple-primary/90 text-white font-bold rounded-xl shadow-lg shadow-purple-primary/25 transition-all duration-300 hover:shadow-purple-primary/40 active:scale-[0.99]"
                        >
                            {loading ? (
                                <div className="flex items-center gap-2">
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    <span>در حال ورود...</span>
                                </div>
                            ) : (
                                <span>ورود به حساب کاربری</span>
                            )}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
