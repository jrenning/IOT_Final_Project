"use client";
import "~/styles/globals.css";

import { Inter } from "next/font/google";

import Header from "~/components/Header";

import { AuthContextProvider, UserAuth } from "~/context/AuthContext";
// Force next.js to treat this route as server-side rendered
// Without this line, during the build process, next.js will treat this route as static and build a static HTML file for it

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        <AuthContextProvider>
          <Header />
          {children}
        </AuthContextProvider>
      </body>
    </html>
  );
}
