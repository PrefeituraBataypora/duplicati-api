import axios from "axios";
import { env } from "@/lib/env";

const api = axios.create({
  baseURL: env.DUPLICATI_BASE_URL,
});

export { api };
