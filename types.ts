import { Prisma } from '@prisma/client';

export type TUrlNavigationMenu = {
    title: string;
    path: string;
}


export type usersWithTeam = Prisma.UserGetPayload<{
    include: {
        team: true
    }
}>
