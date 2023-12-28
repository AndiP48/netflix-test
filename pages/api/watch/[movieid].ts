import prisma from "@/lib/prisma";
import ServerAuth from "@/lib/serverauth";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
        res.status(405).end();
    }

    try {
        await ServerAuth(req);

        const {movieid} = req.query;

        if (!movieid) {
            throw new Error("There empty request");
        }

        if (typeof movieid !== "string") {
            throw new Error("The value must");
        }

        const movie = await prisma.movie.findUnique({
            where: {
                id: movieid
            }
        })

        if (!movie) {
            throw new Error("The data does not exist");
        }

        res.status(200).json(movie);

    } catch(err) {
        res.status(400).end();
        console.error(err);
    }
}