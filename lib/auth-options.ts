import {getServerSession} from "next-auth";
import {PrismaAdapter} from "@auth/prisma-adapter";
import prisma from "@/lib/connect";
import DiscordProvider from "next-auth/providers/discord";

export const authOptions = {
    debug: true,
    adapter: PrismaAdapter(prisma),
    providers: [
        DiscordProvider({
            clientId: process.env.DISCORD_CLIENT_ID as string,
            clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
            authorization: {
                params: {
                    scope: "identify email guilds guilds.members.read"
                }
            }
        })
    ]
}

// @ts-ignore
export const getAuthSession = () => getServerSession(authOptions)
