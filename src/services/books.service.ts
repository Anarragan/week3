import { Book, type BookCreationAttributes } from "../models/books.js";

export const getBooksService = async (): Promise<Book[]> => {
  return await Book.findAll();
}

export const getBookByIdService = async (id: number): Promise<Book | null> => {
  return await Book.findByPk(id);
}

export const addBookService = async (newBook: BookCreationAttributes): Promise<Book> => {
  return await Book.create(newBook);
}

export const deleteBookService = async (id: number): Promise<boolean> => {
  const book = await Book.findByPk(id);
  if (!book) {
    return false;
  }
  await book.destroy();
  return true;
}

export const updateBookService = async (id: number, updatedBook: Partial<BookCreationAttributes>): Promise<Book | null> => {
  const book = await Book.findByPk(id);
  if (!book) {
    return null;
  }
  await book.update(updatedBook);
  return book;
}