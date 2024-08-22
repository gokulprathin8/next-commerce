import {db} from "@/server/db";
import placeholder from "@/assets/placeholder-image.png"
import {DataTable} from "@/app/dashboard/products/data-table";
import {columns} from "@/app/dashboard/products/columns";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {Input} from "@/components/ui/input";

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
            <Card>
                <CardHeader>
                    <CardTitle>Your products</CardTitle>
                    <CardDescription>Update, delete and edit your products</CardDescription>
                </CardHeader>
                <CardContent>
                    <DataTable columns={columns} data={dataTable} />
                </CardContent>
            </Card>
        </div>
    )
}