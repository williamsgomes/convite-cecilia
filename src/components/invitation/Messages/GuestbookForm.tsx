"use client";

import { Heart, Send, User } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { MAX_MESSAGE_LENGTH } from "@/lib/messages/submit-message";
import type { Event } from "@/types/event";
import type { Message } from "@/types/message";

type GuestbookFormProps = {
  event: Event;
  onSubmitMessage: (input: {
    name: string;
    message: string;
  }) => Promise<Message>;
};

export function GuestbookForm({ event, onSubmitMessage }: GuestbookFormProps) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [error, setError] = useState<string | null>(null);

  const isLoading = status === "loading";

  async function handleSubmit(formEvent: React.FormEvent<HTMLFormElement>) {
    formEvent.preventDefault();
    setStatus("loading");
    setError(null);

    try {
      await onSubmitMessage({ name, message });
      setName("");
      setMessage("");
      setStatus("success");
    } catch (submitError) {
      setStatus("error");
      setError(
        submitError instanceof Error
          ? submitError.message
          : event.guestbookError,
      );
    }
  }

  return (
    <Card className="rounded-lg border border-accent/20 px-4 py-5 shadow-lift sm:px-5 sm:py-6">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="recadinho-nome"
            className="flex items-center gap-2 text-sm font-bold text-primary"
          >
            <User aria-hidden className="size-4 text-accent-strong" strokeWidth={2} />
            {event.guestbookNameLabel}
          </label>
          <Input
            id="recadinho-nome"
            name="name"
            autoComplete="name"
            placeholder={event.guestbookNamePlaceholder}
            value={name}
            onChange={(event) => setName(event.target.value)}
            disabled={isLoading}
            required
            maxLength={80}
            className="rounded-lg bg-surface-sunken"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="recadinho-mensagem"
            className="flex items-center gap-2 text-sm font-bold text-primary"
          >
            <Heart
              aria-hidden
              className="size-4 fill-accent text-accent-strong"
              strokeWidth={2}
            />
            {event.guestbookMessageLabel}
          </label>
          <div className="relative">
            <Textarea
              id="recadinho-mensagem"
              name="message"
              placeholder={event.guestbookMessagePlaceholder}
              value={message}
              onChange={(event) =>
                setMessage(event.target.value.slice(0, MAX_MESSAGE_LENGTH))
              }
              disabled={isLoading}
              required
              maxLength={MAX_MESSAGE_LENGTH}
              className="min-h-28 resize-none rounded-lg bg-surface-sunken pb-8"
            />
            <p
              className="pointer-events-none absolute right-3 bottom-2 text-xs font-semibold text-muted"
              aria-live="polite"
            >
              {message.length} / {MAX_MESSAGE_LENGTH}
            </p>
          </div>
        </div>

        {error ? (
          <p role="alert" className="text-sm font-semibold text-accent-strong">
            {error}
          </p>
        ) : null}

        {status === "success" ? (
          <p role="status" className="text-sm font-semibold text-sage-strong">
            {event.guestbookSuccess}
          </p>
        ) : null}

        <Button
          type="submit"
          variant="accent"
          className="w-full"
          disabled={isLoading}
        >
          <Heart aria-hidden className="size-4 fill-current" strokeWidth={2} />
          {isLoading ? "Enviando..." : event.guestbookSubmit}
          <Send aria-hidden className="size-4" strokeWidth={2} />
        </Button>
      </form>
    </Card>
  );
}
