const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Create admin user
  const hashedPassword = await bcrypt.hash("admin123", 12);
  const admin = await prisma.user.upsert({
    where: { email: "admin@achadosdajeh.com" },
    update: {},
    create: {
      email: "admin@achadosdajeh.com",
      password: hashedPassword,
      name: "Jeh Admin",
      role: "admin",
    },
  });
  console.log("Admin user created:", admin.email);

  // Create categories
  const categoriesData = [
    { name: "Eletrônicos", slug: "eletronicos", icon: "", order: 1 },
    { name: "Moda", slug: "moda", icon: "", order: 2 },
    { name: "Casa e Decoração", slug: "casa", icon: "", order: 3 },
    { name: "Beleza", slug: "beleza", icon: "", order: 4 },
    { name: "Esportes", slug: "esportes", icon: "", order: 5 },
    { name: "Brinquedos", slug: "brinquedos", icon: "", order: 6 },
  ];

  const categories = [];
  for (const cat of categoriesData) {
    const category = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: { icon: cat.icon },
      create: cat,
    });
    categories.push(category);
  }
  console.log("Categories created:", categories.length);

  // Create sample products with real images
  const productsData = [
    {
      title: "Fone de Ouvido Bluetooth TWS com Cancelamento de Ruído",
      slug: "fone-bluetooth-tws-cancelamento-ruido",
      description: "Fone de ouvido Bluetooth 5.3 com cancelamento de ruído ativo, bateria de longa duração e estojo carregador. Som de alta qualidade com graves profundos. Ideal para músicas, chamadas e exercícios.",
      image: "https://images.unsplash.com/photo-1590658268037-6bf12f032f55?w=600&h=600&fit=crop",
      price: 49.90,
      originalPrice: 129.90,
      discount: 62,
      platform: "shopee",
      affiliateLink: "https://shopee.com.br",
      categoryId: "",
      featured: true,
    },
    {
      title: "Smartwatch D20 Relógio Inteligente Bluetooth",
      slug: "smartwatch-d20-relogio-inteligente",
      description: "Smartwatch com tela touch colorida, monitor cardíaco, pressão arterial, contador de passos. Resistente à água. Compatível com Android e iOS.",
      image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=600&h=600&fit=crop",
      price: 32.90,
      originalPrice: 89.90,
      discount: 63,
      platform: "shopee",
      affiliateLink: "https://shopee.com.br",
      categoryId: "",
      featured: true,
    },
    {
      title: "Kit Maquiagem Completo 12 Peças Profissional",
      slug: "kit-maquiagem-completo-12-pecas",
      description: "Kit completo de maquiagem profissional com 12 peças incluindo pincéis, paleta de sombras, batom e base. Perfeito para iniciantes e profissionais.",
      image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=600&fit=crop",
      price: 67.90,
      originalPrice: 149.90,
      discount: 55,
      platform: "magalu",
      affiliateLink: "https://magazineluiza.com.br",
      categoryId: "",
      featured: true,
    },
    {
      title: "Conjunto Fitness Feminino Legging + Top Academia",
      slug: "conjunto-fitness-feminino-legging-top",
      description: "Conjunto fitness feminino de alta qualidade com legging de cintura alta e top esportivo. Tecido respirável, perfeito para treinos.",
      image: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=600&h=600&fit=crop",
      price: 45.90,
      originalPrice: 99.90,
      discount: 54,
      platform: "shopee",
      affiliateLink: "https://shopee.com.br",
      categoryId: "",
      featured: true,
    },
    {
      title: "Luminária LED de Mesa com Carregador Wireless",
      slug: "luminaria-led-mesa-carregador-wireless",
      description: "Luminária LED moderna com 3 níveis de brilho e carregador wireless integrado. Design elegante para escritório ou quarto.",
      image: "https://images.unsplash.com/photo-1507473885765-e6ed057ab6fe?w=600&h=600&fit=crop",
      price: 78.90,
      originalPrice: 159.90,
      discount: 51,
      platform: "mercadolivre",
      affiliateLink: "https://mercadolivre.com.br",
      categoryId: "",
      featured: true,
    },
    {
      title: "Tênis Esportivo Masculino Ultra Leve Running",
      slug: "tenis-esportivo-masculino-ultra-leve",
      description: "Tênis esportivo ultra leve para corrida e caminhada. Solado amortecedor, tecido respirável. Disponível em várias cores.",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop",
      price: 89.90,
      originalPrice: 199.90,
      discount: 55,
      platform: "magalu",
      affiliateLink: "https://magazineluiza.com.br",
      categoryId: "",
      featured: true,
    },
    {
      title: "Organizador de Maquiagem Acrílico 360° Giratório",
      slug: "organizador-maquiagem-acrilico-360",
      description: "Organizador giratório 360° em acrílico transparente para maquiagem. Vários compartimentos para batons, pincéis e cosméticos.",
      image: "https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?w=600&h=600&fit=crop",
      price: 35.90,
      originalPrice: 79.90,
      discount: 55,
      platform: "shopee",
      affiliateLink: "https://shopee.com.br",
      categoryId: "",
      featured: false,
    },
    {
      title: "Pelúcia Decorativa Urso Gigante 1.2m",
      slug: "pelucia-urso-gigante-120cm",
      description: "Urso de pelúcia gigante com 1.2m de altura. Material ultra macio e hipoalergênico. Perfeito para presente ou decoração.",
      image: "https://images.unsplash.com/photo-1559715541-5daf8a0296d0?w=600&h=600&fit=crop",
      price: 99.90,
      originalPrice: 249.90,
      discount: 60,
      platform: "mercadolivre",
      affiliateLink: "https://mercadolivre.com.br",
      categoryId: "",
      featured: true,
    },
  ];

  // Assign categories
  const catMap = {
    eletronicos: categories[0].id,
    moda: categories[1].id,
    casa: categories[2].id,
    beleza: categories[3].id,
    esportes: categories[4].id,
    brinquedos: categories[5].id,
  };

  productsData[0].categoryId = catMap.eletronicos;
  productsData[1].categoryId = catMap.eletronicos;
  productsData[2].categoryId = catMap.beleza;
  productsData[3].categoryId = catMap.moda;
  productsData[4].categoryId = catMap.casa;
  productsData[5].categoryId = catMap.esportes;
  productsData[6].categoryId = catMap.beleza;
  productsData[7].categoryId = catMap.brinquedos;

  for (const product of productsData) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {
        image: product.image,
        title: product.title,
        description: product.description,
        price: product.price,
        originalPrice: product.originalPrice,
        discount: product.discount,
        platform: product.platform,
        affiliateLink: product.affiliateLink,
        categoryId: product.categoryId,
        featured: product.featured,
      },
      create: product,
    });
  }
  console.log("Products created/updated:", productsData.length);

  // Create site config
  await prisma.siteConfig.upsert({
    where: { id: "main" },
    update: {},
    create: {
      id: "main",
      siteName: "Achados da Jeh",
      siteDescription: "Os melhores achados da internet com os melhores preços!",
      primaryColor: "#F97316",
      secondaryColor: "#EC4899",
    },
  });
  console.log("Site config created");

  console.log("\nSeed completed successfully!");
  console.log("\nAdmin login: admin@achadosdajeh.com");
  console.log("Admin password: admin123");
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
