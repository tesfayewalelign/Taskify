"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.signup = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_validation_1 = require("../validation/user.validation");
const prisma = new client_1.PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "erdtrtyutuyiy8";
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Received signup request:", req.body);
    try {
        const parsed = user_validation_1.signupSchema.safeParse(req.body);
        if (!parsed.success) {
            const errorMessages = parsed.error.flatten().fieldErrors;
            return res.status(400).json({ errors: errorMessages });
        }
        const { name, email, password } = parsed.data;
        const existingUser = yield prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const newUser = yield prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });
        return res
            .status(201)
            .json({ message: "User created successfully", userId: newUser.id });
    }
    catch (err) {
        console.error("Signup error:", err);
        return res.status(500).json({
            error: err instanceof Error
                ? err.message
                : "Something went wrong during signup",
        });
    }
});
exports.signup = signup;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const isMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const token = jsonwebtoken_1.default.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
            expiresIn: "1d",
        });
        return res.status(200).json({
            token,
            user: { id: user.id, name: user.name, email: user.email },
        });
    }
    catch (err) {
        return res.status(500).json({ error: "Something went wrong" });
    }
});
exports.login = login;
