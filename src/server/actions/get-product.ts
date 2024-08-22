'use server';

import {createSafeActionClient} from "next-safe-action";
import {EditProductSchema} from "@/types/product-schema";
import {db} from "@/server/db";
import {products} from "@/server/schema";
import {eq} from "drizzle-orm";

export const getProductAction = createSafeActionClient()
.schema(EditProductSchema)
.action(async ({ parsedInput }) => {
    try {
        const product = await db.query.products.findFirst({
            where: eq(products.id, parsedInput.id)
        });
        return {success: product}
    } catch (err) {
        return {error: "failed to edit product " + err}
    }
});