import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { amount, type, category, note } = body;

    if (!amount || !type || !category) {
      return Response.json(
        { error: "missing fields" },
        { status: 400 }
      );
    }

    const record = await prisma.record.create({
      data: {
        amount: Number(amount),
        type,
        category,
        note,
      },
    });

    return Response.json(record);
  } catch (err) {
    return Response.json(
      { error: "server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  const records = await prisma.record.findMany({
    orderBy: { createdAt: "desc" },
  });

  return Response.json(records);
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return Response.json(
      { error: "missing id" },
      { status: 400 }
    );
  }

  await prisma.record.delete({
    where: { id: Number(id) },
  });

  return Response.json({ success: true });
}