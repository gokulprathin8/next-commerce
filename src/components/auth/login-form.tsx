'use client';

import {AuthCard} from "@/components/auth/auth-card";
import {Form} from "@/components/ui/form";
import {zodResolver} from "@hookform/resolvers/zod";
import {LoginSchema} from "@/types/login-schema";
import * as z from "zod";
import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {useForm} from "react-hook-form";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {emailSignIn} from "@/server/actions/email-signin";
import {useAction} from "next-safe-action/hooks";
import {cn} from "@/lib/utils";
import {useState} from "react";

export const LoginForm = () => {
    const form = useForm({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: '',
            password: '',
        }
    });

    const [error, setError] = useState(0);
    const {execute, status} = useAction(emailSignIn, {
        onSuccess(data) {
            console.log(data);
        }
    });

    function onSubmit(values: z.infer<typeof LoginSchema>) {
        console.log(values);
    }

    return <AuthCard
        cardTitle="Welcome back!"
        backButtonHref="/auth/register"
        backButtonLabel="Create a new  accout"
        showSocials
    >
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        control={form.control}
                        name="email"
                        render={({field}) => <FormItem>
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
                            </FormItem>}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({field}) => <FormItem>
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
                            </FormItem>}
                    />
                    <Button size="sm" variant="link" asChild>
                        <Link href="/auth/reset">Forgot your password?</Link>
                    </Button>
                    <div className="flex justify-center ">
                        <Button className={cn('w-full', status === 'executing' ? 'animate-pulse' : '')}>
                            Log in
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    </AuthCard>
}