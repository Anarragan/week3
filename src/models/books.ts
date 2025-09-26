import { Model, DataTypes,  type InferAttributes, type InferCreationAttributes } from "sequelize";
import { sequelize } from "../config/data_base_config.js";

export class Book extends Model<InferAttributes<Book>, InferCreationAttributes<Book>> {
    declare id: number;
    declare title: string;
    declare author: string;
    declare isbn: string;
    declare genere: string;
    declare language: string;
    declare cover_url?: string;
    declare description: string;
    declare user_id: number;
    declare created_at: Date;
    declare book_copies?: number;
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
    user_id: { type: DataTypes.BIGINT, allowNull: false },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    book_copies: { type: DataTypes.BIGINT, defaultValue: 1 }
}, {
    sequelize,
    tableName: 'books',
    timestamps: false
})