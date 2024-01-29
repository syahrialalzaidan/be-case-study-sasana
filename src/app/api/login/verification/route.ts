import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Invalid Data" }, { status: 400 });
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
