import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

import { getAdminListingPassword } from "@/lib/supabase/env";

export const CONFIRMACOES_COOKIE = "cecilia_confirmacoes";

function expectedToken() {
  return createHmac("sha256", getAdminListingPassword() || "missing")
    .update("confirmacoes")
    .digest("hex");
}

function safeEqual(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }

  return timingSafeEqual(leftBuffer, rightBuffer);
}

export function passwordsMatch(input: string) {
  return safeEqual(input, getAdminListingPassword());
}

export async function isConfirmacoesAuthed() {
  const store = await cookies();
  const value = store.get(CONFIRMACOES_COOKIE)?.value;

  if (!value) {
    return false;
  }

  return safeEqual(value, expectedToken());
}

export async function setConfirmacoesSession() {
  const store = await cookies();
  store.set(CONFIRMACOES_COOKIE, expectedToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function clearConfirmacoesSession() {
  const store = await cookies();
  store.delete(CONFIRMACOES_COOKIE);
}
