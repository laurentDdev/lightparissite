import {getAuthSession} from "@/lib/auth-options";
import {ERole} from "@/types";
import {NextResponse} from "next/server";
import prisma from "@/lib/connect";

export const PUT = async (req: Request, {params}: {params: {id: string}}) => {
    try {
        const { id } = params

        const session = await getAuthSession()

        if (!session) {
            return NextResponse.json("Unauthorized", {status: 401})
        }

        const user = await prisma.user.findUnique({
            where: {
                email: session.user?.email as string
            }
        })

        if (!user) {
            return NextResponse.json("User not found", {status: 404})
        }

        if (user.roleId !== ERole.ADMIN) {
            return NextResponse.json("Unauthorized", {status: 401})
        }

        const douanier = await prisma.user.findUnique({
            where: {
                id: id
            }
        })

        if (!douanier) {
            return NextResponse.json("Douanier not found", {status: 404})
        }

        await prisma.user.update({
            where: {
                id: id
            },
            data: {
                roleId: ERole.USER
            }
        })

        return NextResponse.json("Douanier deleted", {status: 200})



    }catch (e: any) {
        console.log(e)
        return NextResponse.json({error: "(users/roles/douane) Something went wrong", message : e.message}, {status: 500})
    }
}
