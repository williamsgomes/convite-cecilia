import type { Metadata } from "next";
import { Dancing_Script, Great_Vibes, Nunito } from "next/font/google";

import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
  weight: ["400", "600", "700", "800"],
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  variable: "--font-great-vibes",
  display: "swap",
  weight: "400",
});

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-dancing",
  display: "swap",
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Fazendinha da Cecília",
    template: "%s · Fazendinha da Cecília",
  },
  description:
    "Convite de 1 aninho da Cecília. Uma festinha no campo, com carinho, para celebrar esse dia especial.",
  applicationName: "Fazendinha da Cecília",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${nunito.variable} ${greatVibes.variable} ${dancingScript.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-surface font-sans text-primary">
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-surface-raised focus:px-4 focus:py-2"
        >
          Ir para o conteúdo
        </a>
        {children}
      </body>
    </html>
  );
}
