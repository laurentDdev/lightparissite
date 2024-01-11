import React from 'react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import {EState, requestWithUser, usersWithRoleAndTeam} from "@/types";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import ButtonJoin from "@/components/button-join";

const TableRequestWL = ({requests, requestsLenght, type}: {requests: requestWithUser[], requestsLenght: number, type: string}) => {

    const router = useRouter();

    return (
        <Table>
            <TableCaption>Liste des demandes en attente</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Id</TableHead>
                    <TableHead>Nom rp</TableHead>
                    <TableHead>Prenom rp</TableHead>
                    <TableHead>Type de job</TableHead>
                    <TableHead>Fait par</TableHead>
                    <TableHead>Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {requests?.map((request, index) => (
                    <TableRow key={index}>
                        <TableCell>{request.id}</TableCell>
                        <TableCell>{request.lastName}</TableCell>
                        <TableCell>{request.fistName}</TableCell>
                        <TableCell>{request.jobType}</TableCell>
                        <TableCell>{request.user.name}</TableCell>
                        <TableCell>
                            {
                                type == EState.PENDING ? (
                                    <ButtonJoin url={`/douane/dashboard/request/view/${request.id}`} variant={"destructive"} inSite={true} >
                                Voir
                            </ButtonJoin>
                                ) : type == EState.VALIDATED ? (
                                    <div className='flex gap-2'>
                                        <Button variant={'outline'}>Accepter la whitelist</Button>
                                        <Button variant={'destructive'}>Refuser la whitelist</Button>
                                    </div>
                                ) : (
                                    <p>Aucune action possible</p>
                                )
                            }
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={5}>Nombre de demande</TableCell>
                    <TableCell>{requestsLenght}</TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    );
};

export default TableRequestWL;