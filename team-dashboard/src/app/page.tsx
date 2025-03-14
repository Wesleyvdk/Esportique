import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function Home() {
  // Check if user is authenticated
  const token = (await cookies()).get("team_token")?.value;

  // Redirect based on authentication status
  if (token) {
    redirect("/dashboard");
  } else {
    redirect("/login");
  }
}
