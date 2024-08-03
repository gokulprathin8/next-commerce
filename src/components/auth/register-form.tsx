'use client';

import * as z from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import Link from "next/link";
import {useState} from "react";
import {useAction} from "next-safe-action/hooks";
import {AuthCard} from "@/components/auth/auth-card";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {RegisterSchema} from "@/types/register-schema";
import {emailRegister} from "@/server/actions/email-register";
import {FormSuccess} from "@/components/auth/form-success";
import FormError from "@/components/auth/form-error";

export const RegisterForm = () => {
    const form = useForm({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            username: '',
            email: '',
            password: '',
        }
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('')
    const {execute, status} = useAction(emailRegister, {
        onSuccess: ({data}) => {
           setSuccess(String(data?.success));
        },
        onError: ({error}) => {
            setError(String(error));
        }
    });

    function onSubmit(values: z.infer<typeof RegisterSchema>) {
        console.log(values);
        execute(values);
    }

    return <AuthCard
        cardTitle="Create a new account"
        backButtonHref="/auth/login"
        backButtonLabel="Already have an account?"
        showSocials
    >
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>

                    <FormField
                        control={form.control}
                        name="username"
                        render={({field}) => <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input
                                    alt="username"
                                    type="text"
                                    autoComplete="name"
                                    placeholder="johndoe"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription />
                            <FormMessage />
                        </FormItem>}
                    />
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
                    <FormSuccess message={success} />
                    <FormError message={error} />
                    <Button size="sm" variant="link" asChild>
                        <Link href="/auth/reset">Forgot your password?</Link>
                    </Button>
                    <div className="flex justify-center ">
                        <Button className={cn('w-full', status === 'executing' ? 'animate-pulse' : '')}>
                            Register
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    </AuthCard>
}
