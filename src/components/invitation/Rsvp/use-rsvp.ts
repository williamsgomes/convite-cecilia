"use client";

import { useCallback, useState } from "react";

import { getStoredRsvp, saveStoredRsvp } from "@/lib/rsvp/storage";
import { submitRsvp } from "@/lib/rsvp/submit-rsvp";
import type { Event } from "@/types/event";
import type { Rsvp } from "@/types/rsvp";

export type RsvpUiStatus = "idle" | "loading" | "success" | "error";

type UseRsvpOptions = {
  event: Event;
};

export function useRsvp({ event }: UseRsvpOptions) {
  const [savedRsvp, setSavedRsvp] = useState<Rsvp | null>(() => getStoredRsvp());
  const [status, setStatus] = useState<RsvpUiStatus>(() =>
    getStoredRsvp() ? "success" : "idle",
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [declineOpen, setDeclineOpen] = useState(false);
  const [name, setName] = useState("");
  const [childrenCount, setChildrenCount] = useState(0);

  const feedbackMessage =
    savedRsvp?.status === "confirmed"
      ? event.rsvpSuccessConfirmed
      : savedRsvp?.status === "declined"
        ? event.rsvpSuccessDeclined
        : null;

  const sendRsvp = useCallback(
    async (input: Parameters<typeof submitRsvp>[0]) => {
      setStatus("loading");
      setErrorMessage(null);

      try {
        const response = await submitRsvp(input);
        saveStoredRsvp(response);
        setSavedRsvp(response);
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
    if (status === "loading" || status === "success") return;
    setErrorMessage(null);
    setConfirmOpen(true);
  }

  function openDeclineModal() {
    if (status === "loading" || status === "success") return;
    setErrorMessage(null);
    setDeclineOpen(true);
  }

  function closeConfirmModal() {
    if (status === "loading") return;
    setConfirmOpen(false);
    setErrorMessage(null);
    if (status === "error") {
      setStatus("idle");
    }
  }

  function closeDeclineModal() {
    if (status === "loading") return;
    setDeclineOpen(false);
    setErrorMessage(null);
    if (status === "error") {
      setStatus("idle");
    }
  }

  async function handleConfirmSubmit() {
    await sendRsvp({
      name,
      childrenCount,
      status: "confirmed",
    });
  }

  async function handleDeclineSubmit() {
    await sendRsvp({
      name,
      childrenCount: 0,
      status: "declined",
    });
  }

  return {
    status,
    feedbackMessage,
    errorMessage,
    confirmOpen,
    declineOpen,
    name,
    childrenCount,
    setName,
    setChildrenCount,
    openConfirmModal,
    openDeclineModal,
    closeConfirmModal,
    closeDeclineModal,
    handleConfirmSubmit,
    handleDeclineSubmit,
  };
}
