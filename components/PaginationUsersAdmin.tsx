import React from 'react';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination";



type Props = {
    currentPage: number;
    totalPages: number;
    handleNextPage: () => void;
    handlePreviousPage: () => void;
};

const PaginationUsersAdmin = ({ currentPage, totalPages, handleNextPage, handlePreviousPage }: Props) => (
    <Pagination>
        <PaginationContent>
            <PaginationItem className={"cursor-pointer"}>
                <PaginationPrevious onClick={handlePreviousPage} />
            </PaginationItem>
            {/* You can add additional logic here to dynamically generate page numbers */}
            {/* For simplicity, I'll just show next and previous buttons */}
            <PaginationItem className={"cursor-pointer"}>
                <PaginationNext onClick={handleNextPage} />
            </PaginationItem>
        </PaginationContent>
    </Pagination>
);

export default PaginationUsersAdmin;
