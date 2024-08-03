'use server';

import {createSafeActionClient} from "next-safe-action";
import {NewPasswordSchema} from "@/types/new-password-schema";

export const passwordReset = createSafeActionClient()
.schema(NewPasswordSchema)
.action((async ({parsedInput}) => {
    const {password, token} = parsedInput;
    if (!token) {
        return {error: "No token found!"}
    }
}))