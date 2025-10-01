import {Model, DataTypes, type Optional} from 'sequelize';
import {sequelize} from '../config/data_base_config.js';

export interface ILoan {
    id?: number;
    bookcopy_id: number;
    borrowed_id: number;
    loan_date: Date;
    return_date: Date;
    actual_return_date?: Date | null;
    status: 'active' | 'returned' | 'overdue';
}

export interface ILoanAdd extends Optional<ILoan, 'id' | 'actual_return_date'> {}

export class Loan extends Model<ILoan, ILoanAdd> {}

Loan.init({
    id: {
        type: DataTypes.BIGINT, 
        primaryKey: true,
        autoIncrement: true},
    bookcopy_id: {
        type: DataTypes.BIGINT, 
        allowNull: false},
    borrowed_id: {
        type: DataTypes.BIGINT, 
        allowNull: false},
    loan_date: {
        type: DataTypes.DATE, 
        allowNull: false, 
        defaultValue: DataTypes.NOW},
    return_date: {
        type: DataTypes.DATE, 
        allowNull: false},
    actual_return_date: {
        type: DataTypes.DATE, 
        allowNull: true},
    status: {
        type: DataTypes.STRING, 
        allowNull: false, 
        defaultValue: 'active',
        validate: {
            isIn: [['active', 'returned', 'overdue']],
        }
    },
}, {
    sequelize,
    tableName: 'loans',
    timestamps: false,
    underscored: true,
})