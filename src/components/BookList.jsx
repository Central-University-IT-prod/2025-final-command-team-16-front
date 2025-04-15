import React from 'react';
import Link from "next/link";
import BookItem from "@/components/BookItem";

const BookList = ({heading, books}) => {
    return (
        <div className="px-4">
            <h2 className={'text-2xl font-bold mb-4'}>{heading}</h2>
            <ul className={'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'}>
                {books.map(book => (
                    <Link href={book.id.toString()} className={'flex'} key={book.id}>
                        <BookItem book={book}/>
                    </Link>
                ))}
            </ul>
        </div>
    );
};

export default BookList;