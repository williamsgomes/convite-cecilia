"use client";

import { Heart } from "lucide-react";
import { useEffect, useState } from "react";

import { RSVP_CHANGED_EVENT, getStoredRsvp } from "@/lib/rsvp/storage";
import { cn } from "@/lib/utils";

const CONFIRM_SECTION_ID = "confirmacao";

export function ConfirmPresenceBar() {
  const [hasResponded, setHasResponded] = useState(true);
  const [sectionInView, setSectionInView] = useState(false);

  useEffect(() => {
    function syncResponse() {
      setHasResponded(Boolean(getStoredRsvp()));
    }

    syncResponse();
    window.addEventListener(RSVP_CHANGED_EVENT, syncResponse);
    window.addEventListener("storage", syncResponse);

    return () => {
      window.removeEventListener(RSVP_CHANGED_EVENT, syncResponse);
      window.removeEventListener("storage", syncResponse);
    };
  }, []);

  useEffect(() => {
    const section = document.getElementById(CONFIRM_SECTION_ID);
    if (!section) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setSectionInView(Boolean(entry?.isIntersecting));
      },
      { threshold: 0.35 },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  if (hasResponded || sectionInView) {
    return null;
  }

  return (
    <div
      className={cn(
        "pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center",
        "px-4 pr-20",
        "pb-[max(1rem,env(safe-area-inset-bottom))]",
      )}
    >
      <a
        href={`#${CONFIRM_SECTION_ID}`}
        className={cn(
          "pointer-events-auto inline-flex min-h-12 w-full max-w-xs items-center justify-center gap-2",
          "rounded-pill bg-accent-strong px-5 text-base font-semibold text-accent-foreground shadow-lift",
          "transition-colors hover:bg-accent-strong/90",
        )}
      >
        <Heart aria-hidden className="size-4 fill-current" strokeWidth={1.75} />
        Confirme sua presença
      </a>
    </div>
  );
}
