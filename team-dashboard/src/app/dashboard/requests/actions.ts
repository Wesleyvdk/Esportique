"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

type RequestData = {
  title: string;
  type: string;
  description: string;
};

export async function createProductRequest(formData: FormData) {
  const token = (await cookies()).get("team_token")?.value;

  if (!token) {
    throw new Error("Authentication required");
  }

  const requestData: RequestData = {
    title: formData.get("title") as string,
    type: formData.get("type") as string,
    description: formData.get("description") as string,
  };

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL}/teams/requests`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestData),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to create request");
    }

    // Revalidate the requests page to show the new request
    revalidatePath("/dashboard/requests");

    return { success: true };
  } catch (error) {
    console.error("Error creating request:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}
