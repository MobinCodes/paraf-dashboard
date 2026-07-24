import { z } from 'zod';

export const loginSchema = z.object({
    phone: z.string().min(10, 'شماره موبایل وارد شده معتبر نیست'),
    password: z.string().min(6, 'کلمه عبور باید حداقل ۶ کاراکتر باشد'),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;