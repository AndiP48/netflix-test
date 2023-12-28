import prisma from "@/lib/prisma";
import sessionServerAuth from "@/lib/sessionserverauth";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        res.status(405).end();
    }

    try {
        const { img } = req.body;

        if (!img) {
            throw new Error("The request is null")
        }

        const user = await sessionServerAuth(req, res)

        const update = await prisma.user.update({
            where: {
                email: user.email || ""
            },
            data: {
                image: img
            }
        })

        if (!update) {
            throw new Error("The update is error");
        }

        res.status(200).json(update);

    } catch(err) {
        console.error(err);
        res.status(400).end();
    }
}