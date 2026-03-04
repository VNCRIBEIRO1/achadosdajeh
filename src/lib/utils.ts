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
  const platforms: Record<string, { name: string; color: string; icon: string }> = {
    shopee: { name: "Shopee", color: "#EE4D2D", icon: "🛒" },
    magalu: { name: "Magazine Luiza", color: "#0086FF", icon: "🏪" },
    mercadolivre: { name: "Mercado Livre", color: "#FFE600", icon: "🤝" },
    amazon: { name: "Amazon", color: "#FF9900", icon: "📦" },
    americanas: { name: "Americanas", color: "#E60014", icon: "🏬" },
    outro: { name: "Outro", color: "#6B7280", icon: "🔗" },
  };
  return platforms[platform.toLowerCase()] || platforms.outro;
}

export function calculateDiscount(originalPrice: number, price: number): number {
  if (!originalPrice || originalPrice <= price) return 0;
  return Math.round(((originalPrice - price) / originalPrice) * 100);
}
