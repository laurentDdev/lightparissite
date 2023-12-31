import PageContainer from "@/components/page-container";
import HeaderNavigation from "@/components/header-navigation";
import PlayerState from "@/components/player-state";
import ResponsiveMenu from "@/components/responsive-menu";
import {TUrlNavigationMenu} from "@/types";

const urlNavigationMenu: TUrlNavigationMenu[] = [
    {
        title: "Accueil",
        path: "/",
    },
    {
        title: "Règlement",
        path: "/rules",
    },
    {
        title: "Equipe",
        path: "/team",
    },
    {
        title: "Forum",
        path: "/forum",
    },
    {
        title: "Boutique",
        path: "/shop"
    }
]
const Header = () => {


    return (
        <header className={"p-4"}>
            <PageContainer>
                <div className={"flex items-center justify-between w-full"}>
                    <div className={"flex gap-2"}>
                        <PlayerState/>
                    </div>

                    <ResponsiveMenu urlNavigationMenu={urlNavigationMenu}/>

                    <HeaderNavigation urlNavigationMenu={urlNavigationMenu}/>
                </div>
            </PageContainer>
        </header>
    );
};

export default Header;
