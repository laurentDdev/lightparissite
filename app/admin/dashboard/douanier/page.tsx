"use client"
import React, { useEffect } from 'react';
import { useUserRole } from "@/hooks/useUserRole";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ERole, usersWithRoleAndTeam } from "@/types";
import { useUsers } from "@/hooks/useUsers";
import TableUsersAdmin from "@/components/TableUsersAdmin";
import PaginationUsersAdmin from "@/components/PaginationUsersAdmin";
import { Input } from "@/components/ui/input";
import TableDouanierAdmin from "@/components/TableDouanierAdmin";
import PaginationDouanierAdmin from "@/components/PaginationDouanierAdmin";
import {useUsersDouane} from "@/hooks/useUsersDouane";
import axios from "axios";
import {mutate} from "swr";
import {useToast} from "@/components/ui/use-toast";

const Page = () => {
    const { data: session, status } = useSession();
    const [currentPage, setCurrentPage] = React.useState(1);
    const [myUsers, setMyUsers] = React.useState<usersWithRoleAndTeam[]>([]);
    const router = useRouter();

    const { data: users, isFetching: userFetching, error: userError } = useUsersDouane();

    const {toast} = useToast();

    const startIndex = (currentPage - 1) * 10;
    const endIndex = startIndex + 10;
    const totalPages = Math.ceil(users?.length / 10);


    useEffect(() => {
        setMyUsers(users?.slice(startIndex, endIndex));
    }, [users, currentPage]);

    if (status === "unauthenticated") {
        return router.back();
    }

    const { data: user, isFetching, error } = useUserRole(session?.user?.email as string);

    if (user?.roleId !== ERole.ADMIN) {
        return router.back();
    }

    if (isFetching) {
        return <div>Chargement...</div>;
    }

    const handleNextPage = () => {
        if (currentPage === totalPages) return;
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const handlePreviousPage = () => {
        if (currentPage === 1) return;
        setCurrentPage((prevPage) => prevPage - 1);
    };

    const handleFilterUsers = (e: any) => {
        const value = e.target.value;
        if (value === "") {
            setCurrentPage(1);
            setMyUsers(users?.slice(startIndex, endIndex));
            return;
        }
        const filteredUsers = users?.filter((user: usersWithRoleAndTeam) => {
            return user.email?.toLowerCase().includes(value.toLowerCase());
        });
        setCurrentPage(1);
        setMyUsers(filteredUsers?.slice(startIndex, endIndex));
    };

    const handleDeleteDouanier = async (id: string) => {
        if (confirm("Etes vous sur de vouloir supprimer ce douanier ?")) {
            try {
                const {data} = await axios.put(`/api/users/roles/douane/${id}`)
                setMyUsers(myUsers.filter((user) => user.id !== id));
                toast({
                    title: "Succès",
                    description: "Le douanier a bien été supprimé",
                })
            }catch (e) {
                toast({
                    title: "Erreur",
                    description: "Une erreur est survenue",
                })
            }
        }
    }

    if (!userFetching) {
        return (
            <>
                <Input placeholder={"Rechercher un douanier par email"} onInput={handleFilterUsers} />
                <TableDouanierAdmin myUsers={myUsers} usersLength={users?.length} handleDeleteDouanier={handleDeleteDouanier} />
                <PaginationDouanierAdmin  handleNextPage={handleNextPage} handlePreviousPage={handlePreviousPage} />
            </>
        );
    }
};


export default Page
