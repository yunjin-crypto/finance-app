"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";

import { Card, CardContent } from "@/components/ui/card";
import { useRealtimeSync } from "@/lib/useRealtimeSync";

export default function ChartGrid() {
  const [data, setData] = useState({
    barData: [],
    pieData: [],
    lineData: [],
  });

  const loadData = async () => {
    const res = await axios.get("/api/stats");
    setData(res.data);
  };

  useEffect(() => {
  loadData();
}, []);

useRealtimeSync(loadData);

  const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

      {/* ================= BAR ================= */}
      <Card className="rounded-2xl h-80">
        <CardContent className="p-4 h-full">
          <h2 className="mb-2 font-semibold">
            Daily Expense
          </h2>

          <ResponsiveContainer width="100%" height="90%">
            <BarChart data={data.barData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="total" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* ================= PIE ================= */}
      <Card className="rounded-2xl h-80">
        <CardContent className="p-4 h-full">
          <h2 className="mb-2 font-semibold">
            Category Share
          </h2>

          <ResponsiveContainer width="100%" height="90%">
            <PieChart>
              <Pie
                data={data.pieData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {data.pieData.map((_, i) => (
                  <Cell
                    key={i}
                    fill={COLORS[i % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* ================= LINE ================= */}
      <Card className="rounded-2xl h-80 lg:col-span-2">
        <CardContent className="p-4 h-full">
          <h2 className="mb-2 font-semibold">
            Net Trend
          </h2>

          <ResponsiveContainer width="100%" height="90%">
            <LineChart data={data.lineData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#10b981"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

    </div>
  );
}