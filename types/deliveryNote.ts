import { z } from "zod";

const numericDeliveryRequiredString = z
  .string({
    required_error: "Nomor delivery note tidak boleh kosong",
  })
  .min(1, "Nomor purchase order tidak boleh kosong")
  .regex(/^\d+$/, "Harus berupa angka");

//DeliveryNote
export const DeliveryNoteSchema = z.object({
  no_dn: numericDeliveryRequiredString,
  foto1_dn: z.string().optional(),
  foto2_dn: z.string().optional(),
});
