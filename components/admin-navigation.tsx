"use client"
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList, navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { FaUser } from "react-icons/fa";
import {Separator} from "@/components/ui/separator";
import {MdLocalPolice} from "react-icons/md";
import {Poppins} from "next/font/google";
const poppins = Poppins({weight: "700", subsets: ['latin']})

const adminNavigationMenu = [
    {
        title: "Gestion utilisateur",
        path: "/admin/dashboard/users",
        icon: <FaUser />
    },
    {
        title: "Gestion douanier",
        path: "/admin/dashboard/douanier",
        icon: <MdLocalPolice />
    },
]

const AdminNavigation = () => {
    return (
        <>
            <NavigationMenu >
                <NavigationMenuList className={"flex flex-col"} >
                    {
                        adminNavigationMenu.map((item, index) => (
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

export default AdminNavigation;
