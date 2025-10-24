// scripts/grant-admin.ts
import "dotenv/config";
import { PrismaClient, Role } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const email = process.argv[2];
  if (!email) {
    console.error("Usage: tsx scripts/grant-admin.ts <email>");
    process.exit(1);
  }

  // Sanity check: Role enum exists
  if (!Role || !Role.ADMIN) {
    console.error("❌ Could not resolve Prisma Role enum. Check your schema for `enum Role`.");
    process.exit(1);
  }

  const user = await prisma.user.upsert({
    where: { email },
    update: { role: Role.ADMIN },
    create: { email, name: email.split("@")[0], role: Role.ADMIN },
    select: { id: true, email: true, role: true },
  });

  console.log("✅ User promoted/created as admin:", user);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
