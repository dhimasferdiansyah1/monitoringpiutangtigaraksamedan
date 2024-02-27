-- CreateEnum
CREATE TYPE "EnumTandaTerimaTagihan" AS ENUM ('Selesai', 'Belum Selesai');

-- CreateTable
CREATE TABLE "customer" (
    "id" TEXT NOT NULL,
    "customer_name" TEXT NOT NULL,
    "account" TEXT NOT NULL,
    "alamat" TEXT NOT NULL,
    "no_telp" TEXT,
    "email" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "purchase_order" (
    "id" TEXT NOT NULL,
    "no_po" TEXT NOT NULL,
    "tgl_po" TIMESTAMP(3) NOT NULL,
    "foto_po" TEXT,
    "status_po" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "customer_id" TEXT NOT NULL,

    CONSTRAINT "purchase_order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "delivery_note" (
    "id" TEXT NOT NULL,
    "no_dn" TEXT,
    "foto1_dn" TEXT,
    "foto2_dn" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "po_id" TEXT NOT NULL,

    CONSTRAINT "delivery_note_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "faktur" (
    "id" TEXT NOT NULL,
    "no_fk" TEXT,
    "tgl_fk" TIMESTAMP(3),
    "tgl_jt" TIMESTAMP(3),
    "nilai" TEXT,
    "foto1_fk" TEXT,
    "foto2_fk" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "po_id" TEXT NOT NULL,

    CONSTRAINT "faktur_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "faktur_pajak" (
    "id" TEXT NOT NULL,
    "no_fkp" TEXT,
    "tgl_fkp" TIMESTAMP(3),
    "foto_fkp" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "po_id" TEXT NOT NULL,

    CONSTRAINT "faktur_pajak_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tanda_terima_tagihan" (
    "id" TEXT NOT NULL,
    "no_penagihan" TEXT,
    "status" "EnumTandaTerimaTagihan",
    "tgl_jt" TIMESTAMP(3),
    "foto_ttt" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "po_id" TEXT NOT NULL,

    CONSTRAINT "tanda_terima_tagihan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "status_serah_dokumen" (
    "id" TEXT NOT NULL,
    "status_serah" TEXT,
    "user" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "po_id" TEXT NOT NULL,

    CONSTRAINT "status_serah_dokumen_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "delivery_note_po_id_key" ON "delivery_note"("po_id");

-- CreateIndex
CREATE UNIQUE INDEX "faktur_po_id_key" ON "faktur"("po_id");

-- CreateIndex
CREATE UNIQUE INDEX "faktur_pajak_po_id_key" ON "faktur_pajak"("po_id");

-- CreateIndex
CREATE UNIQUE INDEX "tanda_terima_tagihan_po_id_key" ON "tanda_terima_tagihan"("po_id");

-- AddForeignKey
ALTER TABLE "purchase_order" ADD CONSTRAINT "purchase_order_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "delivery_note" ADD CONSTRAINT "delivery_note_po_id_fkey" FOREIGN KEY ("po_id") REFERENCES "purchase_order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "faktur" ADD CONSTRAINT "faktur_po_id_fkey" FOREIGN KEY ("po_id") REFERENCES "purchase_order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "faktur_pajak" ADD CONSTRAINT "faktur_pajak_po_id_fkey" FOREIGN KEY ("po_id") REFERENCES "purchase_order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tanda_terima_tagihan" ADD CONSTRAINT "tanda_terima_tagihan_po_id_fkey" FOREIGN KEY ("po_id") REFERENCES "purchase_order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "status_serah_dokumen" ADD CONSTRAINT "status_serah_dokumen_po_id_fkey" FOREIGN KEY ("po_id") REFERENCES "purchase_order"("id") ON DELETE CASCADE ON UPDATE CASCADE;
