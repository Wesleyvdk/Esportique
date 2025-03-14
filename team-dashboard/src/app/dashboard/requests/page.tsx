import { Check, Clock, Eye, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NextRequest } from "next/server";

// Mock data for requests
const requests = [
  {
    id: "1",
    title: "New Jersey Design",
    type: "new_product",
    status: "pending",
    date: "2023-11-15",
    description:
      "Request for a new limited edition jersey design for the upcoming tournament.",
  },
  {
    id: "2",
    title: "Price Change for Hoodies",
    type: "price_change",
    status: "approved",
    date: "2023-11-10",
    description:
      "Request to increase the price of premium hoodies from $59.99 to $69.99.",
  },
  {
    id: "3",
    title: "Update Product Description",
    type: "description_update",
    status: "rejected",
    date: "2023-11-05",
    description:
      "Request to update the product description for the team cap to include new features.",
  },
  {
    id: "4",
    title: "New Mousepad Design",
    type: "new_product",
    status: "pending",
    date: "2023-11-02",
    description: "Request for a new mousepad design featuring the team logo.",
  },
  {
    id: "5",
    title: "Discount for Black Friday",
    type: "discount",
    status: "pending",
    date: "2023-10-28",
    description:
      "Request to apply a 20% discount on all products for Black Friday.",
  },
];

export default function RequestsPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Requests</h1>
        <Button>Create New Request</Button>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Requests</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-4">
          <div className="grid gap-4">
            {requests.map((request) => (
              <RequestCard key={request.id} request={request} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="pending" className="mt-4">
          <div className="grid gap-4">
            {requests
              .filter((request) => request.status === "pending")
              .map((request) => (
                <RequestCard key={request.id} request={request} />
              ))}
          </div>
        </TabsContent>
        <TabsContent value="approved" className="mt-4">
          <div className="grid gap-4">
            {requests
              .filter((request) => request.status === "approved")
              .map((request) => (
                <RequestCard key={request.id} request={request} />
              ))}
          </div>
        </TabsContent>
        <TabsContent value="rejected" className="mt-4">
          <div className="grid gap-4">
            {requests
              .filter((request) => request.status === "rejected")
              .map((request) => (
                <RequestCard key={request.id} request={request} />
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function RequestCard({ request }: { request: any }) {
  const statusMap: any = {
    pending: { label: "Pending", icon: Clock, variant: "outline" },
    approved: { label: "Approved", icon: Check, variant: "success" },
    rejected: { label: "Rejected", icon: X, variant: "destructive" },
  };

  const status = statusMap[request.status];

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between p-4">
        <div>
          <CardTitle className="text-lg">{request.title}</CardTitle>
          <CardDescription className="mt-1">
            {new Date(request.date).toLocaleDateString()} •{" "}
            {request.type
              .replace("_", " ")
              .replace(/\b\w/g, (l: any) => l.toUpperCase())}
          </CardDescription>
        </div>
        <Badge
          variant={status.variant === "success" ? "default" : status.variant}
        >
          <status.icon className="mr-1 h-3 w-3" />
          {status.label}
        </Badge>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-sm text-muted-foreground">{request.description}</p>
        <div className="mt-4 flex justify-end">
          <Button variant="ghost" size="sm">
            <Eye className="mr-2 h-4 w-4" />
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
