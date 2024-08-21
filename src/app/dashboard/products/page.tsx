import {db} from "@/server/db";
import {desc} from "drizzle-orm";
import placeholder from "@/assets/placeholder-image.png"
import {DataTable} from "@/app/dashboard/products/data-table";
import {columns} from "@/app/dashboard/products/columns";

export default async function Products() {

    const products = await db.query.products.findMany({
        orderBy: (products, {desc}) => [desc(products.id)],
    })

    if (!products) throw new Error("no products found")

    const dataTable = products.map((product) => {
        return {
            id: product.id,
            title: product.title,
            price: product.price,
            variants: [],
            image: placeholder.src,
        }
    })

    return (
        <div>
            <p>Products</p>
            <DataTable columns={columns} data={dataTable} />
        </div>
    )
}