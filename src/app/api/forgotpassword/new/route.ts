import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function PATCH(request: NextRequest) {
  try {
    const { token, password } = await request.json();
    const hashedPassword = await bcrypt.hash(password, 5);

    const datenow = new Date();
    const user = await prisma.users.findUnique({
      where: {
        resetPasswordToken: token.toString(),
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Account Not Found!" },
        { status: 404 }
      );
    }

    if (!user.resetPasswordExpiredDate) {
      return NextResponse.json({ message: "Token Expired!" }, { status: 406 });
    } else if (user.resetPasswordExpiredDate < datenow) {
      return NextResponse.json({ message: "Token Expired!" }, { status: 406 });
    }

    await prisma.users.update({
      where: {
        resetPasswordToken: token.toString(),
      },
      data: {
        resetPasswordToken: null,
        resetPasswordExpiredDate: null,
        password: hashedPassword,
      },
    });

    return NextResponse.json({ message: "Password Changed!" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
