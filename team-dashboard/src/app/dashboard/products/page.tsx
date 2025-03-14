import Link from "next/link";
import { Eye, MoreHorizontal, PenBox } from "lucide-react";
import Image from "next/image";
import { cookies } from "next/headers";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

async function getProducts() {
  const token = (await cookies()).get("team_token")?.value;

  if (!token) {
    return [];
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL}/teams/products`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const data = await response.json();
    return data.products || [];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Products</h1>
        <Button asChild>
          <Link href="/dashboard/requests/new">
            <PenBox className="mr-2 h-4 w-4" />
            Request New Product
          </Link>
        </Button>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Products</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="draft">Drafts</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {products.length > 0 ? (
              products.map((product: any) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <div className="col-span-full text-center py-8">
                <p className="text-muted-foreground">No products found</p>
              </div>
            )}
          </div>
        </TabsContent>
        <TabsContent value="active" className="mt-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {products.filter((p: any) => p.status === "active").length > 0 ? (
              products
                .filter((product: any) => product.status === "active")
                .map((product: any) => (
                  <ProductCard key={product.id} product={product} />
                ))
            ) : (
              <div className="col-span-full text-center py-8">
                <p className="text-muted-foreground">
                  No active products found
                </p>
              </div>
            )}
          </div>
        </TabsContent>
        <TabsContent value="draft" className="mt-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {products.filter((p: any) => p.status === "draft").length > 0 ? (
              products
                .filter((product: any) => product.status === "draft")
                .map((product: any) => (
                  <ProductCard key={product.id} product={product} />
                ))
            ) : (
              <div className="col-span-full text-center py-8">
                <p className="text-muted-foreground">No draft products found</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function ProductCard({ product }: { product: any }) {
  return (
    <Card>
      <CardHeader className="p-0">
        <div className="relative h-48 w-full">
          <Image
            src={product.thumbnail || "/placeholder.svg"}
            alt={product.title}
            fill
            className="rounded-t-lg object-cover"
          />
          <div className="absolute right-2 top-2">
            <Badge
              variant={product.status === "active" ? "default" : "secondary"}
            >
              {product.status === "active" ? "Active" : "Draft"}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{product.title}</CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem asChild>
                <Link href={`/dashboard/products/${product.id}`}>
                  <Eye className="mr-2 h-4 w-4" />
                  View Details
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/dashboard/requests/new?productId=${product.id}`}>
                  <PenBox className="mr-2 h-4 w-4" />
                  Request Changes
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <CardDescription className="mt-2">
          ${product.variants?.[0]?.prices?.[0]?.amount / 100 || 0}
        </CardDescription>
        <div className="mt-4 flex items-center justify-between text-sm">
          <div>
            Stock:{" "}
            {product.variants?.reduce(
              (acc: any, v: any) => acc + (v.inventory_quantity || 0),
              0
            ) || 0}
          </div>
          <div>Sales: {product.sales_count || 0}</div>
        </div>
      </CardContent>
    </Card>
  );
}
