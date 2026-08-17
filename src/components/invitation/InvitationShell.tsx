"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

import { BackgroundMusic } from "@/components/invitation/BackgroundMusic";
import { InvitationOpening } from "@/components/invitation/Opening/InvitationOpening";
import { useInvitationAudio } from "@/lib/audio/use-invitation-audio";

type InvitationShellProps = {
  children: ReactNode;
};

export function InvitationShell({ children }: InvitationShellProps) {
  const [isOpening, setIsOpening] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const shouldFocusContent = useRef(false);
  const showOpening = !dismissed || isOpening;
  const audio = useInvitationAudio({ autoplay: !showOpening });

  useEffect(() => {
    if (showOpening || !shouldFocusContent.current) {
      return;
    }

    shouldFocusContent.current = false;
    document.getElementById("conteudo")?.focus();
  }, [showOpening]);

  function handleOpen() {
    if (isOpening) {
      return;
    }

    void audio.play();
    setIsOpening(true);
  }

  function handleOpened() {
    shouldFocusContent.current = true;
    setDismissed(true);
    setIsOpening(false);
  }

  return (
    <>
      {showOpening ? (
        <InvitationOpening
          isOpening={isOpening}
          onOpen={handleOpen}
          onOpened={handleOpened}
        />
      ) : null}

      <div
        inert={showOpening ? true : undefined}
        aria-hidden={showOpening || undefined}
      >
        {children}
      </div>

      <BackgroundMusic
        audioRef={audio.audioRef}
        autoPlay={!showOpening}
        isPlaying={audio.isPlaying}
        onToggle={audio.toggle}
      />
    </>
  );
}
