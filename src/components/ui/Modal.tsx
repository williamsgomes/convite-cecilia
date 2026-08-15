"use client";

import { X } from "lucide-react";
import { useEffect, useId } from "react";

import { cn } from "@/lib/utils";

type ModalProps = {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
};

export function Modal({
  isOpen,
  title,
  onClose,
  children,
  className,
}: ModalProps) {
  const titleId = useId();

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center">
      <button
        type="button"
        aria-label="Fechar"
        className="absolute inset-0 bg-primary/40"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={cn(
          "relative z-10 w-full max-w-md rounded-lg bg-surface-raised p-5 shadow-lift sm:p-6",
          className,
        )}
      >
        <div className="mb-4 flex items-start justify-between gap-3">
          <h3 id={titleId} className="text-lg font-extrabold text-primary">
            {title}
          </h3>
          <button
            type="button"
            aria-label="Fechar"
            onClick={onClose}
            className="inline-flex size-10 shrink-0 items-center justify-center rounded-full text-primary transition-colors hover:bg-surface-sunken"
          >
            <X aria-hidden className="size-5" strokeWidth={1.75} />
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}
