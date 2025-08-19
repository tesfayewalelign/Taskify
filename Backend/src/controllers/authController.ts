import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { signupSchema } from "../validation/user.validation";
const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "erdtrtyutuyiy8";
export const signup = async (req: Request, res: Response) => {
  console.log("Received signup request:", req.body);
  try {
    const parsed = signupSchema.safeParse(req.body);
    if (!parsed.success) {
      const errorMessages = parsed.error.flatten().fieldErrors;
      return res.status(400).json({ errors: errorMessages });
    }
    const { name, email, password } = parsed.data;
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    return res
      .status(201)
      .json({ message: "User created successfully", userId: newUser.id });
  } catch (err) {
    console.error("Signup error:", err);
    return res.status(500).json({
      error:
        err instanceof Error
          ? err.message
          : "Something went wrong during signup",
    });
  }
};
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "1d",
    });
    return res.status(200).json({
      token,
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (err) {
    return res.status(500).json({ error: "Something went wrong" });
  }
};
