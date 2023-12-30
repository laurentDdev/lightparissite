import React from 'react';
import ButtonJoin from "@/components/button-join";
import {FaDiscord, FaInstagram, FaTiktok, FaTwitch, FaYoutube} from "react-icons/fa";


const socialNetworks = [
    {
        name: "Discord",
        icon: <FaDiscord className={"text-xl sm:text-2xl md:text-4xl text-black dark:text-white "}/>,
        url: "https://discord.gg/lprp"
    },
    {
        name: "Tiktok",
        icon: <FaTiktok className={"text-xl sm:text-2xl md:text-4xl text-black dark:text-white"}/>,
        url: "https://www.tiktok.com/@mcservai"
    },
    {
        name: "Twitch",
        icon: <FaTwitch className={"text-xl sm:text-2xl md:text-4xl text-black dark:text-white"}/>,
        url: "https://www.twitch.tv/mcservai"
    },
    {
        name: "Instagram",
        icon: <FaInstagram className={"text-xl sm:text-2xl md:text-4xl text-black dark:text-white"}/>,
        url: "https://www.instagram.com/lightparisrp/"
    },
    {
        name: "Youtube",
        icon: <FaYoutube className={"text-xl sm:text-2xl md:text-4xl text-black dark:text-white"}/>,
        url: "https://www.youtube.com/lprp"
    }
]

const SocialNetwork = () => {
    return (
       <>
           {
               socialNetworks.map((socialNetwork, index) => (
                   <ButtonJoin url={socialNetwork.url} variant={"ghost"} key={index}>
                       {socialNetwork.icon}
                   </ButtonJoin>
               ))
           }
       </>
    );
};

export default SocialNetwork;
