import React from "react";
import {BarChart, Package, PenSquare, Settings2, Truck} from "lucide-react";
import {auth} from "@/server/auth";
import Link from "next/link";
import {cn} from "@/lib/utils";
import {usePathname} from "next/navigation";

export default async function DashboardLayout({children}: { children: React.ReactNode }) {
    const pathName = usePathname();
    const session = await auth();

    const userLinks = [
        {label: "Orders", path: "/dashboard/orders", icon: <Truck size={16}/>},
        {label: "Settings", path: "/dashboard/settings", icon: <Settings2 size={16}/>},
    ] as const;

    const adminLinks = session?.user.role === "admin" ? [
        {label: "Analytics", path: "/dashboard/analytics", icon: <BarChart size={16} />},
        {label: "Create", path: "/dashboard/add-product", icon: <PenSquare size={16} />},
        {label: "Products", path: "/dashboard/products", icon: <Package size={16} /> }
    ] : [];

    const allLinks = [...userLinks, ...adminLinks]

    return (
        <div>
            <nav className="py-2 overflow-auto">
                <ul className="flex gap-6 font-bold text-sm">
                    {allLinks.map((link) => (
                        <li key={link.path}>
                            <Link
                                className={cn("flex gap-1 flex-col items-center", pathName === link.path ? "" : "")}
                                href={link.path}
                            >
                                {link.icon}
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
            {children}
        </div>
    )

}