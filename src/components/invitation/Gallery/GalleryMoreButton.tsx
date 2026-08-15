"use client";

import { Images } from "lucide-react";

import { Button } from "@/components/ui/Button";

type GalleryMoreButtonProps = {
  label: string;
  onClick: () => void;
};

export function GalleryMoreButton({ label, onClick }: GalleryMoreButtonProps) {
  return (
    <Button variant="accent" className="w-full max-w-xs" onClick={onClick}>
      <Images aria-hidden className="size-4" strokeWidth={2} />
      {label}
    </Button>
  );
}
