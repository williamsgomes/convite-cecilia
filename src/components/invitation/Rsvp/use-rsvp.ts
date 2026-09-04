"use client";

import { useCallback, useState } from "react";

import { submitRsvp } from "@/lib/rsvp/submit-rsvp";
import type { Event } from "@/types/event";
import type { Rsvp } from "@/types/rsvp";

export type RsvpUiStatus = "idle" | "loading" | "success" | "error";

type UseRsvpOptions = {
  event: Event;
};

export function useRsvp({ event }: UseRsvpOptions) {
  const [sessionRsvp, setSessionRsvp] = useState<Rsvp | null>(null);
  const [status, setStatus] = useState<RsvpUiStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [declineOpen, setDeclineOpen] = useState(false);
  const [name, setName] = useState("");
  const [adultsCount, setAdultsCount] = useState(1);
  const [childrenCount, setChildrenCount] = useState(0);

  const isBusy = status === "loading";
  const hasResponded = Boolean(sessionRsvp) && !isBusy;

  const feedbackMessage =
    sessionRsvp?.status === "confirmed"
      ? event.rsvpSuccessConfirmed
      : sessionRsvp?.status === "declined"
        ? event.rsvpSuccessDeclined
        : null;

  const sendRsvp = useCallback(
    async (input: Parameters<typeof submitRsvp>[0]) => {
      setStatus("loading");
      setErrorMessage(null);

      try {
        const response = await submitRsvp(input);
        setSessionRsvp(response);
        setStatus("success");
        setConfirmOpen(false);
        setDeclineOpen(false);
      } catch (error) {
        setStatus("error");
        setErrorMessage(
          error instanceof Error ? error.message : event.rsvpErrorMessage,
        );
      }
    },
    [event.rsvpErrorMessage],
  );

  function openConfirmModal() {
    if (isBusy || hasResponded) return;
    setErrorMessage(null);
    setConfirmOpen(true);
  }

  function openDeclineModal() {
    if (isBusy || hasResponded) return;
    setErrorMessage(null);
    setDeclineOpen(true);
  }

  function closeConfirmModal() {
    if (isBusy) return;
    setConfirmOpen(false);
    setErrorMessage(null);
    if (status === "error") {
      setStatus("idle");
    }
  }

  function closeDeclineModal() {
    if (isBusy) return;
    setDeclineOpen(false);
    setErrorMessage(null);
    if (status === "error") {
      setStatus("idle");
    }
  }

  async function handleConfirmSubmit() {
    await sendRsvp({
      name,
      adultsCount,
      childrenCount,
      status: "confirmed",
    });
  }

  async function handleDeclineSubmit() {
    await sendRsvp({
      name,
      adultsCount: 0,
      childrenCount: 0,
      status: "declined",
    });
  }

  return {
    status,
    hasResponded,
    feedbackMessage,
    errorMessage,
    confirmOpen,
    declineOpen,
    name,
    adultsCount,
    childrenCount,
    setName,
    setAdultsCount,
    setChildrenCount,
    openConfirmModal,
    openDeclineModal,
    closeConfirmModal,
    closeDeclineModal,
    handleConfirmSubmit,
    handleDeclineSubmit,
  };
}
