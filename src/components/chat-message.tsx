//C:\AI_src\Companion_UI\SaaS-AI-Companion\src\components\chat-message.tsx

"use client";

import { useTheme } from "next-themes";
import { useToast } from "./ui/use-toast";
import { cn } from "../lib/utils";
import { BotAvatar } from "./bot-avatar";
import { BeatLoader } from "react-spinners";
import { UserAvatar } from "./user-avatar";
import { Button } from "./ui/button";
import { Copy } from "lucide-react";
import { Companion } from "@prisma/client";
import { ElementRef, useEffect, useRef } from "react";

export interface ChatMessageProps {
  role: "system" | "user";
  content?: string;
  isLoading?: boolean;
  src?: string;
}

interface ChatMessagesProps {
  messages: ChatMessageProps[];
  isLoading: boolean;
  companion: Companion;
}

const ChatMessage = ({ role, content, isLoading, src }: ChatMessageProps) => {
  const { toast } = useToast();
  const { theme } = useTheme();

  const onCopy = () => {
    if (!content) {
      return;
    }
    navigator.clipboard.writeText(content);
    toast({
      description: "Message copied to clipboard",
    });
  };

  return (
    <div
      className={cn(
        "group flex items-start gap-x-3 py-4 w-full",
        role === "user" && "justify-end"
      )}
    >
      {role !== "user" && src && <BotAvatar src={src ?? "/images/default-avatar.png"} />} {/* Provide default avatar */}
      <div className="rounded-md px-4 py-2 max-w-sm text-sm bg-primary/10">
        {isLoading ? (
          <BeatLoader size={5} color={theme === "light" ? "black" : "white"} />
        ) : (
          content
        )}
      </div>
      {role === "user" && <UserAvatar />}
      {role !== "user" && !isLoading && (
        <Button
          onClick={onCopy}
          className="opacity-0 group-hover:opacity-100 transition"
          size="icon"
          variant="ghost"
        >
          <Copy className="w-4 h-4" />
        </Button>
      )}
    </div>
  );
};

export const ChatMessages = ({
  messages = [],
  isLoading,
  companion,
}: ChatMessagesProps) => {
  const scrollRef = useRef<ElementRef<"div">>(null);

  useEffect(() => {
    scrollRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  const avatarSrc = companion.src ?? "/images/default-avatar.png"; // Ensure avatarSrc is always a string

  return (
    <div className="flex-1 overflow-y-auto pr-4">
      <ChatMessage
        src={avatarSrc}
        role="system"
        content={`Hello, I am ${companion.name}, ${companion.characterDescription}`}
      />
      {messages.map((message) => (
        <ChatMessage
          key={message.content}
          role={message.role}
          content={message.content}
          src={avatarSrc}
        />
      ))}
      {isLoading && (
        <ChatMessage role="system" src={avatarSrc} isLoading />
      )}
      <div ref={scrollRef} />
    </div>
  );
};
