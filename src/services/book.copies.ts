import { BookCopy, type IBookCopyAdd } from "../models/book_copies.js";

export const getBookCopiesService = async (): Promise<BookCopy[]> => {
    return await BookCopy.findAll({ logging: console.log });
};

export const getBookCopyByIdService = async (id: number): Promise<BookCopy | null> => {
    return await BookCopy.findByPk(id);
};

export const addBookCopyService = async (newBookCopy: IBookCopyAdd): Promise<BookCopy> => {
    return await BookCopy.create(newBookCopy);
};

export const deleteBookCopyService = async (id: number): Promise<boolean> => {
    const bookCopy = await BookCopy.findByPk(id);
    if (!bookCopy) {
        return false;
    }
    await bookCopy.destroy();
    return true;
};

export const updateBookCopyService = async (id: number, updatedBookCopy: Partial<IBookCopyAdd>): Promise<BookCopy | null> => {
    const bookCopy = await BookCopy.findByPk(id);
    if (!bookCopy) {
        return null;
    }
    await bookCopy.update(updatedBookCopy);
    return bookCopy;
};