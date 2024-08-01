'use server';

import {db} from "@/server/db";
import {eq} from "drizzle-orm";
import {emailTokens} from "@/server/schema";

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
    await db.insert(emailTokens).values({email, token, expires: expiration}).execute();
}