import {auth} from "@/server/auth";
import {UserButton} from "@/components/navigation/user-button";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {LogIn} from "lucide-react";
import Logo from "@/components/navigation/logo.svg";
import Image from "next/image";

export default async function Nav() {
    const session = await auth();

    return (
        <header className="py-4">
            <nav>
                <ul className="flex justify-between">
                    <li>
                        <Link href="/">
                            <Image src={Logo} alt="Logo"/>
                        </Link>
                    </li>
                    {!session ? (
                            <li>
                                <Button asChild={true}>
                                    <Link className="flex gap-2" href="/auth/login">
                                        <LogIn size={16} />
                                        <span>Login</span>
                                    </Link>

                                </Button>
                            </li>
                        ) :
                        <li>
                            <UserButton user={session?.user} expires={session ? session.expires : ''}/>
                        </li>

                    }
                </ul>
            </nav>
        </header>
    )
}