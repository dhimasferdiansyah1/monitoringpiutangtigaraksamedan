-- CreateTable
CREATE TABLE "bukti_pelunasan" (
    "id" TEXT NOT NULL,
    "no_bp" TEXT,
    "foto_bp" TEXT,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL,
    "po_id" TEXT NOT NULL,

    CONSTRAINT "bukti_pelunasan_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "bukti_pelunasan_po_id_key" ON "bukti_pelunasan"("po_id");

-- AddForeignKey
ALTER TABLE "bukti_pelunasan" ADD CONSTRAINT "bukti_pelunasan_po_id_fkey" FOREIGN KEY ("po_id") REFERENCES "purchase_order"("id") ON DELETE CASCADE ON UPDATE CASCADE;
