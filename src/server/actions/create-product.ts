'use server';

import {createSafeActionClient} from "next-safe-action";
import {ProductSchema} from "@/types/product-schema";
import {db} from "@/server/db";
import {products} from "@/server/schema";
import {eq} from "drizzle-orm";

export const createProduct = createSafeActionClient()
    .schema(ProductSchema)
    .action(async ({parsedInput}) => {
        const {id, title, description, price} = parsedInput;
        try {
            if (id) {
                const currentProduct = await db.query.products.findFirst({
                    where: eq(products.id, id)
                })
                if (!currentProduct) return {error: "product not found"}
                await db.update(products)
                    .set({description: description, price: price, title: title})
                    .where(eq(products.id, id))
                return {success: "product updated!"}
            }
            if (!id) {
                await db.insert(products).values({
                    description: description,
                    price: price,
                    title: title
                })
                return {success: `product ${title} has been created`}
            }
        } catch (err) {
            console.log(err);
        }
    })