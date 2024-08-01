'use server';

import {createSafeActionClient} from "next-safe-action";
import {LoginSchema} from "@/types/login-schema";
import {db} from "@/server/db";
import {eq} from "drizzle-orm";
import {users} from "@/server/schema";

export const emailSignIn = createSafeActionClient()
    .schema(LoginSchema)
    .action((async ({parsedInput: {email, password, code}}) => {
            // if user is in database
            const existingUser = await db.query.users.findFirst({
                where: eq(users.email, email)
            })

            // if user not found
            if (existingUser?.email !== email) {
                return {error: 'User not found'};
            }

            // check if email is verified
            // if (!existingUser?.emailVerified) {
            //     return {error: 'Email not verified'};
            // }

            return {success: email};
    }
));
