import ServerAuth from "@/lib/serverauth"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
        res.status(405).end();
        throw new Error("theres wrong method");
    }
    
    try {
        const user = await ServerAuth(req);

        res.status(200).json(user);
    } catch(err) {
        res.status(400).end();
        console.error(err)
    }
}