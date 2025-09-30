import { BookCopy } from "../models/book_copies.js";
import { Book } from "../models/books.js";
import { User } from "../models/users.js";

//Relaciones de Book, User y bookcopies
Book.hasMany(BookCopy, { foreignKey: "book_id", as: "copies" });

BookCopy.belongsTo(Book, { foreignKey: "book_id", as: "book" });

// Un usuario puede tener muchas copias prestadas
User.hasMany(BookCopy, { foreignKey: "user_id", as: "borrowedCopies" });

// Cada copia pertenece a un usuario (opcionalmente)
BookCopy.belongsTo(User, { foreignKey: "user_id", as: "borrower" });

export { Book, BookCopy, User };

