import { Minus, Plus } from "lucide-react";

import { cn } from "@/lib/utils";

type NumberStepperProps = {
  id?: string;
  value: number;
  min?: number;
  max?: number;
  disabled?: boolean;
  label: string;
  onChange: (value: number) => void;
  "aria-describedby"?: string;
  "aria-invalid"?: boolean;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function NumberStepper({
  id,
  value,
  min = 0,
  max = 20,
  disabled = false,
  label,
  onChange,
  "aria-describedby": describedBy,
}: NumberStepperProps) {
  const current = clamp(Number.isFinite(value) ? value : min, min, max);
  const canDecrease = !disabled && current > min;
  const canIncrease = !disabled && current < max;

  function step(delta: number) {
    if (disabled) return;
    onChange(clamp(current + delta, min, max));
  }

  return (
    <div className="flex min-h-11 items-stretch overflow-hidden rounded-md border border-border bg-surface-raised">
      <button
        type="button"
        aria-label={`Diminuir ${label}`}
        disabled={!canDecrease}
        onClick={() => step(-1)}
        className={cn(
          "inline-flex w-11 shrink-0 items-center justify-center text-primary",
          "transition-colors hover:bg-surface-sunken",
          "disabled:pointer-events-none disabled:opacity-40",
        )}
      >
        <Minus aria-hidden className="size-4" strokeWidth={2.25} />
      </button>

      <output
        id={id}
        aria-live="polite"
        aria-describedby={describedBy}
        className="flex min-w-0 flex-1 items-center justify-center text-base font-extrabold text-primary tabular-nums"
      >
        {current}
      </output>

      <button
        type="button"
        aria-label={`Aumentar ${label}`}
        disabled={!canIncrease}
        onClick={() => step(1)}
        className={cn(
          "inline-flex w-11 shrink-0 items-center justify-center text-primary",
          "transition-colors hover:bg-surface-sunken",
          "disabled:pointer-events-none disabled:opacity-40",
        )}
      >
        <Plus aria-hidden className="size-4" strokeWidth={2.25} />
      </button>
    </div>
  );
}
