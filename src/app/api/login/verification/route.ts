import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(request: NextRequest) {
  try {
    const { email, otp } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Invalid Data" }, { status: 400 });
    }

    const user = await prisma.users.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    if (user.loginOtp !== otp) {
      return NextResponse.json({ message: "Invalid OTP" }, { status: 400 });
    }

    await prisma.users.update({
      where: {
        email,
      },
      data: {
        loginOtp: null,
      },
    });
    return NextResponse.json(
      { message: "User logged in successfully" },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
