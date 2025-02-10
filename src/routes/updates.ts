import { checkUpdates } from "@/controllers/updates";
import { Router } from "express";

const updatesRoute = Router()

updatesRoute.post("/updates/check", checkUpdates)

export { updatesRoute }