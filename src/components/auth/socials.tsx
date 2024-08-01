'use client';

import {Button} from "@/components/ui/button";
import {signIn} from "next-auth/react";
import {FcGoogle} from "react-icons/fc";
import {FaGithub} from "react-icons/fa";

export default function Socials() {
    return (
        <div className="flex flex-col items-center w-full gap-4">
            <Button
                className="flex gap-4 w-full"
                variant="outline"
                onClick={() => signIn('google', {redirect: false, callbackUrl: "/"})}
            >
                <FcGoogle size={24}/>
                <p>Sign-in with Google</p>
            </Button>
            <Button
                className="flex gap-4 w-full"
                variant="outline"
                onClick={() => signIn('github', {redirect: false, callbackUrl: "/"})}
            >
                <FaGithub size={24}/>
                <p>Sign-in with Github</p>
            </Button>
        </div>
    )
}