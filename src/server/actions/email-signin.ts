'use server';

import {createSafeActionClient} from "next-safe-action";
import {LoginSchema} from "@/types/login-schema";

export const action = createSafeActionClient()
    .schema(LoginSchema)
    .action((async ({parsedInput: {email, password, code}}) => {
    console.log(email, password, code);
}));
