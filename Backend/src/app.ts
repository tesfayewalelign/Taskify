import express from "express";
import router from "./routes/user.route";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000", "https://taskify-pro-snowy.vercel.app"],
    credentials: true,
  })
);
const PORT = process.env.PORT ? Number(process.env.PORT) : 5000;

app.use(cors());

app.use(express.json());

app.use("/api", router);

app.get("/", (_req, res) => res.json({ ok: true }));

export default app;
