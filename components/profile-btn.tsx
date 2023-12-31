"use client"

import {Button} from "@/components/ui/button";
import {FaDiscord} from "react-icons/fa";
import {cn} from "@/lib/utils";
import {Poppins} from 'next/font/google'
import {signIn, signOut, useSession} from "next-auth/react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem, DropdownMenuPortal, DropdownMenuSeparator,
    DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import { FaSignOutAlt } from "react-icons/fa";
import { MdLocalPolice } from "react-icons/md";

import { FaRegLightbulb } from "react-icons/fa";
import { FaLightbulb } from "react-icons/fa";
import {useTheme} from "next-themes";
const poppins = Poppins({weight: "900", subsets: ['latin']})
const ProfileBtn = () => {

    const {data: session, status} = useSession();
    const {theme, setTheme} = useTheme();
    const onLogin = () => {
        signIn("discord")
    }

    if (status === "unauthenticated") {
        return (
            <Button variant={"discord"} onClick={onLogin} className={"gap-2 flex items-center"}>

                <p className={poppins.className}>Se connecter</p>
                <FaDiscord className={cn("mr-2")} />
            </Button>
        )
    }



    const onChangeTheme = (theme: string) => {
        setTheme(theme);
    }

    if (status === "authenticated") {

        return (
            <DropdownMenu >
                <DropdownMenuTrigger >
                    <Button variant={"ghost"} className={"flex items-center gap-2 mt-4 md:mt-0"}>
                        <Avatar>
                            <AvatarImage src={session.user?.image as string} alt={session?.user?.name as string} />
                            <AvatarFallback>{session.user?.name}</AvatarFallback>
                        </Avatar>
                        <p>{session.user?.name}</p>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger className={"flex items-center gap-2"}>
                            <FaRegLightbulb />
                            <span>Mode du theme</span>
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                                <DropdownMenuItem className={"flex gap-2"} onClick={() => onChangeTheme("dark")}>
                                    <FaLightbulb />
                                    <span>DarkMode</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem className={"flex gap-2"} onClick={() => onChangeTheme("light")}>
                                    <FaRegLightbulb />
                                    <span>LightMode</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                            </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                    </DropdownMenuSub>
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
    }
};

export default ProfileBtn;
