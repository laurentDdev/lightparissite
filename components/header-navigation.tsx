"use client"
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink, NavigationMenuList,
    navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import Link from "next/link";

import ProfileBtn from "@/components/profile-btn";
import {Poppins} from 'next/font/google'
import {TUrlNavigationMenu} from "@/types";
import {useEffect, useState} from "react";
import {Skeleton} from "@/components/ui/skeleton";

const poppins = Poppins({weight: "900", subsets: ['latin']})



type Props = {
    urlNavigationMenu: TUrlNavigationMenu[];
}

const HeaderNavigation = ({urlNavigationMenu}: Props) => {



    return (
        <NavigationMenu className={"hidden md:block"}>
            <NavigationMenuList>
                {
                    urlNavigationMenu.map((item, index) => (
                        <NavigationMenuItem key={index}>
                           <Link href={item.path} legacyBehavior passHref >
                               <NavigationMenuLink className={`${navigationMenuTriggerStyle()} ${poppins.className}`}>
                                   {item.title}
                               </NavigationMenuLink>
                           </Link>
                        </NavigationMenuItem>
                    ))
                }
                <ProfileBtn/>
            </NavigationMenuList>
        </NavigationMenu>
    )
};

export default HeaderNavigation;
