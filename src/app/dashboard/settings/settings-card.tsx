"use client"

import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {SettingsSchema} from "@/types/settings-schema";
import {Session} from "next-auth";


type SettingsForm = {
    session: Session
}

export default function SettingsCard(session: SettingsForm) {
    const form = useForm<z.infer<typeof SettingsSchema>>({
        resolver: zodResolver(SettingsSchema),
        defaultValues: {
            password: undefined,
            newPassword: undefined,
            name: session.session.user?.name || undefined,
            email: session.session.user?.email || undefined,
            isTwoFactorEnabled: session.session.user?.isTwoFactorEnabled || undefined,
        }
    })

    function onSubmit(values: z.infer<typeof SettingsSchema>) {
        execute(values);
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Your Settings</CardTitle>
                <CardDescription>Update your account settings</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="john doe" disabled={status === "executing"} {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        This is your public display name.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Submit</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}