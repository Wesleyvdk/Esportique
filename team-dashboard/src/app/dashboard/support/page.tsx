"use client";

import { JSX, useState } from "react";
import {
  MessageSquare,
  Search,
  Filter,
  Plus,
  Clock,
  CheckCircle2,
  AlertCircle,
  MessageCircle,
} from "lucide-react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

// Mock data for support tickets
const mockTickets = [
  {
    id: "T-1001",
    subject: "Product upload issue",
    status: "open",
    priority: "high",
    category: "technical",
    created: "2023-11-15T10:30:00Z",
    updated: "2023-11-15T14:45:00Z",
    messages: [
      {
        id: "M-1",
        sender: "team",
        content:
          "I'm having trouble uploading new product images. The upload process gets stuck at 80%.",
        timestamp: "2023-11-15T10:30:00Z",
      },
      {
        id: "M-2",
        sender: "support",
        content:
          "Thank you for reporting this issue. Could you please provide more details about the file sizes and formats you're trying to upload?",
        timestamp: "2023-11-15T11:15:00Z",
      },
      {
        id: "M-3",
        sender: "team",
        content:
          "The images are JPG format, around 2MB each. I've tried with different images but the result is the same.",
        timestamp: "2023-11-15T11:45:00Z",
      },
      {
        id: "M-4",
        sender: "support",
        content:
          "We're investigating this issue. In the meantime, could you try reducing the image size to under 1MB and see if that works?",
        timestamp: "2023-11-15T14:45:00Z",
      },
    ],
  },
  {
    id: "T-1002",
    subject: "Payout delay",
    status: "in_progress",
    priority: "medium",
    category: "billing",
    created: "2023-11-10T09:15:00Z",
    updated: "2023-11-14T16:20:00Z",
    messages: [
      {
        id: "M-1",
        sender: "team",
        content:
          "Our monthly payout seems to be delayed. It usually arrives by the 10th but we haven't received it yet.",
        timestamp: "2023-11-10T09:15:00Z",
      },
      {
        id: "M-2",
        sender: "support",
        content:
          "I apologize for the delay. Let me check the status of your payout with our finance team.",
        timestamp: "2023-11-10T10:30:00Z",
      },
      {
        id: "M-3",
        sender: "support",
        content:
          "Our finance team has confirmed that there was a processing delay affecting several accounts. Your payout has been processed now and should arrive within 1-2 business days.",
        timestamp: "2023-11-14T16:20:00Z",
      },
    ],
  },
  {
    id: "T-1003",
    subject: "Request for custom product feature",
    status: "closed",
    priority: "low",
    category: "feature_request",
    created: "2023-11-05T14:20:00Z",
    updated: "2023-11-08T11:10:00Z",
    messages: [
      {
        id: "M-1",
        sender: "team",
        content:
          "We'd like to request a custom feature for our products: the ability to offer personalized engraving.",
        timestamp: "2023-11-05T14:20:00Z",
      },
      {
        id: "M-2",
        sender: "support",
        content:
          "Thank you for your feature request. I've forwarded this to our product team for consideration.",
        timestamp: "2023-11-06T09:45:00Z",
      },
      {
        id: "M-3",
        sender: "support",
        content:
          "Our product team has reviewed your request. While we can't implement personalized engraving at this time, we've added it to our feature roadmap for future consideration.",
        timestamp: "2023-11-08T11:10:00Z",
      },
      {
        id: "M-4",
        sender: "team",
        content:
          "Thank you for considering our request. We look forward to this feature in the future.",
        timestamp: "2023-11-08T11:30:00Z",
      },
    ],
  },
  {
    id: "T-1004",
    subject: "Discount code not working",
    status: "open",
    priority: "medium",
    category: "sales",
    created: "2023-11-12T16:45:00Z",
    updated: "2023-11-13T09:20:00Z",
    messages: [
      {
        id: "M-1",
        sender: "team",
        content:
          "Customers are reporting that our TEAMDEAL20 discount code isn't working at checkout.",
        timestamp: "2023-11-12T16:45:00Z",
      },
      {
        id: "M-2",
        sender: "support",
        content:
          "Thank you for reporting this. I'll check the discount code settings right away.",
        timestamp: "2023-11-13T09:20:00Z",
      },
    ],
  },
  {
    id: "T-1005",
    subject: "Question about revenue sharing",
    status: "closed",
    priority: "low",
    category: "billing",
    created: "2023-11-01T11:30:00Z",
    updated: "2023-11-03T15:40:00Z",
    messages: [
      {
        id: "M-1",
        sender: "team",
        content:
          "We'd like to understand how the revenue sharing calculation works for limited edition items.",
        timestamp: "2023-11-01T11:30:00Z",
      },
      {
        id: "M-2",
        sender: "support",
        content:
          "Great question! For limited edition items, the revenue sharing is calculated the same way as standard items: you receive 15% of the sale price. However, for items marked as 'Premium Limited Edition', you receive 20% of the sale price.",
        timestamp: "2023-11-02T10:15:00Z",
      },
      {
        id: "M-3",
        sender: "team",
        content: "Thank you for the clarification. That's very helpful.",
        timestamp: "2023-11-03T15:40:00Z",
      },
    ],
  },
];

