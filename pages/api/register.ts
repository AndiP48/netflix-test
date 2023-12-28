import prisma from '@/lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from "bcrypt"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method != "POST") {
        res.status(405).end()
        throw new Error("the method doesn't allow")
    }
    
    try {
        const saltRound = 10;
        const {name, email, pswd} = req.body

        const isUser = await prisma.user.findUnique({
            where: {
                email
            }
        })

        if (isUser) {
            res.status(422).end();
            
            throw new Error("Email has exist");
        }

        const hashedPassword = await bcrypt.hash(pswd, saltRound)

        const newUser = await prisma.user.create({
            data: {
                name: name,
                email: email,
                hashedPassword: hashedPassword,
                emailVerified: new Date()
            }
        })

        res.status(200).json(newUser)

    } catch(err) {
        res.status(400).end()
        console.error("There's invalid syntax")
        console.error(err)
    }
}