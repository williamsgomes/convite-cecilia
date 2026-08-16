import type { Metadata } from "next";

import { loginConfirmacoes, logoutConfirmacoes } from "@/app/confirmacoes/actions";
import { isConfirmacoesAuthed } from "@/lib/confirmacoes/auth";
import { getRsvps } from "@/lib/data/rsvps";
import type { Rsvp } from "@/types/rsvp";

export const metadata: Metadata = {
  title: "Confirmações",
  robots: {
    index: false,
    follow: false,
  },
};

type ConfirmacoesPageProps = {
  searchParams: Promise<{ erro?: string }>;
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(value));
}

function RsvpTable({ title, rows }: { title: string; rows: Rsvp[] }) {
  return (
    <section className="mt-8">
      <h2 className="text-lg font-semibold text-neutral-900">{title}</h2>
      <div className="mt-3 overflow-x-auto rounded-lg border border-neutral-200 bg-white">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-neutral-50 text-neutral-600">
            <tr>
              <th className="px-4 py-3 font-medium">Nome</th>
              <th className="px-4 py-3 font-medium">Crianças</th>
              <th className="px-4 py-3 font-medium">Quando</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td className="px-4 py-6 text-neutral-500" colSpan={3}>
                  Nenhuma resposta nesta lista ainda.
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr key={row.id} className="border-t border-neutral-100">
                  <td className="px-4 py-3 font-medium text-neutral-900">{row.name}</td>
                  <td className="px-4 py-3 text-neutral-700">{row.childrenCount}</td>
                  <td className="px-4 py-3 text-neutral-500">{formatDate(row.createdAt)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function LoginForm({ hasError }: { hasError: boolean }) {
  return (
    <main className="mx-auto flex min-h-full w-full max-w-md flex-col justify-center px-4 py-16">
      <h1 className="text-2xl font-semibold text-neutral-900">Confirmações</h1>
      <p className="mt-2 text-sm text-neutral-600">
        Digite a senha para ver quem confirmou presença.
      </p>

      <form action={loginConfirmacoes} className="mt-8 space-y-4">
        <label className="block text-sm font-medium text-neutral-800" htmlFor="password">
          Senha
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-neutral-900 outline-none focus:border-neutral-800"
        />
        {hasError ? (
          <p role="alert" className="text-sm font-medium text-red-700">
            Senha incorreta.
          </p>
        ) : null}
        <button
          type="submit"
          className="w-full rounded-md bg-neutral-900 px-4 py-2.5 text-sm font-semibold text-white"
        >
          Entrar
        </button>
      </form>
    </main>
  );
}

export default async function ConfirmacoesPage({
  searchParams,
}: ConfirmacoesPageProps) {
  const params = await searchParams;
  const authed = await isConfirmacoesAuthed();

  if (!authed) {
    return <LoginForm hasError={params.erro === "1"} />;
  }

  const rsvps = await getRsvps();
  const confirmed = rsvps.filter((item) => item.status === "confirmed");
  const declined = rsvps.filter((item) => item.status === "declined");
  const childrenTotal = confirmed.reduce((sum, item) => sum + item.childrenCount, 0);

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-10">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-neutral-900">Confirmações</h1>
          <p className="mt-1 text-sm text-neutral-600">
            Lista de quem vai e de quem avisou que não poderá ir.
          </p>
        </div>
        <form action={logoutConfirmacoes}>
          <button
            type="submit"
            className="rounded-md border border-neutral-300 px-3 py-2 text-sm font-medium text-neutral-800"
          >
            Sair
          </button>
        </form>
      </div>

      <dl className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-lg border border-neutral-200 bg-white px-4 py-4">
          <dt className="text-sm text-neutral-500">Vão</dt>
          <dd className="mt-1 text-2xl font-semibold text-neutral-900">{confirmed.length}</dd>
        </div>
        <div className="rounded-lg border border-neutral-200 bg-white px-4 py-4">
          <dt className="text-sm text-neutral-500">Não vão</dt>
          <dd className="mt-1 text-2xl font-semibold text-neutral-900">{declined.length}</dd>
        </div>
        <div className="rounded-lg border border-neutral-200 bg-white px-4 py-4">
          <dt className="text-sm text-neutral-500">Crianças</dt>
          <dd className="mt-1 text-2xl font-semibold text-neutral-900">{childrenTotal}</dd>
        </div>
      </dl>

      <RsvpTable title="Vão à festa" rows={confirmed} />
      <RsvpTable title="Não vão" rows={declined} />
    </main>
  );
}
