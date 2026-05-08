"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { socket } from "@/lib/socket";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { useRealtimeSync } from "@/lib/useRealtimeSync";

type RecordItem = {
  id: number;
  amount: number;
  type: string;
  category: string;
  note?: string;
  createdAt: string;
};

export default function RecordTable() {
  const [data, setData] = useState<RecordItem[]>([]);

  const loadData = async () => {
    const res = await axios.get("/api/record");
    setData(res.data);
  };

  const handleDelete = async (id: number) => {
    await axios.delete(`/api/record?id=${id}`);

    socket.emit("data-changed"); // 复用刷新事件
  };

  useEffect(() => {
    loadData();

  }, []);

  useRealtimeSync(loadData);

  return (
    <Card className="rounded-2xl">
      <CardContent className="p-6">

        <h2 className="text-xl font-semibold mb-4">
          Transaction History
        </h2>

        <div className="space-y-3">

          {data.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center border p-3 rounded"
            >
              <div>
                <p className="font-medium">
                  {item.category}
                </p>

                <p className="text-sm text-slate-500">
                  {item.note || "no note"}
                </p>
              </div>

              <div className="flex items-center gap-4">

                <span
                  className={
                    item.type === "expense"
                      ? "text-red-500"
                      : "text-green-500"
                  }
                >
                  {item.type === "expense" ? "-" : "+"}
                  {item.amount}
                </span>

                <Button
                  variant="destructive"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </Button>

              </div>
            </div>
          ))}

        </div>

      </CardContent>
    </Card>
  );
}