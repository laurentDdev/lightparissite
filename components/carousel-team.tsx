"use client"
import React, {useEffect, useRef, useState} from 'react';
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel";
import {usersWithTeam} from "@/types";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import {Poppins} from 'next/font/google'
const poppins = Poppins({weight: "900", subsets: ['latin']})
const smallPoppins = Poppins({weight: "400", subsets: ['latin']})
const CarouselTeam = ({users}: {users: usersWithTeam[]}) => {



    // const [users, setUsers] = useState<usersWithTeam[]>([])
    //
    //
    // useEffect(() => {
    //     fetch("/api/users/team", {cache: 'no-store', next: {revalidate: 5}}).then(res => res.json()).then((data) => {
    //         console.log(data)
    //         setUsers(data)
    //     })
    //
    // }, []);

    const plugin = useRef(
        Autoplay({ delay: 2000, stopOnInteraction: true })
    )

    if (users?.length < 0) {
        return <p>Il semblerai que l'équipe soit vide </p>
    }

    return (
        <Carousel
            plugins={[plugin.current]}
            opts={{
                align: "center",
            }}
            className="w-full max-w-[300px] md:max-w-3xl"
        >
            <CarouselContent>
                {
                    users?.length > 0 && users?.filter((user: usersWithTeam) => user.teamId !== null && user.team?.name != "aucune").map((user: usersWithTeam) => {
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
    );
};

export default CarouselTeam;
