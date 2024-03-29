"use client";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem, DropdownMenuPortal, DropdownMenuSeparator,
    DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import { FaSignOutAlt } from "react-icons/fa";
import { MdLocalPolice, MdAdminPanelSettings  } from "react-icons/md";

import { FaRegLightbulb } from "react-icons/fa";
import { FaLightbulb } from "react-icons/fa";
import { useTheme } from "next-themes";

import {signOut} from "next-auth/react";
import { useUserRole } from "@/hooks/useUserRole";
import {ERole} from "@/types";
import {useRouter} from "next/navigation";


type Props = {
    name: string;
    image: string;
    email: string;
}

const ProfileMenu = ({email, name, image}: Props) => {

    const {theme, setTheme} = useTheme();

    const router = useRouter()

    const {data: user, isFetching, error} = useUserRole(email);



    const onChangeTheme = (theme: string) => {
        setTheme(theme);
    }

    return (
            <DropdownMenu >
                <DropdownMenuTrigger >
                    <Button variant={"ghost"} className={"flex items-center gap-2 mt-4 md:mt-0"}>
                        <Avatar>
                            <AvatarImage src={image} alt={name} />
                            <AvatarFallback>{name}</AvatarFallback>
                        </Avatar>
                        <p>{name}</p>
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

                    {
                        (user && user.roleId == ERole.DOUANIER || user && user.roleId == ERole.ADMIN) && (
                            <DropdownMenuItem className={"cursor-pointer flex items-center gap-2"} onClick={() => router.push("/douane/dashboard/request/pending")} >
                                <MdLocalPolice  />
                                <span>Espace douanier</span>
                            </DropdownMenuItem>
                        )
                    }

                    {
                        ( user && user.roleId == ERole.ADMIN) && (
                            <DropdownMenuItem className={"cursor-pointer flex items-center gap-2"} onClick={() => router.push("/admin/dashboard/users")} >
                                <MdAdminPanelSettings  />
                                <span>Espace admin</span>
                            </DropdownMenuItem>
                        )
                    }

                    <DropdownMenuItem className={"cursor-pointer flex items-center gap-2"} onClick={() => signOut()}>
                        <FaSignOutAlt  />
                        <span>Se déconnecter</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
    )
}

export default ProfileMenu
