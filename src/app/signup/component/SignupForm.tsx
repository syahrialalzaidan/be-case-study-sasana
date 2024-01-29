"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";

const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();

    if (email == "" || password == "" || confirmPassword == "") {
      toast.error("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const res = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const json = await res.json();

    if (json.message) {
      toast.error(json.message);
    } else {
      toast.success("Account created successfully, Please Check Your Email for Verification");
    }
  };

  return (
    <form className="max-w-md mx-auto mt-8" onSubmit={handleRegister}>
      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Email:
        </label>
        <input
          type="text"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="password"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Password:
        </label>
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
        <label
          htmlFor="password"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Confirm Password:
        </label>
        <input
          type="password"
          id="confirmpassword"
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
          Signup
        </button>
      </div>
    </form>
  );
};

export default SignupForm;
