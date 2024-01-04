import {NextResponse} from "next/server";
import {getAuthSession} from "@/lib/auth-options";
import prisma from "@/lib/connect";
import {ERole} from "@/types";


export const GET = async (req: Request, {params}: {params: {id: string}}) => {
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

        const userFind = await prisma.user.findUnique({
          where: {
              id: params.id
          } ,
            include: {
                role: true,
                team: true,
                RequestWl: true
            }
        })

        return NextResponse.json(userFind, {status: 200})

    }
    catch (error) {
        return NextResponse.json({error: "Something went wrong"}, {status: 500})
    }
}


export const DELETE = async (req: Request, { params }: { params: { id: string } }) => {
    try {
        const session = await getAuthSession();

        if (!session) {
            return NextResponse.json("user is not logged in", { status: 401 });
        }

        const user = await prisma.user.findUnique({
            where: {
                email: session.user?.email as string,
            },
            include: {
                role: true,
            },
        });

        if (user?.roleId !== ERole.ADMIN) {
            return NextResponse.json("user is not admin", { status: 401 });
        }

        const userFind = await prisma.user.findUnique({
            where: {
                id: params.id,
            },
        });

        if (!userFind) {
            return NextResponse.json("user not found", { status: 404 });
        }

        await prisma.user.delete({
            where: {
                id: params.id,
            },
        });

        return NextResponse.json("user deleted", { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}




