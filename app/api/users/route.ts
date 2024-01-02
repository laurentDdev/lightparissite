import prisma from "@/lib/connect"
import {NextResponse} from "next/server";
import {getAuthSession} from "@/lib/auth-options";
import {ERole} from "@/types";
export const GET = async () => {
    try {

        const session = await getAuthSession()

        if (!session) {
            return NextResponse.json("user is not logged in", {status: 401})
        }

        const user = await prisma.user.findUnique({
            where: {
                email: session.user?.email as string
            },
            include: {
                role: true,
            }
        })

        if (user?.roleId !== ERole.ADMIN) {
            return NextResponse.json("user is not admin", {status: 401})
        }

        const users = await prisma.user.findMany({
            include: {
                role: true,
                team: true
            },
        })

        return NextResponse.json(users, {status: 200})

    }catch (e) {
        console.log(e)
        return NextResponse.json({message: "Something went wrong"}, {status: 500})

    }
}
