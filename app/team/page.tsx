"use client"
import PageContainer from "@/components/page-container";
import {useUsersTeam} from "@/hooks/useUsersTeam";
import {usersWithTeam} from "@/types";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel";
import {
    Card,
    CardContent, CardHeader, CardTitle,
} from "@/components/ui/card"

import {Poppins} from 'next/font/google'
const poppins = Poppins({weight: "900", subsets: ['latin']})
const smallPoppins = Poppins({weight: "400", subsets: ['latin']})
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import {useRef} from "react";
const Page = () => {

    const {data: users, isFetching, error} = useUsersTeam()
    const plugin = useRef(
        Autoplay({ delay: 2000, stopOnInteraction: true })
    )
    return (
        <PageContainer>
            <div className={"py-4 flex flex-col items-center justify-evenly h-[70vh]"}>
                {!isFetching && users.filter((user: usersWithTeam) => user.team?.name !== "aucune").length > 0 ? (
                    <>
                    <h1 className={`text-center text-4xl lg:text-7xl ${poppins.className}`}>Notre équipe</h1>
                            <Carousel
                                plugins={[plugin.current]}
                                opts={{
                                    align: "center",
                                }}
                                className="w-full max-w-[300px] md:max-w-3xl"
                            >
                                <CarouselContent>
                                    {
                                        !isFetching && users?.filter((user: usersWithTeam) => user.teamId != null).map((user: usersWithTeam) => {
                                            return (
                                                    <CarouselItem key={user.id} className="md:basis-1/2 lg:basis-1/3">
                                                        <div className="p-1">
                                                            <Card>
                                                                <CardHeader>
                                                                    <CardTitle>
                                                                        <h1 className={`${poppins.className} text-center`}>{user.team?.name}</h1>
                                                                    </CardTitle>
                                                                </CardHeader>
                                                                <CardContent className="flex flex-col gap-3 aspect-square items-center justify-center p-6">
                                                                    <Image className={"rounded-full"} src={user.image as string} alt={user.name as string} width={150} height={150} />
                                                                    <p className={`text-xl ${smallPoppins.className}`}>{user.name}</p>
                                                                </CardContent>
                                                            </Card>

                                                        </div>
                                                    </CarouselItem>
                                            )
                                        })
                                    }

                                </CarouselContent>
                                <CarouselPrevious />
                                <CarouselNext />
                            </Carousel>
                            </>
                ) : (<p className="text-xl text-slay-500">Bizarre on dirais que l'équipe est vide ...</p>)}
            </div>
        </PageContainer>
    );
};

export default Page;''
