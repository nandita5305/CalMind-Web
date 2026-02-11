import { Router } from "express";
import { db } from "../db";
import { users } from "../db/schema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { eq } from "drizzle-orm";

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET environment variable is not set");
}

const router = Router();

router.post("/register", async (req, res) => {
  try {
    const { fullName, email, password, phone, age, city, gender, interests } =
      req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.insert(users).values({
      fullName,
      email,
      password: hashedPassword,
      phone,
      age: Number(age),
      city,
      gender,
      interests,
    });

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});



router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email));

    if (existingUser.length === 0) {
      return res.status(400).json({ message: "User not found" });
    }

    const user = existingUser[0];


    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
  message: "Login successful",
  token,
  user: {
    id: user.id,
    fullName: user.fullName,
    email: user.email,
  }
});


  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

export default router;
