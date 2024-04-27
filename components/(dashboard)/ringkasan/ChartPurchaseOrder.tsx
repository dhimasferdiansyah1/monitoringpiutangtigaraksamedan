// components/ChartUtama.tsx
"use client";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export default function ChartPurchaseOrder({ data }: any) {
  return (
    <LineChart
      width={400}
      height={300}
      data={data}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      className="p-8 lg:p-0"
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="month" />
      <YAxis
        domain={[
          0,
          Math.max(
            ...data.map(
              (item: {
                purchaseOrder: number;
                customer: number;
                revenue: number;
              }) => Math.max(item.purchaseOrder, item.customer)
            )
          ),
        ]}
      />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="purchaseOrder"
        stroke="#8884d8"
        activeDot={{ r: 8 }}
      />
    </LineChart>
  );
}
