import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useState} from "react";
import {useAction} from "next-safe-action/hooks";
import {emailSignIn} from "@/server/actions/email-signin";
import * as z from "zod";
import {AuthCard} from "@/components/auth/auth-card";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {FormSuccess} from "@/components/auth/form-success";
import FormError from "@/components/auth/form-error";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {cn} from "@/lib/utils";
import {NewPasswordSchema} from "@/types/new-password-schema";
import {passwordReset} from "@/server/actions/new-password";

export const NewPasswordForm = () => {
    const form = useForm<z.infer<typeof NewPasswordSchema>>({
        resolver: zodResolver(NewPasswordSchema),
        defaultValues: {
            password: '',
            token: ''
        }
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const {execute, status} = useAction(passwordReset, {
        onSuccess({data}) {
            setSuccess(String(data?.success));
        },
        onError({error}) {
            setError(String(error));
        }
    });

    function onSubmit(values: z.infer<typeof NewPasswordSchema>) {
        execute(values);
    }

    return <AuthCard
        cardTitle="Enter a new password"
        backButtonHref="/auth/login"
        backButtonLabel="Back to Login"
        showSocials
    >
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
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
                            Reset password
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    </AuthCard>
}
