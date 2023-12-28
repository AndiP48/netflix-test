import { authOptions } from "./auth/[...nextauth]";
import prisma from "@/lib/prisma";
import { without } from "lodash"
import sessionServerAuth from "@/lib/sessionserverauth";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {

    
        if (req.method === "POST") {
            const user = await sessionServerAuth(req, res)

            const { movieid } = req.body;

            if (!movieid) {
                throw new Error("POST: request value is missing");
            }   

            const myMovie = await prisma.movie.findUnique({
                where: {
                    id: movieid
                }
            })

            if (!myMovie) {
                throw new Error("POST: The movie is not exist");
            }

            const favorite = await prisma.user.update({
                where: {
                    email: user.email || ""
                },
                data: {
                    movies: {
                        push: movieid
                    }
                }
            })

            if (!favorite) {
                throw new Error("POST: user cannot update");
            }

            res.status(200).json(favorite);
        }

        if (req.method === "PATCH") {
            const { movieid } = req.body;

            if (!movieid) {
                throw new Error("PATCH: request value is missing");
            }

            const myMovie = await prisma.movie.findUnique({
                where: {
                    id: movieid
                }
            })

            if (!myMovie) {
                throw new Error("PATCH: The movie is not exist");
            }

            const user = await sessionServerAuth(req, res)

            const array = without(user.movies, movieid);

            const favorite = await prisma.user.update({
                where: {
                    email: user.email || ""
                },
                data: {
                    movies: array
                }
            }) 

            if (!favorite) {
                throw new Error("PATCH: user cannot update");
            }

            res.status(200).json(favorite);
        }

        res.status(405).end()
    } catch(err) {
        console.error(err);
        res.status(400).end();
    }
}