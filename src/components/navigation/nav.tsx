import {auth} from "@/server/auth";
import {UserButton} from "@/components/navigation/user-button";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {LogIn} from "lucide-react";

export default async function Nav() {
    const session = await auth();
    console.log(session);

    return (
        <header className="bg-slate-500 py-4">
            <nav>
                <ul className="flex justify-between">
                    <li>Logo</li>
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