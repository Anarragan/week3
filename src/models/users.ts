import { Model, DataTypes, type Optional } from "sequelize";
import { sequelize } from "../config/data_base_config.js";

export interface IUser {
  id?: number; 
  name?: string | null;
  last_name?: string | null;
  email: string;
  password_hash: string;
  phone?: string | null;
  adress?: string | null;
  role: "admin" | "user";
  createdAt?: Date;
  updatedAt?: Date | null;
}
// esto podria ser redundante si uso ? en la interfaz
export interface IUserAdd
  extends Optional<IUser, "id" | "name" | "last_name" | "phone" | "adress" | "createdAt" | "updatedAt"> {}

export class User extends Model<IUser, IUserAdd> {
  declare id: number;
  declare name: string;
  declare last_name: string;
  declare email: string;
  declare password_hash: string;
  declare phone: string;
  declare adress: string;
  declare role: string;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;//opcional si quiero decirle a typescript que existen pero que no sobreescriba el getter y setter de sequelize
}

User.init(
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: true,
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
      allowNull: true,
      unique: true,
    },
    adress: {
      type: DataTypes.STRING,
      allowNull: true,
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