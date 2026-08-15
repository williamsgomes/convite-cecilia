"use client";

import { motion, useReducedMotion } from "motion/react";

import type { Event } from "@/types/event";

import { RsvpConfirmModal } from "./RsvpConfirmModal";
import { RsvpContent, RsvpFeedback } from "./RsvpContent";
import { RsvpDeclineModal } from "./RsvpDeclineModal";
import { useRsvp } from "./use-rsvp";

type RsvpProps = {
  event: Event;
};

export function Rsvp({ event }: RsvpProps) {
  const reduceMotion = useReducedMotion();
  const {
    status,
    feedbackMessage,
    errorMessage,
    confirmOpen,
    declineOpen,
    name,
    guests,
    setName,
    setGuests,
    openConfirmModal,
    openDeclineModal,
    closeConfirmModal,
    closeDeclineModal,
    handleConfirmSubmit,
    handleDeclineSubmit,
  } = useRsvp({ event });

  const fadeUp = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 12 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.2 },
        transition: {
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1] as const,
        },
      };

  const isBusy = status === "loading";
  const hasResponded = status === "success" && feedbackMessage;

  return (
    <section
      id="confirmacao"
      aria-labelledby="confirmacao-titulo"
      className="relative scroll-mt-6 overflow-x-clip bg-surface-sunken"
    >
      <div className="mx-auto w-full max-w-md px-4 py-10 sm:py-12">
        <motion.div {...fadeUp}>
          <div className="relative overflow-visible px-1 pt-2 pb-6 sm:px-2 sm:pb-8">
            {hasResponded ? (
              <RsvpFeedback event={event} message={feedbackMessage} />
            ) : (
              <>
                <RsvpContent
                  event={event}
                  disabled={isBusy}
                  onConfirmYes={openConfirmModal}
                  onConfirmNo={openDeclineModal}
                />

                {status === "error" && errorMessage ? (
                  <p role="alert" className="relative z-10 mt-4 text-center text-sm font-semibold text-accent-strong">
                    {errorMessage}
                  </p>
                ) : null}
              </>
            )}
          </div>
        </motion.div>
      </div>

      <RsvpConfirmModal
        isOpen={confirmOpen}
        name={name}
        guests={guests}
        error={errorMessage ?? undefined}
        isLoading={isBusy}
        onNameChange={setName}
        onGuestsChange={setGuests}
        onClose={closeConfirmModal}
        onSubmit={handleConfirmSubmit}
      />

      <RsvpDeclineModal
        isOpen={declineOpen}
        name={name}
        error={errorMessage ?? undefined}
        isLoading={isBusy}
        onNameChange={setName}
        onClose={closeDeclineModal}
        onSubmit={handleDeclineSubmit}
      />
    </section>
  );
}
