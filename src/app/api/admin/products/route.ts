import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { slugify } from "@/lib/utils";

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
    include: { category: true },
  });
  return NextResponse.json(products);
}

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

  try {
    const data = await request.json();
    const slug = slugify(data.title);
    
    const existingSlug = await prisma.product.findUnique({ where: { slug } });
    const finalSlug = existingSlug ? `${slug}-${Date.now()}` : slug;

    const product = await prisma.product.create({
      data: {
        title: data.title,
        slug: finalSlug,
        description: data.description || "",
        image: data.image || "",
        price: parseFloat(data.price) || 0,
        originalPrice: data.originalPrice ? parseFloat(data.originalPrice) : null,
        discount: data.discount ? parseInt(data.discount) : null,
        platform: data.platform || "shopee",
        affiliateLink: data.affiliateLink || "",
        categoryId: data.categoryId,
        featured: data.featured || false,
        active: data.active !== false,
      },
    });
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro ao criar produto" }, { status: 500 });
  }
}
