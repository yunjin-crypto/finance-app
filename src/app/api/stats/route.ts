import { prisma } from "@/lib/prisma";

export async function GET() {
  const records = await prisma.record.findMany();

  // =========================
  // 1. Bar Chart：按日期支出
  // =========================
  const dailyMap: Record<string, number> = {};

  // =========================
  // 2. Pie Chart：按分类汇总
  // =========================
  const categoryMap: Record<string, number> = {};

  // =========================
  // 3. Line Chart：每日净值
  // =========================
  const trendMap: Record<string, number> = {};

  for (const r of records) {
    const date = new Date(r.createdAt)
      .toISOString()
      .split("T")[0];

    // ---- Bar（只算 expense）----
    if (r.type === "expense") {
      dailyMap[date] = (dailyMap[date] || 0) + r.amount;
    }

    // ---- Pie（全部分类）----
    categoryMap[r.category] =
      (categoryMap[r.category] || 0) + r.amount;

    // ---- Line（收入-支出）----
    const prev = trendMap[date] || 0;
    trendMap[date] =
      r.type === "income"
        ? prev + r.amount
        : prev - r.amount;
  }

  // =========================
  // 转换为数组（Recharts需要）
  // =========================

  const barData = Object.entries(dailyMap).map(
    ([date, total]) => ({
      date,
      total,
    })
  );

  const pieData = Object.entries(categoryMap).map(
    ([name, value]) => ({
      name,
      value,
    })
  );

  const lineData = Object.entries(trendMap).map(
    ([date, value]) => ({
      date,
      value,
    })
  );

  return Response.json({
    barData,
    pieData,
    lineData,
  });
}