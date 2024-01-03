import {NextResponse} from "next/server";

export const GET = async () => {
    try {
        const roles = await prisma.role.findMany()
        return NextResponse.json(roles, {status: 200})
    }catch (e: any) {
        return NextResponse.json({message: "Something went wrong", error: e.message}, {status: 500})
    }
}
