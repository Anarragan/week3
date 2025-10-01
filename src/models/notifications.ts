import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/data_base_config.js";

export interface INotification {
    id?: number;
    user_id: number;
    type: 'loan_request' | 'loan_due' | 'loan_overdue' | 'loan_approved' | 'book_returned' | 'subscription_expiring' | 'new_review';
    message: string;
    read: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface INotificationAdd extends Omit<INotification, 'id' | 'read' | 'createdAt' | 'updatedAt'> {}

export class Notification extends Model<INotification, INotificationAdd> {}

Notification.init({
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: [['loan_request', 'loan_due', 'loan_overdue', 'loan_approved', 'book_returned', 'subscription_expiring', 'new_review']]
        }
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    read: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
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
    tableName: 'notifications',
    timestamps: false,
    underscored: true,
});