import { DataTypes, Model, type Optional } from 'sequelize';
import { sequelize } from '../config/data_base_config.js';
import { Book } from './books.js';

export interface IBookCopy {
    id?: number;
    book_id: number;
    user_id?: number | null;
    condition: 'new' | 'good' | 'worn';
    availability_status: 'available' | 'borrowed' | 'reserved';
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IBookCopyAdd extends Optional<IBookCopy, 'id' | 'createdAt' | 'updatedAt'> {}

export class BookCopy extends Model<IBookCopy, IBookCopyAdd> {}

BookCopy.init({
    id: { 
        type: DataTypes.BIGINT, 
        primaryKey: true, 
        autoIncrement: true },
    book_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: Book,
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    user_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        },
        onDelete: 'SET NULL'
    },
    condition: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "new",
      validate: {
        isIn: [["new", "good", "worn"]],
      }
    },
    availability_status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "available",
      validate: {
        isIn: [["available", "borrowed", "reserved"]],
      }
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    sequelize,
    tableName: 'book_copies',
    timestamps: true,
    underscored: true,
})