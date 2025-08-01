import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import { createGuest, getGuest } from './data-service';

const googleCreds = {
    clientId: process.env.AUTH_GOOGLE_ID,
    clientSecret: process.env.AUTH_GOOGLE_SECRET,
};
const providers = [Google(googleCreds)];
const authorized = ({ auth, request }) => !!auth?.user;
const signIn1 = async ({ user, account, profile }) => {
    try {
        const existingGuest = await getGuest(user.email);
        if (!existingGuest) {
            await createGuest({
                email: user.email,
                fullName: user.name,
            });
        }

        return true;
    } catch {
        return false;
    }
};
const session = async ({ session, user }) => {
    const guest = await getGuest(session.user.email);
    session.user.guestId = guest.id;
    return session;
};

const authConfig = {
    providers,
    callbacks: { authorized, signIn: signIn1, session },
    pages: { signIn: '/login' },
};

export const {
    auth,
    signIn,
    signOut,
    handlers: { GET, POST },
} = NextAuth(authConfig);
