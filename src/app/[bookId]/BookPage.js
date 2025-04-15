// src/app/[bookId]/BookPage.js - обновленный компонент
import React from "react";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import BookRequestForm from "@/components/BookRequestForm";
import ReviewList from "@/components/ReviewList";
import BookReview from "@/components/BookReview";
import { sendBookRequest } from "@/services/request.service";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogTitle,
} from "@/components/ui/dialog";
import {BASE_URL} from "@/services/constants";

export default function BookPage({ book }) {
    const altText = book?.name || "Book Cover";

    const handleRequestSubmit = async (requestData) => {
        try {
            await sendBookRequest(requestData);
            toast.success("Запрос успешно отправлен!");
        } catch (error) {
            toast.error("Ошибка при отправке запроса");
        }
    };

    return (
        <>
            <div className="flex flex-col md:flex-row justify-center mt-8 gap-x-12">
                <div>
                    <div className="relative w-full md:w-[400px] h-[500px] md:h-[700px]">
                        <Image
                            src={`${BASE_URL}${book.main_photo_url}`}
                            fill
                            className="object-cover"
                            alt={altText}
                        />

                    </div>
                    <Button
                        className={'w-full mt-5 text-amber-400 bg-transparent border-2 border-amber-400 hover:bg-amber-400 hover:text-white'}>В
                        избранное</Button>

                </div>

                <div className="flex flex-col gap-8 mt-6 md:mt-0">
                    <div className="flex flex-col gap-4">
                        <h2 className="text-4xl font-semibold">{book?.name}</h2>
                        <p className="text-lg max-w-2xl text-foreground">{book?.description}</p>
                    </div>
                    <ul className="space-y-3 text-lg">
                        <li>Автор: {book?.author}</li>
                        <li><span className="text-foreground">Жанр: {book?.genre}</span></li>
                        <li><span className="text-foreground">Язык: {book?.language}</span></li>
                        <li><span className="text-foreground">Год выпуска: {book?.year}</span></li>
                        <li><span className="text-foreground">Издатель: {book?.publisher}</span></li>
                        <li><span className="text-foreground">Переплёт: {book?.binding}</span></li>
                        {book?.pages &&
                            <li><span className="text-foreground">Количество страниц: {book?.pages}</span></li>}
                        {book?.condition && <li><span className="text-foreground">Состояние: {
                            {
                                'new': 'Новая',
                                'good': 'Хорошая',
                                'damaged': 'С небольшими повреждениями'
                            }[book.condition] || book.condition
                        }</span></li>}
                    </ul>
                    <p><MapPin className="inline translate-y-[-3px]"/> {book?.point_city}. {book?.point_place}</p>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button>Запросить книгу</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogTitle>Запрос на книгу</DialogTitle>
                            <BookRequestForm bookId={book.id} onRequestSubmit={handleRequestSubmit}/>
                        </DialogContent>
                    </Dialog>


                </div>

            </div>
            <div >
                <div className={'space-y-10'}>
                    <BookReview bookId={book.id}/>
                    <ReviewList bookId={book.id}/>
                </div>
            </div>
        </>

    );
}