import { z } from 'zod';

export const SettingsSchema = z.object({
    name: z.string().min(3, 'Minimum 3 characters required!'),
});

export const ResetSchema = z.object({
    email: z.string().email({ message: 'Email is required!' }),
});

export const NewPasswordSchema = z.object({
    password: z.string().min(6, { message: 'Minimum 6 characters required!' }),
});

export const SignInSchema = z.object({
    email: z.string().email({ message: 'Email is required!' }),
    password: z.string().min(6, { message: 'Password is required!' }),
    code: z.optional(z.string().length(6, '6 characters required!')),
});

export const SignUpSchema = z
    .object({
        name: z.string().min(3, { message: 'Min 3 characters' }),
        email: z.string().email({ message: 'Email is required!' }),
        password: z.string().min(6, { message: 'Password is required!' }),
        confirmPassword: z.string().min(6, { message: 'Confirm password is required!' }),
    })
    .refine(({ password, confirmPassword }) => password === confirmPassword, {
        path: ['confirmPassword'],
        message: 'Паролі мають співпадати',
    });
