"use client"
import {useQuery} from "@tanstack/react-query";
import Loading from "@/app/loading";
import { getBooks } from "@/services/book.service";
import BookList from "@/components/BookList";
import BookRequestForm from "@/components/BookRequestForm";
import BookReview from "@/components/BookReview";

export default function Home() {
    const {isLoading, data: books, error} = useQuery({
        queryKey: ['books'],
        queryFn: getBooks
    })
    if (isLoading) return <Loading/>
    if (books.length === 0) return <p className={'text-center text-xl'}>Книги не найдены</p>
    const trends = books.slice(0, 5)
    return (
        <div className={'my-8'}>
            <BookList heading={"Сейчас популярно"} books={trends}/>
            <BookList heading={"Рекомендации"} books={books}/>
        </div>
    )
}
