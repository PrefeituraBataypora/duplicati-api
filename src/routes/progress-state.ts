import { getProgressState } from "@/controllers/progress-state";
import { Router } from "express";

const progressStateRoute = Router();

progressStateRoute.get("/progressstate", getProgressState);

export { progressStateRoute };
