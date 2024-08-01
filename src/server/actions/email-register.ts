'use server';

import bcrypt from 'bcrypt';
import {createSafeActionClient} from "next-safe-action";
import {RegisterSchema} from "@/types/register-schema";
import {db} from "@/server/db";
import {eq} from "drizzle-orm";
import {users} from "@/server/schema";

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
                const verificationToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

            }
        }
    })

