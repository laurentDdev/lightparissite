import React from 'react';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination";



type Props = {
    handleNextPage: () => void;
    handlePreviousPage: () => void;
};

const PaginationUsersAdmin = ({ handleNextPage, handlePreviousPage }: Props) => (
    <Pagination>
        <PaginationContent>
            <PaginationItem className={"cursor-pointer"}>
                <PaginationPrevious onClick={handlePreviousPage} />
            </PaginationItem>
            <PaginationItem className={"cursor-pointer"}>
                <PaginationNext onClick={handleNextPage} />
            </PaginationItem>
        </PaginationContent>
    </Pagination>
);

export default PaginationUsersAdmin;
