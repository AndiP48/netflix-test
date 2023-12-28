import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma"
import { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function sessionServerAuth(req: NextApiRequest, res: NextApiResponse) {
    const serverSession = await getServerSession(req, res, authOptions);

    if (!serverSession) {
        throw new Error("The session does not exist");
    }

    const user = await prisma.user.findUnique({
        where: {
            email: serverSession.user?.email || ""
        }
    })

    if (!user) {
        throw new Error("the email does not exist")
    }

    return user;
}