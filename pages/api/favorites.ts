import sessionServerAuth from "@/lib/sessionserverauth";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
        console.error("the method does not allowed");
        res.status(405).end();
    }

    try {
        const user = await sessionServerAuth(req, res);
        
        const favorites = await prisma.movie.findMany({
            where: {
                id: {
                    in: user.movies
                }
            }
        })

        if (!favorites) {
            throw new Error("cannot found any favorite movies");
        }

        res.status(200).json(favorites);

    } catch(err) {
        console.error(err);
        res.status(400).end();
    }
}