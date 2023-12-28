import prisma from "@/lib/prisma";
import ServerAuth from "@/lib/serverauth";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
        res.status(405).end()
    }

    try {
        ServerAuth(req)

        const movieLength = await prisma.movie.count();

        const random = Math.floor(Math.random() * movieLength);
        
        const movie = await prisma.movie.findMany({
            take: 1,
            skip: random
        })

        if (!movie) {
            throw new Error("Theres wrong at picking movie")
        }

        res.status(200).json(movie[0]);
    } catch(err) {
        res.status(400).end();
        console.error(err)
    }
}