"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = require("../db");
const schema_1 = require("../db/schema");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const drizzle_orm_1 = require("drizzle-orm");
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error("JWT_SECRET environment variable is not set");
}
const router = (0, express_1.Router)();
router.post("/register", async (req, res) => {
    try {
        const { fullName, email, password, phone, age, city, gender, interests } = req.body;
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        await db_1.db.insert(schema_1.users).values({
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
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
});
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await db_1.db
            .select()
            .from(schema_1.users)
            .where((0, drizzle_orm_1.eq)(schema_1.users.email, email));
        if (existingUser.length === 0) {
            return res.status(400).json({ message: "User not found" });
        }
        const user = existingUser[0];
        const isMatch = await bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "1h" });
        res.json({
            message: "Login successful",
            token,
            user: {
                id: user.id,
                fullName: user.fullName,
                email: user.email,
            }
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
});
exports.default = router;
