import { Children, cloneElement, isValidElement } from "react";

import { cn } from "@/lib/utils";

type FieldProps = {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
};

export function Field({
  id,
  label,
  hint,
  error,
  children,
  className,
}: FieldProps) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

  const control = Children.map(children, (child) => {
    if (!isValidElement(child)) {
      return child;
    }

    return cloneElement(
      child as React.ReactElement<Record<string, unknown>>,
      {
        id,
        "aria-invalid": Boolean(error) || undefined,
        "aria-describedby": describedBy,
      },
    );
  });

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={id} className="text-sm font-bold text-primary">
        {label}
      </label>
      {control}
      {hint && !error ? (
        <p id={hintId} className="text-sm text-muted">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p
          id={errorId}
          role="alert"
          className="text-sm font-semibold text-accent-strong"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}
