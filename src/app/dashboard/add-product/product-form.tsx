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
import {useRouter} from "next/navigation";
import {toast} from "sonner";

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

    const {execute, status} = useAction(createProduct, {
        onSuccess: ({ data, input }) => {
            if (data?.success) {
                console.log(data.success)
                router.push("/dashboard/products/")
                toast.success(data.success)
            }
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
                <CardTitle>Create a New Product</CardTitle>
                <CardDescription>Fill out the below form to add a new product</CardDescription>
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