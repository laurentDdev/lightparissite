
"use client"
import {Button} from "@/components/ui/button";
import {FaDiscord} from "react-icons/fa";
import {cn} from "@/lib/utils";

import {Poppins} from 'next/font/google'
import { signIn } from "next-auth/react";
const poppins = Poppins({weight: "900", subsets: ['latin']})

const ButtonLogin = () => {

    const onLogin = () => {
        signIn("discord")
    }

    return (
        <Button variant={"discord"} onClick={onLogin} className={"gap-2 flex items-center"}>

        <p className={poppins.className}>Se connecter</p>
        <FaDiscord className={cn("mr-2")} />
    </Button>
    )
}

export default ButtonLogin