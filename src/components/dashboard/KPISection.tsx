"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { socket } from "@/lib/socket";
import { Card, CardContent } from "@/components/ui/card";
import { useRealtimeSync } from "@/lib/useRealtimeSync";

export default function KPISection() {
  const [data, setData] = useState({
    income: 0,
    expense: 0,
    balance: 0,
  });

  const loadData = async () => {
    const res = await axios.get("/api/kpi");
    setData(res.data);
  };

  useEffect(() => {
  loadData();
}, []);

useRealtimeSync(loadData);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

      <Card className="rounded-2xl">
        <CardContent className="p-6">
          <p className="text-sm text-slate-500">
            Total Income
          </p>
          <h2 className="text-3xl font-bold mt-2 text-green-600">
            ${data.income}
          </h2>
        </CardContent>
      </Card>

      <Card className="rounded-2xl">
        <CardContent className="p-6">
          <p className="text-sm text-slate-500">
            Total Expense
          </p>
          <h2 className="text-3xl font-bold mt-2 text-red-500">
            ${data.expense}
          </h2>
        </CardContent>
      </Card>

      <Card className="rounded-2xl">
        <CardContent className="p-6">
          <p className="text-sm text-slate-500">
            Balance
          </p>
          <h2 className="text-3xl font-bold mt-2">
            ${data.balance}
          </h2>
        </CardContent>
      </Card>

    </div>
  );
}