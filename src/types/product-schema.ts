import {z} from "zod"

export const ProductSchema = z.object({
    id: z.number().optional(),
    title: z.string().min(5, {
        message: "Title must be a minimum of 5 characters long"
    }),
    description: z.string().min(40, {
        message: "Description must be at least 40 characters long",
    }),
    price: z.coerce.number({invalid_type_error: "Price must be a number"})
        .positive({message: "Price must be a positive number"})
});

export const EditProductSchema = z.object({
    id: z.number(),
})


export const DeleteProductSchema = z.object({
    id: z.number(),
})

export type zProductSchema = z.infer<typeof ProductSchema>;
export type zDeleteProductSchema = z.infer<typeof DeleteProductSchema>;
export type zEditProductSchema = z.infer<typeof EditProductSchema>;