"use client"
import PageContainer from "@/components/page-container";
import {useUsersTeam} from "@/hooks/useUsersTeam";
import {usersWithTeam} from "@/types";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel";
import {
    Card,
    CardContent, CardHeader, CardTitle,
} from "@/components/ui/card"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import Image from "next/image";
const Page = () => {

    const {data: users, isFetching, error} = useUsersTeam()

    return (
        <PageContainer>
            <div className={"py-4 flex flex-col items-center justify-evenly h-[70vh]"}>
                <h1 className={"text-center text-4xl"}>Notre équipe</h1>
                            <Carousel
                                opts={{
                                    align: "center",
                                }}
                                className="w-full max-w-sm"
                            >
                                <CarouselContent>
                                    {
                                        !isFetching && users?.map((user: usersWithTeam) => {
                                            return (
                                                <CarouselItem key={user.id} className="md:basis-1/2 lg:basis-1/3">
                                                    <div className="p-1">
                                                        <Card className={"min-w-min"}>
                                                            <CardHeader>
                                                                <CardTitle>
                                                                    {user.team.name}
                                                                </CardTitle>
                                                            </CardHeader>
                                                            <CardContent className="flex flex-col gap-3 aspect-square items-center justify-center p-6">
                                                                <Image className={"rounded-full"} src={user.image} alt={user.name} width={100} height={100} />
                                                                <p className={"text-xl"}>{user.name}</p>
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
            </div>
        </PageContainer>
    );
};

export default Page;
