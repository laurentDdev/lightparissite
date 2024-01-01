"use client"
import {Button} from "@/components/ui/button";
import {Poppins} from 'next/font/google'
import {useRouter} from "next/navigation";
const poppins = Poppins({weight: "900", subsets: ['latin']})
const ButtonJoin = ({variant,url,inSite = false, children}: {url: string, inSite? : boolean,children: React.ReactNode, variant: any}) => {

    const router = useRouter()

    const handleJoin = () => {
        window.open(url, "_blank")
    }

    const handleSwitchRoute = () => {
        router.push(url)
    }

    return (
        <Button accessKey={"test"} variant={variant} onClick={inSite ? handleSwitchRoute : handleJoin}>
            {children}
        </Button>
    );
};

export default ButtonJoin;
