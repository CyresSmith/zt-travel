import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

type EmailAndTokenData = { email: string; token: string };

export const sendVerificationEmail = async ({ email, token }: EmailAndTokenData) => {
    const confirmationLink = `${process.env.APP_HOST}/auth/new-verification?token=${token}`;

    await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: 'Confirm Your email',
        html: `<p>Click <a href="${confirmationLink}">here</a> to confirm Your email</p>`,
    });
};

export const sendResetPasswordEmail = async ({ email, token }: EmailAndTokenData) => {
    const confirmationLink = `${process.env.APP_HOST}/auth/new-password?token=${token}`;

    await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: 'Reset Your password!',
        html: `<p>Click <a href="${confirmationLink}">here</a> to reset Your password</p>`,
    });
};

export const sendTwoFactorTokenEmail = async ({ email, token }: EmailAndTokenData) => {
    await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: 'Your 2FA code!',
        html: `Your 2fa code: <b>${token}</b>`,
    });
};
