import {getAuthSession} from "@/lib/auth-options";
import {NextResponse} from "next/server";
import prisma from "@/lib/connect";
import {ERole} from "@/types";

export const PUT = async (req: Request, { params }: { params: { id: string } }) => {
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

        const body = await req.json();

        // Mettez en place une gestion des erreurs spécifique pour la mise à jour
        try {

            const updatedUser = await prisma.user.update({
                where: {
                    id: params.id,
                },
                data: {
                    roleId: body.role,
                    teamId: body.team,
                },
                include: {
                    role: true,
                    team: true,
                },
            });

            return NextResponse.json(updatedUser, { status: 200 });
        } catch (updateError) {
            return NextResponse.json({ error: "Error updating user" }, { status: 500 });
        }
    } catch (error) {
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
};
