import { Card } from "@/components/ui/card";
import { Activity, Check, ShoppingCart, Store, Wallet } from "lucide-react";
import React from "react";
import {
  getPurchaseOrderSummary,
  getRingkasan,
  getRingkasanPendapatan,
  getTotalCustomer,
  getTotalActivePurchaseOrder,
  getTotalSelesaiPurchaseOrder,
  getTotalJatuhTempoTukarFakturHariIni,
  getTotalJatuhTempoTukarFakturBesok,
  getTotalJatuhTempoTukarFakturSatuMinggu,
} from "@/actions/actionRingkasan";

export default async function page() {
  const ringkasan = await getRingkasan();
  const {
    currentMonthRevenue,
    lastMonthRevenue,
    percentageIncrease,
    allMonthsRevenue,
  } = await getRingkasanPendapatan();
  const totalCustomer = await getTotalCustomer();
  const { currentMonthOrders, lastMonthOrders, totalOrders, orderIncrease } =
    await getPurchaseOrderSummary();
  const totalActivePurchaseOrder = await getTotalActivePurchaseOrder();
  const totalSelesaiPurchaseOrder = await getTotalSelesaiPurchaseOrder();
  const TotalJatuhTempoFakturHariIni =
    await getTotalJatuhTempoTukarFakturHariIni();
  const TotalJatuhTempoFakturBesok = await getTotalJatuhTempoTukarFakturBesok();
  const totalOneWeekBefore = await getTotalJatuhTempoTukarFakturSatuMinggu();

  return (
    <div className="mx-auto my-6 max-w-7xl">
      <div className="container mx-auto xl:px-0">
        <div className="flex flex-col">
          <div className="flex justify-center">
            {" "}
            <h1 className="text-2xl font-bold text-nowrap mb-8">Ringkasan</h1>
          </div>
        </div>
        <div className="flex flex-col">
          <p className="text-xl mb-4">Utama</p>
          <div className="grid grid-cols-1 justify-start gap-2 lg:grid-cols-3">
            <Card className="w-full flex flex-col p-4 gap-2">
              <div className="flex justify-between items-center">
                <p className="font-medium">Total Pendapatan</p>
                <Wallet className="w-5 h-5 ml-2" />
              </div>
              <div className="font-bold text-2xl">Rp. {allMonthsRevenue}</div>
              <div className="flex-col flex lg:flex-row justify-start gap-4 text-muted-foreground">
                <div className="flex flex-row gap-4">
                  <div className="text-sm">
                    <p>Bulan ini</p>
                    <p>Rp. {currentMonthRevenue}</p>
                  </div>
                  <div className="text-sm">
                    <p>Bulan lalu</p>
                    <p>Rp. {lastMonthRevenue}</p>
                  </div>
                </div>
                <div className="text-sm">
                  <p>Kenaikan dari bulan lalu</p>
                  <p>{percentageIncrease}%</p>
                </div>
              </div>
            </Card>
            <Card className="w-full flex flex-col p-4 gap-2">
              <div className="flex justify-between items-center">
                <p className="font-medium">Total Customer</p>
                <Store className="w-5 h-5 ml-2" />
              </div>
              <div className="font-bold text-2xl">{totalCustomer}</div>
            </Card>
            <Card className="w-full flex flex-col p-4 gap-2">
              <div className="flex justify-between items-center">
                <p className="font-medium">Total Penjualan</p>
                <ShoppingCart className="w-5 h-5 ml-2" />
              </div>
              <div className="font-bold text-2xl">{totalOrders}</div>
              <div className="flex-col flex lg:flex-row justify-start gap-4 text-muted-foreground">
                <div className="flex flex-row gap-4">
                  <div className="text-sm">
                    <p>Bulan ini</p>
                    <p>{currentMonthOrders}</p>
                  </div>
                  <div className="text-sm">
                    <p>Bulan lalu</p>
                    <p>{lastMonthOrders}</p>
                  </div>
                </div>
                <div className="text-sm">
                  <p>Kenaikan dari bulan lalu</p>
                  <div>
                    {orderIncrease > 0 ? <p>+ {orderIncrease}</p> : <p>0</p>}
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <div className="flex flex-col gap-4 mt-6">
            <p className="text-xl">Purchase Order</p>
            <div className="grid grid-cols-1 justify-start gap-2 lg:grid-cols-3 w-full">
              <Card className="w-full flex flex-col p-4 gap-2">
                <div className="flex justify-between items-center">
                  <p className="font-medium">Total Purchase Order Aktif</p>
                  <Activity className="w-5 h-5 ml-2" />
                </div>
                <div className="font-bold text-2xl">
                  {totalActivePurchaseOrder}
                </div>
              </Card>
              <Card className="w-full flex flex-col p-4 gap-2">
                <div className="flex justify-between items-center">
                  <p className="font-medium">Total Purchase Order Selesai</p>
                  <Check className="w-5 h-5 ml-2" />
                </div>
                <div className="font-bold text-2xl">
                  {totalSelesaiPurchaseOrder}
                </div>
              </Card>
            </div>
          </div>

          <div className="flex flex-col gap-4 mt-6">
            <p className="text-xl">Jatuh Tempo Tukar Faktur</p>
            <div className="grid grid-cols-1 justify-start gap-2 lg:grid-cols-3 w-full">
              <Card className="w-full flex flex-col p-4 gap-2">
                <div className="flex justify-between items-center">
                  <p className="font-medium">Total Jatuh Tempo Hari Ini</p>
                  <Activity className="w-5 h-5 ml-2" />
                </div>
                <div className="font-bold text-2xl">
                  {TotalJatuhTempoFakturHariIni}
                </div>
              </Card>
              <Card className="w-full flex flex-col p-4 gap-2">
                <div className="flex justify-between items-center">
                  <p className="font-medium">Total Jatuh Tempo Besok</p>
                  <Check className="w-5 h-5 ml-2" />
                </div>
                <div className="font-bold text-2xl">
                  {TotalJatuhTempoFakturBesok}
                </div>
              </Card>
              <Card className="w-full flex flex-col p-4 gap-2">
                <div className="flex justify-between items-center">
                  <p className="font-medium">Total Jatuh Tempo Satu Minggu</p>
                  <Check className="w-5 h-5 ml-2" />
                </div>
                <div className="font-bold text-2xl">{totalOneWeekBefore}</div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
