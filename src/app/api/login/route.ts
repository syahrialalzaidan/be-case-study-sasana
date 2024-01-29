import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendLoginVerification } from "@/lib/mailer";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

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

    const loginOtp = Math.floor(1000 + Math.random() * 9000).toString();
    await prisma.users.update({
      where: {
        email,
      },
      data: {
        loginOtp: loginOtp,
      },
    });
    sendLoginVerification(email, loginOtp);
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
