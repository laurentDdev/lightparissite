"use client"
import {Button} from "@/components/ui/button";
import {Poppins} from 'next/font/google'
const poppins = Poppins({weight: "900", subsets: ['latin']})
const ButtonJoin = ({variant,url, children}: {url: string, children: React.ReactNode, variant: any}) => {

    const handleJoin = () => {
        window.open(url, "_blank")
    }

    return (
        <Button accessKey={"test"} variant={variant} onClick={handleJoin}>
            {children}
        </Button>
    );
};

export default ButtonJoin;
