import { z } from "zod";

const numericPurchaseOrderRequiredString = z.string().min(3, "Required");

export const TambahPurchaseOrderSchema = z.object({
  customer_id: z
    .string()
    .min(1, "Kode Account Customer harus di pilih terlebih dahulu")
    .max(255),
  no_po: numericPurchaseOrderRequiredString,
  tgl_po: z.coerce.date({
    required_error: "Tanggal purchase order tidak boleh kosong",
  }),
  foto_po: z.string().optional(),
  status_po: z.string(),
  status_serah: z.string(),
});

export const EditPurchaseOrderShcema = z.object({
  no_po: numericPurchaseOrderRequiredString,
  tgl_po: z.coerce.date().refine(
    (value) => {
      return value instanceof Date;
    },
    { message: "Tanggal purchase order tidak boleh kosong" }
  ),
  foto_po: z.string().optional(),
});