// FAQ data
const faqData = [
  {
    question: "How do I request a new product?",
    answer:
      "To request a new product, go to the Requests page and click on 'Create New Request'. Select 'New Product' as the request type and fill in all the required details about the product you want to add to your store.",
  },
  {
    question: "When are payouts processed?",
    answer:
      "Payouts are processed on the 1st of each month for the previous month's sales. The funds typically arrive in your bank account within 3-5 business days after processing.",
  },
  {
    question: "How do I update my product information?",
    answer:
      "To update existing product information, go to the Products page, find the product you want to update, and click on 'View Details'. From there, you can create a request for changes by clicking on 'Request Changes'.",
  },
  {
    question: "What file formats are supported for product images?",
    answer:
      "We support JPG, PNG, and WebP formats for product images. The recommended image size is 1200x1200 pixels, and files should be under 2MB for optimal performance.",
  },
  {
    question: "How is the revenue share calculated?",
    answer:
      "The standard revenue share is 15% of the sale price for regular products. Premium and limited edition products may have different revenue share percentages, typically ranging from 15-25% depending on the product category and exclusivity.",
  },
  {
    question: "Can I offer discounts on my products?",
    answer:
      "Yes, you can request discount promotions for your products. Go to the Requests page, create a new request with the type 'Discount', and specify the products, discount percentage, and duration of the promotion.",
  },
  {
    question: "How do I change my team information?",
    answer:
      "You can update your team information by going to the Profile page. There you can edit your team name, contact information, description, and upload a new team logo.",
  },
];

