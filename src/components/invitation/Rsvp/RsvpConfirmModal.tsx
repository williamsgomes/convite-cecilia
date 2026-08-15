"use client";

import { Button } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";

type RsvpConfirmModalProps = {
  isOpen: boolean;
  name: string;
  guests: number;
  error?: string;
  isLoading: boolean;
  onNameChange: (value: string) => void;
  onGuestsChange: (value: number) => void;
  onClose: () => void;
  onSubmit: () => void;
};

export function RsvpConfirmModal({
  isOpen,
  name,
  guests,
  error,
  isLoading,
  onNameChange,
  onGuestsChange,
  onClose,
  onSubmit,
}: RsvpConfirmModalProps) {
  return (
    <Modal isOpen={isOpen} title="Confirmar presença" onClose={onClose}>
      <form
        className="space-y-4"
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit();
        }}
      >
        {error ? (
          <p role="alert" className="text-sm font-semibold text-accent-strong">
            {error}
          </p>
        ) : null}

        <Field id="rsvp-nome" label="Seu nome">
          <Input
            name="name"
            autoComplete="name"
            placeholder="Como podemos te chamar?"
            value={name}
            onChange={(event) => onNameChange(event.target.value)}
            disabled={isLoading}
            required
          />
        </Field>

        <Field id="rsvp-convidados" label="Quantos convidados?" hint="Incluindo você.">
          <Input
            name="guests"
            type="number"
            inputMode="numeric"
            min={1}
            max={20}
            value={guests}
            onChange={(event) => onGuestsChange(Number(event.target.value))}
            disabled={isLoading}
            required
          />
        </Field>

        <div className="flex flex-col gap-3 pt-2 sm:flex-row">
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancelar
          </Button>
          <Button type="submit" variant="sage" className="w-full" disabled={isLoading}>
            {isLoading ? "Enviando..." : "Confirmar presença"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
