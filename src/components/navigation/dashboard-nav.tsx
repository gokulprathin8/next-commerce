"use client";

import {motion} from "framer-motion";
import Link from "next/link";
import {cn} from "@/lib/utils";
import React from "react";
import {usePathname} from "next/navigation";

export default function DashboardNav({allLinks}: {allLinks: {label: string; path: string; icon: JSX.Element}[]}) {
    const pathName = usePathname();

    return (
        <nav className="py-2 overflow-auto">
            <ul className="flex gap-6 font-bold text-sm">
                {allLinks.map((link) => (
                    <motion.li whileTap={{ scale: 0.95 }} key={link.path}>
                        <Link
                            className={cn("flex gap-1 flex-col items-center", pathName === link.path && "text-primary")}
                            href={link.path}
                        >
                            {link.icon}
                            {link.label}
                        </Link>
                    </motion.li>
                ))}
            </ul>
        </nav>)
}