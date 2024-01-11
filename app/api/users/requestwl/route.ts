import {NextResponse} from "next/server";
import {getAuthSession} from "@/lib/auth-options";
import {EState} from "@/types";


export const POST = async (req: Request) => {
    try {

        const session = await getAuthSession()

        if (!session) {
            return NextResponse.json("Unauthorized", {status: 401})
        }
        const body = await req.json()

        const {goodAnswers, inputs} = body

        const actualUser = await prisma.user.findUnique({
            where: {
                email: session.user?.email as string
            },
            include: {
                RequestWl: true
            }
        })

        if (!actualUser) {
            return NextResponse.json({status: 404, message: "User not found"})
        }

        if (actualUser.RequestWl.length > 0 ) {
            const lastRequest = actualUser.RequestWl[actualUser.RequestWl.length - 1]

            if (lastRequest.status === EState.PENDING || lastRequest.status === EState.VALIDATED) {
                return NextResponse.json({status: 403, message: "Your request is already pending or validated"})
            }
        }

        if (actualUser.RequestWl.length >= 3) {
            return NextResponse.json({status: 403, message: "You have already made 3 requests"})
        }

        await prisma.user.update({
            where: {
                email: session.user?.email as string
            },
            data: {
                nbRequest: {increment: 1}
            }
        })

        await prisma.requestWl.create({
            data: {
                userEmail: session.user?.email as string,
                score: goodAnswers,
                background: inputs.background,
                firstName: inputs.firstname,
                lastName: inputs.lastname,
                job: inputs.job,
                jobType: inputs.jobType,
                date: inputs.age

            }
        })

        return NextResponse.json({status: 200, message: "Request sent"})

    }catch (e) {
        console.log(e)

        return NextResponse.json({status: 500, message: "Internal Server Error"})
    }
}
