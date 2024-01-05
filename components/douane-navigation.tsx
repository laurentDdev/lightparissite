"use client"
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList, navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { FaListUl } from "react-icons/fa";
import {Separator} from "@/components/ui/separator";
import {Poppins} from "next/font/google";
const poppins = Poppins({weight: "700", subsets: ['latin']})

const douaneNavigationMenu = [
    {
        title: "Liste des demandes en attente",
        path: "/douane/dashboard/request/pending",
        icon: <FaListUl />
    },
    {
        title: "Liste des demandes acceptées",
        path: "/douane/dashboard/request/validated",
        icon: <FaListUl />
    },
    {
        title: "Liste des demandes refusées",
        path: "/douane/dashboard/request/refused",
        icon: <FaListUl />
    }
]

const DouaneNavigation = () => {

    return (
        <>
            <NavigationMenu >
                <NavigationMenuList className={"flex flex-col"} >
                    {
                        douaneNavigationMenu.map((item, index) => (
                            <NavigationMenuItem key={index} className={"w-full mb-1"}>
                                <Link href={item.path} legacyBehavior passHref >
                                    <NavigationMenuLink className={`${navigationMenuTriggerStyle()} ${poppins.className} gap-3`}>
                                        {item.icon}
                                        {item.title}
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                        ))
                    }
                </NavigationMenuList>
            </NavigationMenu>
            <Separator orientation={"vertical"} className={"h-full"} color={"white"}  />
        </>
    );
};

export default DouaneNavigation;
