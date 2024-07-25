import NextAuth from "next-auth"
import { DrizzleAdapter} from "@auth/drizzle-adapter";
import type { Adapter } from 'next-auth/adapters';
import { db } from "@/server/db"
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";


export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: DrizzleAdapter(db) as Adapter,
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
       }),
        Github({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        })
    ],
})