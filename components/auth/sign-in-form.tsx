'use client';

import { useTransition } from 'react';
import { useForm } from 'react-hook-form';

import Link from 'next/link';

import { zodResolver } from '@hookform/resolvers/zod';
import { SignInSchema } from '@lib/schemas';
import { login } from 'actions/login';
import type { z } from 'zod';

import AuthFormWrapper from './auth-form-wrapper';

import { Button } from '@ui/button';
import { Form } from '@ui/form';

import FormInputField from '@components/form-input-field';

const defaultValues = { email: '', password: '' };

export type LoginFormValues = z.infer<typeof SignInSchema>;

const SignInForm = () => {
    const [isPending, startTransition] = useTransition();

    const form = useForm<LoginFormValues>({
        resolver: zodResolver(SignInSchema),
        defaultValues,
    });

    const handleSubmit = (values: LoginFormValues) => {
        startTransition(
            () =>
                login(values).then(data => {
                    //  if (data?.error) {
                    //      form.reset();
                    //      setError(data?.error);
                    //  }
                    //  if (data?.success) {
                    //      form.reset();
                    //      setSuccess(data?.success);
                    //  }
                    //  if (data?.twoFactor) {
                    //      setShowTwoFactor(true);
                    //  }
                })
            //  .catch(() => setError('Something went wrong!'))
        );
    };

    return (
        <AuthFormWrapper title="Sign in" desc="Is sign in form" buttonLabel="Sign in">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                    {Object.keys(defaultValues).map(key => (
                        <FormInputField<typeof form.control>
                            key={key}
                            control={form.control}
                            name={key as keyof LoginFormValues}
                            label={key}
                        />
                    ))}

                    <Button type="submit" variant="default" disabled={isPending}>
                        Sign in
                    </Button>
                </form>

                <div>
                    <Button variant="link" asChild disabled={false} className="px-0">
                        <Link href={'sign-up'}>Don&#39;t have an account?</Link>
                    </Button>
                </div>
            </Form>
        </AuthFormWrapper>
    );
};

export default SignInForm;
