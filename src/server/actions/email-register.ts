'use server';

import bcrypt from 'bcrypt';
import {createSafeActionClient} from "next-safe-action";
import {RegisterSchema} from "@/types/register-schema";
import {db} from "@/server/db";
import {eq} from "drizzle-orm";
import {users} from "@/server/schema";
import {sendVerificationEmail} from "@/server/actions/sendEmail";
import {generateEmailVerificationToken} from "@/server/actions/tokens";


export const emailRegister = createSafeActionClient()
    .schema(RegisterSchema)
    .action(async ({parsedInput: {email, password, username}}) => {
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword);
        const existingUser = await db.query.users.findFirst({
            where: eq(users.email, email)
        });

        // check if user is already in database + check if they are verified
        if (existingUser) {
            if (!existingUser.emailVerified) {
                const verificationToken = await generateEmailVerificationToken(email);
                await sendVerificationEmail(verificationToken[0].email, verificationToken[0].token);
                return {success: 'email confirmation sent'}
            }
            return {error: 'email already in use'};
        }

        // logic for when user is not registered
        await db.insert(users).values({email, password: hashedPassword, name: username, });
        const verificationToken = await generateEmailVerificationToken(email);
        await sendVerificationEmail(verificationToken[0].email, verificationToken[0].token);
        return {success: 'email confirmation sent'};
    });