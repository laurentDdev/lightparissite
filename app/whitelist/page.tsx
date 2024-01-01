import React from 'react';
import PageContainer from "@/components/page-container";
import {Poppins} from 'next/font/google'
import {Card, CardContent} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Select, SelectContent, SelectItem, SelectTrigger} from "@/components/ui/select";
import {Button} from "@/components/ui/button";
const poppins = Poppins({weight: "900", subsets: ['latin']})
const Page = () => {
    return (
        <PageContainer>
            <div className={"py-4 flex flex-col items-center gap-4 h-[70%] "}>
                <h1 className={`text-center text-xl sm:text-3xl lg:text-5xl ${poppins.className}`}>Formulaire de whitelist</h1>
                <Card className={"mt-10 py-7 w-[90%] md:w-1/2 "}>
                    <CardContent>
                        <form action="" className={"flex flex-col gap-5"}>

                            <Input id={"lastname"} type={"text"} placeholder={"Nom rp"} />

                            <Input id={"firstname"} type={"text"} placeholder={"Prénom rp"} />
                            <Input id={"age"} type={"date"} placeholder={"Date de naissance"} />

                            <Input id={"job"} type={"text"} placeholder={"Job"} />


                            <Select>
                                <SelectTrigger>
                                    <Label htmlFor={"job_type"} >Type de job</Label>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value={"legal"}>legal</SelectItem>
                                    <SelectItem value={"illegale"}>illegale</SelectItem>
                                </SelectContent>
                            </Select>

                            <Textarea id={"background"} placeholder={"background"} className={"resize-none"} rows={7}  />

                            <Button variant={"discord"}>Passer a l'étape suivante</Button>

                        </form>
                    </CardContent>
                </Card>
            </div>

        </PageContainer>
    );
};

export default Page;
