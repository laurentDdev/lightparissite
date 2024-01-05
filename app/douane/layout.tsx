
import React from 'react';
import {Metadata} from "next";
import PageContainer from "@/components/page-container";
import DouaneNavigation from "@/components/douane-navigation";



export const metadata: Metadata = {
    title: 'Light Paris Rp [ Douane',
    description: 'Light Paris Rp [ Douane',
}



const Layout = ({children}: {children: React.ReactNode}) => {
    return <PageContainer>
        <div className={"flex items-start gap-3 w-full  mt-10 "}>
            <DouaneNavigation />
            <div className={"flex-grow"}>
                {children}
            </div>
        </div>
    </PageContainer>
};

export default Layout;
