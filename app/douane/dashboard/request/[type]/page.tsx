
"use client";
import React, {useEffect} from 'react';
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import {useUserRole} from "@/hooks/useUserRole";
import {ERole, requestWithUser} from "@/types";
import {useRequests} from "@/hooks/useRequests";
import TableRequestWL from "@/components/TableRequestwl";
import PaginationRequests from "@/components/PaginationRequests";
import { Input } from '@/components/ui/input';

const Page = ({params}: {params: {type: string}}) => {

    const {data: session, status} = useSession();
    const [currentPage, setCurrentPage] = React.useState(1);
    const [myRequests, setMyRequests] = React.useState<requestWithUser[]>([]);
    const router = useRouter()
    const {data: user, isFetching, error} = useUserRole(session?.user?.email as string);
    const {data: requests, isFetching: fetchingRequest, error: requestError} = useRequests(params.type);

    const startIndex = (currentPage - 1) * 10;
    const endIndex = startIndex + 10;
    const totalPages = Math.ceil(requests?.length / 10);

    useEffect(() => {
        setMyRequests(requests?.slice(startIndex, endIndex));
    }, [requests]);

    if (status === "unauthenticated") {
        return router.back();
    }


    if (user?.roleId !== ERole.ADMIN && user?.roleId !== ERole.DOUANIER) {
        return router.back();
    }


    if (isFetching || fetchingRequest) {
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
            setMyRequests(requests?.slice(startIndex, endIndex));
            return;
        }
        const filteredUsers = requests?.filter((req: requestWithUser) => {
            return req.userEmail?.toLowerCase().includes(value.toLowerCase());
        });
        setCurrentPage(1);
        setMyRequests(filteredUsers?.slice(startIndex, endIndex));
    };


    return (
        <>
            <Input onChange={handleFilterUsers} placeholder={"Rechercher un utilisateur par email"} />
            <TableRequestWL requests={myRequests} requestsLenght={myRequests?.length} type={params.type} />
            <PaginationRequests handleNextPage={handleNextPage} handlePreviousPage={handlePreviousPage} />
        </>
    );
};

export default Page;
