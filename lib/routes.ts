/**
 *The prefix for API auth routes.
 *Routes that start with this prefix are used for API authentication purposes
 *@type {string}
 */
export const apiAuthPrefix: string = '/api/auth';

/**
 *The default redirect path after for sign in
 *@type {string}
 */
export const SIGN_IN_REDIRECT: string = '/sign-in';

/**
 *The default redirect path after logging in
 *@type {string}
 */
export const DEFAULT_SIGN_IN_REDIRECT: string = '/';

/**
 *The default redirect path after signing out
 *@type {string}
 */
export const DEFAULT_SIGN_UP_REDIRECT: string = '/';

/**
 *An array of routs that are accessible to the public.
 *This routes do not required authentication
 *@type {string[]}
 */
export const publicRoutes: string[] = ['/', '/en', '/auth/new-verification'];

/**
 *An array of routs that are accessible to logged in users.
 *This routes required authentication
 *@type {string[]}
 */
export const protectedRoutes: string[] = ['/dashboard', '/en/dashboard'];

/**
 *An array of routs that are used for authentication.
 *This routes will redirect logged users to /dashboard
 *@type {string[]}
 */
export const authRoutes: string[] = [
    '/sign-in',
    '/en/sign-in',
    '/sign-up',
    '/en/sign-up',
    '/error',
    '/reset',
    '/en/reset',
    '/new-password',
    '/en/new-password',
];
