import { Heart, Quote } from "lucide-react";

import { Card } from "@/components/ui/Card";
import { formatMessageDate } from "@/lib/format-event";
import { cn } from "@/lib/utils";
import type { Message } from "@/types/message";

type MessageCardProps = {
  message: Message;
  highlighted?: boolean;
};

export function MessageCard({ message, highlighted = false }: MessageCardProps) {
  return (
    <Card
      className={cn(
        "rounded-lg px-5 py-6 text-center shadow-lift sm:px-6 sm:py-7",
        highlighted && "ring-2 ring-accent ring-offset-2 ring-offset-surface",
      )}
    >
      <Quote
        aria-hidden
        className="mx-auto size-7 text-accent"
        strokeWidth={1.5}
      />

      <blockquote className="mt-4">
        <p className="text-base leading-relaxed text-primary sm:text-lg">
          {message.message}
        </p>
      </blockquote>

      <p className="mt-5 flex items-center justify-center gap-3 text-accent">
        <span aria-hidden className="h-px flex-1 max-w-16 bg-accent/30" />
        <Heart
          aria-hidden
          className="size-3 fill-accent text-accent"
          strokeWidth={1.5}
        />
        <span aria-hidden className="h-px flex-1 max-w-16 bg-accent/30" />
      </p>

      <footer className="mt-4 flex flex-col items-center gap-0.5">
        <cite className="flex items-center gap-1.5 text-sm font-extrabold not-italic text-accent-strong">
          <Heart
            aria-hidden
            className="size-3 fill-accent text-accent"
            strokeWidth={1.5}
          />
          {message.name}
        </cite>
        <time
          dateTime={message.createdAt}
          className="text-xs text-muted"
        >
          {formatMessageDate(message.createdAt)}
        </time>
      </footer>
    </Card>
  );
}
