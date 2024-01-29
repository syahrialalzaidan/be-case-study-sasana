import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";
import { sendForgotPassword } from "@/lib/mailer";
import { experimental_taintUniqueValue } from "react";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    console.log(experimental_taintUniqueValue)

    const user = await prisma.users.findUnique({
      where: {
        email: email.toString(),
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Account Not Found!" },
        { status: 406 }
      );
    }
    const resetpasswordtoken = crypto.randomBytes(64).toString("hex");
    await prisma.users.update({
      where: {
        email: email.toString(),
      },
      data: {
        resetPasswordToken: resetpasswordtoken,
        resetPasswordExpiredDate: new Date(Date.now() + 3600000),
      },
    });

    sendForgotPassword(email, resetpasswordtoken);
    return NextResponse.json({ message: "Email Sent!" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
