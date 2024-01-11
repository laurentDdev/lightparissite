"use client"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { useRequestid } from '@/hooks/useRequestid';
import { useUserRole } from '@/hooks/useUserRole';
import { ERole, EState } from '@/types';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react';
import {requestWithUser} from "@/types";
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { useToast } from '@/components/ui/use-toast';

const Page = ({params}: {params: {id: string}}) => {

    const {data: session, status} = useSession();
    const {data: userRole, isFetching, error} = useUserRole(session?.user?.email as string);
    const {data: request, isFetching: fetchingRequest, error: requestError} = useRequestid(params.id);
    const router = useRouter()
    const { toast } = useToast()


    if (status === "unauthenticated") {
        return <div>Chargement...</div>;
    }

    if (isFetching || fetchingRequest) {
        return <div>Chargement...</div>;
    }

    if (userRole.roleId !== ERole.DOUANIER && userRole.roleId !== ERole.ADMIN) {
        return router.back();
    }


    const handleNextStep = () => {
        axios.put(`/api/request/view/${request?.id}`, {
            newState : EState.VALIDATED
        }).then(() => {
            toast({
                title: "Demande validé",
                description: "Merci d'avoir validé cette demande",
            })
            setTimeout(() => {
                router.back()
            }, 2000);
        }).catch((err) => {
            toast({
                title: "Une erreur est survenue",
                description: err,
            })
        })

        /// TODO : Add ping to discord for the user
    }

    const handleStopStep = () => {
        axios.put(`/api/request/view/${request?.id}`, {
            newState : EState.REFUSED
        }).then(() => {
            toast({
                title: "Demande refusé",
                description: "Merci d'avoir refusé cette demande",
            })
            setTimeout(() => {
                router.back()
            }, 2000);
        }).catch((err) => {
            toast({
                title: "Une erreur est survenue",
                description: err,
            })
        })
    }




    return (
        <Card className={"h-full"}>
            <CardHeader>
                <CardTitle>
                    Request : {request?.id} fait par {request?.user?.name}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Card>
                    <CardContent className='flex flex-col gap-2'>
                        <div className='mt-2 flex flex-col gap-2'>
                            <p>Nom rp: {request.lastName}</p>
                            <p>Prenom rp: {request.firstName}</p>
                        </div>
                        <Separator color='white' />
                        <div className='mt-2'>
                            <p>Née le : {request.date}</p>
                        </div>
                        <Separator color='white' />
                        <div className='mt-2 flex flex-col gap-2'>
                            <p>Type de job : {request.jobType}</p>
                            <p>Job souhaité : {request.job}</p>
                        </div>
                        <Separator color='white' />
                        <div className='mt-2'>
                            <Textarea value={request.background} contentEditable={false} />
                        </div>
                        <Separator color='white' />

                        <div className='flex gap-2 mt-2 justify-between'>
                            <Button variant={"ghost"} onClick={() => router.back() } >Retour</Button>
                            <div>
                            <Button variant={'outline'} onClick={handleNextStep}>Passez a l'entretien</Button>
                            <Button variant={'destructive'} onClick={handleStopStep} >Refuser la candidature</Button>
                            </div>
                        </div>

                    </CardContent>
                </Card>
            </CardContent>
        </Card>
    );
};

export default Page;
