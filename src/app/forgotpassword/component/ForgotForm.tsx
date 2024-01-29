"use client";

import { FormEvent, useState } from "react";
import toast from "react-hot-toast";

const ForgotForm = () => {
  const [email, setEmail] = useState("");

  const handleForgot = async (e: FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/forgotpassword", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    console.log(data)

    if (res?.ok) {
      toast.success("Please check your email");
    } else if (res?.status === 406) {
      toast.error("Email not found");
    } else {
      toast.error("Something went wrong");
    }
  };
  return (
    <form className="max-w-md mx-auto mt-4" onSubmit={handleForgot}>
      <div className="mb-4">
        <input
          type="text"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Enter your email"
          className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="text-center">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default ForgotForm;
