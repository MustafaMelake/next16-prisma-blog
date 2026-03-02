import { PrismaClient } from "../app/generated/prisma";
const prisma = new PrismaClient();

async function main() {
  await prisma.user.update({
    where: { email: "mustafamelake@gmail.com" }, 
    data: { role: "ADMIN" },
  });
  console.log("Admin role assigned successfully!");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
