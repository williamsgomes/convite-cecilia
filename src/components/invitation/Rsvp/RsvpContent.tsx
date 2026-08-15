import { Heart, Lock, X } from "lucide-react";
import Image from "next/image";

import { DecorImage } from "@/components/decorations/DecorImage";
import type { Event } from "@/types/event";

import { RsvpChoiceButton } from "./RsvpChoiceButton";

type RsvpContentProps = {
  event: Event;
  disabled?: boolean;
  onConfirmYes: () => void;
  onConfirmNo: () => void;
};

export function RsvpContent({
  event,
  disabled = false,
  onConfirmYes,
  onConfirmNo,
}: RsvpContentProps) {
  return (
    <div className="relative z-10 text-center">
      <h2 id="confirmacao-titulo" className="sr-only">
        {event.rsvpTitleLine} {event.rsvpTitleBridge} {event.rsvpTitleScript}
      </h2>

      <Image
        src="/images/rsvp/placa-confirmacao.webp"
        alt={`${event.rsvpTitleLine} ${event.rsvpTitleBridge} ${event.rsvpTitleScript}`}
        width={560}
        height={306}
        sizes="(max-width: 448px) 72vw, 288px"
        className="mx-auto block h-auto w-[72%] max-w-xs"
      />

      <p className="mx-auto mt-4 max-w-xs text-sm leading-relaxed text-muted sm:text-base">
        {event.rsvpIntro}
      </p>

      <div className="relative mt-6 overflow-visible pb-8">
        <DecorImage
          src="/images/animals/cow-peeking.webp"
          width={345}
          height={554}
          className="pointer-events-none absolute bottom-0 -left-[10%] z-0 w-[36%] max-w-28 sm:-left-[14%] sm:w-[38%]"
        />

        <DecorImage
          src="/images/animals/sheep-peeking.webp"
          width={316}
          height={562}
          className="pointer-events-none absolute right-[-10%] bottom-0 z-0 w-[34%] max-w-24 sm:-right-[14%] sm:w-[36%]"
        />

        <div className="relative z-10 mx-auto w-[60%] min-w-0 space-y-3">
          <RsvpChoiceButton
            tone="yes"
            icon={Heart}
            label={event.rsvpYesLabel}
            hint={event.rsvpYesHint}
            onClick={onConfirmYes}
            disabled={disabled}
          />

          <RsvpChoiceButton
            tone="no"
            icon={X}
            label={event.rsvpNoLabel}
            hint={event.rsvpNoHint}
            onClick={onConfirmNo}
            disabled={disabled}
          />
        </div>
      </div>

      <p className="relative z-10 mx-auto mt-4 flex max-w-xs items-start justify-center gap-2 text-xs leading-relaxed text-muted">
        <Lock
          aria-hidden
          className="mt-0.5 size-3.5 shrink-0 text-accent-strong"
          strokeWidth={2}
        />
        <span>{event.rsvpPrivacyNote}</span>
      </p>
    </div>
  );
}

export function RsvpFeedback({
  event,
  message,
}: {
  event: Event;
  message: string;
}) {
  return (
    <div className="relative z-10 px-2 py-4 text-center sm:px-4">
      <p className="font-display text-2xl text-accent-strong sm:text-3xl">
        Obrigada!
      </p>
      <p className="mt-3 text-sm leading-relaxed text-primary sm:text-base">
        {message}
      </p>
      <p className="mt-4 text-xs text-muted">{event.rsvpPrivacyNote}</p>
    </div>
  );
}
