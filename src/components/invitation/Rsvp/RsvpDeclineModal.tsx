"use client";

import { Button } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";

type RsvpDeclineModalProps = {
  isOpen: boolean;
  name: string;
  error?: string;
  isLoading: boolean;
  onNameChange: (value: string) => void;
  onClose: () => void;
  onSubmit: () => void;
};

export function RsvpDeclineModal({
  isOpen,
  name,
  error,
  isLoading,
  onNameChange,
  onClose,
  onSubmit,
}: RsvpDeclineModalProps) {
  return (
    <Modal isOpen={isOpen} title="Não poderei ir" onClose={onClose}>
      <form
        className="space-y-4"
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit();
        }}
      >
        <p className="text-sm leading-relaxed text-primary sm:text-base">
          Tudo bem avisar com carinho. Informe seu nome para registrarmos que
          não poderá comparecer.
        </p>

        {error ? (
          <p role="alert" className="text-sm font-semibold text-accent-strong">
            {error}
          </p>
        ) : null}

        <Field id="rsvp-ausencia-nome" label="Seu nome">
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

        <div className="flex flex-col gap-3 pt-2 sm:flex-row">
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={onClose}
            disabled={isLoading}
          >
            Voltar
          </Button>
          <Button
            type="submit"
            variant="accent"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? "Enviando..." : "Confirmar ausência"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
