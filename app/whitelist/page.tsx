import React from 'react';
import PageContainer from "@/components/page-container";
import {Poppins} from 'next/font/google'

import FormWl from "@/components/form-wl";
const poppins = Poppins({weight: "900", subsets: ['latin']})
const Page = () => {



    return (
        <PageContainer>
            <div className={"py-28 flex flex-col items-center gap-4 "}>
                <h1 className={`text-center text-xl sm:text-3xl lg:text-5xl ${poppins.className}`}>Formulaire de whitelist</h1>
                <FormWl />
            </div>

        </PageContainer>
    );
};

export default Page;
