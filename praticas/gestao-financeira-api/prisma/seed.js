const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const initialCategories = [
    { name: "income", displayName: "Renda", icon: "wallet", background: "#D4AF37", isIncome: true, isDefault: true },
    { name: "food", displayName: "Alimentação", icon: "fast-food", background: "#FF7043", isIncome: false, isDefault: true },
    { name: "house", displayName: "Casa", icon: "home", background: "#42A5F5", isIncome: false, isDefault: true },
    { name: "education", displayName: "Educação", icon: "book", background: "#AB47BC", isIncome: false, isDefault: true },
    { name: "travel", displayName: "Viagens", icon: "airplane", background: "#26C6DA", isIncome: false, isDefault: true }
  ];

  console.log("Iniciando o seed...");
  for (const category of initialCategories) {
    await prisma.category.upsert({
      where: { name: category.name },
      update: {},
      create: category,
    });
  }
  console.log("Seed concluído! Categorias padrão inseridas.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });