import { getAuthSession } from "@/lib/auth-options";
import { ERole, EState } from "@/types";
import { NextResponse } from "next/server"

export const GET = async (req: Request, {params}: {params: {id: string}}) => {
    try {
        const { id } = params;

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

        const requests = await prisma.requestWl.findUnique({
            where: {
                id: id
            },
            include: {
                user: true,
            }
        })

        return NextResponse.json(requests, {status: 200})

    }catch (e) {
        console.log(e)
        return NextResponse.json({status: 500, message: "Internal Server Error"})
    }
}

export const PUT = async (req: Request, {params}: {params: {id: string}}) => {
    try {
        const { id } = params;
        const {newState} = await req.json()

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

        const requests = await prisma.requestWl.update({
            where: {
                id: id
            },
            data: {
                status: newState
            }
        })

        return NextResponse.json(requests, {status: 200})

    }catch (e) {
        console.log(e)
        return NextResponse.json({status: 500, message: "Internal Server Error"})
    }

}