import type { Metadata } from "next";
import { Montserrat, Luckiest_Guy } from "next/font/google";

import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const luckiest = Luckiest_Guy({
  subsets: ["latin"],
  weight: "400", // Luckiest Guy gibt es nur in Regular 400
  variable: "--font-luckiest",
});

export const metadata: Metadata = {
  title: "Water Me!",
  description:
    "Hate wasting water? Determine the best schedule to water your garden!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${montserrat.variable} ${luckiest.variable}`}>
      <body>{children}</body>
    </html>
  );
}
