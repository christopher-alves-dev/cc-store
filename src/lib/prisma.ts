import { PrismaClient } from "@prisma/client";

declare global {
  var cachedPrisma: PrismaClient;
}

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.cachedPrisma) {
    global.cachedPrisma = new PrismaClient();
  }
  prisma = global.cachedPrisma;
}

const prismaClientSingleton = () => {
  const client = prisma.$extends({
    model: {
      product: {
        async delete({ where }: { where: { id: string } }) {
          return prisma.product.update({
            where: {
              ...where,
            },
            data: {
              deletedAt: new Date(),
            },
          });
        },
      },
      category: {
        async delete({ where }: { where: { id: string } }) {
          return prisma.category.update({
            where: {
              ...where,
            },
            data: {
              deletedAt: new Date(),
            },
          });
        },
      },
    },
    query: {
      product: {
        async $allOperations({ model, args, operation, query }) {
          if (operation === "findUnique" || operation === "findMany") {
            args.where = { ...args.where, deletedAt: null };
          }
          return query(args);
        },
      },
    },
  });

  return client;
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prismaClient: PrismaClientSingleton | undefined;
};

export const prismaClient =
  globalForPrisma.prismaClient ?? prismaClientSingleton();
