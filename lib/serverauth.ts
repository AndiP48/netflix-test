import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "@/lib/prisma"

export default async function ServerAuth(req: NextApiRequest) {
    const session = await getSession({ req })

    if (!session) {
        throw new Error("You havent loggin")
    }

    const currentUser = await prisma.user.findUnique({
        where: {
            email: session.user?.email || ""
        }
    })

    if (!currentUser) {
        throw new Error("you havent loggin")
    }

    return currentUser;
}