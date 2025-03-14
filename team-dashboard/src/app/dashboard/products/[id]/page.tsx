import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, PenBox } from "lucide-react";
import { cookies } from "next/headers";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

async function getProduct(id: string) {
  const token = (await cookies()).get("team_token")?.value;

  if (!token) {
    return null;
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL}/teams/products/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error("Failed to fetch product");
    }

    const data = await response.json();
    return data.product;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

export default async function ProductDetailPage(props: {
  params: { id: string };
}) {
  const params = await props.params;
  const product = await getProduct(params.id);

  if (!product) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/dashboard/products">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">{product.title}</h1>
        <Badge variant={product.status === "active" ? "default" : "secondary"}>
          {product.status === "active" ? "Active" : "Draft"}
        </Badge>
        <div className="ml-auto">
          <Button asChild>
            <Link href={`/dashboard/requests/new?productId=${product.id}`}>
              <PenBox className="mr-2 h-4 w-4" />
              Request Changes
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardContent className="p-0">
            <div className="relative aspect-square w-full">
              <Image
                src={product.thumbnail || "/placeholder.svg"}
                alt={product.title}
                fill
                className="object-cover"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Product Details</CardTitle>
            <CardDescription>
              View detailed information about this product
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                Description
              </h3>
              <p className="mt-1">{product.description}</p>
            </div>

            <Separator />

            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                Price
              </h3>
              <p className="mt-1 text-2xl font-bold">
                ${product.variants?.[0]?.prices?.[0]?.amount / 100 || 0}
              </p>
            </div>

            <Separator />

            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                Inventory
              </h3>
              <p className="mt-1">
                {product.variants?.reduce(
                  (acc: any, v: any) => acc + (v.inventory_quantity || 0),
                  0
                ) || 0}{" "}
                units in stock
              </p>
            </div>

            <Separator />

            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                Sales
              </h3>
              <p className="mt-1">{product.sales_count || 0} units sold</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Variants</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Variant</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {product.variants?.map((variant: any) => (
                <TableRow key={variant.id}>
                  <TableCell className="font-medium">
                    {variant.title === "Default Variant"
                      ? product.title
                      : variant.title}
                  </TableCell>
                  <TableCell>{variant.sku || "N/A"}</TableCell>
                  <TableCell>
                    ${variant.prices?.[0]?.amount / 100 || 0}
                  </TableCell>
                  <TableCell>{variant.inventory_quantity || 0}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
