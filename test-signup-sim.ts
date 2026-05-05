import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  try {
    console.log("Hashing password...");
    const passwordHash = await hash("password123", 10);
    
    console.log("Checking for existing user...");
    const existingUser = await prisma.user.findUnique({
        where: { email: "test@example.com" },
    });
    console.log("Existing user:", existingUser);

    console.log("Creating user...");
    const user = await prisma.user.create({
        data: {
            name: "Test User",
            email: "test" + Date.now() + "@example.com",
            passwordHash,
        },
    });
    console.log("Success! Created user:", user.id);
  } catch (e) {
    console.error("Signup simulation failed:", e);
  } finally {
    await prisma.$disconnect();
  }
}

main();
