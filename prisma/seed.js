const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

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
  console.log("✅ Admin user created:", admin.email);

  // Create categories
  const categoriesData = [
    { name: "Eletrônicos", slug: "eletronicos", icon: "📱", order: 1 },
    { name: "Moda", slug: "moda", icon: "👗", order: 2 },
    { name: "Casa e Decoração", slug: "casa", icon: "🏠", order: 3 },
    { name: "Beleza", slug: "beleza", icon: "💄", order: 4 },
    { name: "Esportes", slug: "esportes", icon: "⚽", order: 5 },
    { name: "Brinquedos", slug: "brinquedos", icon: "🧸", order: 6 },
  ];

  const categories = [];
  for (const cat of categoriesData) {
    const category = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
    categories.push(category);
  }
  console.log("✅ Categories created:", categories.length);

  // Create sample products
  const productsData = [
    {
      title: "Fone de Ouvido Bluetooth TWS com Cancelamento de Ruído",
      slug: "fone-bluetooth-tws-cancelamento-ruido",
      description: "Fone de ouvido Bluetooth 5.3 com cancelamento de ruído ativo, bateria de longa duração e estojo carregador. Som de alta qualidade com graves profundos. Ideal para músicas, chamadas e exercícios.",
      image: "https://ae01.alicdn.com/kf/S3d2c5f7e8a5b4e9c8d1a2b3c4d5e6f7g.jpg",
      price: 49.90,
      originalPrice: 129.90,
      discount: 62,
      platform: "shopee",
      affiliateLink: "https://shopee.com.br",
      categoryId: "", // Will be set below
      featured: true,
    },
    {
      title: "Smartwatch D20 Relógio Inteligente Bluetooth",
      slug: "smartwatch-d20-relogio-inteligente",
      description: "Smartwatch com tela touch colorida, monitor cardíaco, pressão arterial, contador de passos. Resistente à água. Compatível com Android e iOS.",
      image: "https://ae01.alicdn.com/kf/S1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p.jpg",
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
      image: "https://ae01.alicdn.com/kf/Sb1c2d3e4f5g6h7i8j9k0l1m2n3o4p5q6.jpg",
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
      image: "https://ae01.alicdn.com/kf/Sc1d2e3f4g5h6i7j8k9l0m1n2o3p4q5r6.jpg",
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
      image: "https://ae01.alicdn.com/kf/Sd1e2f3g4h5i6j7k8l9m0n1o2p3q4r5s6.jpg",
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
      image: "https://ae01.alicdn.com/kf/Se1f2g3h4i5j6k7l8m9n0o1p2q3r4s5t6.jpg",
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
      image: "https://ae01.alicdn.com/kf/Sf1g2h3i4j5k6l7m8n9o0p1q2r3s4t5u6.jpg",
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
      image: "https://ae01.alicdn.com/kf/Sg1h2i3j4k5l6m7n8o9p0q1r2s3t4u5v6.jpg",
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
      update: {},
      create: product,
    });
  }
  console.log("✅ Products created:", productsData.length);

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
  console.log("✅ Site config created");

  console.log("\n🎉 Seed completed successfully!");
  console.log("\n📧 Admin login: admin@achadosdajeh.com");
  console.log("🔑 Admin password: admin123");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
