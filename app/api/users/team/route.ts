import prisma from "@/lib/connect";
import {NextResponse} from "next/server";
import {getAuthSession} from "@/lib/auth-options";
import {ERole} from "@/types";

export const GET = async () => {
    try {
        const teams = await prisma.user.findMany({
            include: {
                team: true,
            }
        })

        console.log("teams fetch data", teams)
        return NextResponse.json(teams, {status: 200})
    }catch (e: any) {
        return  NextResponse.json({message: "Something went wrong", error: e.message}, {status: 500})
    }
}

export const POST = async (req: Request) => {

}
