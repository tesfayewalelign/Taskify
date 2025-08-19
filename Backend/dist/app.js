"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const PORT = process.env.PORT ? Number(process.env.PORT) : 5000;
app.use((0, cors_1.default)({ origin: "http://localhost:3000" }));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api", user_route_1.default);
app.get("/", (_req, res) => res.json({ ok: true }));
exports.default = app;
