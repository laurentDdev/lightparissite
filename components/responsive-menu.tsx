import {Sheet, SheetContent, SheetHeader, SheetTrigger} from "@/components/ui/sheet";
import { FaBars } from "react-icons/fa";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {TUrlNavigationMenu} from "@/types";


type Props = {
    urlNavigationMenu: TUrlNavigationMenu[];
}
const ResponsiveMenu = ({urlNavigationMenu}: Props) => {
    return (
        <Sheet>
            <SheetTrigger>
                <FaBars className={"h-6 w-6 text-black dark:text-white md:hidden"}  />
            </SheetTrigger>
            <SheetContent>
                <div className={"flex flex-col gap-4"}>
                    {urlNavigationMenu.map((url: TUrlNavigationMenu) => (
                        <Link key={url.title} href={url.path} className={"block px-2 py-1 text-lg"} >
                            <Button variant={"ghost"}>{url.title}</Button>
                        </Link>
                    ))}
                </div>
            </SheetContent>
        </Sheet>
    );
};

export default ResponsiveMenu;
