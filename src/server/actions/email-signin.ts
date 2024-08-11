'use server';

import {createSafeActionClient} from "next-safe-action";
import {LoginSchema} from "@/types/login-schema";
import {db} from "@/server/db";
import {eq} from "drizzle-orm";
import {twoFactorTokens, users} from "@/server/schema";
import {
    generateEmailVerificationToken,
    generateTwoFactorToken,
    getTwoFactorTokenByEmail
} from "@/server/actions/tokens";
import {sendTwoFactorTokenByEmail, sendVerificationEmail} from "@/server/actions/sendEmail";
import {signIn} from "@/server/auth";
import {AuthError} from "next-auth";
import {isRedirectError} from "next/dist/client/components/redirect";

export const emailSignIn = createSafeActionClient()
    .schema(LoginSchema)
    .action((async ({parsedInput: {email, password, code}}) => {
        try {
            // if user is in database
            const existingUser = await db.query.users.findFirst({
                where: eq(users.email, email)
            })

            // if user not found
            if (existingUser?.email !== email) {
                return {error: 'User not found'};
            }

            // if user is not verified
            if (!existingUser?.emailVerified) {
                const verificationToken = await generateEmailVerificationToken(existingUser?.email);
                await sendVerificationEmail(verificationToken[0].email, verificationToken[0].token);
                return {success: 'confirmation email sent'};
            }

            // 2FA TODO
            if (existingUser.twoFactorEnabled && existingUser.email) {
                if (code) {
                    const twoFactorToken = await getTwoFactorTokenByEmail(
                        existingUser.email
                    )
                    if (!twoFactorToken || twoFactorToken.token !== code) {
                        return { error: "Invalid Token" }
                    }
                    const hasExpired = new Date(twoFactorToken.expires) < new Date()
                    if (hasExpired) return { error: "Token has expired" }
                    await db
                        .delete(twoFactorTokens)
                        .where(eq(twoFactorTokens.id, twoFactorToken.id))
                } else {
                    const token = await generateTwoFactorToken(existingUser.email)
                    if (!token) return {error: "token not generated"}
                    await sendTwoFactorTokenByEmail(token[0].email, token[0].token)
                    return { twoFactor: "Two Factor Token Sent!" }
                }
            }

            await signIn("credentials", {
                email,
                password,
                redirectTo: "/"
            })

            return {success: email};
        } catch (error) {
            console.log(error);
            if (isRedirectError(error)) {
                throw error;
            }
            if (error instanceof AuthError) {
                switch (error.type) {
                    case "CredentialsSignin":
                        return { msg: "Invalid credentials" , status: "error"};
                    default:
                        return { msg: "Something went wrong", status: "error" };
                }
            }
        }
    }
));
