"use client";

import { Heart } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";

import { DecorImage } from "@/components/decorations/DecorImage";
import { invitationInnerClass, invitationSectionClass } from "@/components/invitation/section-classes";
import { Heading } from "@/components/ui/Heading";
import { fadeUp } from "@/lib/motion";
import { submitMessage } from "@/lib/messages/submit-message";
import type { Event } from "@/types/event";
import type { Message } from "@/types/message";

import { GuestbookForm } from "./GuestbookForm";
import { MessagesCarousel } from "./MessagesCarousel";

type MessagesProps = {
  event: Event;
  messages: Message[];
};

export function Messages({ event, messages: initialMessages }: MessagesProps) {
  const reduceMotion = useReducedMotion();
  const [messages, setMessages] = useState(initialMessages);

  async function handleSubmitMessage(input: { name: string; message: string }) {
    const created = await submitMessage(input);
    setMessages((current) => [created, ...current]);
    return created;
  }

  return (
    <section
      id="recadinhos"
      aria-labelledby="recadinhos-titulo"
      className={`${invitationSectionClass} bg-surface`}
    >
      <div className={invitationInnerClass}>
        <motion.div {...fadeUp(reduceMotion)}>
          <div className="text-center">
            <Heading
              level={2}
              hand
              id="recadinhos-titulo"
              className="text-[2.15rem] leading-tight sm:text-5xl"
            >
              {event.guestbookTitle}
            </Heading>

            <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-muted">
              {event.guestbookSubtitle}
            </p>
          </div>

          <div className="relative mt-5">
            <div className="px-12">
              <GuestbookForm
                event={event}
                onSubmitMessage={handleSubmitMessage}
              />
            </div>
            <DecorImage
              src="/images/animals/chick.webp"
              width={176}
              height={254}
              className="absolute bottom-1 left-0 z-10 !w-16 max-w-none"
            />
            <DecorImage
              src="/images/animals/duck.webp"
              width={207}
              height={269}
              className="absolute bottom-1 right-0 z-10 !w-16 max-w-none"
            />
          </div>
        </motion.div>

        <motion.div className="mt-8" {...fadeUp(reduceMotion, 0.08)}>
          <div className="flex items-center justify-center gap-2 text-center">
            <Heart
              aria-hidden
              className="size-3 fill-accent text-accent"
              strokeWidth={1.5}
            />
            <Heading level={3} hand className="text-[1.65rem] leading-tight sm:text-4xl">
              {event.messagesTitle}
            </Heading>
            <Heart
              aria-hidden
              className="size-3 fill-accent text-accent"
              strokeWidth={1.5}
            />
          </div>
          <p className="mx-auto mt-2 max-w-xs text-center text-sm leading-relaxed text-muted">
            {event.messagesSubtitle}
          </p>

          <MessagesCarousel
            key={messages[0]?.id ?? "empty"}
            messages={messages}
            leftDecor={
              <DecorImage
                src="/images/animals/rooster.webp"
                width={220}
                height={235}
                className="!w-16 max-w-none"
              />
            }
            rightDecor={
              <DecorImage
                src="/images/animals/puppy.webp"
                width={219}
                height={232}
                className="!w-16 max-w-none"
              />
            }
          />
        </motion.div>
      </div>
    </section>
  );
}
