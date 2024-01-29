"use client";

import { signOut } from "next-auth/react";

export default function Dashboard() {
  const handleLogout = async () => {
    await signOut();
  };

  return (
    <div className="min-h-screen flex flex-col gap-6 items-center justify-center">
      <h1>This is Dashboard</h1>
      <button
        onClick={handleLogout}
        className="font-bold py-2 px-4 rounded bg-red-500"
      >
        Logout
      </button>
    </div>
  );
}
