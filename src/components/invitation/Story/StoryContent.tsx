import { Heart } from "lucide-react";

import { Card } from "@/components/ui/Card";
import { Heading } from "@/components/ui/Heading";
import { cn } from "@/lib/utils";
import type { Event } from "@/types/event";

type StoryContentProps = {
  event: Event;
  className?: string;
};

export function StoryContent({ event, className }: StoryContentProps) {
  return (
    <div className={cn("text-center", className)}>
      <Heading
        level={2}
        display
        id="historia-titulo"
        className="text-script sm:text-5xl"
      >
        {event.storyTitle}
      </Heading>

      <p className="mt-2 flex justify-center">
        <Heart
          aria-hidden
          className="size-3 fill-accent text-accent"
          strokeWidth={1.5}
        />
      </p>

      <Card className="mt-5 rounded-lg px-4 py-6 text-center shadow-lift">
        <p className="text-base leading-relaxed text-primary">
          {event.storyIntro}
        </p>

        <p className="mt-3 text-base leading-relaxed text-primary">
          {event.storyBody}
        </p>

        <p className="mt-4 text-lg font-extrabold text-accent-strong">
          {event.storyHighlight}
        </p>

        <blockquote className="mt-4 space-y-1">
          <p className="text-sm italic text-muted">
            &ldquo;{event.storyQuote}&rdquo;
          </p>
          <cite className="block text-sm font-extrabold not-italic text-accent-strong">
            {event.storyQuoteReference}
          </cite>
        </blockquote>

        <p className="mt-4 text-sm leading-relaxed text-muted">
          {event.storyClosing}
        </p>
      </Card>
    </div>
  );
}
