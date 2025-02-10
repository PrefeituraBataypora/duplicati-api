import { commandLine } from "@/controllers/commandline";
import { Router } from "express";

const commandLineRoute = Router();

commandLineRoute.get("/commandline", commandLine);

export { commandLineRoute };
