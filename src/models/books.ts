import { Model, DataTypes, type Optional } from "sequelize";
import { sequelize } from "../config/data_base_config.js";

export interface IBook {
    id: number;
    title: string;
    author: string;
    isbn: string;
    genere: string;
    language: string;
    cover_url?: string | null;
    description?: string | null;
    createdAt?: Date;
    updatedAt?: Date | null;
    book_copies?: number | null;
}

export interface IBookAdd extends Optional<IBook, 'id' | 'cover_url' | 'description' | 'book_copies' | 'updatedAt'> {}

export class Book extends Model<IBook, IBookAdd> {}

Book.init({
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    author: { type: DataTypes.STRING, allowNull: false },
    isbn: { type: DataTypes.STRING, allowNull: false, unique: true },
    genere: { type: DataTypes.STRING, allowNull: false },
    language: { type: DataTypes.STRING, allowNull: false },
    cover_url: { type: DataTypes.STRING, allowNull: true },
    description: { type: DataTypes.TEXT, allowNull: true },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updatedAt: { type: DataTypes.DATE, allowNull: true },
    book_copies: { type: DataTypes.BIGINT, defaultValue: 1 }

}, {
    sequelize,
    tableName: 'books',
    timestamps: true,
    underscored: true,
})