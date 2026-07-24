'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginSchemaType } from '../schemas/login.schema';
import { loginUser } from '../services/auth.api';
import { useAuthStore } from '../store/auth.store';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export function LoginForm() {
    const setToken = useAuthStore((state) => state.setToken);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<LoginSchemaType>({
        resolver: zodResolver(loginSchema),
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

            // دسترسی به accessToken از طریق res.result.accessToken
            if (res?.result?.accessToken) {
                setToken(res.result.accessToken);
            } else {
                setErrorMsg('توکن دریافت نشد');
            }
        } catch (err: any) {
            setErrorMsg(err?.response?.data?.message || 'خطا در ورود به سیستم');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
            <Card className="w-full max-w-md shadow-lg dir-rtl">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-bold text-purple-700">ورود به باشگاه مشتریان پاراف</CardTitle>
                    <CardDescription>اطلاعات ورود را وارد کنید یا از مقادیر پیش‌فرض تست استفاده کنید</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">شماره همراه</label>
                            <input
                                {...register('phone')}
                                className="w-full rounded-md border border-slate-300 p-2.5 text-left text-sm outline-none focus:border-purple-600"
                                placeholder="989027927890"
                            />
                            {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">رمز عبور</label>
                            <input
                                type="password"
                                {...register('password')}
                                className="w-full rounded-md border border-slate-300 p-2.5 text-left text-sm outline-none focus:border-purple-600"
                                placeholder="******"
                            />
                            {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
                        </div>

                        {errorMsg && <div className="rounded-md bg-red-50 p-3 text-center text-sm text-red-600">{errorMsg}</div>}

                        <Button type="submit" disabled={loading} className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                            {loading ? 'در حال ورود...' : 'ورود به حساب'}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}