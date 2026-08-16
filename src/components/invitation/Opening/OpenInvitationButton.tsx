import { Heart } from "lucide-react";
import type { Ref } from "react";

import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type OpenInvitationButtonProps = {
  disabled?: boolean;
  onOpen: () => void;
  buttonRef?: Ref<HTMLButtonElement>;
};

export function OpenInvitationButton({
  disabled = false,
  onOpen,
  buttonRef,
}: OpenInvitationButtonProps) {
  return (
    <div className="flex flex-col items-center gap-3">
      <Button
        ref={buttonRef}
        type="button"
        variant="accent"
        size="lg"
        disabled={disabled}
        aria-label="Abrir convite"
        onClick={onOpen}
        className={cn(
          "min-h-12 w-full max-w-xs gap-3 px-6 text-sm font-extrabold tracking-wide uppercase",
          "shadow-lift",
        )}
      >
        <Heart aria-hidden className="size-4 fill-current" strokeWidth={1.75} />
        <span aria-hidden className="h-5 w-px bg-accent-foreground/50" />
        Abrir convite
        <span aria-hidden>→</span>
      </Button>

      <p className="text-xs text-muted">Toque aqui para começar</p>
    </div>
  );
}
