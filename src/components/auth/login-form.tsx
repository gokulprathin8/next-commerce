'use client';

import {AuthCard} from "@/components/auth/auth-card";
import {Form} from "@/components/ui/form";
import {zodResolver} from "@hookform/resolvers/zod";
import {LoginSchema} from "../../../types/login-schema";
import * as z from "zod";
import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {useForm} from "react-hook-form";

export const LoginForm = () => {
    const form = useForm({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: '',
            password: '',
        }
    });

    function onSubmit(values: z.infer<typeof LoginSchema>) {
        console.log(values);
    }

    return (
        <AuthCard cardTitle="Welcome back!" backButtonHref="/auth/register" backButtonLabel="Create a new  accout"
                  showSocials >
            <div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name="email"
                            render={(field) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            alt="email"
                                            type="email"
                                            autoComplete="email"
                                            placeholder="johndoe@example.com"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            render={(field) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            alt="password"
                                            type="password"
                                            autoComplete="current-password"
                                            placeholder="***************"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>
            </div>
        </AuthCard>
    )
}