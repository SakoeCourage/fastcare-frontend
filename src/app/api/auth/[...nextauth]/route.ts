import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { authService } from "app/app/providers/Authserviceprovider/userAuthentication";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                console.log(credentials)
                const { username, password } = credentials as { username: string, password: string };
                try {
                    const user = await authService.authenticate(username, password);
                } catch (err) {
                    console.log("Error:", err);
                    return null;
                }
            },
        }),
    ],
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV == "development",
    pages: {
        signIn: "/user/login",
    }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }