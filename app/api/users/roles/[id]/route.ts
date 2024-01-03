import { getAuthSession } from "@/lib/auth-options";
import prisma from "@/lib/connect"
import { NextResponse } from "next/server";

export const GET = async (req: Request, {params}: {params:{id: string}}) => {
    const {id} = params
    try {

        const session = await getAuthSession()
        if (!session) {
            return NextResponse.json("user is not logged in", {status: 401})
        }

        const user = await prisma.user.findUnique({
            where: {
                email: id
            },
        })

        return NextResponse.json(user, {status: 200})

    }catch (e) {
        return NextResponse.json({error: "(users/id/role) Something went wrong"}, {status: 500})
    }
}
