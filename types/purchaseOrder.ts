import { z } from "zod";

const numericPurchaseOrderRequiredString = z
  .string()
  .min(1, "Required")
  .regex(/^\d+$/, "Harus berupa angka");

export const TambahPurchaseOrderSchema = z.object({
  customer_id: z
    .string()
    .min(1, "Kode Account Customer harus di pilih terlebih dahulu")
    .max(255),
  no_po: numericPurchaseOrderRequiredString,
  tgl_po: z.string({
    required_error: "Tanggal purchase order tidak boleh kosong",
  }),
  foto_po: z.string().optional(),
  status_po: z.string().refine((value) => {
    return value === "Berjalan" || value === "Selesai";
  }, "Status harus berupa Berjalan atau Selesai"),
  status_serah: z.string(),
  user: z.string().min(1),
});

export const EditPurchaseOrderShcema = z.object({
  no_po: numericPurchaseOrderRequiredString,
  tgl_po: z.string({
    required_error: "Tanggal purchase order tidak boleh kosong",
  }),
  foto_po: z.string().optional(),
});
