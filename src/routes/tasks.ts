import { getTasks } from "@/controllers/tasks";
import { Router } from "express";

const tasksRoute = Router();

tasksRoute.get("/tasks", getTasks);

export { tasksRoute };
