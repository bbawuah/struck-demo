import { PrismaClient } from "../generated/prisma";

declare global {
  var prisma: PrismaClient | undefined;
}

console.log(process.env.DATABASE_URL);

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient({
    datasources: {
      mydb: {
        url: process.env.DATABASE_URL!, // of een string direct
      },
    },
  });
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient({
      datasources: {
        mydb: {
          url: process.env.DATABASE_URL!, // of een string direct
        },
      },
    });
  }
  prisma = global.prisma;
}

export default prisma;
