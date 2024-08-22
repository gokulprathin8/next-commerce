'use server';

import {createSafeActionClient} from "next-safe-action";
import {DeleteProductSchema} from "@/types/product-schema";
import {db} from "@/server/db";
import {products} from "@/server/schema";
import {eq} from "drizzle-orm";
import {revalidatePath} from "next/cache";


export const deleteProductAction = createSafeActionClient()
    .schema(DeleteProductSchema)
    .action(async ({parsedInput}) => {

        try {
            const data = await db.delete(products)
                .where(eq(products.id, parsedInput.id))
                .returning()
            revalidatePath("/dashboard/produts")
            return {success: `product ${data[0].title} has been deleted`}
        } catch (err) {
            return {error: "failed to delete product: " + err}
        }
})