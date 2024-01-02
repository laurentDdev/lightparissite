"use client"
import {Card, CardContent} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger} from "@/components/ui/select";
import {Label} from "@/components/ui/label";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import {SyntheticEvent, useState} from "react";

type FormWl = {
    lastname?: string;
    firstname?: string;
    date?: string;
    job?: string;
    background?: string;
}

type view = "form" | "question"

const FormWl = () => {

    const [inputValue, setInputValue] = useState<FormWl>({})
    const [jobType, setJobType] = useState<string>("")
    const [view, setView] = useState<string>("form")
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue({...inputValue, [e.target.id]: e.target.value})
    }

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        console.log({...inputValue, jobType})
        setView("question")

    }

    if (view == "form") {
        return (
            <Card className={"2xl:mt-10 py-7 w-[90%] md:w-1/2"}>
                <CardContent>
                    <form action="" className={"flex flex-col gap-5"}>

                        <Input id={"lastname"} type={"text"} placeholder={"Nom rp"} onInput={handleChange} />

                        <Input id={"firstname"} type={"text"} placeholder={"Prénom rp"} onInput={handleChange} />
                        <Label htmlFor={"age"} >Date de naissance</Label>
                        <Input id={"age"} type={"date"} placeholder={"Date de naissance"} onInput={handleChange} />

                        <Input id={"job"} type={"text"} placeholder={"Job"} onInput={handleChange} />


                        <Select onValueChange={setJobType} >
                            <SelectTrigger>
                                <Label htmlFor={"job_type"} >{jobType.length > 0 ? jobType : "Type de job"}</Label>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value={"legal"}>legal</SelectItem>
                                <SelectItem value={"illegale"}>illegale</SelectItem>
                            </SelectContent>
                        </Select>

                        <Textarea id={"background"} placeholder={"background"} className={"resize-none"} rows={7} onInput={(e: any) => handleChange(e)}  />

                        <Button type={"submit"} onClick={handleSubmit} variant={"discord"}>Passer a l'étape suivante</Button>

                    </form>
                </CardContent>
            </Card>
        );
    }

    if (view === "question") {
        return (
            <div>
                <p>question</p>
            </div>
        )
    }
};

export default FormWl;
