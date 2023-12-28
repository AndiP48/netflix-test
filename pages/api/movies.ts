import prisma from "@/lib/prisma";
import ServerAuth from "@/lib/serverauth";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
        res.status(405).end();
        throw new Error("The method does not allowed");
    }

    try {
        await ServerAuth(req);

        const movies = await prisma.movie.findMany();

        if (!movies) {
            throw new Error("The data is not exist");
        }

        res.status(200).json(movies);

    } catch(err) {
        console.error(err);
        res.status(400).end();
    }
}