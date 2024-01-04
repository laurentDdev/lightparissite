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
import {usersWithRoleAndTeam} from "@/types";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import ButtonJoin from "@/components/button-join";
import axios from "axios";
import {mutate} from "swr";

const TableDouanierAdmin = ({myUsers, usersLength, handleDeleteDouanier}: {myUsers: usersWithRoleAndTeam[], usersLength: number, handleDeleteDouanier:  (id: string) => void}) => {

    const router = useRouter();





    return (
        <Table>
            <TableCaption>Liste de vos douanier</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Id</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Nom</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Team</TableHead>
                    <TableHead>Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {myUsers?.map((user, index) => (
                    <TableRow key={index}>
                        <TableCell>{user.id}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.roleId}</TableCell>
                        <TableCell>{user.team?.name ? user.team.name : "Aucune team"}</TableCell>
                        <TableCell>
                            <Button variant={"destructive"} onClick={() => handleDeleteDouanier(user.id)} >
                                Supprimer le douanier
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={5}>Nombre de douanier</TableCell>
                    <TableCell>{usersLength}</TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    );
};

export default TableDouanierAdmin;
