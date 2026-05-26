export type Book = {
    id: string;
    title: string;
    author: string;
    publisher: string;
    category: string;
    quantity: number;
    isbn: string;
    publicationYear: number;
    stock: number;
};

export type User = {
    id: string;
    username: string;
    password: string;
    role: "ADMIN" | "STAFF" | "USER";
};

export type Rental = {
    id: string;
    userId: string;
    bookId: string;
    rentedDate: number;
    dueDate: number;
    returnDate: number;
};

export type ApiResponse<T> = {
    data: T;
    message: string;
    success: boolean;
};

export type BookInput = Omit<Book, 'id'>