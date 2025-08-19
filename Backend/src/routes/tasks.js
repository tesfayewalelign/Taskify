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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const router = (0, express_1.Router)();
function authMiddleware(req, _res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const auth = req.headers.authorization;
            let user = null;
            if (!auth) {
                const guestEmail = "guest@local";
                user = yield prisma.user.findUnique({ where: { email: guestEmail } });
                if (!user) {
                    user = yield prisma.user.create({
                        data: { name: "Guest", email: guestEmail, password: "" },
                    });
                }
            }
            else {
                const parts = auth.split(" ");
                if (parts.length === 2 && parts[0] === "Bearer") {
                    const token = parts[1];
                    if (/^\d+$/.test(token)) {
                        const id = Number(token);
                        user = yield prisma.user.findUnique({ where: { id } });
                        if (!user) {
                            user = yield prisma.user.findFirst();
                        }
                    }
                    else {
                        const email = token;
                        user = yield prisma.user.findUnique({ where: { email } });
                        if (!user) {
                            user = yield prisma.user.create({
                                data: {
                                    name: email.split("@")[0] || "User",
                                    email,
                                    password: "",
                                },
                            });
                        }
                    }
                }
            }
            if (!user) {
                const fallback = yield prisma.user.findFirst();
                if (!fallback) {
                    const created = yield prisma.user.create({
                        data: {
                            name: "Fallback",
                            email: `fallback_${Date.now()}@local`,
                            password: "",
                        },
                    });
                    req.user = { id: created.id };
                    return next();
                }
                req.user = { id: fallback.id };
                return next();
            }
            req.user = { id: user.id };
            next();
        }
        catch (_a) {
            const guest = yield prisma.user.findUnique({
                where: { email: "guest@local" },
            });
            if (guest)
                req.user = { id: guest.id };
            next();
        }
    });
}
router.post("/task", authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const body = req.body;
    const title = typeof body.title === "string" ? body.title.trim() : "";
    const status = typeof body.status === "string" && body.status.trim() !== ""
        ? body.status.trim()
        : "pending";
    if (!title)
        return res.status(400).json({ message: "Title is required" });
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    if (!userId)
        return res.status(400).json({ message: "Could not determine user" });
    try {
        const newTask = yield prisma.task.create({
            data: { title, status, userId },
        });
        return res.status(201).json(newTask);
    }
    catch (_b) {
        return res.status(500).json({ message: "Failed to create task" });
    }
}));
router.get("/tasks", authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    if (!userId)
        return res.status(400).json({ message: "Could not determine user" });
    try {
        const tasks = yield prisma.task.findMany({
            where: { userId, status: "pending" },
            orderBy: { createdAt: "desc" },
        });
        return res.status(200).json(tasks);
    }
    catch (_b) {
        return res.status(500).json({ message: "Failed to fetch tasks" });
    }
}));
exports.default = router;
