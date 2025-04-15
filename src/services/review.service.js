// src/services/review.service.js
// Поскольку API для отзывов отсутствует, храним данные в localStorage

export function addReview(reviewData) {
    const reviews = JSON.parse(localStorage.getItem('bookReviews') || '[]');
    const newReview = {
        id: Date.now(),
        date: new Date(),
        ...reviewData
    };

    reviews.push(newReview);
    localStorage.setItem('bookReviews', JSON.stringify(reviews));

    return newReview;
}

export function getBookReviews(bookId) {
    const reviews = JSON.parse(localStorage.getItem('bookReviews') || '[]');
    return reviews.filter(review => review.bookId === bookId);
}