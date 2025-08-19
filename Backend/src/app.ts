import express from "express";
import router from "./routes/user.route";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: ["https://taskify-pro-snowy.vercel.app"],
    credentials: true,
  })
);

app.use(express.json());
app.use("/api", router);

app.get("/", (_req, res) => res.json({ ok: true }));

export default app;
