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

const TableUsersAdmin = ({myUsers, usersLength}: {myUsers: usersWithRoleAndTeam[], usersLength: number}) => {
    return (
        <Table>
            <TableCaption>Liste de vos utilisateurs</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Id</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Nom</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Team</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {myUsers?.map((user, index) => (
                    <TableRow key={index}>
                        <TableCell>{user.id}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.role?.name}</TableCell>
                        <TableCell>{user.team?.name ? user.team.name : "Aucune team"}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={4}>Nombre d'utilisateur</TableCell>
                    <TableCell>{usersLength}</TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    );
};

export default TableUsersAdmin;