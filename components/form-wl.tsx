"use client"
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger} from "@/components/ui/select";
import {Label} from "@/components/ui/label";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import {SyntheticEvent, useState} from "react";
import {Question, Questions} from "@/questions";

type FormWl = {
    lastname: string;
    firstname: string;
    date: string;
    job: string;
    background: string;
}

type view = "form" | "question"

const question : Question[] = Questions;

const FormWl = () => {

    const [inputValue, setInputValue] = useState<FormWl>({
        lastname: "",
        firstname: "",
        age: "",
        job: "",
        background: ""
    })
    const [jobType, setJobType] = useState<string>("")
    const [view, setView] = useState<string>("form")

    const [answers, setAnswers] = useState<string[]>([])
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue({...inputValue, [e.target.id]: e.target.value})
    }

    const handleAnswer = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAnswers([...answers, e.target.id])
    }

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        console.log("enterd")
        const inputs = {...inputValue, jobType}

        console.log(inputs)

        if (inputs.lastname === "" || inputs.firstname === "" || inputs.date === "" || inputs.job === "" || inputs.background === "" || inputs.jobType === "")  return

        if (inputs.lastname?.length < 3 || inputs.firstname?.length < 3 || inputs.job?.length < 3 || inputs.background?.length < 30) return

        console.log("test")
        setView("question")

    }

    const handleConfirm = (e: SyntheticEvent) => {
        e.preventDefault()
        console.log(answers)
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
                            <SelectContent defaultValue={"legal"}>
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
            <Card>
                <CardHeader>
                    <h1 className={"text-xl"}>Questionnaire</h1>
                </CardHeader>
                <CardContent>
                    <form action="" className={"flex flex-col gap-5"}>
                        {
                            question.map((q: Question, index) => (
                                <div key={index} className={"flex flex-col gap-3"}>
                                    <Label >{q.question}</Label>
                                    {
                                        q.options.map((option: string, index) => (
                                            <div className={"flex gap-2"}>
                                                <input onInput={handleAnswer} type="radio" name={q.question} id={option} key={index} />
                                                <label htmlFor={option}>{option}</label>
                                            </div>
                                        ))
                                    }
                                </div>
                            ))
                        }
                        <Button type={"submit"} variant={"discord"} onClick={handleConfirm}>Envoyer</Button>
                    </form>
                    </CardContent>
            </Card>
        )
    }
};

export default FormWl;
