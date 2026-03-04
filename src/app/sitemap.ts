import { MetadataRoute } from "next";
import { prisma } from "@/lib/db";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://achadosdajeh.vercel.app";

  const staticPages = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "daily" as const, priority: 1 },
    { url: `${baseUrl}/ofertas`, lastModified: new Date(), changeFrequency: "daily" as const, priority: 0.9 },
    { url: `${baseUrl}/sobre`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.3 },
  ];

  try {
    const products = await prisma.product.findMany({
      where: { active: true },
      select: { slug: true, updatedAt: true },
    });

    const categories = await prisma.category.findMany({
      select: { slug: true, updatedAt: true },
    });

    const productPages = products.map((p) => ({
      url: `${baseUrl}/produto/${p.slug}`,
      lastModified: p.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));

    const categoryPages = categories.map((c) => ({
      url: `${baseUrl}/categoria/${c.slug}`,
      lastModified: c.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));

    return [...staticPages, ...productPages, ...categoryPages];
  } catch {
    return staticPages;
  }
}
