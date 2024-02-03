import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authService } from "app/app/providers/Authserviceprovider/userAuthentication";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: {},
                password: {},
            },
            async authorize(credentials) {
                const { username, password } = credentials as { username: string, password: string };
                try {
                    const user = await authService.authenticate(username, password)
                    return user;
                } catch (error) {
                    throw (error)
                }
            },
        }),
    ],
    session: {
        strategy: "jwt",
        maxAge: 1 * 24 * 60 * 60,
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.userId = user.id;
                token.name = user.username;
                token.email = user.username;
                token.accessToken = user.accessToken;
                token.refreshToken = user.refreshToken;
                token.user = user;
            }
            return token;
        },
        async session({ session, token }) {
            session.user.accessToken = token.accessToken
            session.user.passwordResetRequired = token.user.passwordResetRequired
            session.user.id = token.user.id
            session.user.refreshToken = token.refreshToken
            session.user.role = token.user.role
            session.user.id = token.userId
            session.user.username = token.user.username
            session.user.name = token.user.username
            session.user.email = token.user.username
            session.expires = token.expires
            return session;
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV == "development",
    pages: {
        signIn: "/user/login",
        error: '/user/login'
    },

}
