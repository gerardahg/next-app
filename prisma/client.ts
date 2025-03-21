//Codigo tomado de: https://www.prisma.io/docs/orm/more/help-and-troubleshooting/nextjs-help
//Para evitar tener mutliples clientes corriendo en una instancia
import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;