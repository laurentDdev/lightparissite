import { Prisma } from '@prisma/client';

export type TUrlNavigationMenu = {
    title: string;
    path: string;
}


export type TeamWithUsers = Prisma.TeamGetPayload<{
    include: {
        User: true
    }
}>
