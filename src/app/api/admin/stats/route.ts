import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

  const [totalProducts, totalCategories, totalClicks, topProducts] = await Promise.all([
    prisma.product.count({ where: { active: true } }),
    prisma.category.count(),
    prisma.product.aggregate({ _sum: { clicks: true } }),
    prisma.product.findMany({
      orderBy: { clicks: "desc" },
      take: 5,
      select: { id: true, title: true, clicks: true, platform: true },
    }),
  ]);

  return NextResponse.json({
    totalProducts,
    totalCategories,
    totalClicks: totalClicks._sum.clicks || 0,
    topProducts,
  });
}
