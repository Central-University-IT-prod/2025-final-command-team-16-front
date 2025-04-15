// src/components/BookReview.jsx
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { StarIcon } from "lucide-react";
import { addReview } from "@/services/review.service";
import toast from "react-hot-toast";

const BookReview = ({ bookId }) => {
    const [rating, setRating] = useState(0);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const onSubmit = (data) => {
        try {
            addReview({
                ...data,
                rating,
                bookId,
                userName: "Текущий пользователь" // В реальном приложении брать из контекста
            });

            toast.success("Ваш отзыв добавлен!");
            reset();
            setRating(0);
        } catch (error) {
            toast.error("Ошибка при добавлении отзыва");
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-6">
            <h3 className="text-xl font-bold">Оставить отзыв</h3>

            <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="focus:outline-none"
                    >
                        <StarIcon
                            className={`h-6 w-6 ${rating >= star ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
                        />
                    </button>
                ))}
            </div>

            <div className="space-y-2">
                <Label htmlFor="reviewText">Ваш отзыв</Label>
                <Textarea
                    {...register("reviewText", { required: true })}
                    id="reviewText"
                    rows={4}
                    className="min-h-[100px]"
                />
                {errors.reviewText && <span className="text-red-500">Обязательное поле</span>}
            </div>

            <Button type="submit">Отправить отзыв</Button>
        </form>
    );
};

export default BookReview;