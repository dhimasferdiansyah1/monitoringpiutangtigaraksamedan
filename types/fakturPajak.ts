import { z } from "zod";

export const editfakturPajakSchema = z.object({
  no_fkp: z.string(),
  tgl_fkp: z.coerce.date(),
  foto_fkp: z.string().optional(),
});
