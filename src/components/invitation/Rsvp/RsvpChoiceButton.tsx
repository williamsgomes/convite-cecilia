import { ChevronRight, type LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type RsvpChoiceButtonProps = {
  label: string;
  hint: string;
  icon: LucideIcon;
  tone: "yes" | "no";
  onClick: () => void;
  disabled?: boolean;
};

const toneStyles = {
  yes: "bg-sage-strong hover:bg-sage-strong/90",
  no: "bg-accent-strong hover:bg-accent-strong/90",
} as const;

export function RsvpChoiceButton({
  label,
  hint,
  icon: Icon,
  tone,
  onClick,
  disabled = false,
}: RsvpChoiceButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "flex w-full min-h-12 items-center gap-2.5 rounded-pill px-3 py-2.5 text-left text-accent-foreground shadow-soft transition-colors sm:gap-3 sm:px-3.5 sm:py-3",
        "disabled:cursor-not-allowed disabled:opacity-60",
        toneStyles[tone],
      )}
    >
      <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white/20 sm:size-10">
        <Icon aria-hidden className="size-4 sm:size-5" strokeWidth={2} />
      </span>

      <span className="min-w-0 flex-1">
        <span className="block text-sm font-extrabold sm:text-base">{label}</span>
        <span className="block text-xs font-medium opacity-90 sm:text-sm">{hint}</span>
      </span>

      <ChevronRight aria-hidden className="size-4 shrink-0 opacity-90 sm:size-5" strokeWidth={2} />
    </button>
  );
}
