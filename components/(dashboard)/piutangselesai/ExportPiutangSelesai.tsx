// ExportStatusSerahDokumen.tsx
"use client";

import * as ExcelJS from "exceljs";
import { Button } from "@/components/ui/button"; // Assuming your button component path
import { formatDateAndTimeIsoFetch } from "@/lib/utils";
import { Printer } from "lucide-react";

interface ExportProps {
  piutangSelesaiList: any;
}

const ExportPiutangSelesai: React.FC<ExportProps> = ({
  piutangSelesaiList,
}) => {
  const handleExport = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Piutang Selesai List");

    // Define table headers
    worksheet.addRow([
      "No.",
      "Customer",
      "Kode Customer",
      "No. PO",
      "No. DN",
      "No. Faktur",
      "No. Faktur Pajak",
      "No. Penagihan",
      "No. Bukti Pelunasan",
      "Tgl. Faktur",
      "Tgl. JT Faktur",
      "Tgl. JT Penagihan",
      "Nilai",
      "Foto Purchase Order",
      "Foto Sebelum Delivery",
      "Foto Sesudah Delivery",
      "Foto Sebelum Tukar Faktur",
      "Foto Sesudah Tukar Faktur",
      "Foto Faktur Pajak",
      "Foto Tanda Terima Tagihan",
      "Foto Bukti Pelunasan",
      "Status",
      "Waktu",
    ]);

    // Populate rows with data
    piutangSelesaiList.forEach((item: any, index: any) => {
      worksheet.addRow([
        index + 1,
        item.customer.customer_name,
        item.customer.account,
        item.no_po || "-",
        item.delivery_note?.no_dn || "-",
        item.faktur?.no_fk || "-",
        item.faktur_pajak?.no_fkp || "-",
        item.tandaterimatagihan?.no_penagihan || "-",
        item.buktipelunasan?.no_bp || "-",
        item.faktur?.tgl_fk
          ? formatDateAndTimeIsoFetch(item.faktur.tgl_fk.toISOString())
          : "-",
        item.faktur?.tgl_jt
          ? formatDateAndTimeIsoFetch(item.faktur.tgl_jt.toISOString())
          : "-",
        item.tandaterimatagihan?.tgl_jt
          ? formatDateAndTimeIsoFetch(
              item.tandaterimatagihan.tgl_jt.toISOString()
            )
          : "-",
        item.faktur?.nilai || "-",
        item.foto_po || "-",
        item.delivery_note?.foto1_dn || "-",
        item.delivery_note?.foto2_dn || "-",
        item.faktur?.foto1_fk || "-",
        item.faktur?.foto2_fk || "-",
        item.faktur_pajak?.foto_fkp || "-",
        item.tandaterimatagihan?.foto_ttt || "-",
        item.buktipelunasan?.foto_bp || "-",
        item.statusserahdokumen[0]?.status_serah || "-",
        formatDateAndTimeIsoFetch(
          item.statusserahdokumen[0]?.createdAt.toISOString()
        ),
      ]);
    });

    // Styling (optional)
    const headerRow = worksheet.getRow(1);
    headerRow.height = 28;
    headerRow.eachCell((cell) => {
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FF8497B0" },
      };
      cell.font = {
        color: { argb: "FFFFFFFF" },
        bold: true,
      };
      cell.alignment = { vertical: "middle", horizontal: "center" };
    });

    worksheet.getColumn(1).width = 4; // No.
    worksheet.getColumn(2).width = 35; // Customer
    worksheet.getColumn(3).width = 17; // Kode Customer
    worksheet.getColumn(4).width = 17; // No. PO
    worksheet.getColumn(5).width = 12; // No. DN
    worksheet.getColumn(6).width = 12; // No. Faktur
    worksheet.getColumn(7).width = 15; // No. Faktur Pajak
    worksheet.getColumn(8).width = 15; // No. Penagihan
    worksheet.getColumn(9).width = 20; // No. Bukti Pelunasan
    worksheet.getColumn(10).width = 15; // Tgl. Faktur
    worksheet.getColumn(11).width = 15; // Tgl. JT Faktur
    worksheet.getColumn(12).width = 15; // Tgl. JT Penagihan
    worksheet.getColumn(13).width = 12; // Nilai
    worksheet.getColumn(23).width = 18; // Nilai

    worksheet.eachRow({ includeEmpty: true }, (row) => {
      row.eachCell({ includeEmpty: true }, (cell) => {
        cell.border = {
          top: { style: "thin", color: { argb: "FF000000" } },
          left: { style: "thin", color: { argb: "FF000000" } },
          bottom: { style: "thin", color: { argb: "FF000000" } },
          right: { style: "thin", color: { argb: "FF000000" } },
        };
      });
    });

    // ... add styling ...

    // Download the file
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "piutang_selesai.xlsx";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <Button
      onClick={handleExport}
      variant="secondary"
      className="flex gap-2 items-center my-2"
    >
      <Printer className="h-5 w-5" />
      Ekspor
    </Button>
  );
};

export default ExportPiutangSelesai;
