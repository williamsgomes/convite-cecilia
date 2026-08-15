import { ChevronLeft, ChevronRight } from "lucide-react";

type MessagesNavProps = {
  count: number;
  currentIndex: number;
  onGoTo: (index: number) => void;
};

function CircleButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-soft"
    >
      {children}
    </button>
  );
}

export function MessagesNav({
  count,
  currentIndex,
  onGoTo,
}: Omit<MessagesNavProps, "onPrevious" | "onNext">) {
  return (
    <div className="mt-4 flex items-center justify-center gap-2">
      {Array.from({ length: count }, (_, index) => {
        const isActive = index === currentIndex;

        return (
          <button
            key={index}
            type="button"
            aria-label={`Ir para recadinho ${index + 1}`}
            aria-current={isActive ? "true" : undefined}
            onClick={() => onGoTo(index)}
            className={
              isActive
                ? "size-2.5 rounded-full bg-accent-strong"
                : "size-2 rounded-full bg-primary/20"
            }
          />
        );
      })}
    </div>
  );
}

export function MessagesArrowPrev({ onClick }: { onClick: () => void }) {
  return (
    <CircleButton label="Recadinho anterior" onClick={onClick}>
      <ChevronLeft aria-hidden className="size-5" strokeWidth={2} />
    </CircleButton>
  );
}

export function MessagesArrowNext({ onClick }: { onClick: () => void }) {
  return (
    <CircleButton label="Próximo recadinho" onClick={onClick}>
      <ChevronRight aria-hidden className="size-5" strokeWidth={2} />
    </CircleButton>
  );
}
