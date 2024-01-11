import React from 'react';
import PageContainer from "@/components/page-container";


import FormWl from "@/components/form-wl";
import {getAuthSession} from "@/lib/auth-options";
import ButtonJoin from "@/components/button-join";
import {Poppins} from 'next/font/google'
const poppins = Poppins({weight: "900", subsets: ['latin']})
const Page = async () => {

    const session = await getAuthSession()


    if (!session) {
        return (
            <PageContainer>
                <div className={"flex flex-col justify-center items-center py-20"}>
                    <p>Oupss il s'emblerait que vous ne soyez pas connecter</p>
                    <ButtonJoin url={'/'} variant={"ghost"} inSite={true}>
                        <p className={`${poppins.className} text-xl md:text-2xl w-full`}>Retour à l'accueil</p>
                    </ButtonJoin>
                </div>
            </PageContainer>
        )
    }


    return (
        <PageContainer>
            <div className={"py-20 flex flex-col items-center"}>
                <h1 className={`text-center text-xl sm:text-3xl lg:text-5xl ${poppins.className}`}>Formulaire de whitelist</h1>
                <FormWl />
            </div>

        </PageContainer>
    );
};

export default Page;
