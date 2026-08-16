export const SITE_NAME = "Fazendinha da Cecília";

export const SITE_DESCRIPTION =
  "Convite de 1 aninho da Cecília. Uma festinha no campo, com carinho, para celebrar esse dia especial.";

export function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3001";
}
