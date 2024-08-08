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
import Image from "next/image";


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
            isTwoFactorEnabled: session.session.user?.twoFactorEnabled || undefined,
        }
    })

    function onSubmit(values: z.infer<typeof SettingsSchema>) {
        // execute(values);
    }
    console.log(session.session);

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

                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Avatar</FormLabel>
                                   <div className="flex items-center gap-4">
                                       {!form.getValues('image') && (
                                           <div className="font-bold">
                                               {session.session.user?.name?.charAt(0).toUpperCase()}
                                           </div>
                                       )}
                                       {form.getValues('image') && (
                                           <Image
                                               src={form.getValues('image')!}
                                               className="rounded-full"
                                               width={42}
                                               height={42}
                                               alt="user-form-image"
                                           />
                                       )}
                                   </div>
                                    <FormControl>
                                        <Input placeholder="User image" type="hidden" disabled={status === "executing"} {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        This is your public display name.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />


                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Avatar</FormLabel>
                                    <div className="flex items-center gap-4">
                                        {!form.getValues('image') && (
                                            <div className="font-bold">
                                                {session.session.user?.name?.charAt(0).toUpperCase()}
                                            </div>
                                        )}
                                        {form.getValues('image') && (
                                            <Image
                                                src={form.getValues('image')!}
                                                className="rounded-full"
                                                width={42}
                                                height={42}
                                                alt="user-form-image"
                                            />
                                        )}
                                    </div>
                                    <FormControl>
                                        <Input placeholder="User image" type="hidden" disabled={status === "executing"} {...field} />
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