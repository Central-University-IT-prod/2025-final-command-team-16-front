"use client"
import Image from "next/image"
import {MapPin} from "lucide-react";
import React from "react";
import {toggleFavorite} from "@/services/book.service";
import {useMutation, useQueryClient} from "@tanstack/react-query";

export default function BookItem({ book }) {
    const queryClient = useQueryClient();

    const favoritesMutation = useMutation({
        mutationFn: toggleFavorite,
        onSuccess: () => {
            queryClient.invalidateQueries(['books']);
        }
    });
    return (
        <div className='p-4 rounded-md transition-transform transform hover:scale-105 h-full flex flex-col '>

            <div className="relative w-[200px] h-[300px]">
                <Image
                    src={book.photo}
                    fill
                    className="object-cover rounded-lg"
                    alt={book.name}
                />
            </div>
            <div className="flex flex-col flex-grow">
                <h3 className="mt-2 text-lg font-semibold">{book.name}</h3>
                <p className="text-md">{book.author}</p>
                <p className="text-sm mt-auto"><MapPin
                    className={'inline text-sm translate-y-[-3px]'}/> {book.point_city}. {book.point_place}</p>
            </div>
        </div>
    )
}
