"use client";

import {useSession} from "next-auth/react";

const PageContainer = ({children}: {children: React.ReactNode}) => {

    const {data: session, status} = useSession();

    if (status !== "loading") {
        return (
            <div className={'mx-auto w-full max-w-7xl'}>
                {children}
            </div>
        );
    }
};

export default PageContainer;
