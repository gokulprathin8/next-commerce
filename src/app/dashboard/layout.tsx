import React from "react";
import {BarChart, Package, PenSquare, Settings2, Truck} from "lucide-react";
import {auth} from "@/server/auth";
import Link from "next/link";
import {cn} from "@/lib/utils";
import {usePathname} from "next/navigation";
import DashboardNav from "@/components/navigation/dashboard-nav";

export default async function DashboardLayout({children}: { children: React.ReactNode }) {

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
            <DashboardNav allLinks={allLinks} />
            {children}
        </div>
    )

}