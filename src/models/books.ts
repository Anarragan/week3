import { Model, DataTypes,  type InferAttributes, type InferCreationAttributes, type Optional } from "sequelize";
import { sequelize } from "../config/data_base_config.js";

export interface BookAttributes {
    id: number;
    title: string;
    author: string;
    isbn: string;
    genere: string;
    language: string;
    cover_url?: string | null;
    description?: string | null;
    created_at: Date;
    book_copies?: number | null;
}

export interface BookCreationAttributes extends Optional<BookAttributes, 'cover_url' | 'description' | 'book_copies'> {}

export class Book extends Model<BookAttributes, BookCreationAttributes>
    implements BookAttributes {
    public id!: number;
    public title!: string;
    public author!: string;
    public isbn!: string;
    public genere!: string;
    public language!: string;
    public cover_url!: string | null;
    public description!: string | null;
    public created_at!: Date;
    public updated_at!: Date | null;
}

Book.init({
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    author: { type: DataTypes.STRING, allowNull: false },
    isbn: { type: DataTypes.STRING, allowNull: false, unique: true },
    genere: { type: DataTypes.STRING, allowNull: false },
    language: { type: DataTypes.STRING, allowNull: false },
    cover_url: { type: DataTypes.STRING, allowNull: true },
    description: { type: DataTypes.TEXT, allowNull: true },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    book_copies: { type: DataTypes.BIGINT, defaultValue: 1 }
}, {
    sequelize,
    tableName: 'books',
    timestamps: false
})