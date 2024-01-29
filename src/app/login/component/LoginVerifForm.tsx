"use client";

import { useRef, FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

interface LoginVerifFormProps {
  email: string | null | undefined;
}

const LoginVerifForm = ({ email }: LoginVerifFormProps) => {
  const [digits, setDigits] = useState(["", "", "", ""]);
  const router = useRouter();

  const digitRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const handleVerify = async (e: FormEvent) => {
    e.preventDefault();
    const otp = digits.join("");
    // Call your verification logic here with otpCode

    if (otp == "") {
      toast.error("Please fill all fields");
      return;
    }

    const res = await fetch("/api/login/verification", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    if (res.ok) {
      toast.success("Account verified");
      router.push("/");
    } else if (res.status === 406) {
      toast.error(data.message);
    } else {
      toast.error("Something went wrong");
    }
  };

  const handleDigitChange = (index: number, value: string) => {
    // Check if the value is a digit, and update the state accordingly
    if (/^\d$/.test(value)) {
      setDigits((prevDigits) => {
        const newDigits = [...prevDigits];
        newDigits[index] = value;
        return newDigits;
      });

      // Move focus to the next input if available
      if (index < digitRefs.length - 1 && digitRefs[index + 1].current) {
        digitRefs[index + 1]?.current?.focus();
      }
    }
  };

  return (
    <form className="max-w-md mx-auto mt-8" onSubmit={handleVerify}>
      <div className="mb-4">
        <label
          htmlFor="otp"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Enter your OTP Code:
        </label>

        {/* make an input per digit */}
        <div className="flex gap-4 justify-center items-center">
          {digits.map((digit, index) => (
            <input
              key={index}
              type="number"
              id={`digit${index + 1}`}
              value={digit}
              onChange={(e) => handleDigitChange(index, e.target.value)}
              required
              className="w-1/4 px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-blue-500"
              ref={digitRefs[index]}
            />
          ))}
        </div>
      </div>
      <div className="text-center">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
        >
          Verify Account
        </button>
      </div>
    </form>
  );
};

export default LoginVerifForm;
