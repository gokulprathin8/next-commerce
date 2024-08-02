'use server';

import {db} from "@/server/db";
import {eq} from "drizzle-orm";
import {emailTokens, users} from "@/server/schema";
import {retry} from "next/dist/compiled/@next/font/dist/google/retry";

async function getVerificationTokenByEmail(email: string) {
    try {
        return await db.query.emailTokens.findFirst({
            where: eq(emailTokens.token, email)
        })
    } catch (error) {
        return null;

    }
}

export const generateEmailVerificationToken = async (email: string) => {
    const token = crypto.randomUUID();
    const expiration = new Date(new Date().getTime() + 3600 * 1000);

    const existingToken = await getVerificationTokenByEmail(email);
    if (existingToken) {
        await db.delete(emailTokens).where(eq(emailTokens.id, existingToken.id));
    }
    return db.insert(emailTokens).values({email, token, expires: expiration}).returning();
}

export const newVerification = async (token: string) => {
    const existingToken = await getVerificationTokenByEmail(token);
    if (!existingToken) return {error: 'invalid token'};
    const hasExpired = new Date(existingToken.expires) < new Date();
    if (hasExpired) return {error: "token has expired"};

    const existingUser = await db.query.users.findFirst({
        where: eq(users.email, existingToken.email)
    });
    if (!existingUser) return {error: "email does not exist"}
    await db.update(users).set({
        emailVerified: new Date(),
        email: existingToken.email
    });

    await db.delete(emailTokens).where(eq(emailTokens.id, existingToken.id));
    return {success: 'email verified'};
}