import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { sendVerificationEmail } from "@/lib/mailer";
import crypto from "crypto";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Data tidak lengkap!" },
        { status: 400 }
      );
    }
    const isUserExisted = await prisma.users.findUnique({
      where: {
        email,
      },
    });

    if (isUserExisted) {
      return NextResponse.json(
        { message: "Email sudah Terdaftar!" },
        { status: 406 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 5);
    const registerOtp = Math.floor(1000 + Math.random() * 9000).toString();
    const registerToken = crypto.randomBytes(64).toString("hex");
    

    const user = await prisma.users.create({
      data: {
        email,
        password: hashedPassword,
        resetPasswordToken: null,
        resetPasswordExpiredDate: null,
        loginOtp: null,
        registerToken: registerToken,
        registerOtp: registerOtp,
        verified: false,
      },
    });
    sendVerificationEmail(email, registerOtp, registerToken);

    return NextResponse.json(user, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(error);
  }
}
