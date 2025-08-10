"use client";

import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function RootLayoutClient({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) {
  const pathName = usePathname();
  const hideLayout = ["/login"].includes(pathName);

  return (
    <SessionProvider session={session}>
      {!hideLayout && <Navbar />}
      {children}
    </SessionProvider>
  );
}
