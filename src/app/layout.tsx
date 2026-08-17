import type { Metadata, Viewport } from "next";
import { Dancing_Script, Great_Vibes, Nunito } from "next/font/google";

import {
  SITE_DESCRIPTION,
  SITE_INVITATION_SHARE_TITLE,
  SITE_NAME,
  SITE_SHARE_TITLE,
  getSiteUrl,
} from "@/lib/site";

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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#fdf7f2",
};

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: SITE_SHARE_TITLE,
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  icons: {
    icon: "/images/decorations/heart.webp",
    apple: "/images/decorations/heart.webp",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: SITE_NAME,
    title: SITE_INVITATION_SHARE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/images/share/compartilhamento.jpg",
        alt: "Cecília na fazendinha",
        width: 627,
        height: 627,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_INVITATION_SHARE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/images/share/compartilhamento.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
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
