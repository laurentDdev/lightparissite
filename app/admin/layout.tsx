
import React from 'react';
import {Metadata} from "next";

import AdminNavigation from "@/components/admin-navigation";
import PageContainer from "@/components/page-container";



export const metadata: Metadata = {
    title: 'Light Paris Rp [ Dashboard',
    description: 'Light Paris Rp [ Dashboard',
}



const Layout = ({children}: {children: React.ReactNode}) => {
    return <PageContainer>
        <div className={"flex items-start gap-3 w-full  mt-10 "}>
            <AdminNavigation />
            <div className={"flex-grow"}>
                {children}
            </div>
        </div>
    </PageContainer>
};

export default Layout;
