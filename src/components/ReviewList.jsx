import React, { useState, useEffect } from 'react';
import { StarIcon } from "lucide-react";
import { getBookReviews } from "@/services/review.service";

const ReviewList = ({ bookId }) => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        setReviews(getBookReviews(bookId));
    }, [bookId]);

    if (!reviews || reviews.length === 0) {
        return <p className="text-muted-foreground">Отзывов пока нет</p>;
    }

    return (
        <div className="space-y-4">
            <h3 className="text-xl font-bold">Отзывы читателей</h3>
            {reviews.map((review, index) => (
                <div key={`review-${index}-${review.userName}-${review.date}`} className="border rounded-lg p-4">
                    <div className="flex items-center mb-2">
                        <div className="flex space-x-1 mr-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <StarIcon
                                    key={`star-${index}-${star}`}
                                    className={`h-4 w-4 ${review.rating >= star ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
                                />
                            ))}
                        </div>
                        <span className="text-sm text-muted-foreground">
                {new Date(review.date).toLocaleDateString()}
            </span>
                    </div>
                    <p>{review.reviewText}</p>
                    <p className="text-sm font-medium mt-1">{review.userName}</p>
                </div>
            ))}

        </div>
    );
};

export default ReviewList;
