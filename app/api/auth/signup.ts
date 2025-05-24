import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }
    // Check if user already exists
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json(
        { message: "Email already in use" },
        { status: 400 }
      );
    }
    // Hash password
    const hashed = await bcrypt.hash(password, 10);
    // Create user
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashed,
      },
    });
    return NextResponse.json({ message: "User created" }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
