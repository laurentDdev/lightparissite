import {NextResponse} from "next/server";

export const GET = async () => {
    try {
        const roles = await prisma.role.findMany()
        return NextResponse.json(roles, {status: 200})
    }catch (e) {
        return NextResponse.json({message: "Something went wrong"}, {status: 500})
    }
}
