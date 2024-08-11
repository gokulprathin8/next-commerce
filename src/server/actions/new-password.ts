'use server';

import {createSafeActionClient} from "next-safe-action";
import {NewPasswordSchema} from "@/types/new-password-schema";
import {getPasswordResetTokenByToken} from "@/server/actions/tokens";
import {db} from "@/server/db";
import {eq} from "drizzle-orm";
import {passwordResetTokens, users} from "@/server/schema";
import bcrypt from "bcryptjs";

export const passwordReset = createSafeActionClient()
.schema(NewPasswordSchema)
.action((async ({parsedInput}) => {
    const {password, token} = parsedInput;
    if (!token) {
        return {error: "No token found!"}
    }

    // check if token is expired?
    const existingToken = await getPasswordResetTokenByToken(token);
    if (!existingToken) {
        return {error: "Token not found!"}
    }

    // check if token has expired?
    const hasExpired = new Date(existingToken.expires) < new Date();
    if (hasExpired) {
        return {error: "Token has expired"}
    }

    // check if the token matches the user?
    const existingUser = await db.query.users.findFirst({
        where: eq(users.email, existingToken.email)
    })
    if (!existingUser) {
        return {error: "user not found!"}
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.transaction(async (ctx) => {
        await ctx.update(users)
            .set({password: hashedPassword})
            .where(eq(users.id, existingUser.id));
        await ctx
            .delete(passwordResetTokens)
            .where(eq(passwordResetTokens.token, existingToken.token))
    });
    return {success: 'password updated'}
}))