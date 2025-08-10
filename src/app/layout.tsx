import { auth } from "../../auth";
import RootLayoutClient from "./RootLayoutClient";
import "./globals.css";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  return (
    <html lang="en">
      <body className="h-screen">
        <RootLayoutClient session={session}>
          {children}
        </RootLayoutClient>
      </body>
    </html>
  );
}
