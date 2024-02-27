import { z } from "zod";

export const editTandaTerimaTagihanSchema = z.object({
  no_penagihan: z.string(),
  status: z.string(),
  tgl_jt: z.string(),
  foto_ttt: z.string().optional(),
});
