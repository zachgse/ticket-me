"use client"

import { useSession } from "next-auth/react";

export default function Home() {
  const { data:session } = useSession();

  return (
    <>
      <div className="flex flex-col gap-4 items-center justify-center mt-24">
        <p>
        {session 
          ? `Hello there ${session?.user?.name}` : "You are not logged in yet"}
        </p>
        <p>THIS IS DASHBOARDD BTW</p>
      </div>
    </>
  );
}
