import {BASE_URL} from "@/services/constants";

const BOOK_URL = BASE_URL + "/api/v1/book-offer"

export async function getBooks (){
    const res = await fetch(`${BOOK_URL}/?size=35`)
    const books = await res.json()

    console.log(books);

    return books.map(book => ({
        ...book,
        photo: book.main_photo_url ? `${BASE_URL}${book.main_photo_url}` : "/images/fallback-image.png"
    })) || []
}

export async function getBookById (id){
    const res = await fetch(`${BOOK_URL}/${id}/`)
    const book = await res.json()

    book.photo = book.main_image_url ? `${BASE_URL}${book.main_image_url}` : "/images/fallback-image.png"
    
    return book || {}
}
export const addBook = async (formData) => {
    const response = await fetch('http://prod-team-16-qi3lk0el.REDACTED:8080/api/v1/book-offer', {
        method: 'POST',
        headers: {
            'accept': 'application/json',
        },
        body: formData
    });

    if (!response.ok) {
        throw new Error('Failed to submit form');
    }

    return response.json();
};
export const toggleFavorite = async (bookId) => {
    const response = await fetch(`http://prod-team-16-qi3lk0el.REDACTED:8080/api/v1/books/${bookId}/favorite`, {
        method: 'POST',
        headers: {
            'accept': 'application/json',
        }
    });

    if (!response.ok) {
        throw new Error('Failed to toggle favorite');
    }

    return response.json();
};