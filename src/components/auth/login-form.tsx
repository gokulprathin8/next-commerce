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
import FormError from "@/components/auth/form-error";
import {FormSuccess} from "@/components/auth/form-success";

export const LoginForm = () => {
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: '',
            password: '',
        }
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showTwoFactor, setShowTwoFactor] = useState(false);

    const {execute, status} = useAction(emailSignIn, {
        onSuccess({data}) {
            setSuccess(String(data?.success));
            if (data?.twoFactor) {
                setShowTwoFactor(true);
            }
        },
        onError({error}) {
            setError(String(error));
        }
    });

    function onSubmit(values: z.infer<typeof LoginSchema>) {
        execute(values);
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
                    {showTwoFactor && (
                        <FormField
                            control={form.control}
                            name="code"
                            render={({field}) => <FormItem>
                                <FormLabel>We have sent you a two-factor code to your email.</FormLabel>
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
                    )}

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
                            Log in
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    </AuthCard>
}