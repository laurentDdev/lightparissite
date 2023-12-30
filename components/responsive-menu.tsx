"use client"
import {Sheet, SheetContent, SheetFooter, SheetHeader, SheetTrigger} from "@/components/ui/sheet";
import { FaBars } from "react-icons/fa";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {TUrlNavigationMenu} from "@/types";
import {useState} from "react";
import SocialNetwork from "@/components/social-network";


type Props = {
    urlNavigationMenu: TUrlNavigationMenu[];
}
const ResponsiveMenu = ({urlNavigationMenu}: Props) => {

    const [open, setOpen] = useState(false)

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger   onClick={() => setOpen(true)}>
                <FaBars className={"h-6 w-6 text-black dark:text-white md:hidden"}  />
            </SheetTrigger>
            <SheetContent onCloseAutoFocus={() => setOpen(false)}>
                <div className={"flex flex-col gap-4"}>
                    {urlNavigationMenu.map((url: TUrlNavigationMenu) => (
                        <Link key={url.title} href={url.path} onClick={() => setOpen(false)} className={"block px-2 py-1 text-lg"} >
                            <Button variant={"ghost"}>{url.title}</Button>
                        </Link>
                    ))}
                </div>
                <SheetFooter >
                    <div className={"flex"}>
                        <SocialNetwork />
                    </div>
                    {/*<p className={"text-center text-sm text-neutral-500 dark:text-neutral-400"}>© 2021 Light Paris RP</p>*/}
                </SheetFooter>
            </SheetContent>

        </Sheet>
    );
};

export default ResponsiveMenu;
