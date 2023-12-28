import { PrismaClient } from "@prisma/client"

declare global {
    namespace globalThis {
        var prismadb: PrismaClient;
    }

    namespace NodeJS {
        interface ProcessEnv {
            NEXTAUTH_SECRET: any
            GOOGLE_CLIENT_ID: any
            GOOGLE_CLIENT_SECRET: any
            GITHUB_CLIENT_ID: any
            GITHUB_CLIENT_SECRET: any
        }   
    }
}