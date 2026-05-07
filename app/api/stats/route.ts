import { prisma } from "@/lib/prisma";

export async function GET() {
  const records = await prisma.record.findMany();

  const summary: Record<string, number> = {};

  for (const r of records) {
    const key = `${r.type}:${r.category}`;

    if (!summary[key]) summary[key] = 0;

    summary[key] += r.amount;
  }

  const result = Object.entries(summary).map(([key, value]) => {
    const [type, category] = key.split(":");
    return {
      type,
      category,
      total: value,
    };
  });

  return Response.json(result);
}