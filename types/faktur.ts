import { z } from "zod";

//Faktur

const numericDeliveryRequiredString = z
  .string({
    required_error: "Nomor delivery note tidak boleh kosong",
  })
  .min(1, "Nomor purchase order tidak boleh kosong")
  .regex(/^\d+$/, "Harus berupa angka");

export const editFakturSchema = z.object({
  no_fk: numericDeliveryRequiredString,
  tgl_fk: z.coerce.date(),
  tgl_jt: z.string(),
  nilai: z.string(),
  foto1_fk: z.string().optional(),
  foto2_fk: z.string().optional(),
});
