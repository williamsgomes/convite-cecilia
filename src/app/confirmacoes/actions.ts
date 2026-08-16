"use server";

import { redirect } from "next/navigation";

import {
  clearConfirmacoesSession,
  passwordsMatch,
  setConfirmacoesSession,
} from "@/lib/confirmacoes/auth";

export async function loginConfirmacoes(formData: FormData) {
  const password = String(formData.get("password") ?? "");

  if (!passwordsMatch(password)) {
    redirect("/confirmacoes?erro=1");
  }

  await setConfirmacoesSession();
  redirect("/confirmacoes");
}

export async function logoutConfirmacoes() {
  await clearConfirmacoesSession();
  redirect("/confirmacoes");
}
