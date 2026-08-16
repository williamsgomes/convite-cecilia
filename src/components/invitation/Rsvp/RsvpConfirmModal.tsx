"use client";

import { Button } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { NumberStepper } from "@/components/ui/NumberStepper";

type RsvpConfirmModalProps = {
  isOpen: boolean;
  name: string;
  adultsCount: number;
  childrenCount: number;
  error?: string;
  isLoading: boolean;
  onNameChange: (value: string) => void;
  onAdultsCountChange: (value: number) => void;
  onChildrenCountChange: (value: number) => void;
  onClose: () => void;
  onSubmit: () => void;
};

export function RsvpConfirmModal({
  isOpen,
  name,
  adultsCount,
  childrenCount,
  error,
  isLoading,
  onNameChange,
  onAdultsCountChange,
  onChildrenCountChange,
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

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field
            id="rsvp-adultos"
            label="Quantos adultos vão?"
            hint="Incluindo você."
          >
            <NumberStepper
              label="adultos"
              value={adultsCount}
              min={0}
              max={20}
              disabled={isLoading}
              onChange={onAdultsCountChange}
            />
          </Field>

          <Field
            id="rsvp-criancas"
            label="Quantas crianças vão?"
            hint="Se não houver, deixe em 0."
          >
            <NumberStepper
              label="crianças"
              value={childrenCount}
              min={0}
              max={20}
              disabled={isLoading}
              onChange={onChildrenCountChange}
            />
          </Field>
        </div>

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
