import {NextResponse} from "next/server";
import {getAuthSession} from "@/lib/auth-options";
import {ERole} from "@/types";
import prisma from "@/lib/connect";
export const GET = async (req: Request, {params}: {params: {type: string}}) => {
    try {
        const session = await getAuthSession()
        if (!session) {
            return NextResponse.json({status: 401, message: "Unauthorized"})
        }

        const actualUser = await prisma.user.findUnique({
            where: {
                email: session.user?.email as string
            }
        })

        if (!actualUser) {
            return NextResponse.json({status: 401, message: "Unauthorized"})
        }

        if (actualUser.roleId !== ERole.ADMIN && actualUser.roleId !== ERole.DOUANIER) {
            return NextResponse.json({status: 401, message: "Unauthorized"})
        }

        const requests = await prisma.requestWl.findMany({
            include: {
                user: true,
            },
            where: {
                status: params.type
            }
        })

        return NextResponse.json(requests, {status: 200})

    }catch (e) {
        console.log(e)
        return NextResponse.json({status: 500, message: "Internal Server Error"})
    }
}
