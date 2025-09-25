import type {IBook} from "../interfaces/book.interface.js";
import { promises as fs } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const booksFilePath = join(__dirname, '../models/books.json');

export const getBooksService = async (): Promise<IBook[]> => {
    const data = await fs.readFile(booksFilePath, 'utf-8');
    return JSON.parse(data) as IBook[];
}

export const getBookByIdService = async (id: string): Promise<IBook | null> => {
  const data = await fs.readFile(booksFilePath, "utf-8")
  const books = JSON.parse(data) as IBook[]

  return books.find((book) => book.id === id) || null
}

export const addBookService = async (newBook: IBook): Promise<IBook> => {
  const data = await fs.readFile(booksFilePath, "utf-8")
  const books: IBook[] = JSON.parse(data)
  books.push(newBook)
  await fs.writeFile(booksFilePath, JSON.stringify(books, null, 2))

  return newBook
}

export const deleteBookService = async (id: string): Promise<boolean> => {
  const file = await fs.readFile(booksFilePath, "utf-8")
  const books: IBook[] = JSON.parse(file)
  const index = books.findIndex((book) => book.id === id)

  if(index === -1) {
    return false
  }

  books.splice(index, 1)
  await fs.writeFile(booksFilePath, JSON.stringify(books, null, 2))
  return true
}

export const updateBookService = async (id: string, updatedBook: Partial<IBook>): Promise<IBook | null> => {
  const file = await fs.readFile(booksFilePath, "utf-8")
  const books: IBook[] = JSON.parse(file)
  const index = books.findIndex((book) => book.id === id)

  if(index === -1) {
    return null
  }

  const existingBook = books[index];
  if (!existingBook) {
    return null;
  }
  const updated: IBook = {
    ...existingBook,
    ...updatedBook,
    id: existingBook.id,
    created_at: existingBook.created_at
  };

  books[index] = updated;
  await fs.writeFile(booksFilePath, JSON.stringify(books, null, 2))

  return books[index]
}