"use client";

import { signOut } from "next-auth/react";

export default function Dashboard() {
  const handleLogout = async () => {
    await signOut();
  };

  return (
    <div className="flex flex-col gap-6 items-center justify-center">
      <p>Hello, welcome to the Dashboard Page</p>
      <button
        onClick={handleLogout}
        className="font-bold bg-red-500 z-50 py-2 px-4 rounded"
      >
        Logout
      </button>
    </div>
  );
}
