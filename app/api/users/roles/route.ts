import {getAuthSession} from "@/lib/auth-options";
import {NextResponse} from "next/server";
import {ERole} from "@/types";

export const GET = async (req: Request, {params}: {params:{id: string}}) => {
    const {id} = params
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
                role: true
            }
        })

        if (user?.roleId !== ERole.ADMIN ) {
            return NextResponse.json("user is not admin", {status: 401})
        }

        const douaniers = await prisma.user.findMany({
            where: {
                roleId: id
            }
        })


        return NextResponse.json(douaniers, {status: 200})

    }catch (e) {
        return NextResponse.json({error: "(users/id/role) Something went wrong"}, {status: 500})
    }
}
