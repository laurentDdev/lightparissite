import { getAuthSession } from "@/lib/auth-options";
import { ERole, EState } from "@/types";
import { NextResponse } from "next/server"
import axios from "axios";
import prisma from "@/lib/connect";

export const GET = async (req: Request, {params}: {params: {id: string}}) => {
    try {
        const { id } = params;

        const session = await getAuthSession()
        if (!session) {
            return NextResponse.json({status: 401, message: "Unauthorized"})
        }

        const actualUser = await prisma.user.findUnique({
            where: {
                email: session.user?.email as string
            }
        })

        if (!actualUser) {
            return NextResponse.json({status: 401, message: "Unauthorized"})
        }

        if (actualUser.roleId !== ERole.ADMIN && actualUser.roleId !== ERole.DOUANIER) {
            return NextResponse.json({status: 401, message: "Unauthorized"})
        }

        const requests = await prisma.requestWl.findUnique({
            where: {
                id: id
            },
            include: {
                user: true,
            }
        })

        return NextResponse.json(requests, {status: 200})

    }catch (e) {
        console.log(e)
        return NextResponse.json({status: 500, message: "Internal Server Error"})
    }
}

export const PUT = async (req: Request, {params}: {params: {id: string}}) => {
    try {
        const { id } = params;
        const {newState} = await req.json()

        const session = await getAuthSession()
        if (!session) {
            return NextResponse.json({status: 401, message: "Unauthorized"})
        }

        const actualUser = await prisma.user.findUnique({
            where: {
                email: session.user?.email as string
            },
            include: {
                accounts: true
            }
        })

        if (!actualUser) {
            return NextResponse.json({status: 401, message: "Unauthorized"})
        }

        if (actualUser.roleId !== ERole.ADMIN && actualUser.roleId !== ERole.DOUANIER) {
            return NextResponse.json({status: 401, message: "Unauthorized"})
        }

        const requests = await prisma.requestWl.update({
            where: {
                id: id
            },
            include: {
              user: true
            },
            data: {
                status: newState
            }
        })

        if (newState === EState.VALIDATED) {

            const userRequest = await prisma.user.findUnique({
                where: {
                    id: requests?.user?.id
                },
                include: {
                    accounts: true
                }
            })

            if (!userRequest) {
                return NextResponse.json({status: 401, message: "Unauthorized"})
            }



            const headers = {
                'Authorization': `Bot ${process.env.BOT_TOKEN}`,
                'Content-Type': 'application/json'
            }

            const data = {
                'content': `Bonjour <@${userRequest.accounts[userRequest.accounts.length - 1].providerAccountId}> votre candidature a été acceptée par <@${actualUser.accounts[actualUser.accounts.length-1].providerAccountId}> `,
                'tts': false
            }

            const response = await axios.post(`https://discord.com/api/v10/channels/${process.env.CHANNEL_ID}/messages`, data, {headers: headers})

            if (response.status == 200) {
                return NextResponse.json(requests, {status: 200})
            }

        }

        return NextResponse.json({status: 500, message: "Internal Server Error"})



    }catch (e) {
        console.log(e)
        return NextResponse.json({status: 500, message: "Internal Server Error"})
    }

}

export const DELETE = async (req: Request, {params}: {params: {id: string}}) => {
    try {

        const { searchParams } = new URL(req.url)
        const state = searchParams.get('accept')

        const { id } = params;

        const session = await getAuthSession()

        if (!session) {
            return NextResponse.json({status: 401, message: "Unauthorized"})
        }

        const actualUser = await prisma.user.findUnique({
            where: {
                email: session.user?.email as string
            },
            include: {
                accounts: true
            }
        })

        if (!actualUser) {
            return NextResponse.json({status: 401, message: "Unauthorized"})
        }

        if (actualUser.roleId !== ERole.ADMIN && actualUser.roleId !== ERole.DOUANIER) {
            return NextResponse.json({status: 401, message: "Unauthorized"})
        }


        const requests = await prisma.requestWl.findUnique({
            where: {
                id: id
            },
            include: {
                user: true
            },
        })

        if (!requests) {
            return NextResponse.json({status: 404, message: "Not Found"})
        }

        const userRequest = await prisma.user.findUnique({
            where: {
                id: requests?.user?.id
            },
            include: {
                accounts: true
            }
        })

        if (!userRequest) {
            return NextResponse.json({status: 401, message: "Unauthorized"})
        }

        if (state === "false") {
            await prisma.requestWl.delete({
                where: {
                    id: id
                }
            })

           try {
               const headers = {
                   'Authorization': `Bot ${process.env.BOT_TOKEN}`,
                   'Content-Type': 'application/json'
               }

               const data = {
                   'content': `Bonjour <@${userRequest.accounts[userRequest.accounts.length - 1].providerAccountId}> votre whitelist a été refusé par <@${actualUser.accounts[actualUser.accounts.length-1].providerAccountId}> `,
                   'tts': false
               }

               const response = await axios.post(`https://discord.com/api/v10/channels/${process.env.CHANNEL_ID}/messages`, data, {headers: headers})
               const response2 = await axios.post(`https://discord.com/api/v10/channels/${process.env.CHANNEL_ID}/messages`, data, {headers: headers})

               return NextResponse.json({status: 200, message: "Success"})
           } catch (e) {
                console.log(e)
               return NextResponse.json({status: 500, message: "Internal Server Error"})
           }


        }



       if (state === "true") {
           if (!userRequest) {
               return NextResponse.json({status: 401, message: "Unauthorized"})
           }

           const headers = {
               'Authorization': `Bot ${process.env.BOT_TOKEN}`,
               'Content-Type': 'application/json',
           };


           const memberId = userRequest.accounts[userRequest.accounts.length - 1].providerAccountId;

           try {
               const response = await axios.put(`https://discord.com/api/v10/guilds/1176659914173710396/members/${memberId}/roles/1195143094337810593`, null, { headers: headers });

               const headers2 = {
                   'Authorization': `Bot ${process.env.BOT_TOKEN}`,
                   'Content-Type': 'application/json'
               }

               const data = {
                   'content': `Bonjour <@${userRequest.accounts[userRequest.accounts.length - 1].providerAccountId}> votre whitelist a été accepté par <@${actualUser.accounts[actualUser.accounts.length-1].providerAccountId}> `,
                   'tts': false
               }

               const response3 = await axios.post(`https://discord.com/api/v10/channels/${process.env.CHANNEL_ID}/messages`, data, {headers: headers2})
               const response4 = await axios.post(`https://discord.com/api/v10/channels/${process.env.CHANNEL_ID}/messages`, data, {headers: headers2})

               await prisma.requestWl.delete({
                   where: {
                       id: id
                   }
               })

               return NextResponse.json({status: 200, message: "Success"})
           } catch (error: any) {
               console.error('Erreur lors de la requête API:', error.response.data);
               return NextResponse.json({status: 500, message: "Internal Server Error"})
           }
       }

    }catch (e) {
        console.log(e)
        return NextResponse.json({status: 500, message: "Internal Server Error"})
    }
}

