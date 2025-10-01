import { BookCopy } from "../book_copies.js";
import { Loan } from "../loans.js";
import { User } from "../users.js";

// Un usuario puede tener muchos préstamos
User.hasMany(Loan, { foreignKey: "borrowed_id", as: "loans" });
Loan.belongsTo(User, { foreignKey: "borrowed_id", as: "borrower" });

// Una copia de libro puede tener muchos préstamos
BookCopy.hasMany(Loan, { foreignKey: "bookcopy_id", as: "loans" });
Loan.belongsTo(BookCopy, { foreignKey: "bookcopy_id", as: "bookCopy" });

export { BookCopy, Loan, User };