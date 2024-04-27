import { id } from "date-fns/locale";
import { z } from "zod";

export const editBuktiPelunasanSchema = z.object({
  no_bp: z.string(),
  foto_bp: z.string().optional(),
});
