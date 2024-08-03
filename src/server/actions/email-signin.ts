'use server';

import {createSafeActionClient} from "next-safe-action";
import {LoginSchema} from "@/types/login-schema";
import {db} from "@/server/db";
import {eq} from "drizzle-orm";
import {users} from "@/server/schema";
import {generateEmailVerificationToken} from "@/server/actions/tokens";
import {sendVerificationEmail} from "@/server/actions/sendEmail";
import {signIn} from "@/server/auth";

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

            await signIn("credentials", {
                email,
                password,
                redirectTo: "/",
            })

            return {success: email};

        } catch (error) {
            console.error(error);
            return {error: `An error occurred: ${error}`};
        }
    }
));
