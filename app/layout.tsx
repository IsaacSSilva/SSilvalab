import type { Metadata } from "next";
import { Doto, JetBrains_Mono, Manrope } from "next/font/google";
import "./globals.css";

const inter = Doto({
  variable: "--font-doto",
  subsets: ["latin"],
});

const geistMono = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SSilva lab",
  description:
    "Meu protifolio pessoal, me chamdo issac e aqui divulgo meus projetos, minhas espereincias e estou aberto a negocios.",
  authors: { name: "Isaac S. Silva", url: "https://github.com/IsaacSSilva" },
  category: "Portifolio",
  creator: "Isaac Gabriel Sousa Silva",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${inter.className} ${geistMono.variable} ${jetbrains.variable} antialiased bg-zinc-950 grid-bg fade-center`}
      >
        {children}
      </body>
    </html>
  );
}
