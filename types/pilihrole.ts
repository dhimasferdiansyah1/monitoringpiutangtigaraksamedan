import { z } from "zod";

export const tambahRoleUserSchema = z.object({
  role: z.string().min(1).max(255),
});
