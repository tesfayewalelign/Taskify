import express from "express";
import router from "./routes/user.route";
import cors from "cors";

const app = express();

const allowedOrigins = [
  "http://localhost:3000",
  "https://taskify-pro-snowy.vercel.app",
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(express.json());
app.use("/api", router);

app.get("/", (_req, res) => res.json({ ok: true }));

export default app;
