import PageContainer from "@/components/page-container";
import { FaDiscord, FaTiktok, FaTwitch , FaInstagram, FaYoutube  } from "react-icons/fa";
import ButtonJoin from "@/components/button-join";

const socialNetworks = [
    {
        name: "Discord",
        icon: <FaDiscord className={"text-2xl md:text-4xl text-black dark:text-white "}/>,
        url: "https://discord.gg/lprp"
    },
    {
        name: "Tiktok",
        icon: <FaTiktok className={"text-2xl md:text-4xl text-black dark:text-white"}/>,
        url: "https://www.tiktok.com/@mcservai"
    },
    {
        name: "Twitch",
        icon: <FaTwitch className={"text-2xl md:text-4xl text-black dark:text-white"}/>,
        url: "https://www.twitch.tv/mcservai"
    },
    {
        name: "Instagram",
        icon: <FaInstagram className={"text-2xl md:text-4xl text-black dark:text-white"}/>,
        url: "https://www.instagram.com/lightparisrp/"
    },
    {
        name: "Youtube",
        icon: <FaYoutube className={"text-2xl md:text-4xl text-black dark:text-white"}/>,
        url: "https://www.youtube.com/lprp"
    }
]
const Footer = () => {

    return (
       <PageContainer>
           <footer>
                <div className={"flex justify-center items-center py-8 gap-4"}>
                    {
                        socialNetworks.map((socialNetwork, index) => (
                            <ButtonJoin url={socialNetwork.url} variant={"ghost"} key={index}>
                                {socialNetwork.icon}
                            </ButtonJoin>
                        ))
                    }
                </div>


           </footer>
       </PageContainer>
    );
};

export default Footer;
