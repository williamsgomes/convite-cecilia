export const SITE_NAME = "Fazendinha da Cecília";

export const SITE_SHARE_TITLE = "Vai ter Festa na Fazendinha da Cecília";

export const SITE_INVITATION_SHARE_TITLE = "Aperte aqui para abrir o Convite";

export const SITE_DESCRIPTION =
  "Você está convidado para o 1 aninho da Cecília. Vem comemorar na fazendinha, com carinho e muita alegria.";

export function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3001";
}
