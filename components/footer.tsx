import PageContainer from "@/components/page-container";
import { FaDiscord, FaTiktok, FaTwitch , FaInstagram, FaYoutube  } from "react-icons/fa";
import ButtonJoin from "@/components/button-join";
import SocialNetwork from "@/components/social-network";


const Footer = () => {

    return (
       <PageContainer>
           <footer>
                <div className={"flex justify-center items-center py-8 gap-4"}>
                    <SocialNetwork />
                </div>


           </footer>
       </PageContainer>
    );
};

export default Footer;
