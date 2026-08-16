"use client";

import { useEffect, useRef } from "react";

const FOCUSABLE =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

type UseDialogFocusOptions = {
  trap?: boolean;
  handleEscape?: boolean;
  onKeyDown?: (event: KeyboardEvent) => void;
};

export function useDialogFocus(
  isOpen: boolean,
  onClose: () => void,
  options: UseDialogFocusOptions = {},
) {
  const { trap = true, handleEscape = true, onKeyDown } = options;
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  const onCloseRef = useRef(onClose);
  const onKeyDownRef = useRef(onKeyDown);

  onCloseRef.current = onClose;
  onKeyDownRef.current = onKeyDown;

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    previousFocus.current = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();

    return () => {
      previousFocus.current?.focus();
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || !trap) {
      return;
    }

    closeRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      onKeyDownRef.current?.(event);

      if (event.defaultPrevented) {
        return;
      }

      if (handleEscape && event.key === "Escape") {
        event.stopPropagation();
        onCloseRef.current();
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) {
        return;
      }

      const nodes = [
        ...panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE),
      ].filter((node) => !node.hasAttribute("disabled") && node.tabIndex !== -1);

      if (nodes.length === 0) {
        return;
      }

      const first = nodes[0];
      const last = nodes[nodes.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      }

      if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    function handleFocusIn(event: FocusEvent) {
      if (!panelRef.current) {
        return;
      }

      if (!panelRef.current.contains(event.target as Node)) {
        closeRef.current?.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown, true);
    document.addEventListener("focusin", handleFocusIn);

    return () => {
      document.removeEventListener("keydown", handleKeyDown, true);
      document.removeEventListener("focusin", handleFocusIn);
    };
  }, [handleEscape, isOpen, trap]);

  return { panelRef, closeRef };
}
