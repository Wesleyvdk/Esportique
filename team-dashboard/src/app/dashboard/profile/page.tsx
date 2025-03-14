"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Check, Loader2, Upload } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/lib/auth-context";

export default function ProfilePage() {
  const { teamData } = useAuth();
  const router = useRouter();

  // If no team data, show loading state
  if (!teamData) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Team Profile</h1>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="branding">Branding</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="mt-6 space-y-4">
          <GeneralProfileForm team={teamData} />
        </TabsContent>

        <TabsContent value="security" className="mt-6 space-y-4">
          <SecurityForm />
        </TabsContent>

        <TabsContent value="branding" className="mt-6 space-y-4">
          <BrandingForm team={teamData} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function GeneralProfileForm({ team }: { team: any }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: team.name || "",
    email: team.email || "",
    phone: team.phone || "",
    address: team.address || "",
    description: team.description || "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Show success message
      toast.success("Profile updated", {
        description: "Your team profile has been updated successfully.",
      });
    } catch (error) {
      toast.error("Update failed", {
        description:
          "There was an error updating your profile. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>General Information</CardTitle>
        <CardDescription>Update your team's basic information</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Team Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your team name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="team@example.com"
                required
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+1 (555) 123-4567"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="123 Team St, City, Country"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Team Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Tell us about your team..."
              rows={4}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Check className="mr-2 h-4 w-4" />
                Save Changes
              </>
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}

function SecurityForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // Validate passwords match
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("Passwords don't match", {
        description: "New password and confirmation must match.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Reset form
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      // Show success message
      toast.success("Password updated", {
        description: "Your password has been changed successfully.",
      });
    } catch (error) {
      toast.error("Update failed", {
        description:
          "There was an error updating your password. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Security</CardTitle>
        <CardDescription>
          Update your password and security settings
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="currentPassword">Current Password</Label>
            <Input
              id="currentPassword"
              name="currentPassword"
              type="password"
              value={formData.currentPassword}
              onChange={handleChange}
              required
            />
          </div>

          <Separator />

          <div className="space-y-2">
            <Label htmlFor="newPassword">New Password</Label>
            <Input
              id="newPassword"
              name="newPassword"
              type="password"
              value={formData.newPassword}
              onChange={handleChange}
              required
              minLength={8}
            />
            <p className="text-xs text-muted-foreground">
              Password must be at least 8 characters long
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating...
              </>
            ) : (
              "Update Password"
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}

function BrandingForm({ team }: { team: any }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(team.logo || null);
  const [formData, setFormData] = useState({
    primaryColor: team.primaryColor || "#000000",
    secondaryColor: team.secondaryColor || "#ffffff",
    websiteUrl: team.websiteUrl || "",
    socialLinks: {
      twitter: team.socialLinks?.twitter || "",
      instagram: team.socialLinks?.instagram || "",
      facebook: team.socialLinks?.facebook || "",
    },
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    // Handle nested social links
    if (name.startsWith("social-")) {
      const socialPlatform = name.replace("social-", "");
      setFormData((prev) => ({
        ...prev,
        socialLinks: {
          ...prev.socialLinks,
          [socialPlatform]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleLogoChange = (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    setLogoFile(file);

    // Create preview URL
    const reader = new FileReader();
    reader.onload = () => {
      setLogoPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Show success message
      toast.success("Branding updated", {
        description: "Your team's branding has been updated successfully.",
      });
    } catch (error) {
      toast.error("Update failed", {
        description:
          "There was an error updating your branding. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Team Branding</CardTitle>
        <CardDescription>Customize your team's visual identity</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Team Logo</Label>
            <div className="flex items-center gap-4">
              <Avatar className="h-24 w-24">
                {logoPreview ? (
                  <AvatarImage src={logoPreview} alt={team.name} />
                ) : (
                  <AvatarFallback className="text-2xl">
                    {team.name?.substring(0, 2) || "TE"}
                  </AvatarFallback>
                )}
              </Avatar>
              <div className="flex flex-col gap-2">
                <Label
                  htmlFor="logo-upload"
                  className="flex cursor-pointer items-center gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm font-medium hover:bg-accent"
                >
                  <Upload className="h-4 w-4" />
                  Upload Logo
                </Label>
                <Input
                  id="logo-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleLogoChange}
                  className="hidden"
                />
                <p className="text-xs text-muted-foreground">
                  Recommended size: 512x512px. Max 2MB.
                </p>
              </div>
            </div>
          </div>

          <Separator />

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="primaryColor">Primary Color</Label>
              <div className="flex gap-2">
                <div
                  className="h-10 w-10 rounded-md border"
                  style={{ backgroundColor: formData.primaryColor }}
                />
                <Input
                  id="primaryColor"
                  name="primaryColor"
                  type="color"
                  value={formData.primaryColor}
                  onChange={handleChange}
                  className="h-10 w-full"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="secondaryColor">Secondary Color</Label>
              <div className="flex gap-2">
                <div
                  className="h-10 w-10 rounded-md border"
                  style={{ backgroundColor: formData.secondaryColor }}
                />
                <Input
                  id="secondaryColor"
                  name="secondaryColor"
                  type="color"
                  value={formData.secondaryColor}
                  onChange={handleChange}
                  className="h-10 w-full"
                />
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <Label htmlFor="websiteUrl">Team Website</Label>
            <Input
              id="websiteUrl"
              name="websiteUrl"
              type="url"
              value={formData.websiteUrl}
              onChange={handleChange}
              placeholder="https://yourteam.com"
            />
          </div>

          <div className="space-y-2">
            <Label>Social Media Links</Label>
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <Label htmlFor="social-twitter" className="sr-only">
                  Twitter
                </Label>
                <Input
                  id="social-twitter"
                  name="social-twitter"
                  value={formData.socialLinks.twitter}
                  onChange={handleChange}
                  placeholder="Twitter URL"
                />
              </div>
              <div>
                <Label htmlFor="social-instagram" className="sr-only">
                  Instagram
                </Label>
                <Input
                  id="social-instagram"
                  name="social-instagram"
                  value={formData.socialLinks.instagram}
                  onChange={handleChange}
                  placeholder="Instagram URL"
                />
              </div>
              <div>
                <Label htmlFor="social-facebook" className="sr-only">
                  Facebook
                </Label>
                <Input
                  id="social-facebook"
                  name="social-facebook"
                  value={formData.socialLinks.facebook}
                  onChange={handleChange}
                  placeholder="Facebook URL"
                />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Check className="mr-2 h-4 w-4" />
                Save Branding
              </>
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
