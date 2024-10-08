'use client';

import {useForm} from "react-hook-form";
import {zProductSchema, ProductSchema} from '@/types/product-schema';
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription} from "@/components/ui/card";
import {DollarSign} from "lucide-react";
import Tiptap from "@/app/dashboard/add-product/tiptap";
import {zodResolver} from "@hookform/resolvers/zod";
import {useAction} from "next-safe-action/hooks";
import {createProduct} from "@/server/actions/create-product";
import {useRouter, useSearchParams} from "next/navigation";
import {toast} from "sonner";
import {getProductAction} from "@/server/actions/get-product";
import {useEffect} from "react";

export default function ProductForm() {
    const form = useForm<zProductSchema>({
        resolver: zodResolver(ProductSchema),
        defaultValues: {
            title: "",
            description: "",
            price: 0
        },
        mode: "onSubmit"
    })

    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get("id");

    const checkProduct = async (id: number) => {
        if (id) {
            const data = await getProductAction({id})
            if (data?.data && data.data.error) {
                toast.error(data?.data.error);
            }
            if (data?.data && data.data.success) {
                form.setValue("title", data.data.success.title);
                form.setValue("price", data.data.success.price);
                form.setValue("description", data.data.success.description as string);
                form.setValue("id", data.data.success.id);
            }
        }
    }

    useEffect(() => {
        if (id) {
            checkProduct(parseInt(id)).then(r => {})
        }
    }, [])

    const {execute, status} = useAction(createProduct, {
        onSuccess: ({ data, input }) => {
            if (data?.success) {
                console.log(data.success)
                router.push("/dashboard/products/")
                toast.success(data.success)
            }
        },
        onExecute: ({input}) => {
            toast.loading(`creating product: ${input.title}`)
        },
        onError: ({error}) => {
            console.log(error);
            toast.error(error.fetchError);
        },
    })

    function onSubmit(values: zProductSchema) {
        execute(values);
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>{id ? "Edit Product" : "Create a New Product"}</CardTitle>
                <CardDescription>{id ? "Change your product details below" : "Fill out the below form to add a new product"}</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Product Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Stripe" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Tiptap val={field.value} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <div className="flex items-center gap-3">
                                            <DollarSign size={32} className="p-2 bg-muted rounded-md"/>
                                            <Input {...field} type="number" placeholder="Your price (in USD)" step="0.1" {...field} />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button disabled={status === "executing" || !form.formState.isValid || !form.formState.isDirty} className="w-full" type="submit">Submit</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}