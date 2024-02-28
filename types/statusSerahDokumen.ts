import { z } from "zod";

export const statusSerahDokumenSchema = z.object({
  status_serah: z.string().min(10),
});
