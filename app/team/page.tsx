"use client"

import PageContainer from "@/components/page-container";
import CarouselTeam from "@/components/carousel-team";
import {useUsersTeam} from "@/hooks/useUsersTeam";
import {useEffect, useState} from "react";
import {usersWithTeam} from "@/types";
import {Skeleton} from "@/components/ui/skeleton";


const Page = () => {


    const {data: users, isFetching, error} = useUsersTeam()


    if (isFetching) {
        return (
            <PageContainer>
                <Skeleton  />
            </PageContainer>
        )
    }

    return (
        <PageContainer>
            <div className={"py-4 flex flex-col items-center justify-evenly h-[70vh]"}>
                {/* Utilisez les données récupérées */}
                <CarouselTeam users={users} />
            </div>
        </PageContainer>
    );
};

export default Page;
