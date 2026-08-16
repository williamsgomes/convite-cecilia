"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";

import { useDialogFocus } from "@/lib/a11y/use-dialog-focus";
import { EASE_OUT_SOFT } from "@/lib/motion";
import { cn } from "@/lib/utils";

import { OpenInvitationButton } from "./OpenInvitationButton";
import { OpeningArtwork } from "./OpeningArtwork";

type InvitationOpeningProps = {
  isOpening: boolean;
  onOpen: () => void;
  onOpened: () => void;
};

function wasOpenedBeforePaint() {
  if (typeof document === "undefined") {
    return false;
  }

  return document.documentElement.dataset.invitationOpened === "true";
}

export function InvitationOpening({
  isOpening,
  onOpen,
  onOpened,
}: InvitationOpeningProps) {
  const reduceMotion = useReducedMotion();
  const skipLock = wasOpenedBeforePaint();
  const { panelRef, closeRef } = useDialogFocus(!skipLock, () => {}, {
    handleEscape: false,
  });

  const overlayDuration = reduceMotion ? 0.2 : 0.4;
  const overlayDelay = reduceMotion || !isOpening ? 0 : 0.3;

  return (
    <motion.div
      data-invitation-opening=""
      className={cn(
        "fixed inset-0 z-[70] flex items-center justify-center overflow-y-auto",
        "bg-surface-header px-4 py-8",
        "pt-[max(2rem,env(safe-area-inset-top))]",
        "pb-[max(2rem,env(safe-area-inset-bottom))]",
        isOpening && "pointer-events-none",
      )}
      initial={false}
      animate={{ opacity: isOpening ? 0 : 1 }}
      transition={{
        duration: overlayDuration,
        delay: overlayDelay,
        ease: EASE_OUT_SOFT,
      }}
      onAnimationComplete={() => {
        if (isOpening) {
          onOpened();
        }
      }}
    >
      <Image
        src="/images/opening/background.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        aria-hidden
        className="object-cover object-center"
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="abertura-titulo"
        className="relative z-10 flex w-full max-w-md flex-col items-center"
      >
        <h2 id="abertura-titulo" className="sr-only">
          Vai ter festa na fazendinha da Cecília
        </h2>

        <motion.div
          className="w-full max-w-sm"
          initial={false}
          animate={
            isOpening && !reduceMotion
              ? { scale: 1.12, y: 28, opacity: 0 }
              : { scale: 1, y: 0, opacity: 1 }
          }
          transition={{
            duration: reduceMotion ? 0.2 : 0.35,
            delay: isOpening && !reduceMotion ? 0.15 : 0,
            ease: EASE_OUT_SOFT,
          }}
        >
          <OpeningArtwork className="h-auto w-full" />
        </motion.div>

        <motion.div
          className="mt-5 w-full"
          initial={false}
          animate={
            isOpening && !reduceMotion
              ? { scale: 1.04, opacity: 0 }
              : { scale: 1, opacity: 1 }
          }
          transition={{
            duration: reduceMotion ? 0.2 : 0.2,
            ease: EASE_OUT_SOFT,
          }}
        >
          <OpenInvitationButton
            buttonRef={closeRef}
            disabled={isOpening}
            onOpen={onOpen}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
