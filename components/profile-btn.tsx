"use client"




import {signIn, signOut, useSession} from "next-auth/react";

import {Poppins} from 'next/font/google'
import ButtonLogin from "./btn-login";
import ProfileMenu from "./profile-menu";
const poppins = Poppins({weight: "900", subsets: ['latin']})
const ProfileBtn = () => {

    const {data: session, status} = useSession();
  
   

    if (status === "unauthenticated") {
        return (
            <ButtonLogin />
        )
    }



   

    if (status === "authenticated") {

        return (
           <ProfileMenu email={session.user?.email as string} name={session.user?.name as string} image={session.user?.image as string} />
        );
    }
};

export default ProfileBtn;
