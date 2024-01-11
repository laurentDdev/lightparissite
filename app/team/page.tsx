"use client"

import PageContainer from "@/components/page-container";
import CarouselTeam from "@/components/carousel-team";
import {useUsersTeam} from "@/hooks/useUsersTeam";
import {Skeleton} from "@/components/ui/skeleton";
import {Poppins} from 'next/font/google'
const poppins = Poppins({weight: "900", subsets: ['latin']})

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
                <h1 className={`text-center text-7xl ${poppins.className}`}>Notre équipe</h1>
                <CarouselTeam users={users} />
            </div>
        </PageContainer>
    );
};

export default Page;
