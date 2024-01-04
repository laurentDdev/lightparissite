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

export type usersWithRoleAndTeam = Prisma.UserGetPayload<{
    include: {
        role: true,
        team: true
    }
}>



export enum EState {
    PENDING = "pending",
    VALIDATED = "validated",
    REFUSED = "refused",
}
export enum ERole {
    USER = "user",
    DOUANIER = "douanier",
    ADMIN = "admin",

}
