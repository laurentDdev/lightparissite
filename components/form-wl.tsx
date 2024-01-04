"use client"
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger} from "@/components/ui/select";
import {Label} from "@/components/ui/label";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import {SyntheticEvent, useState} from "react";
import {Question, Questions} from "@/questions";
import {useToast} from "@/components/ui/use-toast";
import axios from "axios";
import {mutate} from "swr";
import {useRouter} from "next/navigation";

type FormWl = {
    lastname: string;
    firstname: string;
    age: string;
    job: string;
    background: string;
}

type view = "form" | "question"

const question : Question[] = Questions;

type Answer = {
    id: string;
    answer: string;
}

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
    const router = useRouter()


    const { toast } = useToast()

    const [answers, setAnswers] = useState<Answer[]>([])
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue({...inputValue, [e.target.id]: e.target.value})
    }

    const handleAnswer = (e: React.ChangeEvent<HTMLInputElement>) => {
        const questionId = e.target.name;
        const answer = e.target.value;


        if (answers.find((ans) => ans.id === questionId)) {
            const newAnswers = answers.filter((ans) => ans.id !== questionId);
            setAnswers([...newAnswers, { id: questionId, answer: answer }]);
        } else {
            const answerObject = {
                id: questionId,
                answer: answer
            };
            setAnswers(prevState => [...prevState, answerObject]);
        }

    };

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        console.log("enterd")
        const inputs = {...inputValue, jobType}

        console.log(inputs)

        if (inputs.lastname === "" || inputs.firstname === "" || inputs.age === "" || inputs.job === "" || inputs.background === "" || inputs.jobType === "")  return toast({
            title: "Erreur",
            description: "Veuillez remplir correctement le formulaire"
        })

        if (inputs.lastname?.length < 3 || inputs.firstname?.length < 3 || inputs.job?.length < 3 || inputs.background?.length < 30) return toast({
            title: "Erreur",
            description: "Veuillez remplir correctement le formulaire"
        })

        setView("question")

    }

    const handleConfirm = async (e: SyntheticEvent) => {
        e.preventDefault()
        if (answers.length < Questions.length) {
            toast({
                title: "Erreur",
                description: "Vous n'avez pas répondu a toutes les questions"
            })
            return
        }

        let goodAnswers = 1;

        answers.forEach((answer) => {
            const question = Questions.find((q) => q.question === answer.id);
            if (question?.answer === answer.answer) {
                goodAnswers++;
            }
        });
        const inputs = {...inputValue, jobType}
        const response = await axios.post('/api/users/requestwl', {goodAnswers, inputs})
        console.log(response.data)

        if (response.data.status === 200) {
            toast({
                title: "Demande envoyée",
                description: "Votre demande a bien été envoyée"
            })
            setTimeout(() => {
                router.push("/")
            }, 2000)
        }

        if (response.data.status === 403 && response.data.message === "You have already made 3 requests") {
            toast({
                title: "Erreur",
                description: "Vous avez déjà fait 3 demandes, veuillez contacter un staff"
            })
            setTimeout(() => {
                router.push("/")
            }, 3000)
        }

        if (response.data.status === 403 && response.data.message === "Your request is already pending or validated") {
            toast({
                title: "Erreur",
                description: "Votre demande est déjà en attente ou validée"
            })
            setTimeout(() => {
                router.push("/")
            }, 3000)
        }

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

                        <Textarea id={"background"} placeholder={"background"} className={"resize-none"} rows={5} onInput={(e: any) => handleChange(e)}  />

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
                                                <input onChange={handleAnswer} type="radio" value={option} name={q.question} id={q.question} key={index} />
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
