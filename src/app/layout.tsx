"use client";

import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";
import "./globals.css";

export default function RootLayout({
  children,
  session,
}: {
  children: React.ReactNode;
  session?: Session;
}) {
  return (
    <html lang="en">
      <body className="h-screen">
        <SessionProvider session={session}>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
