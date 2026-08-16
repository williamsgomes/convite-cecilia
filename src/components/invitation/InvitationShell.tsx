"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";

import { BackgroundMusic } from "@/components/invitation/BackgroundMusic";
import { InvitationOpening } from "@/components/invitation/Opening/InvitationOpening";
import { useInvitationAudio } from "@/lib/audio/use-invitation-audio";
import {
  isInvitationOpened,
  saveInvitationOpened,
  subscribeInvitationOpened,
} from "@/lib/opening/storage";

type InvitationShellProps = {
  children: ReactNode;
};

export function InvitationShell({ children }: InvitationShellProps) {
  const storedOpen = useSyncExternalStore(
    subscribeInvitationOpened,
    isInvitationOpened,
    () => false,
  );
  const [isOpening, setIsOpening] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const shouldFocusContent = useRef(false);
  const showOpening = (!storedOpen && !dismissed) || isOpening;
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
    saveInvitationOpened();
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
