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
exports.deleteTask = exports.getTasks = exports.createTask = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { title, status } = req.body;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    if (!userId) {
        return res.status(401).json({ message: "Unauthorized: user ID not found" });
    }
    if (!title) {
        return res.status(400).json({ message: "Title is required" });
    }
    try {
        const newTask = yield prisma.task.create({
            data: {
                title,
                status: status || "pending",
                userId: userId,
            },
        });
        return res.status(201).json({
            message: "Task created successfully",
            task: newTask,
        });
    }
    catch (error) {
        console.error("Task Creation Error:", error);
        return res.status(500).json({ message: "Server error" });
    }
});
exports.createTask = createTask;
const getTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = yield prisma.task.findMany({
            where: { userId: req.user.id },
            orderBy: { createdAt: "desc" },
        });
        res.json(tasks);
    }
    catch (err) {
        res.status(500).json({ message: "Server error", error: err });
    }
});
exports.getTasks = getTasks;
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    const { id } = req.params;
    if (!userId) {
        return res.status(401).json({ message: "Unauthorized: user ID not found" });
    }
    const taskId = parseInt(id, 10);
    try {
        const task = yield prisma.task.findFirst({
            where: { id: taskId, userId },
        });
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        yield prisma.task.delete({ where: { id: taskId } });
        return res.json({ message: "Task deleted successfully" });
    }
    catch (err) {
        console.error("Delete Task Error:", err);
        return res.status(500).json({ message: "Server error", error: err });
    }
});
exports.deleteTask = deleteTask;
