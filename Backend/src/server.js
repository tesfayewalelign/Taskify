"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app_1 = __importDefault(require("./app"));
const port = 5000;
app_1.default.use(express_1.default.json());
app_1.default.get("/", (req, res) => {
    res.send("Backend is working!");
});
app_1.default.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
