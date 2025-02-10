import { z } from "zod";

const envSchema = z.object({
  PORT: z.coerce
    .number()
    .min(3000, { message: "PORT must be greater than or equal to 3000" })
    .max(65535, { message: "PORT must be less than or equal to 65535" })
    .default(3333),
  DUPLICATI_MASTER_PASSWORD: z
    .string()
    .nonempty("DUPLICATI_MASTER_PASSWORD is required"),
  DUPLICATI_BASE_URL: z.string().url(),
});

const env = envSchema.parse(process.env);

export { env };