export default function SupportPage() {
  const [activeTab, setActiveTab] = useState("tickets");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  type Ticket = {
    id: string;
    subject: string;
    status: string;
    priority: string;
    category: string;
    created: string;
    updated: string;
    messages: {
      id: string;
      sender: string;
      content: string;
      timestamp: string;
    }[];
  };

  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Filter tickets based on search query and status filter
  const filteredTickets = mockTickets.filter((ticket) => {
    const matchesSearch =
      ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || ticket.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleTicketSelect = (ticket: any) => {
    setSelectedTicket(ticket);
  };

  const handleSendMessage = (e: any) => {
    e.preventDefault();

    if (!newMessage.trim()) return;

    setIsSubmitting(true);

    // Simulate sending message
    setTimeout(() => {
      // In a real app, you would send this to your API
      toast.success("Message sent", {
        description: "Your message has been sent to support.",
      });

      setNewMessage("");
      setIsSubmitting(false);
    }, 1000);
  };

  const handleCreateTicket = () => {
    // In a real app, this would open a form or modal to create a new ticket
    toast.info("Create ticket", {
      description: "This would open a form to create a new support ticket.",
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold">Support</h1>
        <div className="flex items-center gap-2">
          <Button onClick={handleCreateTicket}>
            <Plus className="mr-2 h-4 w-4" />
            New Ticket
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList>
          <TabsTrigger value="tickets">
            <MessageSquare className="mr-2 h-4 w-4" />
            Support Tickets
          </TabsTrigger>
          <TabsTrigger value="faq">
            <MessageCircle className="mr-2 h-4 w-4" />
            FAQ
          </TabsTrigger>
        </TabsList>

        <TabsContent value="tickets" className="mt-4 space-y-4">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="w-full md:w-1/3">
              <Card className="h-full">
                <CardHeader className="p-4">
                  <div className="flex items-center gap-2">
                    <Input
                      placeholder="Search tickets..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="h-9"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-9 w-9 shrink-0"
                    >
                      <Search className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <Select
                      value={statusFilter}
                      onValueChange={setStatusFilter}
                    >
                      <SelectTrigger className="h-8">
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Tickets</SelectItem>
                        <SelectItem value="open">Open</SelectItem>
                        <SelectItem value="in_progress">In Progress</SelectItem>
                        <SelectItem value="closed">Closed</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="max-h-[600px] overflow-auto">
                    {filteredTickets.length > 0 ? (
                      filteredTickets.map((ticket) => (
                        <div
                          key={ticket.id}
                          className={`cursor-pointer border-b p-4 transition-colors hover:bg-accent/50 ${
                            selectedTicket?.id === ticket.id ? "bg-accent" : ""
                          }`}
                          onClick={() => handleTicketSelect(ticket)}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-muted-foreground">
                              {ticket.id}
                            </span>
                            <TicketStatusBadge
                              status={ticket.status as Status}
                            />
                          </div>
                          <h3 className="mt-1 font-medium">{ticket.subject}</h3>
                          <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                            <span>
                              {new Date(ticket.updated).toLocaleDateString()} •{" "}
                              {ticket.category.replace("_", " ")}
                            </span>
                            <TicketPriorityBadge
                              priority={
                                ticket.priority as "low" | "medium" | "high"
                              }
                            />
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="flex h-32 items-center justify-center">
                        <p className="text-muted-foreground">
                          No tickets found
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="w-full md:w-2/3">
              {selectedTicket ? (
                <Card className="h-full">
                  <CardHeader className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>{selectedTicket.subject}</CardTitle>
                        <CardDescription>
                          {selectedTicket.id} • Created on{" "}
                          {new Date(
                            selectedTicket.created
                          ).toLocaleDateString()}
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <TicketStatusBadge
                          status={selectedTicket.status as Status}
                        />
                        <TicketPriorityBadge
                          priority={
                            selectedTicket.priority as "low" | "medium" | "high"
                          }
                        />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="max-h-[400px] overflow-auto">
                      {selectedTicket.messages.map((message) => (
                        <div
                          key={message.id}
                          className={`mb-4 flex ${
                            message.sender === "team"
                              ? "justify-end"
                              : "justify-start"
                          }`}
                        >
                          <div
                            className={`max-w-[80%] rounded-lg p-3 ${
                              message.sender === "team"
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted"
                            }`}
                          >
                            <div className="flex items-center gap-2 text-xs">
                              <Avatar className="h-6 w-6">
                                <AvatarImage
                                  src={
                                    message.sender === "team"
                                      ? "/placeholder.svg"
                                      : "/placeholder.svg"
                                  }
                                  alt={message.sender}
                                />
                                <AvatarFallback>
                                  {message.sender === "team" ? "TE" : "SU"}
                                </AvatarFallback>
                              </Avatar>
                              <span className="font-medium">
                                {message.sender === "team"
                                  ? "You"
                                  : "Support Agent"}
                              </span>
                              <span className="text-muted-foreground">
                                {new Date(message.timestamp).toLocaleString()}
                              </span>
                            </div>
                            <p className="mt-2 text-sm">{message.content}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="p-4">
                    {selectedTicket.status !== "closed" ? (
                      <form
                        onSubmit={handleSendMessage}
                        className="flex w-full gap-2"
                      >
                        <Textarea
                          placeholder="Type your message..."
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          className="min-h-[80px] flex-1"
                        />
                        <Button
                          type="submit"
                          disabled={isSubmitting || !newMessage.trim()}
                        >
                          {isSubmitting ? "Sending..." : "Send"}
                        </Button>
                      </form>
                    ) : (
                      <div className="w-full rounded-lg border border-muted bg-muted/50 p-3 text-center text-sm text-muted-foreground">
                        This ticket is closed. Please create a new ticket if you
                        need further assistance.
                      </div>
                    )}
                  </CardFooter>
                </Card>
              ) : (
                <Card className="flex h-full items-center justify-center p-8">
                  <div className="text-center">
                    <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-medium">
                      No Ticket Selected
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Select a ticket from the list to view its details
                    </p>
                    <Button className="mt-4" onClick={handleCreateTicket}>
                      <Plus className="mr-2 h-4 w-4" />
                      Create New Ticket
                    </Button>
                  </div>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="faq" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>
                Find answers to common questions about using the team dashboard
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqData.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              <Separator className="my-6" />

              <div className="text-center">
                <h3 className="text-lg font-medium">
                  Can't find what you're looking for?
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Create a support ticket and our team will assist you
                </p>
                <Button className="mt-4" onClick={handleCreateTicket}>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Support Ticket
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

type Status = "open" | "in_progress" | "closed";

function TicketStatusBadge({ status }: { status: Status }) {
  const statusMap: Record<
    Status,
    {
      label: string;
      variant: "default" | "destructive" | "outline" | "secondary";
      icon: JSX.Element;
    }
  > = {
    open: {
      label: "Open",
      variant: "outline",
      icon: <Clock className="mr-1 h-3 w-3" />,
    },
    in_progress: {
      label: "In Progress",
      variant: "default",
      icon: <AlertCircle className="mr-1 h-3 w-3" />,
    },
    closed: {
      label: "Closed",
      variant: "secondary",
      icon: <CheckCircle2 className="mr-1 h-3 w-3" />,
    },
  };

  const { label, variant, icon } = statusMap[status] || statusMap.open;

  return (
    <Badge variant={variant} className="flex items-center">
      {icon}
      {label}
    </Badge>
  );
}

function TicketPriorityBadge({
  priority,
}: {
  priority: "low" | "medium" | "high";
}) {
  const priorityMap = {
    low: {
      label: "Low",
      className: "text-green-500 bg-green-500/10",
    },
    medium: {
      label: "Medium",
      className: "text-yellow-500 bg-yellow-500/10",
    },
    high: {
      label: "High",
      className: "text-red-500 bg-red-500/10",
    },
  };

  const { label, className } = priorityMap[priority];

  return (
    <span
      className={`rounded-full px-2 py-0.5 text-xs font-medium ${className}`}
    >
      {label}
    </span>
  );
}
