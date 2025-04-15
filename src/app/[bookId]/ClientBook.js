"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/app/loading";
import BookPage from "@/app/[bookId]/BookPage";
import { getBookById } from "@/services/book.service";

const ClientBook = ({ bookId }) => {
    const { isLoading, data: book, error } = useQuery({
        queryKey: ["book", bookId],
        queryFn: () => getBookById(bookId)
    });

    if (isLoading) return <Loading />;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <BookPage book={book} />
    );
};

export default ClientBook;
