import {NextResponse} from "next/server";

export const GET = async () => {
    try {
        const teams = await prisma.team.findMany()
        return NextResponse.json(teams, {status: 200})
    }catch (e) {
        return NextResponse.json({message: "Something went wrong"}, {status: 500})
    }
}
