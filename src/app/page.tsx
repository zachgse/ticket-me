"use client"

import { useSession } from "next-auth/react";

export default function Home() {
  const { data:session } = useSession();

  return (
    <>
      <div className="flex items-center justify-center mt-24">
        {session 
          ? `Hello there ${session?.user?.name}` : "You are not logged in yet"}
      </div>
    </>
  );
}
