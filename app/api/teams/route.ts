
import prisma from "@/lib/connect";
import {NextResponse} from "next/server";
export const GET = async ( ) => {
    try {
        // @ts-ignore
        const teams = await prisma.team.findMany({
            include:{
                User: true
            }
        })
        return NextResponse.json(teams, {status: 200})
    }catch (e) {
        console.log(e)
        return  NextResponse.json({message: "Something went wrong"}, {status: 500})
    }
}
