import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { z } from 'zod';

import { enRegex, ukRegex } from '@regexps';

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

const zPhone = z.string().transform((arg, ctx) => {
    if (!arg) return arg;

    const phone = parsePhoneNumberFromString(arg, {
        defaultCountry: 'UA',
        defaultCallingCode: '+380',
        extract: true,
    });

    if (phone && phone.isValid()) {
        return phone.formatInternational();
    }

    ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Invalid phone number',
    });

    return z.NEVER;
});

export const AddPlaceSchema = z
    .object({
        nameUk: z
            .string()
            .min(3, { message: 'Min 3 characters' })
            .regex(ukRegex, { message: 'Cyrillic symbols required' }),
        nameEn: z
            .string()
            .min(3, { message: 'Min 3 characters' })
            .regex(enRegex, { message: 'Latin symbols required' }),
        descUk: z
            .string()
            .min(50, { message: 'Min 50 characters' })
            .regex(ukRegex, { message: 'Cyrillic symbols required' }),
        descEn: z
            .string()
            .min(50, { message: 'Min 50 characters' })
            .regex(enRegex, { message: 'Latin symbols required' }),
        addressUk: z
            .string()
            .min(10, { message: 'Min 10 characters' })
            .regex(ukRegex, { message: 'Cyrillic symbols required' }),
        addressEn: z
            .string()
            .min(10, { message: 'Min 10 characters' })
            .regex(enRegex, { message: 'Latin symbols required' }),
        categoryId: z.string().min(1, { message: 'Category required!' }),
        districtId: z.string().min(1, { message: 'District required!' }),
        communityId: z.string().min(1, { message: 'Community required!' }),
        email: z.string().email({ message: 'Not valid email!' }).optional().or(z.literal('')),
        phone: zPhone.or(z.literal('')),
        url: z
            .string()
            .optional()
            .nullable()
            .refine(value => !value || enRegex.test(value), { message: 'Latin symbols required' })
            .or(z.literal('')),

        facebook: z
            .string()
            .optional()
            .nullable()
            .refine(value => !value || enRegex.test(value), { message: 'Latin symbols required' })
            .or(z.literal('')),

        instagram: z
            .string()
            .optional()
            .nullable()
            .refine(value => !value || enRegex.test(value), { message: 'Latin symbols required' })
            .or(z.literal('')),

        gmapsUrl: z
            .string()
            .optional()
            .nullable()
            .refine(value => !value || enRegex.test(value), { message: 'Latin symbols required' })
            .or(z.literal('')),
        latitude: z.string().optional().nullable(),
        longitude: z.string().optional().nullable(),
        logo: z.string().optional().nullable().or(z.literal('')),
        image: z.string().optional().nullable().or(z.literal('')),
        // images: z.string().array().optional(),
    })
    .refine(
        data => {
            const latitudeExists = data.latitude !== undefined && data.latitude !== null;
            const longitudeExists = data.longitude !== undefined && data.longitude !== null;
            return latitudeExists === longitudeExists;
        },
        {
            message: 'Both latitude and longitude must be provided together or both must be empty.',
            path: ['latitude', 'longitude'],
        }
    );

export const AddEventSchema = z.object({
    nameUk: z
        .string()
        .min(3, { message: 'Min 3 characters' })
        .regex(ukRegex, { message: 'Cyrillic symbols required' }),
    nameEn: z
        .string()
        .min(3, { message: 'Min 3 characters' })
        .regex(enRegex, { message: 'Latin symbols required' }),
    descUk: z
        .string()
        .min(50, { message: 'Min 50 characters' })
        .regex(ukRegex, { message: 'Cyrillic symbols required' }),
    descEn: z
        .string()
        .min(50, { message: 'Min 50 characters' })
        .regex(enRegex, { message: 'Latin symbols required' }),
    addressUk: z
        .string()
        .min(10, { message: 'Min 10 characters' })
        .regex(ukRegex, { message: 'Cyrillic symbols required' }),
    addressEn: z
        .string()
        .min(10, { message: 'Min 10 characters' })
        .regex(enRegex, { message: 'Latin symbols required' }),
    categoryId: z.string().optional().or(z.literal('')),
    districtId: z.string().min(1, { message: 'District required!' }),
    communityId: z.string().min(1, { message: 'Community required!' }),
    email: z.string().email({ message: 'Not valid email!' }).optional().or(z.literal('')),
    phone: zPhone,
    url: z
        .string()
        .optional()
        .refine(value => !value || enRegex.test(value), { message: 'Latin symbols required' })
        .or(z.literal('')),
    image: z.string().optional().or(z.literal('')),
    start: z.date(),
    duration: z.string().length(5),
    periodic: z.boolean(),
    tags: z.array(
        z.object({
            value: z.string(),
            label: z.string(),
        })
    ),
    // placeId: z.string().optional().or(z.literal('')),
});

export const AddArticleSchema = z.object({
    nameUk: z
        .string()
        .min(3, { message: 'Min 3 characters' })
        .regex(ukRegex, { message: 'Cyrillic symbols required' }),
    nameEn: z
        .string()
        .min(3, { message: 'Min 3 characters' })
        .regex(enRegex, { message: 'Latin symbols required' }),
    descUk: z
        .string()
        .min(30, { message: 'Min 30 characters' })
        .regex(ukRegex, { message: 'Cyrillic symbols required' }),
    descEn: z
        .string()
        .min(30, { message: 'Min 30 characters' })
        .regex(enRegex, { message: 'Latin symbols required' }),
    textUk: z
        .string()
        .min(50, { message: 'Min 50 characters' })
        .regex(ukRegex, { message: 'Cyrillic symbols required' }),
    textEn: z
        .string()
        .min(50, { message: 'Min 50 characters' })
        .regex(enRegex, { message: 'Latin symbols required' }),
    image: z.string().optional().or(z.literal('')),
    tags: z.array(
        z.object({
            value: z.string(),
            label: z.string(),
        })
    ),
    // placeId: z.string().optional().or(z.literal('')),
});
