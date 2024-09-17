'use client';

import { useForm } from 'react-hook-form';

import Link from 'next/link';

import { zodResolver } from '@hookform/resolvers/zod';
import { SignUpSchema } from '@lib/schemas';
import { type z } from 'zod';

import AuthFormWrapper from './auth-form-wrapper';

import { Button } from '@ui/button';
import { Form } from '@ui/form';

import FormInputField from '@components/form-input-field';

const defaultValues = { name: '', email: '', password: '', confirmPassword: '' };

export type LoginFormValues = z.infer<typeof SignUpSchema>;

const SignUpForm = () => {
    const form = useForm<LoginFormValues>({
        resolver: zodResolver(SignUpSchema),
        defaultValues,
        mode: 'onChange',
        reValidateMode: 'onChange',
        shouldUseNativeValidation: false,
    });

    const handleSubmit = (values: LoginFormValues) => {
        console.log('🚀 ~ handleSubmit ~ values:', values);
        //  startTransition(() =>
        //      login(values)
        //          .then(data => {
        //              if (data?.error) {
        //                  form.reset();
        //                  setError(data?.error);
        //              }
        //              if (data?.success) {
        //                  form.reset();
        //                  setSuccess(data?.success);
        //              }
        //              if (data?.twoFactor) {
        //                  setShowTwoFactor(true);
        //              }
        //          })
        //          .catch(() => setError('Something went wrong!'))
        //  );
    };

    return (
        <AuthFormWrapper title="Sign up" buttonLabel="Sign up" desc="Is sign up form">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                    {Object.keys(defaultValues).map(key => {
                        const type =
                            key === 'password' || key === 'confirmPassword'
                                ? 'password'
                                : undefined;

                        return (
                            <FormInputField<typeof form.control>
                                key={key}
                                control={form.control}
                                name={key as keyof LoginFormValues}
                                label={key}
                                type={type}
                            />
                        );
                    })}
                </form>

                <div>
                    <Button variant="link" asChild disabled={false} className="px-0">
                        <Link href={'sign-in'}>Already have an account?</Link>
                    </Button>
                </div>
            </Form>
        </AuthFormWrapper>
    );
};

export default SignUpForm;
