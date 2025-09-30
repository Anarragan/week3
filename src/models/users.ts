import { Model, DataTypes, type Optional } from "sequelize";
import { sequelize } from "../config/data_base_config.js";

export interface IUser {
  id?: number; 
  name: string;
  last_name: string;
  email: string;
  password_hash: string;
  phone: string;
  adress: string;
  role: "admin" | "user";
  createdAt?: Date;
  updatedAt?: Date | null;
}

export interface IUserAdd
  extends Optional<IUser, "id" | "createdAt" | "updatedAt"> {}

export class User extends Model<IUser, IUserAdd> {}

User.init(
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password_hash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    adress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "user",
      validate: {
        isIn: [["admin", "user"]],
      }
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "users",
    timestamps: true,
    underscored: true,
  }
);