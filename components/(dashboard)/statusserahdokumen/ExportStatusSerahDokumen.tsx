// ExportStatusSerahDokumen.tsx
"use client";

import * as ExcelJS from "exceljs";
import { Button } from "@/components/ui/button"; // Assuming your button component path
import { formatDateAndTimeIsoFetch } from "@/lib/utils";
import { Printer } from "lucide-react";

interface ExportProps {
  statusSerahDokumenList: any;
}

const ExportStatusSerahDokumen: React.FC<ExportProps> = ({
  statusSerahDokumenList,
}) => {
  const handleExport = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Status Serah Dokumen");

    // Define table headers
    worksheet.addRow([
      "No.",
      "Customer",
      "Kode Customer",
      "No. PO",
      "No. Faktur",
      "Status",
      "Waktu",
    ]);

    // Populate rows with data
    statusSerahDokumenList.forEach((item: any, index: any) => {
      worksheet.addRow([
        index + 1,
        item.customer.customer_name,
        item.customer.account,
        item.no_po || "-",
        item.faktur?.no_fk || "-",
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

    worksheet.getColumn(1).width = 4;
    worksheet.getColumn(2).width = 35;
    worksheet.getColumn(3).width = 17;
    worksheet.getColumn(4).width = 22;
    worksheet.getColumn(5).width = 10;
    worksheet.getColumn(6).width = 66;
    worksheet.getColumn(7).width = 18;

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
    a.download = "status_serah_dokumen.xlsx";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <Button
      onClick={handleExport}
      variant="secondary"
      className="flex gap-2 items-center"
    >
      <Printer className="h-5 w-5" />
      Ekspor
    </Button>
  );
};

export default ExportStatusSerahDokumen;
