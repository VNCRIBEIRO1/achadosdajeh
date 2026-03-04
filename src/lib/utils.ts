export function slugify(text: string): string {
  return text
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(price);
}

export function getPlatformInfo(platform: string) {
  const platforms: Record<string, { name: string; color: string; textColor: string; shortName: string }> = {
    shopee: { name: "Shopee", color: "#EE4D2D", textColor: "#FFFFFF", shortName: "Shopee" },
    magalu: { name: "Magazine Luiza", color: "#0086FF", textColor: "#FFFFFF", shortName: "Magalu" },
    mercadolivre: { name: "Mercado Livre", color: "#FFE600", textColor: "#333333", shortName: "ML" },
    amazon: { name: "Amazon", color: "#FF9900", textColor: "#FFFFFF", shortName: "Amazon" },
    americanas: { name: "Americanas", color: "#E60014", textColor: "#FFFFFF", shortName: "Americanas" },
    outro: { name: "Outro", color: "#6B7280", textColor: "#FFFFFF", shortName: "Link" },
  };
  return platforms[platform.toLowerCase()] || platforms.outro;
}

export function calculateDiscount(originalPrice: number, price: number): number {
  if (!originalPrice || originalPrice <= price) return 0;
  return Math.round(((originalPrice - price) / originalPrice) * 100);
}
