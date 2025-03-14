"use client";

import { useState, useRef, useEffect } from "react";
import { Send, X, MessageSquare, Loader2 } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";

type Message = {
  id: string;
  content: string;
  sender: "team" | "support";
  timestamp: Date;
  read: boolean;
};

export function SupportChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! How can we help you today?",
      sender: "support",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      read: true,
    },
  ]);
  const { teamData } = useAuth();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change or chat opens
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    setIsSending(true);

    // Add the team's message
    const newMessage: Message = {
      id: Date.now().toString(),
      content: message,
      sender: "team",
      timestamp: new Date(),
      read: false,
    };

    setMessages((prev) => [...prev, newMessage]);
    setMessage("");

    // Simulate API call to send message
    setTimeout(() => {
      // Simulate response from support
      const supportResponse: Message = {
        id: (Date.now() + 1).toString(),
        content:
          "Thanks for your message! Our team will get back to you shortly.",
        sender: "support",
        timestamp: new Date(),
        read: false,
      };

      setMessages((prev) => [...prev, supportResponse]);
      setIsSending(false);

      // Show notification if chat is closed
      if (!isOpen) {
        toast("New message from support", {
          description: supportResponse.content,
          action: {
            label: "View",
            onClick: () => setIsOpen(true),
          },
        });
      }
    }, 1000);
  };

  return (
    <>
      {/* Chat toggle button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        size="icon"
        variant="outline"
        className="fixed bottom-4 right-4 h-12 w-12 rounded-full shadow-lg"
        aria-label="Toggle support chat"
      >
        <MessageSquare className="h-6 w-6" />
      </Button>

      {/* Chat window */}
      <div
        className={cn(
          "fixed bottom-20 right-4 z-50 flex w-80 flex-col rounded-lg border bg-background shadow-xl transition-all duration-200 md:w-96",
          isOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4 pointer-events-none"
        )}
        style={{ height: "500px" }}
      >
        {/* Chat header */}
        <div className="flex items-center justify-between border-b p-3">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg" alt="Support" />
              <AvatarFallback>ES</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-sm font-medium">Esportique Support</h3>
              <p className="text-xs text-muted-foreground">
                We typically reply within an hour
              </p>
            </div>
          </div>
          <Button
            onClick={() => setIsOpen(false)}
            size="icon"
            variant="ghost"
            className="h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Chat messages */}
        <ScrollArea className="flex-1 p-3">
          <div className="flex flex-col gap-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  "flex max-w-[80%] flex-col rounded-lg p-3",
                  msg.sender === "team"
                    ? "ml-auto bg-primary text-primary-foreground"
                    : "bg-muted"
                )}
              >
                <p className="text-sm">{msg.content}</p>
                <span className="mt-1 text-right text-xs opacity-70">
                  {new Intl.DateTimeFormat("en-US", {
                    hour: "numeric",
                    minute: "numeric",
                  }).format(msg.timestamp)}
                </span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Chat input */}
        <div className="border-t p-3">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex gap-2"
          >
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="min-h-[40px] resize-none"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
            />
            <Button
              type="submit"
              size="icon"
              disabled={isSending || !message.trim()}
            >
              {isSending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
