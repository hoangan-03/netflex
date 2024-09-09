import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import prismadb from "@/lib/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { fullname, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const newUser = await prismadb.user.create({
        data: {
          fullname,
          email,
          hashedPassword,
        },
      });
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ error: "User already exists" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}