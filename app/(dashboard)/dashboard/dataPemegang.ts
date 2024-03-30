export const dataPemegang = [
  {
    pemegang: "Sales",
    statusserahdokumen: "Sales menerima purchase order dari toko",
  },
  {
    pemegang: "Admin Sales",
    statusserahdokumen:
      "Sales menyerahkan dokumen ke admin sales" &&
      "Admin gudang menyerahkan dokumen ke admin sales",
  },
  {
    pemegang: "Admin Gudang",
    statusserahdokumen:
      "Admin sales menyerahkan dokumen ke admin gudang" &&
      "Driver menyerahkan dokumen ke admin gudang",
  },
  {
    pemegang: "Driver",
    statusserahdokumen:
      "Admin gudang menyerahkan dokumen ke driver" &&
      "Driver melakukan pengantaran barang" &&
      "Driver sampai di toko" &&
      "Driver selesai melakukan pengantaran barang",
  },
  {
    pemegang: "Admin Inkaso",
    statusserahdokumen:
      "Admin sales menyerahkan dokumen ke admin inkaso" &&
      "Kolektor menyerahkan dokumen ke admin inkaso" &&
      "Kasir menyerahkan bukti penyetoran ke admin inkaso" &&
      "Admin inkaso melakukan pelunasan piutang",
  },
  {
    pemegang: "Kolektor",
    statusserahdokumen:
      "Admin inkaso menyerahkan dokumen ke kolektor untuk proses tukar faktur" &&
      "Kolektor melakukan tukar faktur ke toko" &&
      "Kolektor sampai di toko untuk proses tukar faktur" &&
      "Kolektor selesai melakukan tukar faktur" &&
      "Admin inkaso menyerahkan dokumen ke kolektor dalam proses penagihan ke toko" &&
      "Kolektor melakukan penagihan piutang ke toko" &&
      "Kolektor sampai di toko untuk proses penagihan piutang" &&
      "Kolektor selesai melakukan penagihan piutang" &&
      "Kolektor menyerahkan dokumen ke admin inkaso setelah selesai penagihan" &&
      "Kolektor menyerahkan giro ke kasir" &&
      "Kolektor menyerahkan tunai ke kasir",
  },
  {
    pemegang: "Kasir",
    statusserahdokumen:
      "Kolektor menyerahkan transfer ke kasir" &&
      "Kasir melakukan penyetoran ke bank",
  },
];
