import NextAuth from "next-auth"
import {DrizzleAdapter} from "@auth/drizzle-adapter";
import type {Adapter} from 'next-auth/adapters';
import {db} from "@/server/db"
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import Credentials from "@auth/core/providers/credentials";
import {LoginSchema} from "@/types/login-schema";
import {eq} from "drizzle-orm";
import {accounts, users} from "@/server/schema";
import bcrypt from "bcrypt";

// class InvalidLoginError extends CredentialsSignin {
//     code = "Invalid identifier or password"
// }

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: DrizzleAdapter(db) as Adapter,
    secret: process.env.SECRET!,
    session: {strategy: "jwt"},
    callbacks: {
        async jwt({token}) {
            if (!token.sub) return token
            const existingUser = await db.query.users.findFirst({
                where: eq(users.id, token.sub)
            });
            token.isOAuth = await db.query.accounts.findFirst({
                where: eq(accounts.userId, existingUser?.id)
            })
            token.name = existingUser?.name
            token.email = existingUser?.email
            token.role = existingUser?.role
            token.isTwoFactorEnabled = existingUser?.twoFactorEnabled
            token.image = existingUser?.image
            return token;
        }
    },
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            allowDangerousEmailAccountLinking: true,
       }),
        Github({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
            allowDangerousEmailAccountLinking: true,
        }),
        Credentials({
            authorize: async (credentials) => {
                const validatedFields = LoginSchema.safeParse(credentials);
                if (validatedFields.success) {
                    const {email, password} = validatedFields.data;
                    const user = await db.query.users.findFirst({
                        where: eq(users.email, email),
                    })
                    if (!user || !user.password) return null;
                    const passwordMatch = await bcrypt.compare(password, user.password);
                    if (passwordMatch) {
                        return user;
                    }
                }
                return null;
            }
        })
    ],
})