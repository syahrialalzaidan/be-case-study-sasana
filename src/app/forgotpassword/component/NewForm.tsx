"use client";

import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";

const NewForm = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const handleChangePw = async (e: FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Password and confirm password not match");
      return;
    }

    const res = await fetch("/api/forgotpassword/new", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    });

    if (res.ok) {
      toast.success("Password changed");
      router.push("/login");
    } else if (res.status === 406) {
      toast.error("Token Invalid");
    } else if (res.status === 404) {
      toast.error("Account Not Found");
    } else {
      toast.error("Something went wrong");
    }
  };

  return (
    <form className="max-w-md mx-auto mt-8" onSubmit={handleChangePw}>
      <div className="mb-6">
        <div className="flex w-full justify-between">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Password:
          </label>
        </div>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="mb-6">
        <div className="flex w-full justify-between">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Confirm Password:
          </label>
        </div>
        <input
          type="password"
          id="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-blue-500"
        />
      </div>

      <div className="text-center">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
        >
          Set Password
        </button>
      </div>
    </form>
  );
};

export default NewForm;
