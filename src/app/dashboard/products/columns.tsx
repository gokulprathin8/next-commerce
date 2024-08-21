"use client"

import { ColumnDef } from "@tanstack/react-table"
import Image from "next/image";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {MoreHorizontal} from "lucide-react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
    id: string
    amount: number
    status: "pending" | "processing" | "success" | "failed"
    email: string
}

type ProductColumn = {
    id: number,
    title: string,
    price: number,
    image: string,
    variants: string[]
}

export const columns: ColumnDef<ProductColumn>[] = [
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "title",
        header: "Title",
    },
    {
        accessorKey: "price",
        header: "Price",
        cell: ({row}) => {
            const price = parseFloat(row.getValue("price"));
            const formatted = new Intl.NumberFormat("en-US", {
                currency: "USD",
                style: "currency",
            }).format(price)
            return <div className="font-medium text-xs">
                {formatted}
            </div>
        }
    },
    {
        accessorKey: "image",
        header: "Image",
        cell: ({row}) => {
            const image = row.getValue("image")! as string;
            const cellTitle = row.getValue("title")! as string;
            return <Image src={image} alt={cellTitle} width={35} height={35} className="rounded-md" />
        }
    },
    {
        accessorKey: "variants",
        header: "Variants",
    },
    {
        accessorKey: "actions",
        header: "Actions",
        cell: ({row}) => {
            const product = row.original;
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem className="dark:focus:bg-primary focus:bg-primary/50 cursor-pointer">Edit Product</DropdownMenuItem>
                        <DropdownMenuItem className="dark:focus:bg-destructive focus:bg-destructive/50 cursor-pointer">Delete Product</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        }
    },
]
