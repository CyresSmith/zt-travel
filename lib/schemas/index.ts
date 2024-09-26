import { enRegex, ukRegex } from '@lib/regexps';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
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

const zPhone = z.string().transform((arg, ctx) => {
    const phone = parsePhoneNumberFromString(arg, {
        defaultCountry: 'UA',
        defaultCallingCode: '+380',
        extract: false,
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
        email: z.string().email({ message: 'Not valid email!' }).optional(),
        phone: zPhone.optional(),
        url: z
            .string()
            .optional()
            .refine(value => !value || enRegex.test(value), { message: 'Latin symbols required' }),

        facebook: z
            .string()
            .optional()
            .refine(value => !value || enRegex.test(value), { message: 'Latin symbols required' }),

        instagram: z
            .string()
            .optional()
            .refine(value => !value || enRegex.test(value), { message: 'Latin symbols required' }),

        gmapsUrl: z
            .string()
            .optional()
            .refine(value => !value || enRegex.test(value), { message: 'Latin symbols required' }),
        latitude: z.string().optional(),
        longitude: z.string().optional(),
        // logo: z.string().optional(),
        // image: z.string().optional(),
        // images: z.string().array().optional(),
    })
    .refine(
        data => {
            const latitudeExists = !!data.latitude;
            const longitudeExists = !!data.longitude;
            return latitudeExists === longitudeExists;
        },
        {
            message: 'Both latitude and longitude must be provided together or both must be empty.',
            path: ['latitude', 'longitude'],
        }
    );
