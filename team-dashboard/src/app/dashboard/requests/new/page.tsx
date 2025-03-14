"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createProductRequest } from "../actions";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function NewRequestPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [requestType, setRequestType] = useState("new_product");
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);

    try {
      const result = await createProductRequest(formData);

      if (result.success) {
        toast.success("Request submitted", {
          description: "Your request has been submitted successfully.",
        });
        router.push("/dashboard/requests");
      } else {
        toast.error("Error", {
          description: result.error || "Failed to submit request",
        });
      }
    } catch (error) {
      toast.error("Error", {
        description: "An unexpected error occurred",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Create New Request</CardTitle>
          <CardDescription>
            Submit a request for a new product, price change, or product update
          </CardDescription>
        </CardHeader>
        <form action={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Request Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="E.g., New Jersey Design"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Request Type</Label>
              <Select
                name="type"
                defaultValue={requestType}
                onValueChange={setRequestType}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select request type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new_product">New Product</SelectItem>
                  <SelectItem value="price_change">Price Change</SelectItem>
                  <SelectItem value="description_update">
                    Description Update
                  </SelectItem>
                  <SelectItem value="discount">Discount Request</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Provide details about your request..."
                rows={5}
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Request"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
