import prisma from "@/lib/connect";
import {NextResponse} from "next/server";

export const GET = async () => {
    try {
        const teams = await prisma.user.findMany({
            include:{
                team: true
            }
        })
        return NextResponse.json(teams, {status: 200})
    }catch (e: any) {
        return  NextResponse.json({message: "Something went wrong", error: e.message}, {status: 500})
    }
}
