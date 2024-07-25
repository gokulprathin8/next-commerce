import {auth} from "@/server/auth";
import {UserButton} from "@/components/navigation/user-button";

export default async function Nav() {
    const session = await auth();
    console.log(session);

    return (
        <header className="bg-slate-500 py-4">
            <nav>
                <ul className="flex justify-between">
                    <li>Logo</li>
                    <li>
                        <UserButton user={session?.user}  expires={session ? session.expires : ''} />
                    </li>
                </ul>
            </nav>
        </header>
    )
}