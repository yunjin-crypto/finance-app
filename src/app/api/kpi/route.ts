import { prisma } from "@/lib/prisma";

export async function GET() {
  const records = await prisma.record.findMany();

  let income = 0;
  let expense = 0;

  for (const r of records) {
    if (r.type === "income") {
      income += r.amount;
    } else {
      expense += r.amount;
    }
  }

  const balance = income - expense;

  return Response.json({
    income,
    expense,
    balance,
  });
}