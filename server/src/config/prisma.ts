import { PrismaPg } from "@prisma/adapter-pg"
import { env } from "../utils/env.util.js";
import { PrismaClient } from "../generated/prisma/client.js"

const adapter = new PrismaPg({
    connectionString: env.DB_URL
})

const prisma = new PrismaClient({adapter});

export default prisma
