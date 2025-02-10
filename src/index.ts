import { env } from "@/lib/env";
import { indexRoute } from "@/routes";
import { commandLineRoute } from "@/routes/commandline";
import { progressStateRoute } from "@/routes/progress-state";
import { tasksRoute } from "@/routes/tasks";
import { updatesRoute } from "@/routes/updates";
import cors from "cors";
import type { Request, Response } from "express";
import express from "express";
import morgan from "morgan";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors({
  origin: "*"
}));

app.use(
  "/api/v1",
  commandLineRoute,
  indexRoute,
  progressStateRoute,
  tasksRoute,
  updatesRoute
);

app.get("/hello", async (req: Request, res: Response) => {
  const { name } = req.query;
  return res.json({ message: `Hello ${name || "World"}` });
});

app.listen(env.PORT, () => {
  console.log(`Server running on port ${env.PORT}`);
});
