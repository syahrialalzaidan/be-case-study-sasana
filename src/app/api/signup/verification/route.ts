import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { otp, token } = await request.json();

    const user = await prisma.users.findUnique({
      where: {
        registerToken: token.toString(),
      },
    });
    if (!user) {
      return NextResponse.json({ message: "Invalid Token!" }, { status: 406 });
    }

    if (user.registerOtp !== otp) {
      return NextResponse.json({ message: "Invalid OTP!" }, { status: 406 });
    }

    await prisma.users.update({
      where: {
        id: user.id,
      },
      data: {
        verified: true,
      },
    });

    return NextResponse.json({ message: "Email Verified!" }, { status: 200 });
  } catch (error) {
    console.log("Error Verifying Email: ", error);
    return NextResponse.json({ error: `${error}` }, { status: 500 });
  }
}
