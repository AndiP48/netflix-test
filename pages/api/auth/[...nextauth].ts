import prisma from "@/lib/prisma"
import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"
import { PrismaAdapter } from "@auth/prisma-adapter"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcrypt"

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET
        }),
        Credentials({
            id: "credentials",
            name: "Credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "email"
                },
                pswd: {
                    label: "Password",
                    type: "password"
                }
            },
            async authorize(credentials) {
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials?.email
                    }
                })

                if (!user) {
                    throw new Error("Email cannot found")
                }

                const isPassword = await bcrypt.compare(
                    credentials?.pswd || "",
                    user?.hashedPassword || ""
                )

                if (!isPassword) {
                    throw new Error("password is wrong")
                }

                return user
            }
        })
    ],
    debug: process.env.NODE_ENV === "development",
    pages: {
        signIn: "/login"
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET
}

export default NextAuth(authOptions)