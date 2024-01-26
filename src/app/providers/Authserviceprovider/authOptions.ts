import {
    getServerSession, type NextAuthOptions,
} from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authService } from "./userAuthentication";

export const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === "development",
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: '/user/login',
        error: '/user/login',
    },
    providers: [
        Credentials({
            name: "Credentials",
            type: "credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                console.log("credentials reached");
                const { username, password } = credentials as {
                    username: string
                    password: string
                };
                try {
                    const user = await authService.authenticate(username, password);
                    if (user) return user;
                } catch (error) {
                    console.log(error)
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, account, profile }) {
            if (account && account.type === "credentials") {
                token.userId = account.providerAccountId;
            }
            return token;
        },
        async session({ session, token, user }) {
            session.user.id = token.userId;
            return session;
        },
        async redirect({ url, baseUrl }) {
            return "/";
        },
    },
};

export const getServerAuthSession = () => getServerSession(authOptions);