"use client";

import { motion, useReducedMotion } from "motion/react";

import { invitationInnerClass, invitationSectionClass } from "@/components/invitation/section-classes";
import { fadeUp } from "@/lib/motion";
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
    childrenCount,
    setName,
    setChildrenCount,
    openConfirmModal,
    openDeclineModal,
    closeConfirmModal,
    closeDeclineModal,
    handleConfirmSubmit,
    handleDeclineSubmit,
  } = useRsvp({ event });

  const isBusy = status === "loading";
  const hasResponded = status === "success" && feedbackMessage;

  return (
    <section
      id="confirmacao"
      aria-labelledby="confirmacao-titulo"
      className={`${invitationSectionClass} bg-surface-sunken`}
    >
      <div className={invitationInnerClass}>
        <motion.div {...fadeUp(reduceMotion)}>
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
        childrenCount={childrenCount}
        error={errorMessage ?? undefined}
        isLoading={isBusy}
        onNameChange={setName}
        onChildrenCountChange={setChildrenCount}
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
