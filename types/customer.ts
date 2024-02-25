import { z } from "zod";

const numericCustomerRequiredString = z
  .string()
  .min(1, "Nomor purchase order tidak boleh kosong")
  .regex(/^\d+$/, "Harus berupa angka");

export const tambahCustomerSchema = z.object({
  customer_name: z
    .string({
      required_error: "Nama customer tidak boleh kosong",
    })
    .min(3, "Nama customer minimal lebih dari 3 karakter")
    .max(255),
  account: numericCustomerRequiredString,
  alamat: z
    .string({
      required_error: "Alamat tidak boleh kosong",
    })
    .min(3, "Alamat harus minimal lebih dari 3 karakter")
    .max(255),
  no_telp: z.string().optional(),
  email: z.string().optional(),
});
