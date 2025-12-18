import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Provider } from "../components/providers/providers";

import { Header } from "@/components/application/specific/Header/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Financial Score - Samuel Pedro Dopke",
    default: "Financial Score",
  },
  description:
    "Encontre análises detalhadas de custos financeiros e as melhores oportunidades de negócio para empresas e pessoas físicas. | Samuel Pedro Dopke",

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark`}
      >
        <Provider>
          <Header></Header>
          {children}
        </Provider>
      </body>
    </html>
  );
}
