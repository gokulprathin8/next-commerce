'use client';

import {Session} from "next-auth";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {LogOut, Moon, Settings, Sun, Truck} from "lucide-react";
import {useTheme} from "next-themes";
import {Switch} from "@/components/ui/switch";
import {useEffect, useState} from "react";
import {redirect, useRouter} from "next/navigation";

export const UserButton = ({user}: Session) => {
    const { theme, setTheme } = useTheme();
    const [isChecked, setIsChecked] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setIsChecked(theme === "dark");
    }, [theme]);

    const themeState = isChecked ? "light" : "dark";
    function switchThemeState() {
        setIsChecked((prev) => !prev);
        setTheme(themeState);
    }

    return (
        <>
            <DropdownMenu modal={false}>
                <DropdownMenuTrigger>
                    <Avatar>
                        {user?.image ? (
                            <>
                                <AvatarImage src={user.image} />
                                <AvatarFallback>CN</AvatarFallback>
                            </>
                        ) : (
                            <>
                                <AvatarFallback className="bg-primary/25">
                                    <div className="font-bold">
                                        {user?.name?.charAt(0)}
                                    </div>
                                </AvatarFallback>
                            </>
                        )}
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>
                        <div className="text-center">Hi, {user?.name}</div>
                        <div>{user?.email}</div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => router.push("/dashboard/orders")}><Truck className="px-1 mr-1 group-hover:translate-x-1 duration-300"/>My Orders</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push("/dashboard/settings")}><Settings className="px-1 mr-1 group-hover:rotate-180 duration-300 ease-in-out"/> Settings</DropdownMenuItem>
                    <DropdownMenuItem>
                        <div className="flex items-center" onClick={(event) => event.stopPropagation()}>
                            {!isChecked ?
                                (
                                <Sun size="14" />
                                ) :
                                <Moon size="14"/>
                            }
                            <p className="ml-1">Theme &nbsp;<span>{themeState}</span></p>
                            <Switch checked={isChecked} onClick={() => switchThemeState()} />
                        </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="focus:bg-destructive/25"><LogOut className="px-1 mr-1 group-hover:scale-75 duration-300  ease-in-out"/> SignOut</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>

    )
}