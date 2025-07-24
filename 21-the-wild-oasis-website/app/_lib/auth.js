import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import { createGuest, getGuest } from './data-service';

const googleCreds = {
    clientId: process.env.AUTH_GOOGLE_ID,
    clientSecret: process.env.AUTH_GOOGLE_SECRET,
};
const providers = [Google(googleCreds)];

const authConfig = {
    providers,
};

export const {
    auth,
    handlers: { GET, POST },
} = NextAuth(authConfig);
