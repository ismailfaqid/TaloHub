import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma =
    globalForPrisma.prisma ||
    new PrismaClient({
        datasources: {
            db: {
                url: "postgres://615099b5f5425e7a69f40f6ed6b15d7686d3fb283592f550371c4fff14413eeb:sk_mw3qLckAqWr4ccZUk8_g8@db.prisma.io:5432/postgres?sslmode=require",
            },
        },
    });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
