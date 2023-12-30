"use client"

import {Button} from "@/components/ui/button";
import {FaDiscord} from "react-icons/fa";
import {cn} from "@/lib/utils";
import {Poppins} from 'next/font/google'
import {signIn, signOut, useSession} from "next-auth/react";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import { FaSignOutAlt } from "react-icons/fa";
import { MdLocalPolice } from "react-icons/md";

const poppins = Poppins({weight: "900", subsets: ['latin']})
const ProfileBtn = () => {

    const {data: session, status} = useSession();
    const onLogin = () => {
        signIn("discord")
    }

    if (!session) {
        return (
            <Button variant={"discord"} onClick={onLogin} className={"gap-2 flex items-center"}>

                <p className={poppins.className}>Se connecter</p>
                <FaDiscord className={cn("mr-2")} />
            </Button>
        )
    }

    return (
        // <div >
        //     <p className={poppins.className}>{session?.user?.name}</p>
        //     <Image src={session.user?.image as string} width={15} height={15} alt={"Avatar user"} />
        // </div>
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Button variant={"ghost"} className={"flex items-center gap-2"}>
                    <Avatar>
                        <AvatarImage src={session.user?.image as string} />
                        <AvatarFallback>{session.user?.name}</AvatarFallback>
                    </Avatar>
                    <p>{session.user?.name}</p>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem className={"cursor-pointer flex items-center gap-2"} onClick={() => signOut()}>
                    <MdLocalPolice  />
                    <span>Espace douanier</span>
                </DropdownMenuItem>
                <DropdownMenuItem className={"cursor-pointer flex items-center gap-2"} onClick={() => signOut()}>
                    <FaSignOutAlt  />
                    <span>Se déconnecter</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default ProfileBtn;
