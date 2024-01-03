"use client";
import React, { useEffect, useMemo, useCallback, useState } from 'react';
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

const Page = () => {
    const { data: session, status } = useSession();
    const [currentPage, setCurrentPage] = React.useState(1);
    const router = useRouter();

    const { data: users, isFetching: userFetching, error: userError } = useUsersDouane();
    const [filteredUsers, setFilteredUsers] = useState<usersWithRoleAndTeam[] | null>(null);

    const startIndex = useMemo(() => (currentPage - 1) * 10, [currentPage]);
    const endIndex = useMemo(() => startIndex + 10, [startIndex]);
    const totalPages = useMemo(() => Math.ceil((filteredUsers?.length || 0) / 10), [filteredUsers]);

    const myUsers = useMemo(() => filteredUsers?.slice(startIndex, endIndex) || [], [filteredUsers, startIndex, endIndex]);

    useEffect(() => {
        if (!users) return;
        setFilteredUsers(users);
    }, [users]);

    const { data: user, isFetching, error } = useUserRole(session?.user?.email as string);

    const handleNextPage = useCallback(() => {
        if (currentPage === totalPages) return;
        setCurrentPage((prevPage) => prevPage + 1);
    }, [currentPage, totalPages]);

    const handlePreviousPage = useCallback(() => {
        if (currentPage === 1) return;
        setCurrentPage((prevPage) => prevPage - 1);
    }, [currentPage]);

    const handleFilterUsers = useCallback((e: any) => {
        const value = e.target.value;
        setCurrentPage(1);

        if (!users) return;

        const filteredUsers = users.filter((user: usersWithRoleAndTeam) => {
            return user.email?.toLowerCase().includes(value.toLowerCase());
        });

        setFilteredUsers(filteredUsers);
    }, [users]);

    if (status === "unauthenticated") {
        return router.back();
    }

    if (user?.roleId !== ERole.ADMIN) {
        return router.back();
    }

    if (isFetching) {
        return <div>Chargement...</div>;
    }

    return (
        <>
            <Input placeholder={"Rechercher un douanier par email"} onInput={handleFilterUsers} />
            <TableDouanierAdmin myUsers={myUsers} usersLength={filteredUsers?.length || 0} />
            <PaginationDouanierAdmin handleNextPage={handleNextPage} handlePreviousPage={handlePreviousPage} />
        </>
    );
};

export default Page;
